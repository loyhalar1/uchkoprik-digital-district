const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const fmt=v=>new Intl.NumberFormat('uz-UZ').format(Number(v)||0);
const state={user:null,admin:null,view:'dashboard',editing:null,data:{mahallas:[],organizations:[],categories:[],economicZones:[],district:null}};
const titles={dashboard:['SYSTEM OVERVIEW','Dashboard'],mahallas:['OFFICIAL DATA','MFYlar'],organizations:['ECONOMY & SERVICES','Tashkilotlar'],categories:['MAP SYSTEM','Kategoriyalar'],economicZones:['ECONOMIC ZONES','Iqtisodiy zonalar'],district:['DISTRICT PASSPORT','Tuman pasporti']};

/* Admin faqat mazmuniy ma'lumotlarni kiritadi.
   slug/status/verified/source/source_no kabi texnik maydonlar avtomatik. */
const schemas={
  mahallas:{
    table:'mahallas',title:'MFY',id:'id',folder:'mahallas',
    columns:[['name','Nomi'],['chairman','MFY raisi'],['phone','Telefon'],['specialization','Ixtisoslashuv'],['population','Aholi'],['verified','Holat']],
    fields:[
      ['name','Nomi','text','required'],['chairman','MFY raisi','text'],['phone','Telefon','tel'],['specialization','Ixtisoslashuv','text'],
      ['population','Aholi','number'],['households','Xonadon','number'],['families','Oilalar','number'],
      ['schools','Maktablar','number'],['kindergartens','Bog‘chalar','number'],['clinics','Tibbiyot','number'],['mosques','Masjidlar','number'],['shops','Savdo nuqtalari','number'],
      ['_location','Joylashuv','location'],['image_url','Rasm','image']
    ]
  },
  organizations:{
    table:'organizations',title:'Tashkilot',id:'id',folder:'organizations',
    columns:[['name','Nomi'],['organization_type','Turi'],['responsible_person','Rahbar'],['phone','Telefon'],['sector','Yo‘nalish'],['verified','Holat']],
    fields:[
      ['name','Nomi','text','required'],['responsible_person','Rahbar / mas’ul shaxs','text'],['phone','Telefon','tel'],['inn','INN','text'],
      ['organization_type','Tashkilot turi','text'],['sector','Yo‘nalish / sektor','text'],['activity','Tavsif / faoliyat','textarea'],['address','Manzil','text'],
      ['_location','Joylashuv','location'],['image_url','Rasm','image']
    ]
  },
  categories:{
    table:'categories',title:'Kategoriya',id:'id',folder:null,
    columns:[['name','Nomi'],['slug','Slug'],['icon','Icon'],['color','Rang'],['sort_order','Tartib'],['active','Holat']],
    fields:[['name','Nomi','text','required'],['slug','Slug','text'],['icon','Icon nomi','text'],['color','Rang','color'],['sort_order','Tartib','number'],['active','Faol','checkbox']]
  },
  economicZones:{
    table:'economic_zone_projects',title:'Iqtisodiy zona loyihasi',id:'id',folder:'economic-zones',
    columns:[['company_name','Korxona'],['zone_name','Iqtisodiy zona'],['executive_director','Rahbar'],['phone_original','Telefon'],['occupied_area_ha','Maydon'],['verified','Holat']],
    fields:[
      ['company_name','Korxona nomi','text','required'],['executive_director','Ijrochi direktor / rahbar','text'],['phone_original','Telefon','tel'],['inn','INN','text'],
      ['zone_name','Iqtisodiy zona','text'],['district_city','Hudud','text'],['occupied_area_ha','Egallagan maydon, ha','number'],['activity_type','Tavsif / faoliyat turi','textarea'],
      ['founder_citizenship','Ta’sischi / fuqaroligi','text'],['_location','Joylashuv','location'],['image_url','Rasm','image']
    ]
  }
};
const districtFields=[['governor','Tuman hokimi','text'],['founded','Tashkil topgan sana','text'],['population','Aholi','number'],['mahalla_count','MFY soni','number'],['area_km2','Maydoni, km²','number'],['border_length_km','Chegara uzunligi, km','number'],['industry_volume','Sanoat hajmi','text'],['agriculture_volume','Qishloq xo‘jaligi hajmi','text'],['services_volume','Xizmatlar hajmi','text'],['unemployment_rate','Ishsizlik, %','number'],['poverty_rate','Kambag‘allik, %','number'],['healthcare_count','Sog‘liqni saqlash muassasalari','number']];

function toast(msg,type='ok'){const host=$('#toastHost');if(!host)return;const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=msg;host.appendChild(el);setTimeout(()=>el.remove(),3200)}
async function verifyAdmin(user){const {data,error}=await window.sb.from('admins').select('user_id,role,active').eq('user_id',user.id).eq('active',true).maybeSingle();if(error)throw error;if(!data)throw new Error('Bu foydalanuvchiga admin huquqi berilmagan.');return data}
async function login(email,password){const {data,error}=await window.sb.auth.signInWithPassword({email,password});if(error)throw error;state.user=data.user;state.admin=await verifyAdmin(data.user);showApp();await refreshAll()}
async function restoreSession(){const {data:{session}}=await window.sb.auth.getSession();if(!session)return;try{state.user=session.user;state.admin=await verifyAdmin(session.user);showApp();await refreshAll()}catch(e){await window.sb.auth.signOut();console.warn(e)}}
function showApp(){$('#loginScreen').classList.add('hidden');$('#adminApp').classList.remove('hidden');$('#adminIdentity').textContent=`${state.user?.email||'Admin'} · ${state.admin?.role||'admin'}`}

async function refreshAll(){
  const [m,o,c,e,d]=await Promise.all([
    window.sb.from('mahallas').select('*').order('legacy_id',{ascending:true}),
    window.sb.from('organizations').select('*').order('name',{ascending:true}),
    window.sb.from('categories').select('*').order('sort_order',{ascending:true}),
    window.sb.from('economic_zone_projects').select('*').order('source_no',{ascending:true}),
    window.sb.from('district').select('*').eq('slug','uchkoprik').single()
  ]);
  for(const r of [m,o,c,e,d])if(r.error)throw r.error;
  state.data={mahallas:m.data||[],organizations:o.data||[],categories:c.data||[],economicZones:e.data||[],district:d.data};
  renderCurrent();
}
function renderCurrent(){
  const [eye,title]=titles[state.view];$('#viewEyebrow').textContent=eye;$('#viewTitle').textContent=title;
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===state.view));
  $('#dashboardView').classList.toggle('hidden',state.view!=='dashboard');$('#tableView').classList.toggle('hidden',!(state.view in schemas));$('#districtView').classList.toggle('hidden',state.view!=='district');$('#addBtn').classList.toggle('hidden',!(state.view in schemas));
  if(state.view==='dashboard')renderDashboard();else if(state.view in schemas)renderTable();else renderDistrict();
}
function renderDashboard(){
  const d=state.data.district||{};
  const verified=state.data.mahallas.filter(x=>x.verified).length+state.data.organizations.filter(x=>x.verified).length+state.data.economicZones.filter(x=>x.verified).length;
  const mapReady=state.data.mahallas.filter(hasCoords).length+state.data.organizations.filter(hasCoords).length+state.data.economicZones.filter(hasCoords).length;
  const items=[['MFY',state.data.mahallas.length],['Tashkilot',state.data.organizations.length],['Iqtisodiy zona',state.data.economicZones.length],['Xaritada',mapReady],['Tasdiqlangan',verified]];
  $('#metricGrid').innerHTML=items.map(([l,v])=>`<article class="metric"><strong>${fmt(v)}</strong><span>${l}</span></article>`).join('');
  $('#coverageList').innerHTML=[['MFYlar',state.data.mahallas.length,51],['Tashkilotlar',state.data.organizations.length,Math.max(10,state.data.organizations.length)],['Iqtisodiy zonalar',state.data.economicZones.length,Math.max(105,state.data.economicZones.length)]].map(([n,v,max])=>`<div class="coverage-row"><span>${n}</span><div class="bar"><i style="width:${Math.min(100,v/max*100)}%"></i></div><b>${fmt(v)}</b></div>`).join('');
  $('#districtPreview').innerHTML=[['Aholi',d.population],['Maydon',d.area_km2?`${d.area_km2} km²`:'—'],['MFY',d.mahalla_count],['Ishsizlik',d.unemployment_rate?`${d.unemployment_rate}%`:'—']].map(([l,v])=>`<div class="district-box"><strong>${esc(v??'—')}</strong><span>${l}</span></div>`).join('');
}
function rows(){return state.data[state.view]||[]}
function renderTable(){
  const schema=schemas[state.view];let list=rows();const q=($('#tableSearch').value||'').trim().toLowerCase();if(q)list=list.filter(r=>JSON.stringify(r).toLowerCase().includes(q));
  $('#tableCount').textContent=`${fmt(list.length)} ta`;
  $('#dataHead').innerHTML='<tr>'+schema.columns.map(([,label])=>`<th>${esc(label)}</th>`).join('')+'</tr>';
  $('#dataBody').innerHTML=list.map((r,i)=>`<tr data-index="${i}">${schema.columns.map(([key])=>`<td>${renderCell(r,key)}</td>`).join('')}</tr>`).join('');
  $$('#dataBody tr').forEach((tr,i)=>tr.onclick=()=>openEditor(list[i]));
}
function renderCell(row,key){if(key==='verified'||key==='active')return `<span class="status ${row[key]?'ok':'draft'}">${row[key]?'Faol':'Draft'}</span>`;const v=row[key];return esc(v??'—')}
function hasCoords(r){return Number.isFinite(Number(r?.latitude))&&Number.isFinite(Number(r?.longitude))&&r.latitude!==null&&r.longitude!==null&&r.latitude!==''&&r.longitude!==''}

function fieldHtml([key,label,type,rule],value=''){
  const required=rule==='required'?' required':'';
  if(type==='checkbox')return `<label class="check"><input name="${key}" type="checkbox" ${value?'checked':''}><span>${esc(label)}</span></label>`;
  if(type==='textarea')return `<label class="field full"><span>${esc(label)}</span><textarea name="${key}"${required}>${esc(value)}</textarea></label>`;
  if(type==='location')return `<label class="field full"><span>${esc(label)}</span><input name="${key}" type="text" value="${esc(value)}" placeholder="40.540123, 71.045678 yoki Google Maps URL"><small class="field-help">Koordinatani yoki ichida koordinata bo‘lgan Google Maps havolasini kiriting.</small></label>`;
  if(type==='image')return `<label class="field full image-upload-field"><span>${esc(label)}</span><div class="image-upload-box"><div class="image-preview ${value?'has-image':''}" data-image-preview ${value?`style="background-image:url('${esc(value)}')"`:''}><span>${value?'Rasmni almashtirish':'Rasm tanlanmagan'}</span></div><input name="_image_file" type="file" accept="image/jpeg,image/png,image/webp" data-current-url="${esc(value||'')}"><small>JPG/PNG/WebP. Rasm avtomatik WebP formatga optimallashtiriladi va Supabase Storage’ga yuklanadi.</small></div></label>`;
  return `<label class="field"><span>${esc(label)}</span><input name="${key}" type="${type}" ${type==='number'?'step="any"':''}${required} value="${esc(value)}"></label>`;
}
function editorFieldValue(field,row){
  const [key,,type]=field;
  if(type==='location')return row?.latitude!==null&&row?.latitude!==undefined&&row?.longitude!==null&&row?.longitude!==undefined?`${row.latitude}, ${row.longitude}`:'';
  return row?.[key]??'';
}
function openEditor(row=null){
  state.editing=row;const schema=schemas[state.view];$('#editorTitle').textContent=row?`${schema.title}ni tahrirlash`:`Yangi ${schema.title}`;$('#deleteBtn').classList.toggle('hidden',!row);
  $('#editorFields').innerHTML=schema.fields.map(f=>fieldHtml(f,editorFieldValue(f,row))).join('');$('#editorBackdrop').classList.remove('hidden');
  const file=$('[name="_image_file"]',$('#editorForm'));if(file)file.onchange=()=>previewImage(file.files?.[0]);
}
function closeEditor(){$('#editorBackdrop').classList.add('hidden');state.editing=null}
function previewImage(file){const host=$('[data-image-preview]');if(!host||!file)return;const url=URL.createObjectURL(file);host.style.backgroundImage=`url("${url}")`;host.classList.add('has-image');host.querySelector('span').textContent=file.name}
function slugify(v){return String(v||'').trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[ʻ’'`]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)}
function parseLocation(value){
  const text=String(value||'').trim();if(!text)return {latitude:null,longitude:null};
  const decoded=decodeURIComponent(text);
  const patterns=[
    /@(-?\d{1,2}(?:\.\d+)?),\s*(-?\d{1,3}(?:\.\d+)?)/,
    /(?:query|q|ll)=(-?\d{1,2}(?:\.\d+)?)(?:%2C|,|\s)+(-?\d{1,3}(?:\.\d+)?)/i,
    /^\s*(-?\d{1,2}(?:\.\d+)?)\s*[,; ]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/
  ];
  for(const re of patterns){const m=decoded.match(re);if(m)return {latitude:Number(m[1]),longitude:Number(m[2])}}
  throw new Error('Joylashuvni aniqlab bo‘lmadi. “latitude, longitude” ko‘rinishida kiriting.');
}
function collect(schema,form){
  const fd=new FormData(form),record={};
  for(const [key,,type] of schema.fields){
    if(type==='image')continue;
    if(type==='location'){const loc=parseLocation(fd.get(key));record.latitude=loc.latitude;record.longitude=loc.longitude;continue}
    if(type==='checkbox'){record[key]=$(`[name="${key}"]`,form).checked;continue}
    let v=fd.get(key);if(typeof v==='string')v=v.trim();if(v==='')v=null;if(type==='number'&&v!==null)v=Number(v);record[key]=v;
  }
  return record;
}
function validateCoords(record){const lat=record.latitude,lng=record.longitude;if((lat===null)!==(lng===null))throw new Error('Latitude va Longitude ikkalasi birga kiritilishi kerak.');if(lat!==null&&(lat<-90||lat>90||lng<-180||lng>180))throw new Error('Koordinata noto‘g‘ri kiritilgan.')}
function defaultOrganizationCategory(){return state.data.categories.find(c=>c.active!==false&&c.slug!=='mahallas'&&c.slug!=='mahalla')?.id||state.data.categories.find(c=>c.active!==false)?.id||null}
async function uniqueSlug(table,base){let slug=slugify(base)||'item';for(let i=0;i<20;i++){const candidate=i?`${slug}-${i+1}`:slug;const {data,error}=await window.sb.from(table).select('id').eq('slug',candidate).limit(1);if(error)throw error;if(!data?.length)return candidate}return `${slug}-${Date.now().toString(36)}`}
async function applyAutoFields(schema,record){
  validateCoords(record);
  const editing=state.editing;
  const base=record.name||record.company_name||schema.title;
  record.slug=editing?.slug||await uniqueSlug(schema.table,base);
  const now=new Date().toISOString();
  if(schema.table==='mahallas'){
    record.legacy_id=editing?.legacy_id??(Math.max(0,...state.data.mahallas.map(x=>Number(x.legacy_id)||0))+1);record.official_name=editing?.official_name||record.name;record.status='active';record.verified=true;record.updated_at=now;
  }
  if(schema.table==='organizations'){
    record.organization_type=record.organization_type||editing?.organization_type||'Tashkilot';record.category_id=editing?.category_id||defaultOrganizationCategory();record.status='active';record.verified=true;record.location_verified=record.latitude!==null&&record.longitude!==null;record.updated_at=now;
  }
  if(schema.table==='economic_zone_projects'){
    record.source_no=editing?.source_no??(Math.max(0,...state.data.economicZones.map(x=>Number(x.source_no)||0))+1);record.zone_name=record.zone_name||editing?.zone_name||'Qo‘qon erkin iqtisodiy zonasi';record.district_city=record.district_city||editing?.district_city||'Uchko‘prik tumani';record.inn=record.inn||editing?.inn||'';record.activity_type=record.activity_type||editing?.activity_type||'';record.executive_director=record.executive_director||editing?.executive_director||'';record.phone_digits=String(record.phone_original||editing?.phone_original||'').replace(/\D/g,'')||null;record.source_date=editing?.source_date||new Date().toISOString().slice(0,10);record.source_file=editing?.source_file||'Admin panel';record.status='active';record.verified=true;record.updated_at=now;
  }
  if(schema.table==='categories'){record.slug=editing?.slug||record.slug||await uniqueSlug(schema.table,record.name);record.icon=record.icon||'marker';record.color=record.color||'#65e5ff';record.sort_order=record.sort_order??100}
  return record;
}

async function optimizeImage(file){
  if(!file?.type?.startsWith('image/'))throw new Error('Faqat rasm fayli yuklash mumkin.');if(file.size>12*1024*1024)throw new Error('Rasm hajmi 12 MB dan katta.');
  try{
    const bitmap=await createImageBitmap(file);const max=1600,scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));const w=Math.max(1,Math.round(bitmap.width*scale)),h=Math.max(1,Math.round(bitmap.height*scale));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d',{alpha:false});ctx.drawImage(bitmap,0,0,w,h);bitmap.close?.();
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.84));if(blob)return {blob,ext:'webp',contentType:'image/webp'};
  }catch(e){console.warn('Image optimization fallback:',e)}
  return {blob:file,ext:(file.name.split('.').pop()||'jpg').toLowerCase(),contentType:file.type||'image/jpeg'};
}
async function uploadImage(schema,file,record){
  if(!file||!schema.folder)return null;toast('Rasm optimallashtirilmoqda…');const optimized=await optimizeImage(file);const base=slugify(record.name||record.company_name||record.slug||'image')||'image';const path=`${schema.folder}/${base}-${Date.now()}.${optimized.ext}`;
  const {error}=await window.sb.storage.from('district-media').upload(path,optimized.blob,{cacheControl:'31536000',contentType:optimized.contentType,upsert:false});if(error)throw new Error(`Rasm yuklash: ${error.message}`);
  const {data}=window.sb.storage.from('district-media').getPublicUrl(path);if(!data?.publicUrl)throw new Error('Rasm URL olinmadi.');return data.publicUrl;
}

async function saveEditor(e){
  e.preventDefault();const submit=$('#editorForm button[type="submit"]');if(submit)submit.disabled=true;
  try{
    const schema=schemas[state.view],form=$('#editorForm');let record=collect(schema,form);record=await applyAutoFields(schema,record);
    const file=$('[name="_image_file"]',form)?.files?.[0];if(file)record.image_url=await uploadImage(schema,file,record);
    let q;if(state.editing)q=window.sb.from(schema.table).update(record).eq(schema.id,state.editing[schema.id]);else q=window.sb.from(schema.table).insert(record);
    const {error}=await q;if(error)throw error;toast('Saqlandi');closeEditor();await refreshAll();
  }catch(e){toast(e.message||'Saqlashda xato','bad')}finally{if(submit)submit.disabled=false}
}
async function deleteEditor(){if(!state.editing||!confirm('O‘chirishni tasdiqlaysizmi?'))return;try{const schema=schemas[state.view];const {error}=await window.sb.from(schema.table).delete().eq(schema.id,state.editing[schema.id]);if(error)throw error;toast('O‘chirildi');closeEditor();await refreshAll()}catch(e){toast(e.message,'bad')}}
function renderDistrict(){const d=state.data.district||{};$('#districtFields').innerHTML=districtFields.map(f=>fieldHtml(f,d[f[0]]??'')).join('')}
async function saveDistrict(e){e.preventDefault();try{const fd=new FormData($('#districtForm')),record={updated_at:new Date().toISOString()};for(const [key,,type] of districtFields){let v=fd.get(key);if(v==='')v=null;if(type==='number'&&v!==null)v=Number(v);record[key]=v}const {error}=await window.sb.from('district').update(record).eq('slug','uchkoprik');if(error)throw error;toast('Tuman pasporti saqlandi');await refreshAll()}catch(e){toast(e.message,'bad')}}

$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();$('#loginError').classList.add('hidden');try{await login($('#adminEmail').value.trim(),$('#adminPassword').value)}catch(err){$('#loginError').textContent=err.message;$('#loginError').classList.remove('hidden')}});
$('#logoutBtn').onclick=async()=>{await window.sb.auth.signOut();location.reload()};
$$('.nav-item').forEach(x=>x.onclick=()=>{state.view=x.dataset.view;$('#tableSearch').value='';renderCurrent()});
$('#refreshBtn').onclick=()=>refreshAll().catch(e=>toast(e.message,'bad'));$('#addBtn').onclick=()=>openEditor();$('#tableSearch').oninput=renderTable;$('#editorClose').onclick=closeEditor;$('#cancelBtn').onclick=closeEditor;$('#editorBackdrop').onclick=e=>{if(e.target===$('#editorBackdrop'))closeEditor()};$('#editorForm').onsubmit=saveEditor;$('#deleteBtn').onclick=deleteEditor;$('#districtForm').onsubmit=saveDistrict;
restoreSession().catch(console.error);
