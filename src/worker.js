const SUPPORTED_LANGS = ['uz','en','ru','zh','ar','tr','ko','de','fr','es'];
const RTL = new Set(['ar']);
const BASE_URL_FALLBACK = 'https://uchkoprik-digital-district.workers.dev';
const MODEL = '@cf/meta/llama-3.1-8b-instruct';

const META = {
  uz:{title:'Uchko‘prik tumani — interaktiv xarita, rasmiy ma’lumotlar va AI gid',description:'Uchko‘prik tumanining rasmiy interaktiv xaritasi: 51 ta MFY, tuman pasporti, korxonalar, mahalliy mahsulotlar, investitsiya ma’lumotlari va ko‘p tilli AI yordamchi.',locale:'uz_UZ'},
  en:{title:'Uchkoprik District — Interactive Map, Official Data & AI Guide',description:'Explore Uchkoprik District in Fergana, Uzbekistan through an interactive map, verified district data, local products, investment information and a multilingual AI guide.',locale:'en_US'},
  ru:{title:'Учкуприкский район — интерактивная карта, официальные данные и ИИ-гид',description:'Интерактивная цифровая платформа Учкуприкского района: махалли, официальные данные, предприятия, местная продукция, инвестиции и многоязычный ИИ-помощник.',locale:'ru_RU'},
  zh:{title:'乌奇库普里克区 — 互动地图、官方数据与 AI 导览',description:'通过互动地图、官方地区数据、本地产品、投资信息和多语言 AI 助手探索乌兹别克斯坦费尔干纳州乌奇库普里克区。',locale:'zh_CN'},
  ar:{title:'منطقة أوتشكوبريك — خريطة تفاعلية وبيانات رسمية ودليل بالذكاء الاصطناعي',description:'منصة رقمية تفاعلية لمنطقة أوتشكوبريك في فرغانة: أحياء وبيانات رسمية وأعمال ومنتجات محلية ومعلومات استثمارية ومساعد متعدد اللغات.',locale:'ar_SA'},
  tr:{title:'Uchko‘prik İlçesi — Etkileşimli Harita, Resmî Veriler ve AI Rehber',description:'Uchko‘prik ilçesini etkileşimli harita, doğrulanmış ilçe verileri, yerel ürünler, yatırım bilgileri ve çok dilli yapay zekâ rehberiyle keşfedin.',locale:'tr_TR'},
  ko:{title:'우치코프리크 지구 — 인터랙티브 지도, 공식 데이터 및 AI 가이드',description:'우즈베키스탄 페르가나의 우치코프리크 지구를 인터랙티브 지도, 공식 데이터, 지역 제품, 투자 정보 및 다국어 AI 가이드로 살펴보세요.',locale:'ko_KR'},
  de:{title:'Bezirk Uchko‘prik — Interaktive Karte, offizielle Daten & KI-Guide',description:'Entdecken Sie den Bezirk Uchko‘prik in Fergana mit interaktiver Karte, verifizierten Daten, lokalen Produkten, Investitionsinformationen und mehrsprachigem KI-Guide.',locale:'de_DE'},
  fr:{title:'District d’Uchko‘prik — carte interactive, données officielles et guide IA',description:'Découvrez Uchko‘prik grâce à une carte interactive, des données officielles, des produits locaux, des informations d’investissement et un guide IA multilingue.',locale:'fr_FR'},
  es:{title:'Distrito de Uchko‘prik — mapa interactivo, datos oficiales y guía de IA',description:'Explora Uchko‘prik con un mapa interactivo, datos oficiales, productos locales, información de inversión y una guía de IA multilingüe.',locale:'es_ES'}
};

function json(data,status=200,headers={}){
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff',...headers}});
}
function text(data,status=200,type='text/plain; charset=utf-8'){return new Response(data,{status,headers:{'content-type':type,'x-content-type-options':'nosniff'}})}
function normalizeLang(v){return SUPPORTED_LANGS.includes(v)?v:'uz'}
function safeBase(request,env){return String(env.PUBLIC_BASE_URL||'').replace(/\/$/,'') || new URL(request.url).origin || BASE_URL_FALLBACK}
function routeInfo(pathname){
  const parts=pathname.split('/').filter(Boolean); const lang=normalizeLang(parts[0]); const hasLang=SUPPORTED_LANGS.includes(parts[0]);
  return {lang,parts:hasLang?parts.slice(1):parts,hasLang};
}
function publicFields(row){ if(!row)return row; const {private_phone,private_contact,admin_notes,...safe}=row; return safe; }

async function assetJSON(env,path,request){const r=await env.ASSETS.fetch(new URL(path,request.url));if(!r.ok)throw new Error(`asset ${path}`);return r.json()}
async function assetText(env,path,request){const r=await env.ASSETS.fetch(new URL(path,request.url));if(!r.ok)throw new Error(`asset ${path}`);return r.text()}

async function d1All(env,sql,params=[]){ if(!env.DB)throw new Error('DB binding missing'); const stmt=env.DB.prepare(sql).bind(...params); const {results=[]}=await stmt.all(); return results; }

async function applyApprovedTranslations(env,lang,data){
  if(lang==='uz'||!env.DB) return data;
  try{
    const rows=await d1All(env,"SELECT entity_type,entity_id,field_name,value FROM translations WHERE lang=? AND status='approved'",[lang]);
    if(!rows.length) return data;
    const index=new Map(rows.map(r=>[`${r.entity_type}:${r.entity_id}:${r.field_name}`,r.value]));
    const patch=(type,arr)=>arr.map(item=>{const copy={...item};for(const key of ['name','description','specialization','industry','producer']){const v=index.get(`${type}:${item.id}:${key}`);if(v)copy[key]=v;}return copy;});
    data.mahallas=patch('mahalla',data.mahallas||[]);
    data.businesses=patch('business',data.businesses||[]);
    data.places=patch('place',data.places||[]);
    data.products=patch('product',data.products||[]);
    data.categories=patch('category',data.categories||[]);
    return data;
  }catch(e){console.log('translation fallback',e.message);return data;}
}

async function getBootstrap(request,env,lang){
  try{
    const [mahallas,categories,places,businesses,products,stats] = await Promise.all([
      d1All(env,'SELECT id,slug,name,official_name AS officialName,lat,lng,population,households,families,specialization,verified,updated_at AS updatedAt,source FROM mahallas WHERE active=1 ORDER BY id'),
      d1All(env,'SELECT id,name,icon,kind,color,active,sort_order AS sortOrder FROM categories WHERE active=1 ORDER BY sort_order,id'),
      d1All(env,'SELECT id,slug,type,category,name,lat,lng,description,verified,updated_at AS updatedAt FROM places WHERE active=1 ORDER BY sort_order,name'),
      d1All(env,'SELECT id,slug,type,category,name,lat,lng,industry,description,verified,updated_at AS updatedAt FROM businesses WHERE active=1 ORDER BY sort_order,name'),
      d1All(env,'SELECT id,slug,name,category,producer,description,image_key AS image,verified,updated_at AS updatedAt FROM products WHERE active=1 ORDER BY sort_order,name'),
      d1All(env,'SELECT key,value,verified,updated_at AS updatedAt,source FROM district_stats WHERE active=1')
    ]);
    if(mahallas.length){
      const district={}; for(const s of stats){district[s.key]=Number.isFinite(Number(s.value))?Number(s.value):s.value; if(s.key==='population')district.updatedAt=s.updatedAt;}
      if(!district.mahallas)district.mahallas=mahallas.length;
      return applyApprovedTranslations(env,lang,{mahallas:mahallas.map(publicFields),categories,places:places.map(publicFields),businesses:businesses.map(publicFields),products:products.map(publicFields),district});
    }
  }catch(e){ console.log('bootstrap D1 fallback',e.message); }
  const [mahallas,demo,district]=await Promise.all([assetJSON(env,'/data/mahallas.json',request),assetJSON(env,'/data/demo.json',request),assetJSON(env,'/data/district.json',request)]);
  return {mahallas,categories:demo.categories,places:demo.places,businesses:demo.businesses,products:demo.products,district};
}

function norm(s){return String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').replace(/[ʻ’'`]/g,'')}
function localSearch(data,q){
  const terms=norm(q).split(/\s+/).filter(Boolean); if(!terms.length)return [];
  const items=[...data.mahallas.map(x=>({...x,_kind:'mahalla'})),...data.businesses.map(x=>({...x,_kind:'business'})),...data.places.map(x=>({...x,_kind:'place'})),...data.products.map(x=>({...x,_kind:'product'}))];
  return items.map(item=>{const hay=norm([item.name,item.officialName,item.specialization,item.industry,item.description,item.producer,item.category].filter(Boolean).join(' '));const score=terms.reduce((s,t)=>s+(hay.includes(t)?1:0),0);return {item,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12).map(x=>x.item);
}
function deterministicAnswer(data,message,lang){
  const q=norm(message), d=data.district||{}, m=data.mahallas||[];
  const F={
    uz:{count:n=>`Uchko‘prik tumani tasdiqlangan bazasida ${n} ta MFY mavjud.`,pop:n=>`Yuklangan tasdiqlangan MFY ma’lumotlari bo‘yicha jami aholi ${n} nafar.`,top:(name,n)=>`${name} MFY yuklangan ma’lumotlarda eng ko‘p aholiga ega: ${n} nafar.`,business:'Korxonalar qatlamini xaritada ko‘rsataman. Demo yozuvlar rasmiy ma’lumot sifatida ko‘rsatilmaydi.',invest:'Investor rejimi aholi, korxonalar, mahalliy mahsulotlar va iqtisodiy ma’lumotlarni bir joyda jamlaydi. Faqat tasdiqlangan ko‘rsatkichlar rasmiy sifatida belgilanadi.',found:n=>`${n} topildi. Ma’lumot kartasini xaritada ochish mumkin.`,unknown:'Bu savol bo‘yicha tasdiqlangan bazada yetarli ma’lumot yo‘q. Taxminiy javob bermayman.'},
    en:{count:n=>`The verified Uchkoprik district dataset contains ${n} mahallas.`,pop:n=>`The loaded verified mahalla dataset totals ${n} residents.`,top:(name,n)=>`${name} has the largest population in the loaded dataset: ${n} people.`,business:'I will show the Businesses layer. Demo records are never presented as official data.',invest:'Investor Mode combines population, businesses, local products and economic information. Only verified values are labeled as official.',found:n=>`I found ${n}. It can be opened on the map.`,unknown:'The verified dataset does not contain enough information to answer that question. I will not guess.'},
    ru:{count:n=>`В подтверждённой базе Учкуприкского района указано ${n} махаллей.`,pop:n=>`Суммарное население по загруженным подтверждённым данным махаллей: ${n} человек.`,top:(name,n)=>`Наибольшая численность населения в загруженных данных у махалли ${name}: ${n} человек.`,business:'Показываю слой предприятий. Демо-записи не выдаются за официальные данные.',invest:'Режим инвестора объединяет население, предприятия, местную продукцию и экономические данные. Официальными помечаются только подтверждённые показатели.',found:n=>`Найдено: ${n}. Объект можно открыть на карте.`,unknown:'В подтверждённой базе недостаточно данных для ответа. Я не буду подставлять предположения.'},
    zh:{count:n=>`乌奇库普里克区已核实的数据集中共有 ${n} 个社区。`,pop:n=>`已加载并核实的社区数据合计人口为 ${n} 人。`,top:(name,n)=>`在已加载的数据中，${name} 的人口最多：${n} 人。`,business:'我将显示企业图层。演示记录不会作为官方数据展示。',invest:'投资者模式汇总人口、企业、本地产品和经济信息；只有已核实的数值才会标记为官方数据。',found:n=>`已找到 ${n}，可在地图上打开其信息卡片。`,unknown:'已核实的数据集不足以回答这个问题，我不会猜测。'},
    ar:{count:n=>`تحتوي قاعدة البيانات الموثقة لمنطقة أوتشكوبريك على ${n} حياً.`,pop:n=>`يبلغ إجمالي السكان في بيانات الأحياء الموثقة والمحملة ${n} نسمة.`,top:(name,n)=>`يملك حي ${name} أكبر عدد من السكان في البيانات المحملة: ${n} نسمة.`,business:'سأعرض طبقة الشركات على الخريطة. لا يتم تقديم السجلات التجريبية على أنها بيانات رسمية.',invest:'يجمع وضع المستثمر بيانات السكان والشركات والمنتجات المحلية والمعلومات الاقتصادية، ولا تُوسم كبيانات رسمية إلا القيم الموثقة.',found:n=>`تم العثور على ${n}. يمكن فتح بطاقة المعلومات على الخريطة.`,unknown:'لا تحتوي قاعدة البيانات الموثقة على معلومات كافية للإجابة، ولن أخمّن.'},
    tr:{count:n=>`Uchko‘prik ilçesinin doğrulanmış veri setinde ${n} mahalle bulunmaktadır.`,pop:n=>`Yüklenen doğrulanmış mahalle verilerindeki toplam nüfus ${n} kişidir.`,top:(name,n)=>`Yüklenen verilere göre en yüksek nüfus ${name} mahallesindedir: ${n} kişi.`,business:'İşletmeler katmanını haritada gösteriyorum. Demo kayıtları resmî veri olarak sunulmaz.',invest:'Yatırımcı Modu nüfus, işletmeler, yerel ürünler ve ekonomik bilgileri bir araya getirir. Yalnızca doğrulanmış değerler resmî olarak işaretlenir.',found:n=>`${n} bulundu. Bilgi kartı haritada açılabilir.`,unknown:'Doğrulanmış veri setinde bu soruyu yanıtlamak için yeterli bilgi yok. Tahmin etmeyeceğim.'},
    ko:{count:n=>`우치코프리크 지구의 검증된 데이터에는 ${n}개의 마할라가 있습니다.`,pop:n=>`불러온 검증된 마할라 데이터의 총인구는 ${n}명입니다.`,top:(name,n)=>`불러온 데이터에서 ${name}의 인구가 가장 많습니다: ${n}명.`,business:'지도에 기업 레이어를 표시합니다. 데모 기록은 공식 데이터로 표시되지 않습니다.',invest:'투자자 모드는 인구, 기업, 지역 제품 및 경제 정보를 한곳에 모읍니다. 검증된 값만 공식 데이터로 표시됩니다.',found:n=>`${n}을(를) 찾았습니다. 지도에서 정보 카드를 열 수 있습니다.`,unknown:'검증된 데이터에 이 질문에 답할 충분한 정보가 없습니다. 추측하지 않겠습니다.'},
    de:{count:n=>`Der verifizierte Datensatz des Bezirks Uchko‘prik enthält ${n} Mahallas.`,pop:n=>`Die geladenen verifizierten Mahalla-Daten ergeben insgesamt ${n} Einwohner.`,top:(name,n)=>`${name} hat im geladenen Datensatz die höchste Bevölkerung: ${n} Einwohner.`,business:'Ich zeige die Unternehmensebene auf der Karte. Demo-Einträge werden nicht als offizielle Daten dargestellt.',invest:'Der Investorenmodus bündelt Bevölkerung, Unternehmen, lokale Produkte und Wirtschaftsdaten. Nur verifizierte Werte werden als offiziell gekennzeichnet.',found:n=>`${n} wurde gefunden. Die Informationskarte kann auf der Karte geöffnet werden.`,unknown:'Der verifizierte Datensatz enthält nicht genügend Informationen für diese Frage. Ich werde nicht raten.'},
    fr:{count:n=>`Le jeu de données vérifié du district d’Uchko‘prik contient ${n} mahallas.`,pop:n=>`Les données vérifiées chargées pour les mahallas totalisent ${n} habitants.`,top:(name,n)=>`${name} possède la population la plus élevée dans les données chargées : ${n} habitants.`,business:'J’affiche la couche des entreprises sur la carte. Les données de démonstration ne sont jamais présentées comme officielles.',invest:'Le mode investisseur réunit population, entreprises, produits locaux et informations économiques. Seules les valeurs vérifiées sont indiquées comme officielles.',found:n=>`${n} a été trouvé. Sa fiche peut être ouverte sur la carte.`,unknown:'Le jeu de données vérifié ne contient pas assez d’informations pour répondre. Je ne ferai pas de supposition.'},
    es:{count:n=>`El conjunto de datos verificado del distrito de Uchko‘prik contiene ${n} mahallas.`,pop:n=>`Los datos verificados de las mahallas cargadas suman ${n} habitantes.`,top:(name,n)=>`${name} tiene la mayor población en los datos cargados: ${n} habitantes.`,business:'Mostraré la capa de empresas en el mapa. Los registros de demostración no se presentan como datos oficiales.',invest:'El modo inversor reúne población, empresas, productos locales e información económica. Solo los valores verificados se marcan como oficiales.',found:n=>`He encontrado ${n}. Su ficha se puede abrir en el mapa.`,unknown:'El conjunto de datos verificado no contiene información suficiente para responder. No haré suposiciones.'}
  };
  const f=F[lang]||F.en;
  const nf=n=>Number(n||0).toLocaleString(lang==='zh'?'zh-CN':lang==='ar'?'ar-SA':lang);
  if(/nechta.*(mfy|mahalla)|how many.*mahalla|сколько.*махалл|多少.*(社区|马哈拉)|كم.*(حي|محلة)|kac.*(mahalle|mahalla)|(?:몇.*(마할라|mahalla)|(마할라|mahalla).*몇)|wie viele.*mahalla|combien.*mahalla|cu[aá]ntas.*mahalla/.test(q)) return {text:f.count(nf(d.mahallas||m.length)),sources:['Official district data']};
  if(/aholi|population|населен|人口|السكان|nufus|인구|bevolkerung|population|poblaci[oó]n/.test(q)&&!/eng|most|largest|сам|最多|أكبر|en (yüksek|fazla)|가장|höchst|plus|mayor/.test(q)) return {text:f.pop(nf(d.population||0)),sources:['Official district data']};
  if(/eng.*(kop|ko‘p).*aholi|largest.*population|most populous|сам.*населен|最多.*人口|أكبر.*سكان|en (yuksek|fazla).*nufus|가장.*인구|hochst.*bevolkerung|plus.*population|mayor.*poblaci[oó]n/.test(q)){
    const top=[...m].sort((a,b)=>(b.population||0)-(a.population||0))[0];
    if(top) return {text:f.top(top.name,nf(top.population)),sources:['Official district data'],focus:{id:top.id,type:'mahalla'}};
  }
  if(/korxona|business|enterprise|предприят|企业|شركة|isletme|기업|unternehmen|entreprise|empresa/.test(q)) return {text:f.business,sources:['Official district data'],action:'business'};
  if(/invest|инвест|投资|استثمار|yatırım|투자/.test(q)) return {text:f.invest,sources:['Official district data'],action:'invest'};
  const hit=localSearch(data,message)[0]; if(hit) return {text:f.found(hit.name),sources:[hit.verified?'Official district data':'Demo / unverified'],focus:{id:hit.id,type:hit._kind}};
  return {text:f.unknown,sources:[]};
}
async function aiAnswer(request,env){
  const body=await request.json().catch(()=>({})); const lang=normalizeLang(body.lang); const message=String(body.message||'').trim().slice(0,1200); if(!message)return json({ok:false,error:'message required'},400);
  const data=await getBootstrap(request,env,lang); const deterministic=deterministicAnswer(data,message,lang);
  if(String(env.ENABLE_WORKERS_AI||'false')!=='true' || !env.AI) return json({ok:true,...deterministic,mode:'official-data'});
  const matches=localSearch(data,message).slice(0,5).map(x=>publicFields(x));
  const context={district:data.district,matched_records:matches,deterministic_hint:deterministic};
  const langName={uz:'Uzbek',en:'English',ru:'Russian',zh:'Chinese',ar:'Arabic',tr:'Turkish',ko:'Korean',de:'German',fr:'French',es:'Spanish'}[lang];
  const system=`You are Uchkoprik AI, the official-data assistant for Uchkoprik District, Fergana, Uzbekistan. Answer in ${langName}. Use ONLY the supplied VERIFIED/OFFICIAL context for factual claims. Demo or unverified records may be mentioned only if clearly labeled as unverified. If context is insufficient, explicitly say the verified database does not contain the information. Never invent numbers, businesses, addresses, people, or historical facts. Keep the answer concise and visitor-friendly.`;
  try{
    const result=await env.AI.run(MODEL,{messages:[{role:'system',content:system},{role:'user',content:`Question: ${message}\nContext JSON: ${JSON.stringify(context)}`}],max_tokens:360,temperature:0.2});
    const content=result?.response||result?.result?.response||''; if(content)return json({ok:true,text:content,sources:deterministic.sources||[],focus:deterministic.focus,action:deterministic.action,mode:'workers-ai'});
  }catch(e){console.log('Workers AI fallback',e.message)}
  return json({ok:true,...deterministic,mode:'official-data-fallback'});
}

function requireAdmin(request,env){
  const expected=String(env.ADMIN_TOKEN||''); if(!expected)return false; const auth=request.headers.get('authorization')||''; return auth===`Bearer ${expected}`;
}
async function adminHealth(request,env){
  if(!requireAdmin(request,env))return json({ok:false,error:'Unauthorized'},401);
  const data=await getBootstrap(request,env,'uz'); const now=Date.now(); const rows=[...data.mahallas,...data.businesses,...data.places,...data.products];
  let verified=0,outdated=0,missing=0,demo=0; for(const r of rows){if(r.verified)verified++;else demo++; if(!r.name||((r.type!=='product')&&!r.lat&&!r.lng))missing++; const dt=Date.parse(r.updatedAt||''); if(dt&&now-dt>180*86400000)outdated++;}
  return json({ok:true,health:{total:rows.length,verified,demo,outdated,missing,score:rows.length?Math.max(0,Math.round(((verified-missing*.5-outdated*.2)/rows.length)*100)):0},counts:{mahallas:data.mahallas.length,businesses:data.businesses.length,places:data.places.length,products:data.products.length},district:data.district});
}
const TABLES={
  categories:['id','name','icon','kind','color','active','sort_order'],
  mahallas:['id','slug','name','official_name','lat','lng','population','households','families','specialization','verified','updated_at','source','active'],
  places:['id','slug','type','category','name','lat','lng','description','verified','updated_at','active','sort_order'],
  businesses:['id','slug','type','category','name','lat','lng','industry','description','verified','updated_at','active','sort_order'],
  products:['id','slug','name','category','producer','description','image_key','verified','updated_at','active','sort_order'],
  district_stats:['key','value','unit','group_name','label','verified','updated_at','source','active']
};
async function adminUpsert(request,env){
  if(!requireAdmin(request,env))return json({ok:false,error:'Unauthorized'},401); if(!env.DB)return json({ok:false,error:'D1 binding missing'},503);
  const body=await request.json().catch(()=>({})); const table=body.table; const record=body.record||{}; const allowed=TABLES[table]; if(!allowed)return json({ok:false,error:'Invalid table'},400);
  const cols=allowed.filter(k=>record[k]!==undefined); if(!cols.length)return json({ok:false,error:'No fields'},400); const pk=table==='district_stats'?'key':'id'; if(record[pk]===undefined)return json({ok:false,error:`${pk} required`},400);
  const placeholders=cols.map(()=>'?').join(','); const update=cols.filter(c=>c!==pk).map(c=>`${c}=excluded.${c}`).join(','); const sql=`INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders}) ON CONFLICT(${pk}) DO UPDATE SET ${update||`${pk}=excluded.${pk}`}`;
  await env.DB.prepare(sql).bind(...cols.map(c=>record[c])).run(); return json({ok:true});
}
async function adminDelete(request,env){
  if(!requireAdmin(request,env))return json({ok:false,error:'Unauthorized'},401); if(!env.DB)return json({ok:false,error:'D1 binding missing'},503);
  const body=await request.json().catch(()=>({})); const table=body.table; const pk=table==='district_stats'?'key':'id'; if(!TABLES[table]||body[pk]===undefined)return json({ok:false,error:'Invalid request'},400); await env.DB.prepare(`DELETE FROM ${table} WHERE ${pk}=?`).bind(body[pk]).run(); return json({ok:true});
}
async function mediaGet(request,env,key){if(!env.MEDIA)return text('Media binding missing',404);const obj=await env.MEDIA.get(key);if(!obj)return text('Not found',404);const h=new Headers();obj.writeHttpMetadata(h);h.set('etag',obj.httpEtag);h.set('cache-control','public,max-age=31536000,immutable');return new Response(obj.body,{headers:h})}
async function mediaPut(request,env){if(!requireAdmin(request,env))return json({ok:false,error:'Unauthorized'},401);if(!env.MEDIA)return json({ok:false,error:'R2 binding missing'},503);const url=new URL(request.url);const key=(url.searchParams.get('key')||'').replace(/^\/+/, '');if(!key||key.includes('..'))return json({ok:false,error:'Invalid key'},400);await env.MEDIA.put(key,request.body,{httpMetadata:{contentType:request.headers.get('content-type')||'application/octet-stream'}});return json({ok:true,url:`/media/${key}`})}

async function objectMeta(env,info){
  const [section,slug]=info.parts; if(!slug||!env.DB)return null;
  try{
    if(section==='mahalla') return await env.DB.prepare('SELECT name,specialization,verified,updated_at AS updatedAt FROM mahallas WHERE slug=? AND active=1 LIMIT 1').bind(slug).first();
    if(section==='business') return await env.DB.prepare('SELECT name,description,industry,verified,updated_at AS updatedAt FROM businesses WHERE slug=? AND active=1 LIMIT 1').bind(slug).first();
    if(section==='place') return await env.DB.prepare('SELECT name,description,verified,updated_at AS updatedAt FROM places WHERE slug=? AND active=1 LIMIT 1').bind(slug).first();
    return null;
  }catch(e){return null}
}
function hreflang(base,info){ const rest=info.parts.join('/'); return SUPPORTED_LANGS.map(l=>`<link rel="alternate" hreflang="${l}" href="${base}/${l}${rest?'/'+rest:''}">`).join('\n  ')+`\n  <link rel="alternate" hreflang="x-default" href="${base}/uz${rest?'/'+rest:''}">`; }
async function renderApp(request,env,info){
  let html=await assetText(env,'/index.html',request); const base=safeBase(request,env); const m={...META[info.lang]}; const obj=await objectMeta(env,info); if(obj?.name){m.title=`${obj.name} — ${m.title.split(' — ')[0]}`;m.description=obj.description||obj.specialization||obj.industry||m.description;}
  const canonical=`${base}/${info.lang}${info.parts.length?'/'+info.parts.join('/'):''}`; const jsonld={"@context":"https://schema.org","@type":"GovernmentOrganization","name":"Uchko‘prik Digital District","url":canonical,"areaServed":{"@type":"AdministrativeArea","name":"Uchko‘prik District, Fergana, Uzbekistan"}};
  const repl={'%%LANG%%':info.lang,'%%DIR%%':RTL.has(info.lang)?'rtl':'ltr','%%TITLE%%':m.title,'%%DESCRIPTION%%':m.description,'%%CANONICAL%%':canonical,'%%HREFLANG%%':hreflang(base,info),'%%OG_LOCALE%%':m.locale,'%%OG_IMAGE%%':`${base}/social-card.png`,'%%JSONLD%%':JSON.stringify(jsonld).replace(/</g,'\\u003c')};
  for(const [k,v] of Object.entries(repl))html=html.split(k).join(v);
  return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'public,max-age=300','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'geolocation=(self), microphone=(self)','content-security-policy':"default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: blob: https://*.openfreemap.org https://*.openstreetmap.org; connect-src 'self' https://*.openfreemap.org https://*.openstreetmap.org; worker-src 'self' blob:; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self';"}});
}
async function sitemap(request,env){
  const base=safeBase(request,env); const urls=[]; for(const l of SUPPORTED_LANGS)urls.push(`${base}/${l}`);
  try{if(env.DB){for(const [section,table] of [['mahalla','mahallas'],['business','businesses'],['place','places']]){const rows=await d1All(env,`SELECT slug,updated_at AS updatedAt FROM ${table} WHERE active=1`);for(const r of rows)for(const l of SUPPORTED_LANGS)urls.push(`${base}/${l}/${section}/${r.slug}`)}}}catch(e){}
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u.replace(/&/g,'&amp;')}</loc></url>`).join('\n')}\n</urlset>`; return text(xml,200,'application/xml; charset=utf-8');
}

export default {
  async fetch(request,env){
    const url=new URL(request.url), path=url.pathname;
    if(path==='/api/bootstrap'&&request.method==='GET'){const lang=normalizeLang(url.searchParams.get('lang'));return json({ok:true,data:await getBootstrap(request,env,lang)});}
    if(path==='/api/search'&&request.method==='GET'){const data=await getBootstrap(request,env,normalizeLang(url.searchParams.get('lang')));return json({ok:true,results:localSearch(data,url.searchParams.get('q')||'')});}
    if(path==='/api/ai'&&request.method==='POST')return aiAnswer(request,env);
    if(path==='/api/admin/health'&&request.method==='GET')return adminHealth(request,env);
    if(path==='/api/admin/upsert'&&request.method==='POST')return adminUpsert(request,env);
    if(path==='/api/admin/delete'&&request.method==='POST')return adminDelete(request,env);
    if(path==='/api/admin/media'&&request.method==='PUT')return mediaPut(request,env);
    if(path.startsWith('/media/')&&request.method==='GET')return mediaGet(request,env,decodeURIComponent(path.slice(7)));
    if(path==='/sitemap.xml')return sitemap(request,env);
    if(path==='/robots.txt')return text(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${safeBase(request,env)}/sitemap.xml\n`);
    if(path==='/index.html') return Response.redirect(`${safeBase(request,env)}/uz/`,302);
    if(path==='/admin'||path==='/admin/'){
      const r=await env.ASSETS.fetch(new URL('/admin.html',request.url)); const h=new Headers(r.headers);h.set('x-robots-tag','noindex,nofollow');h.set('cache-control','no-store');return new Response(r.body,{status:r.status,headers:h});
    }
    const info=routeInfo(path); if(path==='/') return Response.redirect(`${safeBase(request,env)}/uz/`,302);
    if(info.hasLang)return renderApp(request,env,info);
    return env.ASSETS.fetch(request);
  }
};
