const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const fmt=v=>new Intl.NumberFormat('uz-UZ').format(Number(v)||0);
const state={user:null,admin:null,view:'dashboard',editing:null,presentationEditing:null,presentationPlaylistId:null,presentationReady:false,dragSlideId:null,data:{mahallas:[],organizations:[],categories:[],economicZones:[],district:null,presentationPlaylists:[],presentationSlides:[]}};
const titles={dashboard:['SYSTEM OVERVIEW','Dashboard'],mahallas:['OFFICIAL DATA','MFYlar'],organizations:['ECONOMY & SERVICES','Tashkilotlar'],categories:['MAP SYSTEM','Kategoriyalar'],economicZones:['ECONOMIC ZONES','Iqtisodiy zonalar'],district:['DISTRICT PASSPORT','Tuman pasporti'],presentation:['PRESENTATION STUDIO','Prezentatsiya']};

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
  const [pp,ps]=await Promise.all([
    window.sb.from('presentation_playlists').select('*').order('created_at',{ascending:true}),
    window.sb.from('presentation_slides').select('*').order('sort_order',{ascending:true})
  ]);
  state.presentationReady=!pp.error&&!ps.error;
  const playlists=pp.error?[]:(pp.data||[]),slides=ps.error?[]:(ps.data||[]);
  state.data={mahallas:m.data||[],organizations:o.data||[],categories:c.data||[],economicZones:e.data||[],district:d.data,presentationPlaylists:playlists,presentationSlides:slides};
  if(!state.presentationPlaylistId||!playlists.some(x=>x.id===state.presentationPlaylistId))state.presentationPlaylistId=(playlists.find(x=>x.is_default)||playlists[0])?.id||null;
  renderCurrent();
}
function renderCurrent(){
  const [eye,title]=titles[state.view]||titles.dashboard;$('#viewEyebrow').textContent=eye;$('#viewTitle').textContent=title;
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===state.view));
  $('#dashboardView').classList.toggle('hidden',state.view!=='dashboard');$('#tableView').classList.toggle('hidden',!(state.view in schemas));$('#districtView').classList.toggle('hidden',state.view!=='district');$('#presentationView').classList.toggle('hidden',state.view!=='presentation');
  const canAdd=(state.view in schemas)||state.view==='presentation';$('#addBtn').classList.toggle('hidden',!canAdd);$('#addBtn').textContent=state.view==='presentation'?'+ Slayd':'+ Yangi';
  if(state.view==='dashboard')renderDashboard();else if(state.view in schemas)renderTable();else if(state.view==='district')renderDistrict();else if(state.view==='presentation')renderPresentationStudio();
}
function renderDashboard(){
  const d=state.data.district||{};
  const verified=state.data.mahallas.filter(x=>x.verified).length+state.data.organizations.filter(x=>x.verified).length+state.data.economicZones.filter(x=>x.verified).length;
  const mapReady=state.data.mahallas.filter(hasCoords).length+state.data.organizations.filter(hasCoords).length+state.data.economicZones.filter(hasCoords).length;
  const items=[['MFY',state.data.mahallas.length],['Tashkilot',state.data.organizations.length],['Iqtisodiy zona',state.data.economicZones.length],['Prezentatsiya slaydi',state.data.presentationSlides.length],['Xaritada',mapReady],['Tasdiqlangan',verified]];
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


/* =========================================================
   PRESENTATION STUDIO
========================================================= */
const PRES_TYPES=['hero','map','statistics','gallery','mfy','organization','economic-zone','investment','ai','video','final'];
function currentPlaylist(){return state.data.presentationPlaylists.find(x=>x.id===state.presentationPlaylistId)||null}
function currentPresentationSlides(){return state.data.presentationSlides.filter(x=>x.playlist_id===state.presentationPlaylistId).sort((a,b)=>(Number(a.sort_order)||0)-(Number(b.sort_order)||0))}
function presentationSlideLabel(s){return s.title||s.eyebrow||s.slug||'Slayd'}
function renderPresentationStudio(){
  const warning=$('#presentationSetupWarning');warning?.classList.toggle('hidden',state.presentationReady);
  const studio=$('.presentation-studio');if(studio)studio.classList.toggle('is-disabled',!state.presentationReady);
  const select=$('#presentationPlaylistSelect');if(select){select.innerHTML=state.data.presentationPlaylists.map(p=>`<option value="${esc(p.id)}" ${p.id===state.presentationPlaylistId?'selected':''}>${esc(p.name)}${p.is_default?' · default':''}</option>`).join('')||'<option value="">Playlist yo‘q</option>'}
  renderPresentationSlideList();
  if(state.presentationEditing){const fresh=state.data.presentationSlides.find(x=>x.id===state.presentationEditing.id);if(fresh)state.presentationEditing=fresh;fillPresentationForm(state.presentationEditing)}
  else{$('#presentationForm')?.classList.add('hidden');$('#presentationEmptyState')?.classList.remove('hidden')}
}
function renderPresentationSlideList(){
  const host=$('#presentationSlideList');if(!host)return;const slides=currentPresentationSlides();
  host.innerHTML=slides.length?slides.map((s,i)=>`<button type="button" draggable="true" class="presentation-slide-card ${state.presentationEditing?.id===s.id?'active':''}" data-slide-id="${esc(s.id)}"><span class="slide-index">${String(i+1).padStart(2,'0')}</span><span class="slide-card-copy"><small>${esc((s.slide_type||'hero').toUpperCase())}</small><strong>${esc(presentationSlideLabel(s))}</strong><em>${s.active?'Faol':'Yashirilgan'}</em></span><span class="slide-drag">⋮⋮</span></button>`).join(''):'<div class="studio-empty-list">Bu playlistda slayd yo‘q.</div>';
  $$('.presentation-slide-card',host).forEach(card=>{
    card.onclick=()=>editPresentationSlide(card.dataset.slideId);
    card.ondragstart=e=>{state.dragSlideId=card.dataset.slideId;e.dataTransfer.effectAllowed='move';card.classList.add('dragging')};
    card.ondragend=()=>card.classList.remove('dragging');
    card.ondragover=e=>{e.preventDefault();e.dataTransfer.dropEffect='move'};
    card.ondrop=e=>{e.preventDefault();reorderPresentationSlides(state.dragSlideId,card.dataset.slideId)};
  });
}
function newPresentationSlide(){
  if(!state.presentationReady){toast('Avval presentation_studio.sql ni Supabase’da ishga tushiring.','bad');return}
  if(!state.presentationPlaylistId){toast('Avval playlist yarating.','bad');return}
  const max=Math.max(0,...currentPresentationSlides().map(x=>Number(x.sort_order)||0));
  state.presentationEditing={id:null,playlist_id:state.presentationPlaylistId,slug:'',sort_order:max+10,active:true,slide_type:'hero',layout:'hero',eyebrow:'DIGITAL DISTRICT',title:'Yangi slayd',body:'',accent_color:'#7cefff',translations:{},entity_type:'none',entity_id:null,show_map:true,map_layer:'mahalla',center_lat:40.54,center_lng:71.045,zoom:10.2,pitch:42,bearing:-8,camera_duration_ms:2000,display_duration_ms:6500,media_type:'none',media_url:null,gallery_urls:[],overlay_strength:.55,stats_preset:'none',custom_stats:[],cta_label:null,cta_url:null};
  fillPresentationForm(state.presentationEditing);renderPresentationSlideList();
}
function editPresentationSlide(id){const row=state.data.presentationSlides.find(x=>String(x.id)===String(id));if(!row)return;state.presentationEditing=row;fillPresentationForm(row);renderPresentationSlideList()}
function setVal(id,value){const el=$('#'+id);if(!el)return;if(el.type==='checkbox')el.checked=!!value;else el.value=value??''}
function jsonPretty(v,empty='{}'){try{return JSON.stringify(v??JSON.parse(empty),null,2)}catch{return empty}}
function fillPresentationForm(row){
  $('#presentationEmptyState')?.classList.add('hidden');$('#presentationForm')?.classList.remove('hidden');$('#presEditorTitle').textContent=row?.id?'Slaydni tahrirlash':'Yangi slayd';
  setVal('presSlideId',row?.id||'');setVal('presSlideType',row?.slide_type||'hero');setVal('presLayout',row?.layout||'hero');setVal('presEyebrow',row?.eyebrow||'');setVal('presAccent',row?.accent_color||'#7cefff');setVal('presTitle',row?.title||'');setVal('presBody',row?.body||'');setVal('presCtaLabel',row?.cta_label||'');setVal('presCtaUrl',row?.cta_url||'');setVal('presTranslations',jsonPretty(row?.translations||{}));
  setVal('presEntityType',row?.entity_type||'none');renderPresentationEntityOptions(row?.entity_id||'');setVal('presStatsPreset',row?.stats_preset||'none');renderCustomStats(row?.custom_stats||[]);
  setVal('presMediaType',row?.media_type||'none');setVal('presOverlay',row?.overlay_strength??.55);setVal('presMediaUrl',row?.media_url||'');setVal('presGalleryUrls',Array.isArray(row?.gallery_urls)?row.gallery_urls.join('\n'):'');if($('#presMediaFile'))$('#presMediaFile').value='';
  setVal('presShowMap',row?.show_map!==false);setVal('presMapLayer',row?.map_layer||'mahalla');setVal('presCenterLat',row?.center_lat??'');setVal('presCenterLng',row?.center_lng??'');setVal('presZoom',row?.zoom??10.2);setVal('presPitch',row?.pitch??42);setVal('presBearing',row?.bearing??-8);setVal('presCameraDuration',row?.camera_duration_ms??2000);setVal('presSortOrder',row?.sort_order??100);setVal('presDisplayDuration',row?.display_duration_ms??6500);setVal('presActive',row?.active!==false);
  updatePresentationAdminPreview();
}
function renderCustomStats(rows=[]){
  const host=$('#presentationCustomStats');if(!host)return;const list=[0,1,2,3].map(i=>rows[i]||{});
  host.innerHTML=list.map((r,i)=>`<div class="custom-stat-row"><input data-stat-label="${i}" value="${esc(r.label||'')}" placeholder="Label"><input data-stat-value="${i}" value="${esc(r.value||'')}" placeholder="{{district.population}}"></div>`).join('');
}
function renderPresentationEntityOptions(selected=''){
  const type=$('#presEntityType')?.value||'none',sel=$('#presEntityId');if(!sel)return;let rows=[];
  if(type==='mahalla')rows=state.data.mahallas.map(x=>({id:x.id,name:x.name||x.official_name||'MFY'}));
  if(type==='organization')rows=state.data.organizations.map(x=>({id:x.id,name:x.name||'Tashkilot'}));
  if(type==='economic-zone')rows=state.data.economicZones.map(x=>({id:x.id,name:x.company_name||x.zone_name||'Iqtisodiy zona'}));
  sel.innerHTML='<option value="">Tanlanmagan</option>'+rows.map(x=>`<option value="${esc(x.id)}" ${String(x.id)===String(selected)?'selected':''}>${esc(x.name)}</option>`).join('');
}
function parseJsonField(text,label,defaultValue){const raw=String(text||'').trim();if(!raw)return defaultValue;try{return JSON.parse(raw)}catch{throw new Error(`${label} JSON formatida xato.`)}}
function numOrNull(id){const v=$('#'+id)?.value;return v===''||v==null?null:Number(v)}
function collectPresentationSlide(){
  const stats=$$('.custom-stat-row').map(row=>({label:$('[data-stat-label]',row)?.value.trim()||'',value:$('[data-stat-value]',row)?.value.trim()||''})).filter(x=>x.label||x.value);
  const gallery=String($('#presGalleryUrls')?.value||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const record={playlist_id:state.presentationPlaylistId,sort_order:Number($('#presSortOrder').value)||100,active:$('#presActive').checked,slide_type:$('#presSlideType').value,layout:$('#presLayout').value,eyebrow:$('#presEyebrow').value.trim()||null,title:$('#presTitle').value.trim()||'Slayd',body:$('#presBody').value.trim()||null,accent_color:$('#presAccent').value||'#7cefff',translations:parseJsonField($('#presTranslations').value,'Tarjimalar',{}),entity_type:$('#presEntityType').value,entity_id:$('#presEntityId').value||null,show_map:$('#presShowMap').checked,map_layer:$('#presMapLayer').value,center_lat:numOrNull('presCenterLat'),center_lng:numOrNull('presCenterLng'),zoom:Number($('#presZoom').value)||10.2,pitch:Number($('#presPitch').value)||0,bearing:Number($('#presBearing').value)||0,camera_duration_ms:Number($('#presCameraDuration').value)||0,display_duration_ms:Math.max(1000,Number($('#presDisplayDuration').value)||6500),media_type:$('#presMediaType').value,media_url:$('#presMediaUrl').value.trim()||null,gallery_urls:gallery,overlay_strength:Number($('#presOverlay').value)||0,stats_preset:$('#presStatsPreset').value,custom_stats:stats,cta_label:$('#presCtaLabel').value.trim()||null,cta_url:$('#presCtaUrl').value.trim()||null,updated_at:new Date().toISOString()};
  if(record.center_lat!==null&&(record.center_lat<-90||record.center_lat>90))throw new Error('Latitude noto‘g‘ri.');if(record.center_lng!==null&&(record.center_lng<-180||record.center_lng>180))throw new Error('Longitude noto‘g‘ri.');
  return record;
}
async function uploadPresentationMedia(file,record){
  if(!file)return record.media_url||null;let blob=file,ext=(file.name.split('.').pop()||'bin').toLowerCase(),contentType=file.type||'application/octet-stream',folder='videos';
  if(file.type.startsWith('image/')){const optimized=await optimizeImage(file);blob=optimized.blob;ext=optimized.ext;contentType=optimized.contentType;folder='images'}
  else if(!['video/mp4','video/webm'].includes(file.type))throw new Error('Presentation media uchun JPG/PNG/WebP/MP4/WebM ishlating.');
  if(blob.size>80*1024*1024)throw new Error('Media hajmi 80 MB dan katta.');
  toast('Presentation media yuklanmoqda…');const base=slugify(record.title)||'slide';const path=`presentation/${folder}/${base}-${Date.now()}.${ext}`;
  const {error}=await window.sb.storage.from('district-media').upload(path,blob,{cacheControl:'31536000',contentType,upsert:false});if(error)throw error;const {data}=window.sb.storage.from('district-media').getPublicUrl(path);return data?.publicUrl||null;
}
async function savePresentationSlide(e){
  e.preventDefault();if(!state.presentationReady)return;const submit=$('#presentationForm button[type="submit"]');if(submit)submit.disabled=true;
  try{let record=collectPresentationSlide();const file=$('#presMediaFile')?.files?.[0];if(file){record.media_url=await uploadPresentationMedia(file,record);record.media_type=file.type.startsWith('video/')?'video':'image'}
    const editing=state.presentationEditing;if(editing?.id){record.slug=editing.slug||slugify(record.title)||`slide-${Date.now()}`;const {error}=await window.sb.from('presentation_slides').update(record).eq('id',editing.id);if(error)throw error}
    else{record.slug=await uniquePresentationSlug(state.presentationPlaylistId,record.title);record.created_at=new Date().toISOString();const {error}=await window.sb.from('presentation_slides').insert(record);if(error)throw error}
    toast('Prezentatsiya slaydi saqlandi');state.presentationEditing=null;await refreshAll();const saved=currentPresentationSlides().find(x=>x.slug===record.slug);if(saved){state.presentationEditing=saved;fillPresentationForm(saved);renderPresentationSlideList()}
  }catch(err){toast(err.message||'Slaydni saqlashda xato','bad')}finally{if(submit)submit.disabled=false}
}
async function uniquePresentationSlug(playlistId,title){const base=slugify(title)||'slide';for(let i=0;i<30;i++){const slug=i?`${base}-${i+1}`:base;const {data,error}=await window.sb.from('presentation_slides').select('id').eq('playlist_id',playlistId).eq('slug',slug).limit(1);if(error)throw error;if(!data?.length)return slug}return `${base}-${Date.now().toString(36)}`}
async function deletePresentationSlide(){if(!state.presentationEditing?.id||!confirm('Slayd o‘chirilsinmi?'))return;const {error}=await window.sb.from('presentation_slides').delete().eq('id',state.presentationEditing.id);if(error)return toast(error.message,'bad');state.presentationEditing=null;toast('Slayd o‘chirildi');await refreshAll()}
async function duplicatePresentationSlide(){if(!state.presentationEditing?.id)return;const src=state.presentationEditing,{id,created_at,updated_at,...record}=src;record.slug=await uniquePresentationSlug(src.playlist_id,`${src.title||'Slayd'} copy`);record.title=`${src.title||'Slayd'} — nusxa`;record.sort_order=(Number(src.sort_order)||0)+5;const {error}=await window.sb.from('presentation_slides').insert(record);if(error)return toast(error.message,'bad');toast('Slayd nusxalandi');await refreshAll()}
async function reorderPresentationSlides(fromId,toId){if(!fromId||!toId||fromId===toId)return;const list=currentPresentationSlides(),from=list.findIndex(x=>String(x.id)===String(fromId)),to=list.findIndex(x=>String(x.id)===String(toId));if(from<0||to<0)return;const [moved]=list.splice(from,1);list.splice(to,0,moved);try{await Promise.all(list.map((x,i)=>window.sb.from('presentation_slides').update({sort_order:(i+1)*10,updated_at:new Date().toISOString()}).eq('id',x.id).then(r=>{if(r.error)throw r.error})));toast('Slayd tartibi saqlandi');await refreshAll()}catch(e){toast(e.message,'bad')}}
async function createPresentationPlaylist(){if(!state.presentationReady)return toast('Avval presentation_studio.sql ni ishga tushiring.','bad');const name=prompt('Playlist nomi:','Yangi tanishtiruv');if(!name)return;const slug=slugify(name)||`playlist-${Date.now()}`;const {data,error}=await window.sb.from('presentation_playlists').insert({name,slug,active:true,is_default:state.data.presentationPlaylists.length===0,autoplay:true,loop:true}).select().single();if(error)return toast(error.message,'bad');state.presentationPlaylistId=data.id;state.presentationEditing=null;toast('Playlist yaratildi');await refreshAll()}
async function setDefaultPresentationPlaylist(){const p=currentPlaylist();if(!p)return;try{await window.sb.from('presentation_playlists').update({is_default:false}).neq('id',p.id);const {error}=await window.sb.from('presentation_playlists').update({is_default:true,active:true,updated_at:new Date().toISOString()}).eq('id',p.id);if(error)throw error;toast('Default playlist o‘zgartirildi');await refreshAll()}catch(e){toast(e.message,'bad')}}
function previewPresentationPublic(){const p=currentPlaylist();if(!p)return;window.open(`/uz?presentation=${encodeURIComponent(p.slug)}&present=1`,'_blank','noopener')}
function selectedPresentationEntity(){const type=$('#presEntityType')?.value,id=$('#presEntityId')?.value;if(!id)return null;if(type==='mahalla')return state.data.mahallas.find(x=>String(x.id)===String(id));if(type==='organization')return state.data.organizations.find(x=>String(x.id)===String(id));if(type==='economic-zone')return state.data.economicZones.find(x=>String(x.id)===String(id));return null}
function usePresentationEntityCoords(){const e=selectedPresentationEntity();if(!e)return toast('Koordinatali obyekt tanlang.','bad');const lat=e.latitude??e.lat,lng=e.longitude??e.lng;if(lat==null||lng==null)return toast('Tanlangan obyektda koordinata yo‘q.','bad');setVal('presCenterLat',lat);setVal('presCenterLng',lng);updatePresentationAdminPreview()}
function previewTemplate(text){const d=state.data.district||{},entity=selectedPresentationEntity(),ctx={district:{...d,areaKm2:d.area_km2},entity,counts:{mahallas:state.data.mahallas.length,organizations:state.data.organizations.length,economicZones:state.data.economicZones.length}};return String(text||'').replace(/\{\{\s*([\w.]+)\s*\}\}/g,(_,path)=>{const v=path.split('.').reduce((o,k)=>o?.[k],ctx);return v??'—'})}
function updatePresentationAdminPreview(){
  if($('#presentationForm')?.classList.contains('hidden'))return;const preview=$('#presentationAdminPreview');if(!preview)return;preview.style.setProperty('--preview-accent',$('#presAccent')?.value||'#7cefff');preview.dataset.layout=$('#presLayout')?.value||'hero';$('#presentationAdminPreviewEyebrow').textContent=previewTemplate($('#presEyebrow')?.value||'DIGITAL DISTRICT');$('#presentationAdminPreviewTitle').textContent=previewTemplate($('#presTitle')?.value||'Slayd');$('#presentationAdminPreviewBody').textContent=previewTemplate($('#presBody')?.value||'');
  const mt=$('#presMediaType')?.value,url=$('#presMediaUrl')?.value.trim(),media=$('#presentationAdminPreviewMedia');media.innerHTML='';media.classList.toggle('hidden',mt==='none'||!url);if(url&&mt==='image')media.innerHTML=`<img src="${esc(url)}" alt="">`;if(url&&mt==='video')media.innerHTML='<div class="preview-video-badge">VIDEO</div>';
  const stats=$$('.custom-stat-row').map(r=>({label:$('[data-stat-label]',r)?.value.trim(),value:$('[data-stat-value]',r)?.value.trim()})).filter(x=>x.label||x.value);$('#presentationAdminPreviewStats').innerHTML=stats.slice(0,4).map(x=>`<span><b>${esc(previewTemplate(x.value||'—'))}</b><small>${esc(previewTemplate(x.label||''))}</small></span>`).join('');
}
function setupPresentationStudioEvents(){
  $('#presentationPlaylistSelect')?.addEventListener('change',e=>{state.presentationPlaylistId=e.target.value||null;state.presentationEditing=null;renderPresentationStudio()});$('#presentationAddSlide')?.addEventListener('click',newPresentationSlide);$('#presentationNewPlaylist')?.addEventListener('click',createPresentationPlaylist);$('#presentationSetDefault')?.addEventListener('click',setDefaultPresentationPlaylist);$('#presentationPreviewPublic')?.addEventListener('click',previewPresentationPublic);$('#presentationForm')?.addEventListener('submit',savePresentationSlide);$('#presentationDelete')?.addEventListener('click',deletePresentationSlide);$('#presentationDuplicate')?.addEventListener('click',duplicatePresentationSlide);$('#presentationUseEntityCoords')?.addEventListener('click',usePresentationEntityCoords);
  $('#presEntityType')?.addEventListener('change',()=>{renderPresentationEntityOptions('');updatePresentationAdminPreview()});
  $$('.studio-tab').forEach(btn=>btn.addEventListener('click',()=>{$$('.studio-tab').forEach(x=>x.classList.toggle('active',x===btn));$$('.studio-tab-panel').forEach(p=>p.classList.toggle('hidden',p.dataset.studioPanel!==btn.dataset.studioTab))}));
  $('#presentationForm')?.addEventListener('input',updatePresentationAdminPreview);$('#presentationForm')?.addEventListener('change',updatePresentationAdminPreview);
}

$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();$('#loginError').classList.add('hidden');try{await login($('#adminEmail').value.trim(),$('#adminPassword').value)}catch(err){$('#loginError').textContent=err.message;$('#loginError').classList.remove('hidden')}});
$('#logoutBtn').onclick=async()=>{await window.sb.auth.signOut();location.reload()};
$$('.nav-item').forEach(x=>x.onclick=()=>{state.view=x.dataset.view;$('#tableSearch').value='';renderCurrent()});
$('#refreshBtn').onclick=()=>refreshAll().catch(e=>toast(e.message,'bad'));$('#addBtn').onclick=()=>state.view==='presentation'?newPresentationSlide():openEditor();$('#tableSearch').oninput=renderTable;$('#editorClose').onclick=closeEditor;$('#cancelBtn').onclick=closeEditor;$('#editorBackdrop').onclick=e=>{if(e.target===$('#editorBackdrop'))closeEditor()};$('#editorForm').onsubmit=saveEditor;$('#deleteBtn').onclick=deleteEditor;$('#districtForm').onsubmit=saveDistrict;
setupPresentationStudioEvents();
restoreSession().catch(console.error);
