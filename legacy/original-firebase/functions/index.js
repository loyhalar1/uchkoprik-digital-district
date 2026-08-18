/**
 * SysOne / Uchko'prik — Backend (Firebase Cloud Functions, 2nd gen)
 *
 * Bu fayl C-blokning 8 va 9-bandlarini amalga oshiradi:
 *  - Telegram bot logikasi (kod yuborish/tekshirish) endi FAQAT shu yerda,
 *    bot tokeni brauzerga hech qachon chiqmaydi.
 *  - Ko'p-adminli tizim: admins kolleksiyasini boshqarish (qo'shish/o'chirish),
 *    faqat superadmin bajara oladigan amallar sifatida.
 *
 * DEPLOY QILISHDAN OLDIN:
 *   firebase functions:secrets:set TELEGRAM_BOT_TOKEN
 *   (qiymat sifatida botfather bergan tokenni kiriting)
 *
 * DEPLOY:
 *   cd functions && npm install
 *   firebase deploy --only functions,firestore:rules
 *
 * TELEGRAM WEBHOOK O'RNATISH (deploydan keyin bir marta, terminalda):
 *   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<REGION>-<PROJECT>.cloudfunctions.net/telegramWebhook"
 */

const {onRequest, onCall, HttpsError} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

const TELEGRAM_BOT_TOKEN = defineSecret("TELEGRAM_BOT_TOKEN");

const OTP_TTL_MS = 5 * 60 * 1000; // 5 daqiqa
const MAX_ATTEMPTS = 5;

// ---------------------------------------------------------------------
// Yordamchi funksiyalar
// ---------------------------------------------------------------------

function normalizeUsername(u) {
  return String(u || "").trim().replace(/^@/, "").toLowerCase();
}

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendTelegramMessage(token, chatId, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({chat_id: chatId, text, parse_mode: "HTML"}),
  });
  const j = await res.json();
  if (!j.ok) throw new Error(j.description || "Telegram xatosi");
  return j;
}

/** Faol admin hujjatini Telegram username bo'yicha topadi. */
async function findAdminByUsername(username) {
  const uname = normalizeUsername(username);
  if (!uname) return null;
  const snap = await db.collection("admins")
      .where("telegramUsername", "==", uname)
      .where("active", "==", true)
      .limit(1)
      .get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return {id: doc.id, ...doc.data()};
}

/** Callable funksiyalar ichida — chaqiruvchi faol superadmin ekanini tekshiradi. */
async function assertSuperadmin(auth) {
  if (!auth) throw new HttpsError("unauthenticated", "Tizimga kiring");
  const snap = await db.collection("admins").doc(auth.uid).get();
  const data = snap.data();
  if (!snap.exists || !data.active || data.role !== "superadmin") {
    throw new HttpsError("permission-denied", "Faqat superadmin bu amalni bajara oladi");
  }
  return data;
}

// ---------------------------------------------------------------------
// 1. requestCode — Telegram orqali bir martalik kod so'rash
//    POST { telegramUsername }
// ---------------------------------------------------------------------
exports.requestCode = onRequest(
    {cors: true, secrets: [TELEGRAM_BOT_TOKEN]},
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({ok: false, error: "Faqat POST so'rov qabul qilinadi"});
        return;
      }
      try {
        const foundAdmin = await findAdminByUsername(req.body && req.body.telegramUsername);
        // Xavfsizlik uchun: topilmasa ham xatolik bermaymiz — aks holda
        // "qaysi username'lar admin ekani" oshkor bo'ladi.
        if (!foundAdmin) {
          res.json({ok: true});
          return;
        }
        const code = randomCode();
        const codeHash = sha256(code);
        await db.collection("otp_codes").doc(String(foundAdmin.telegramUserId)).set({
          codeHash,
          expiresAt: Date.now() + OTP_TTL_MS,
          attempts: 0,
        });
        const text = "🔐 SysOne Admin kirish kodi: <b>" + code + "</b>\n\n" +
          "Amal qilish muddati: 5 daqiqa.\n" +
          "Agar bu siz bo'lmasangiz, bu xabarni e'tiborsiz qoldiring.";
        await sendTelegramMessage(TELEGRAM_BOT_TOKEN.value(), foundAdmin.telegramUserId, text);
        res.json({ok: true});
      } catch (e) {
        console.error("requestCode error:", e);
        res.status(500).json({ok: false, error: "Server xatosi, birozdan keyin urinib ko'ring"});
      }
    },
);

// ---------------------------------------------------------------------
// 2. verifyCode — kodni tekshirish va Firebase custom token qaytarish
//    POST { telegramUsername, code }
// ---------------------------------------------------------------------
exports.verifyCode = onRequest(
    {cors: true},
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({ok: false, error: "Faqat POST so'rov qabul qilinadi"});
        return;
      }
      try {
        const foundAdmin = await findAdminByUsername(req.body && req.body.telegramUsername);
        const code = String((req.body && req.body.code) || "").trim();
        if (!foundAdmin) {
          res.status(400).json({ok: false, error: "Kod noto'g'ri yoki muddati tugagan"});
          return;
        }
        const otpRef = db.collection("otp_codes").doc(String(foundAdmin.telegramUserId));
        const otpSnap = await otpRef.get();
        if (!otpSnap.exists) {
          res.status(400).json({ok: false, error: "Kod topilmadi — qaytadan so'rang"});
          return;
        }
        const otp = otpSnap.data();
        if (Date.now() > otp.expiresAt) {
          await otpRef.delete();
          res.status(400).json({ok: false, error: "Kod muddati tugagan — qaytadan so'rang"});
          return;
        }
        if (otp.attempts >= MAX_ATTEMPTS) {
          await otpRef.delete();
          res.status(400).json({ok: false, error: "Juda ko'p urinish — qaytadan kod so'rang"});
          return;
        }
        if (sha256(code) !== otp.codeHash) {
          await otpRef.update({attempts: admin.firestore.FieldValue.increment(1)});
          res.status(400).json({ok: false, error: "Kod noto'g'ri"});
          return;
        }
        await otpRef.delete();
        const token = await admin.auth().createCustomToken(String(foundAdmin.telegramUserId), {
          role: foundAdmin.role,
        });
        res.json({
          ok: true,
          token,
          fullName: foundAdmin.fullName || "",
          role: foundAdmin.role,
        });
      } catch (e) {
        console.error("verifyCode error:", e);
        res.status(500).json({ok: false, error: "Server xatosi, birozdan keyin urinib ko'ring"});
      }
    },
);

// ---------------------------------------------------------------------
// 3. telegramWebhook — Telegram'dan kelgan yangilanishlarni qabul qiladi.
//    Foydalanuvchi botga /start bosganda o'z ID'sini oladi.
// ---------------------------------------------------------------------
exports.telegramWebhook = onRequest(
    {secrets: [TELEGRAM_BOT_TOKEN]},
    async (req, res) => {
      try {
        const msg = req.body && req.body.message;
        if (msg && msg.text && msg.text.trim().startsWith("/start")) {
          const from = msg.from || {};
          const userId = from.id;
          const username = normalizeUsername(from.username);

          await db.collection("telegram_starts").doc(String(userId)).set({
            telegramUserId: userId,
            telegramUsername: username,
            firstName: from.first_name || "",
            startedAt: admin.firestore.FieldValue.serverTimestamp(),
          }, {merge: true});

          // Agar bu odam admins ro'yxatiga ID orqali oldindan qo'shilgan bo'lsa,
          // lekin username maydoni bo'sh/eskirgan bo'lsa — avtomatik yangilaymiz
          // (chunki login username orqali qidiriladi).
          const adminRef = db.collection("admins").doc(String(userId));
          const adminSnap = await adminRef.get();
          if (adminSnap.exists && username) {
            await adminRef.update({telegramUsername: username});
          }

          const reply = adminSnap.exists ?
            ("✅ Xush kelibsiz! Siz admin sifatida ro'yxatdan o'tgansiz.\n" +
             "Boshqaruv paneliga kirishda Telegram username'ingizni kiriting.") :
            ("Sizning Telegram ID: <b>" + userId + "</b>\n" +
             "Username: @" + (username || "yo'q") + "\n\n" +
             "Bu ma'lumotni SysOne administratoriga yuboring — u sizni admin sifatida qo'shadi.");
          await sendTelegramMessage(TELEGRAM_BOT_TOKEN.value(), userId, reply);
        }
        res.status(200).send("ok");
      } catch (e) {
        console.error("telegramWebhook error:", e);
        // Telegram'ga har doim 200 qaytarish kerak, aks holda qayta-qayta yuboraveradi.
        res.status(200).send("ok");
      }
    },
);

// ---------------------------------------------------------------------
// 4. addAdmin — yangi admin qo'shish (faqat superadmin)
//    data: { telegramUserId, telegramUsername, fullName, role }
// ---------------------------------------------------------------------
exports.addAdmin = onCall(async (req) => {
  await assertSuperadmin(req.auth);
  const {telegramUserId, telegramUsername, fullName, role} = req.data || {};

  if (!telegramUserId || !fullName) {
    throw new HttpsError("invalid-argument", "telegramUserId va F.I.Sh majburiy");
  }
  const idStr = String(telegramUserId).trim();
  if (!/^\d+$/.test(idStr)) {
    throw new HttpsError("invalid-argument", "telegramUserId faqat raqamlardan iborat bo'lishi kerak");
  }
  const finalRole = role === "superadmin" ? "superadmin" : "admin";

  await db.collection("admins").doc(idStr).set({
    telegramUserId: Number(idStr),
    telegramUsername: normalizeUsername(telegramUsername),
    fullName: String(fullName).trim(),
    role: finalRole,
    addedBy: req.auth.uid,
    addedAt: admin.firestore.FieldValue.serverTimestamp(),
    active: true,
  }, {merge: true});

  return {ok: true};
});

// ---------------------------------------------------------------------
// 5. removeAdmin — adminni faolsizlantirish (faqat superadmin)
//    data: { telegramUserId }
// ---------------------------------------------------------------------
exports.removeAdmin = onCall(async (req) => {
  await assertSuperadmin(req.auth);
  const idStr = String((req.data && req.data.telegramUserId) || "").trim();
  if (!idStr) throw new HttpsError("invalid-argument", "telegramUserId majburiy");

  if (idStr === req.auth.uid) {
    throw new HttpsError("failed-precondition", "O'zingizni o'chira olmaysiz");
  }

  const targetSnap = await db.collection("admins").doc(idStr).get();
  if (targetSnap.exists && targetSnap.data().role === "superadmin") {
    const supers = await db.collection("admins")
        .where("role", "==", "superadmin")
        .where("active", "==", true)
        .get();
    if (supers.size <= 1) {
      throw new HttpsError("failed-precondition", "Oxirgi faol superadminni o'chirib bo'lmaydi");
    }
  }

  await db.collection("admins").doc(idStr).update({active: false});
  return {ok: true};
});

// ---------------------------------------------------------------------
// 6. lookupTelegramStart — username bo'yicha Telegram ID'ni topish
//    (yangi admin qo'shishda ID'ni qo'lda kiritmaslik uchun qulaylik)
//    data: { telegramUsername }
// ---------------------------------------------------------------------
exports.lookupTelegramStart = onCall(async (req) => {
  await assertSuperadmin(req.auth);
  const uname = normalizeUsername(req.data && req.data.telegramUsername);
  if (!uname) throw new HttpsError("invalid-argument", "telegramUsername majburiy");

  const snap = await db.collection("telegram_starts")
      .where("telegramUsername", "==", uname)
      .limit(1)
      .get();
  if (snap.empty) return {found: false};
  return {found: true, ...snap.docs[0].data()};
});
