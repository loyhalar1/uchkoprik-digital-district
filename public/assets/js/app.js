import { LANGUAGES, t, langMeta } from './i18n.js';

const ICONS = {
  search:'<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.7-3.7"></path>',
  presentation:'<rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path>',
  accessibility:'<circle cx="12" cy="4.5" r="2"></circle><path d="M5 8h14M12 7v6m0 0-4 8m4-8 4 8"></path>',
  chevronDown:'<path d="m7 10 5 5 5-5"></path>',
  x:'<path d="M6 6l12 12M18 6 6 18"></path>',
  chart:'<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"></path>',
  package:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path><path d="m4 7.5 8 4.5 8-4.5M12 12v9"></path>',
  landmark:'<path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 21h20M12 3l9 4H3l9-4Z"></path>',
  briefcase:'<rect x="3" y="7" width="18" height="12" rx="2"></rect><path d="M9 7V5h6v2m-12 5h18"></path>',
  sparkles:'<path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM5 14l1 2.8L9 18l-3 1-1 3-1-3-3-1 3-1.2L5 14Z"></path>',
  shield:'<path d="M12 3 20 6v5c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3Z"></path><path d="m9 12 2 2 4-4"></path>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  navigation:'<path d="m4 4 16 7-7 2-2 7-7-16Z"></path>',
  share:'<circle cx="18" cy="5" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="18" cy="19" r="2"></circle><path d="m8 11 8-5m-8 7 8 5"></path>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>',
  arrowUp:'<path d="m12 19 0-14m-6 6 6-6 6 6"></path>',
  compass:'<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"></path>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"></path><path d="M9 3v15m6-12v15"></path>',
  arrowRight:'<path d="M5 12h14m-5-5 5 5-5 5"></path>',
  arrowLeft:'<path d="M19 12H5m5-5-5 5 5 5"></path>',
  pause:'<path d="M9 5v14M15 5v14"></path>',
  play:'<path d="m8 5 11 7-11 7V5Z"></path>',
  school:'<path d="m3 10 9-5 9 5-9 5-9-5Z"></path><path d="M7 13v4c2.6 2 7.4 2 10 0v-4M21 10v6"></path>',
  health:'<path d="M12 21s-7-4.4-7-10.2C5 7.5 7.2 5 10 5c1.4 0 2.6.7 3 1.5C13.4 5.7 14.6 5 16 5c2.8 0 5 2.5 5 5.8C21 16.6 12 21 12 21Z"></path><path d="M8 12h8M12 8v8"></path>',
  service:'<path d="M4 7h16v12H4z"></path><path d="M8 7V4h8v3M8 12h8"></path>',
  home:'<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"></path>',
  marker:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
  globe:'<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path>',
  info:'<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path>',
  list:'<path d="M8 6h13M8 12h13M8 18h13"></path><circle cx="4" cy="6" r="1"></circle><circle cx="4" cy="12" r="1"></circle><circle cx="4" cy="18" r="1"></circle>',
  speaker:'<path d="M5 9v6h4l5 4V5L9 9H5Z"></path><path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10"></path>',
  volumeOff:'<path d="M5 9v6h4l5 4V5L9 9H5Z"></path><path d="m18 10 4 4m0-4-4 4"></path>'
};

const iconForCategory={mahalla:'home',business:'briefcase',education:'school',health:'health',culture:'landmark',service:'service',investment:'chart',government:'landmark'};
const SPEC_COLORS={'Dehqonchilik':'#39e676','Chorvachilik':'#ffad2f','Kichik ishlab chiqarish':'#6b79ff','Bog‘dorchilik':'#21c7e8','Hunarmandchilik':'#ef59c7','Savdo va xizmat ko‘rsatish':'#a96bff'};
const FALLBACK_COLORS=['#39e676','#ffad2f','#6b79ff','#21c7e8','#ef59c7','#a96bff','#63e6ff','#ff7272'];

const state={
  lang:'uz', data:{mahallas:[],categories:[],places:[],businesses:[],products:[],economicZones:[],district:{},presentationSlides:[],presentationPlaylist:null},
  map:null, markers:[], selected:null, activeLayer:'all', selectedSpecialization:null, selectedOrganizationType:null,
  activePanel:'explore', detailCamera:null, passportCamera:null, connectorFrame:null, layerListOpen:false, layerListQuery:'', hoverPopup:null,
  presentation:{map:null,index:0,timer:null,playing:true,markers:[],markerKey:'',currentSlide:null,playlist:null},
  voice:{recorder:null,stream:null,chunks:[],recording:false,audio:null,objectUrl:null},
  aiVoiceEnabled:true,
  idle:{timer:null,timeout:10*60*1000,active:false,initialized:false,renderer:null,scene:null,camera:null,group:null,frame:null}
};

const MOTION_PREF_VERSION=2;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const normalize=v=>String(v||'').toLowerCase().replace(/[ʻ’'`]/g,'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');
const localeCode=()=>({uz:'uz-UZ',en:'en-US',ru:'ru-RU',zh:'zh-CN',ar:'ar-SA',tr:'tr-TR',ko:'ko-KR',de:'de-DE',fr:'fr-FR',es:'es-ES'}[state.lang]||'uz-UZ');
const fmt=v=>new Intl.NumberFormat(localeCode()).format(Number(v)||0);
const tr=k=>{try{return t(state.lang,k)}catch{return k}};
const safeDate=v=>{if(!v)return null;try{return new Date(v).toLocaleDateString(localeCode())}catch{return v}};
const toCoord=v=>v===null||v===undefined||v===''?null:(Number.isFinite(Number(v))?Number(v):null);
const validCoords=i=>i&&i.lng!==null&&i.lng!==undefined&&i.lng!==''&&i.lat!==null&&i.lat!==undefined&&i.lat!==''&&Number.isFinite(Number(i.lng))&&Number.isFinite(Number(i.lat))&&Math.abs(Number(i.lng))<=180&&Math.abs(Number(i.lat))<=90;
function svg(name){return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||ICONS.info}</svg>`}
function bindIcons(root=document){$$('[data-icon]',root).forEach(el=>el.innerHTML=svg(el.dataset.icon))}
function setText(sel,val){const el=$(sel);if(el)el.textContent=val??'—'}

/* =========================================================
   MOTION SYSTEM
========================================================= */

function motionDisabled(){return document.documentElement.classList.contains('reduce-motion')}
function easeOut(){return 'cubic-bezier(.16,1,.3,1)'}

function cancelMotion(el){
  if(!el?.getAnimations)return;
  el.getAnimations().forEach(a=>{try{a.cancel()}catch{}});
}

function showSmooth(target,options={}){
  const el=typeof target==='string'?$(target):target;
  if(!el)return Promise.resolve();
  cancelMotion(el);
  el.classList.remove('hidden');
  if(motionDisabled())return Promise.resolve();
  const duration=options.duration||360;
  const keyframes=options.keyframes||[
    {opacity:0,transform:'translate3d(0,12px,0) scale(.985)'},
    {opacity:1,transform:'translate3d(0,0,0) scale(1)'}
  ];
  const anim=el.animate(keyframes,{duration,easing:options.easing||easeOut(),fill:'both'});
  return anim.finished.catch(()=>{}).finally(()=>{try{anim.cancel()}catch{}});
}

function hideSmooth(target,options={}){
  const el=typeof target==='string'?$(target):target;
  if(!el||el.classList.contains('hidden'))return Promise.resolve();
  cancelMotion(el);
  if(motionDisabled()){el.classList.add('hidden');return Promise.resolve();}
  const duration=options.duration||250;
  const keyframes=options.keyframes||[
    {opacity:1,transform:'translate3d(0,0,0) scale(1)'},
    {opacity:0,transform:'translate3d(0,8px,0) scale(.99)'}
  ];
  const anim=el.animate(keyframes,{duration,easing:options.easing||'cubic-bezier(.4,0,.2,1)',fill:'both'});
  return anim.finished.catch(()=>{}).finally(()=>{el.classList.add('hidden');try{anim.cancel()}catch{}});
}

function animateChromeIn(){
  if(motionDisabled())return;
  const rows=[['.topbar',0,'translate3d(-50%,-12px,0)'],['#explorePanel',70,'translate3d(-14px,0,0)'],['.dock',120,'translate3d(-50%,16px,0)']];
  rows.forEach(([sel,delay,from])=>{
    const el=$(sel);if(!el)return;
    const to=sel==='.topbar'||sel==='.dock'?'translate3d(-50%,0,0)':'translate3d(0,0,0)';
    el.animate([{opacity:0,transform:from},{opacity:1,transform:to}],{duration:520,delay,easing:easeOut()});
  });
}

function liquidPress(el){
  if(!el||motionDisabled())return;
  el.animate([
    {scale:1},
    {scale:.94,offset:.42},
    {scale:1}
  ],{duration:260,easing:easeOut()});
}


/* =========================================================
   PERFORMANCE NOTE
   Heavy SVG displacement/refraction was intentionally removed.
   Public glass is now a static CSS blur surface.
========================================================= */

function detectLanguage(){const seg=location.pathname.split('/').filter(Boolean)[0];state.lang=LANGUAGES.some(l=>l.code===seg)?seg:(localStorage.getItem('uchkoprik-lang')||'uz')}
function applyLanguage(){const meta=langMeta(state.lang);document.documentElement.lang=meta.code;document.documentElement.dir=meta.dir;if($('#langShort'))$('#langShort').textContent=meta.short;$$('[data-i18n]').forEach(el=>{const v=tr(el.dataset.i18n);if(v&&v!==el.dataset.i18n)el.textContent=v});$$('[data-i18n-placeholder]').forEach(el=>el.placeholder=tr(el.dataset.i18nPlaceholder));$$('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',tr(el.dataset.i18nAria)));localStorage.setItem('uchkoprik-lang',state.lang);renderAllTextual()}
function setLanguage(code){if(!LANGUAGES.some(l=>l.code===code))return;state.lang=code;applyLanguage();renderLanguages();closeSheet('languageSheet')}

async function loadData(){
  if(!window.sb)throw new Error('Supabase client topilmadi. /assets/js/supabase.js ni tekshiring.');
  const [mRes,cRes,dRes,oRes,eRes]=await Promise.all([
    window.sb.from('mahallas').select('*').eq('status','active').order('legacy_id',{ascending:true}),
    window.sb.from('categories').select('*').eq('active',true).order('sort_order',{ascending:true}),
    window.sb.from('district').select('*').eq('slug','uchkoprik').single(),
    window.sb.from('organizations').select(`*,category:categories(id,slug,name,icon,color)`).eq('status','active'),
    window.sb.from('economic_zone_projects').select('*').eq('status','active').order('source_no',{ascending:true})
  ]);
  if(mRes.error)throw new Error(`MFY: ${mRes.error.message}`);
  if(cRes.error)throw new Error(`Kategoriyalar: ${cRes.error.message}`);
  if(dRes.error)throw new Error(`Tuman: ${dRes.error.message}`);
  if(oRes.error)console.warn('Tashkilotlar:',oRes.error.message);
  if(eRes.error)console.warn('Iqtisodiy zonalar:',eRes.error.message);

  const mahallas=(mRes.data||[]).map(m=>({id:m.legacy_id??m.id,uuid:m.id,legacyId:m.legacy_id,slug:m.slug,name:m.name||m.official_name||'Noma’lum MFY',officialName:m.official_name||m.name,head:m.chairman||null,phone:m.phone||null,specialization:m.specialization||'Belgilanmagan',population:Number(m.population||0),households:Number(m.households||0),families:Number(m.families||0),schools:Number(m.schools||0),kindergartens:Number(m.kindergartens||0),clinics:Number(m.clinics||0),mosques:Number(m.mosques||0),shops:Number(m.shops||0),lat:Number(m.latitude),lng:Number(m.longitude),imageUrl:m.image_url||null,verified:m.verified!==false,source:m.source||null,updatedAt:safeDate(m.updated_at),type:'mahalla',category:'mahalla',_raw:m}));
  let categories=(cRes.data||[]).map(c=>({id:c.slug==='mahallas'?'mahalla':c.slug,dbId:c.id,slug:c.slug,name:c.name,icon:c.icon||'marker',color:c.color||'#63e6ff',active:c.active!==false,sortOrder:Number(c.sort_order||0)}));
  const businesses=(oRes.data||[]).map(o=>({id:o.id,slug:o.slug,name:o.name,inn:o.inn||null,organizationType:o.organization_type||'Tashkilot',sector:o.sector||null,industry:o.activity||null,description:o.activity||o.sector||'',mahallaId:o.mahalla_id||null,address:o.address||null,lat:toCoord(o.latitude),lng:toCoord(o.longitude),website:o.website||null,imageUrl:o.image_url||null,phone:o.phone||null,responsiblePerson:o.responsible_person||null,verified:o.verified===true,source:o.source||null,updatedAt:safeDate(o.updated_at),type:'business',category:o.category?.slug||'business',categoryName:o.category?.name||'Tashkilot',categoryColor:o.category?.color||'#8b7cff',categoryIcon:o.category?.icon||'briefcase',_raw:o}));
  const businessByInn=new Map(businesses.filter(b=>b.inn).map(b=>[String(b.inn).replace(/\D/g,''),b]));
  const economicZones=(eRes.data||[]).map(z=>{
    const match=z.inn?businessByInn.get(String(z.inn).replace(/\D/g,'')):null;
    return {id:z.id,sourceNo:z.source_no,slug:z.slug,name:z.company_name||z.zone_name||'Iqtisodiy zona loyihasi',zoneName:z.zone_name||'Iqtisodiy zona',companyName:z.company_name||null,districtCity:z.district_city||null,inn:z.inn||null,occupiedAreaHa:z.occupied_area_ha===null||z.occupied_area_ha===undefined?null:Number(z.occupied_area_ha),activityType:z.activity_type||null,description:z.description||z.activity_type||null,founderCitizenship:z.founder_citizenship||null,executiveDirector:z.executive_director||null,phoneOriginal:z.phone_original||null,phoneDigits:z.phone_digits||null,sourceDate:safeDate(z.source_date),verified:z.verified===true,status:z.status||'active',sourceFile:z.source_file||null,imageUrl:z.image_url||match?.imageUrl||null,lat:toCoord(z.latitude)??match?.lat??null,lng:toCoord(z.longitude)??match?.lng??null,type:'economic-zone',category:'economic-zone',categoryName:'Iqtisodiy zonalar',categoryColor:'#5ed8ff',_raw:z};
  });
  if(!categories.some(c=>c.id==='mahalla'))categories.unshift({id:'mahalla',slug:'mahallas',name:'MFYlar',icon:'home',color:'#63e6ff',active:true,sortOrder:0});
  if(businesses.length&&!categories.some(c=>c.id==='business'))categories.push({id:'business',slug:'business',name:'Tashkilotlar',icon:'briefcase',color:'#8b7cff',active:true,sortOrder:90});
  if(economicZones.length&&!categories.some(c=>c.id==='economic-zone'))categories.push({id:'economic-zone',slug:'economic-zone',name:'Iqtisodiy zonalar',icon:'chart',color:'#5ed8ff',active:true,sortOrder:95});
  const pop=mahallas.reduce((s,x)=>s+x.population,0),hh=mahallas.reduce((s,x)=>s+x.households,0),fam=mahallas.reduce((s,x)=>s+x.families,0),d=dRes.data;
  const district={...d,mahallas:Number(d.mahalla_count)||mahallas.length,population:Number(d.population)||pop,households:hh,families:fam,areaKm2:Number(d.area_km2||0),governor:d.governor||null,founded:d.founded||null,industryVolume:d.industry_volume||null,agricultureVolume:d.agriculture_volume||null,servicesVolume:d.services_volume||null,unemploymentRate:Number(d.unemployment_rate||0),povertyRate:Number(d.poverty_rate||0),borderLengthKm:Number(d.border_length_km||0),healthcareCount:Number(d.healthcare_count||0),updatedAt:safeDate(d.updated_at)};
  state.data={mahallas,categories,businesses,places:[],products:[],economicZones,district,presentationSlides:[],presentationPlaylist:null};
  await loadPresentationData();
  console.log(`Supabase: ${mahallas.length} ta MFY yuklandi`);console.log(`Supabase: ${categories.length} ta kategoriya yuklandi`);console.log(`Supabase: ${businesses.length} ta tashkilot yuklandi`);console.log(`Supabase: ${economicZones.length} ta iqtisodiy zona loyihasi yuklandi`);console.log(`Supabase: ${state.data.presentationSlides.length} ta prezentatsiya slaydi yuklandi`);
}

const DEFAULT_MAP_PITCH=48,DEFAULT_MAP_BEARING=-8;
function getMapStyleUrl(){return document.documentElement.dataset.theme==='light'?'https://tiles.openfreemap.org/styles/positron':'https://tiles.openfreemap.org/styles/dark'}
function applyMapTheme(){if(!state.map)return;const camera=getCamera();state.map.setStyle(getMapStyleUrl());state.map.once('styledata',()=>{if(camera)restoreCamera(camera,0);renderMarkers()})}
function initMap(){
  const reduced=document.documentElement.classList.contains('reduce-motion');
  state.map=new maplibregl.Map({container:'map',style:getMapStyleUrl(),center:[71.045,40.54],zoom:10.2,pitch:DEFAULT_MAP_PITCH,bearing:DEFAULT_MAP_BEARING,attributionControl:true,cooperativeGestures:false,fadeDuration:120});
  state.map.addControl(new maplibregl.NavigationControl({showCompass:true,visualizePitch:true}),'top-right');
  state.map.on('load',()=>{renderMarkers();fitDistrict(false)});
  state.map.on('move',()=>{if(state.selected)scheduleConnectorUpdate()});
  state.map.on('zoom',()=>{if(state.selected)scheduleConnectorUpdate()});
  state.map.on('rotate',()=>{if(state.selected)scheduleConnectorUpdate()});
  state.map.on('pitch',()=>{if(state.selected)scheduleConnectorUpdate()});
  state.map.on('moveend',()=>{if(state.selected)updateConnector()});
  state.map.on('resize',()=>{if(state.selected)updateConnector()});
}
function getCamera(){if(!state.map)return null;const c=state.map.getCenter();return{center:[c.lng,c.lat],zoom:state.map.getZoom(),pitch:state.map.getPitch(),bearing:state.map.getBearing()}}
function restoreCamera(cam,duration=700){if(!state.map||!cam)return;state.map.stop();state.map.easeTo({...cam,duration:motionDisabled()?0:duration,essential:true})}
function districtBounds(){
  if(!state.data.mahallas.length)return null;
  const b=new maplibregl.LngLatBounds();
  state.data.mahallas.forEach(m=>{if(validCoords(m))b.extend([m.lng,m.lat])});
  return b;
}
function fitDistrict(animate=true){
  if(!state.map)return;const b=districtBounds();if(!b)return;
  const passport=document.body.classList.contains('passport-mode');
  state.map.stop();state.map.fitBounds(b,{padding:passport?38:{top:92,bottom:84,left:72,right:72},duration:animate&&!motionDisabled()?760:0,maxZoom:passport?11.1:11.4,pitch:passport?38:DEFAULT_MAP_PITCH,bearing:passport?0:DEFAULT_MAP_BEARING,essential:true});
}
function flyToItem(item){
  if(!state.map||!validCoords(item))return;
  state.map.stop();state.map.flyTo({center:[Number(item.lng),Number(item.lat)],zoom:13.25,pitch:54,bearing:DEFAULT_MAP_BEARING,duration:motionDisabled()?0:900,curve:1.42,speed:.85,essential:true});
}

function getCategory(id){return state.data.categories.find(c=>c.id===id||c.slug===id)}
function getCategoryColor(id){return getCategory(id)?.color||'#63e6ff'}
function getCategoryIcon(id){const c=getCategory(id);if(c?.icon&&ICONS[c.icon])return c.icon;return iconForCategory[id]||'marker'}
function categoryLabel(c){if(!c)return'';if(c.id==='economic-zone')return'Iqtisodiy zonalar';const keys={mahalla:'mahallas',business:'businesses',education:'education',health:'health',culture:'culture',service:'services',investment:'investment'};if(keys[c.id]){const v=tr(keys[c.id]);if(v!==keys[c.id])return v}return c.name||c.slug||c.id}

function getSpecializationColor(name){if(SPEC_COLORS[name])return SPEC_COLORS[name];const unique=[...new Set(state.data.mahallas.map(m=>m.specialization).filter(Boolean))];return FALLBACK_COLORS[Math.max(0,unique.indexOf(name))%FALLBACK_COLORS.length]}
function getSpecializationStats(){const m=new Map();state.data.mahallas.forEach(x=>m.set(x.specialization||'Belgilanmagan',(m.get(x.specialization||'Belgilanmagan')||0)+1));return[...m.entries()].map(([name,count])=>({name,count,color:getSpecializationColor(name)})).sort((a,b)=>b.count-a.count)}
function getOrganizationTypes(){const m=new Map();state.data.businesses.forEach(x=>{const n=x.organizationType||x.categoryName||'Tashkilot';m.set(n,(m.get(n)||0)+1)});return[...m.entries()].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count)}

function renderCategories(){
  const host=$('#categoryChips');if(!host)return;
  const rows=[{id:'all',name:'Barchasi',color:'#ffffff',icon:'map'},...state.data.categories.filter(c=>c.active!==false)];
  host.innerHTML=rows.map(c=>`<button class="category-chip ${state.activeLayer===c.id?'active':''}" type="button" data-category="${esc(c.id)}" style="--chip:${c.color||'#63e6ff'}"><span class="dot" style="color:${c.color||'#63e6ff'};background:${c.color||'#63e6ff'}"></span><span>${esc(c.id==='all'?'Barchasi':categoryLabel(c))}</span></button>`).join('');
  $$('.category-chip',host).forEach(btn=>btn.addEventListener('click',()=>{
    state.activeLayer=btn.dataset.category;
    state.selectedSpecialization=null;
    state.selectedOrganizationType=null;
    state.layerListQuery='';
    renderCategories();
    renderMarkers();
  }));
  renderSpecializationFilters();renderOrganizationFilters();renderEconomicZoneFilters();renderLayerList();
}
function renderSpecializationFilters(){const section=$('#specializationFilters'),host=$('#specializationList');if(!section||!host)return;if(state.activeLayer!=='mahalla'){section.classList.add('hidden');return}const items=getSpecializationStats();section.classList.remove('hidden');host.innerHTML=items.map(i=>`<button class="filter-specialization ${state.selectedSpecialization===i.name?'active':''}" type="button" data-specialization="${esc(i.name)}" style="--spec-color:${i.color}"><span class="color"></span><span class="name">${esc(i.name)}</span><span class="count">${i.count}</span></button>`).join('');$$('[data-specialization]',host).forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.specialization;state.selectedSpecialization=state.selectedSpecialization===v?null:v;renderSpecializationFilters();applyMarkerFilters();renderLayerList()}))}
function renderOrganizationFilters(){const section=$('#organizationFilters'),host=$('#organizationFilterList');if(!section||!host)return;const isOrg=state.activeLayer==='business'||(state.activeLayer!=='all'&&state.activeLayer!=='mahalla'&&state.data.businesses.some(b=>b.category===state.activeLayer));if(!isOrg||!state.data.businesses.length){section.classList.add('hidden');return}section.classList.remove('hidden');const items=getOrganizationTypes();host.innerHTML=items.map(i=>`<button class="filter-specialization ${state.selectedOrganizationType===i.name?'active':''}" type="button" data-organization-type="${esc(i.name)}" style="--spec-color:#8b7cff"><span class="color"></span><span class="name">${esc(i.name)}</span><span class="count">${i.count}</span></button>`).join('');$$('[data-organization-type]',host).forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.organizationType;state.selectedOrganizationType=state.selectedOrganizationType===v?null:v;renderOrganizationFilters();applyMarkerFilters();renderLayerList()}))}

function renderEconomicZoneFilters(){
  const section=$('#economicZoneFilters'),host=$('#economicZoneList'),count=$('#economicZoneCount');
  if(!section||!host)return;
  if(state.activeLayer!=='economic-zone'){section.classList.add('hidden');return}
  const zones=state.data.economicZones||[];
  section.classList.remove('hidden');
  if(count)count.textContent=fmt(zones.length);
  host.innerHTML=zones.slice(0,10).map(z=>`<button class="economic-zone-item" type="button" data-economic-zone="${esc(z.id)}"><strong>${esc(z.companyName||z.name)}</strong><small>${esc([z.zoneName,z.districtCity].filter(Boolean).join(' · '))}</small></button>`).join('')+(zones.length>10?`<div class="economic-zone-more">+ ${fmt(zones.length-10)} ta loyiha qidiruv orqali mavjud</div>`:'');
  $$('[data-economic-zone]',host).forEach(btn=>btn.addEventListener('click',()=>{const item=zones.find(z=>String(z.id)===btn.dataset.economicZone);if(item)openDetail(item,'economic-zone')}));
}

function activeLayerList(){
  if(state.activeLayer==='mahalla'){
    const items=state.selectedSpecialization?state.data.mahallas.filter(x=>x.specialization===state.selectedSpecialization):state.data.mahallas;
    return {title:'MFYlar',kind:'mahalla',items};
  }
  if(state.activeLayer==='economic-zone')return {title:'Iqtisodiy zonalar',kind:'economic-zone',items:state.data.economicZones};
  if(state.activeLayer==='business'){
    const items=state.selectedOrganizationType?state.data.businesses.filter(x=>x.organizationType===state.selectedOrganizationType):state.data.businesses;
    return {title:'Tashkilotlar',kind:'business',items};
  }
  if(state.activeLayer==='all')return {title:'Barcha qatlamlar',kind:'all',items:[]};
  let orgs=state.data.businesses.filter(x=>x.category===state.activeLayer);
  if(state.selectedOrganizationType)orgs=orgs.filter(x=>x.organizationType===state.selectedOrganizationType);
  if(orgs.length)return {title:categoryLabel(getCategory(state.activeLayer))||'Tashkilotlar',kind:'business',items:orgs};
  return {title:'Ro‘yxat',kind:'all',items:[]};
}
function renderLayerList(){
  const host=$('#layerListItems'),title=$('#layerListTitle'),count=$('#layerListCount'),search=$('#layerListSearch'),toggleLabel=$('#layerListToggleLabel');
  if(!host)return;
  const data=activeLayerList();
  if(title)title.textContent=data.title;
  if(toggleLabel)toggleLabel.textContent=state.activeLayer==='all'?'Ro‘yxat':`${data.title} ro‘yxati`;
  if(search&&search.value!==state.layerListQuery)search.value=state.layerListQuery;
  let items=[...data.items];
  const q=normalize(state.layerListQuery).trim();
  if(q)items=items.filter(i=>normalize([i.name,i.officialName,i.specialization,i.organizationType,i.sector,i.address,i.zoneName,i.districtCity,i.inn,i.activityType,i.responsiblePerson,i.executiveDirector].filter(Boolean).join(' ')).includes(q));
  if(count)count.textContent=fmt(items.length);
  if(data.kind==='all'){
    host.innerHTML=`<div class="layer-list-empty"><strong>Qatlamni tanlang</strong><span>MFYlar, Tashkilotlar yoki Iqtisodiy zonalarni tanlasangiz shu yerda to‘liq ro‘yxat ochiladi.</span></div>`;
    return;
  }
  if(!items.length){host.innerHTML='<div class="layer-list-empty">Natija topilmadi.</div>';return}
  const visible=items.slice(0,180);
  host.innerHTML=visible.map((item,index)=>{
    const kind=data.kind;
    const subtitle=kind==='mahalla'?item.specialization:kind==='business'?(item.organizationType||item.sector||item.address):([item.zoneName,item.districtCity].filter(Boolean).join(' · '));
    const coord=validCoords(item);
    return `<button class="layer-list-item ${coord?'':'no-location'}" type="button" data-layer-list-index="${index}">
      <span class="layer-list-pin" style="--item-color:${kind==='mahalla'?getSpecializationColor(item.specialization):kind==='economic-zone'?'#5ed8ff':(item.categoryColor||'#8b7cff')}"></span>
      <span class="layer-list-copy"><strong>${esc(item.name||item.companyName||'—')}</strong><small>${esc(subtitle||'')}</small></span>
      <span class="layer-list-location">${coord?'Xarita':'Joylashuv yo‘q'}</span>
    </button>`;
  }).join('')+(items.length>visible.length?`<div class="layer-list-more">${fmt(items.length-visible.length)} ta yozuv. Qidiruv orqali aniq yozuvni toping.</div>`:'');
  $$('[data-layer-list-index]',host).forEach(btn=>btn.addEventListener('click',()=>{
    const item=visible[Number(btn.dataset.layerListIndex)];
    if(!item)return;
    closeLayerList();
    setTimeout(()=>openDetail(item,data.kind),120);
  }));
}
function openLayerList(){
  state.layerListOpen=true;
  document.body.classList.add('layer-list-open');
  $('#layerListToggle')?.setAttribute('aria-expanded','true');
  renderLayerList();
  setTimeout(()=>$('#layerListSearch')?.focus(),180);
}
function closeLayerList(){
  state.layerListOpen=false;
  document.body.classList.remove('layer-list-open');
  $('#layerListToggle')?.setAttribute('aria-expanded','false');
}
function toggleLayerList(){state.layerListOpen?closeLayerList():openLayerList()}

function clearMarkers(){hideMarkerHover();state.markers.forEach(x=>x.marker.remove());state.markers=[]}
function hideMarkerHover(){state.hoverPopup?.remove();state.hoverPopup=null}
function showMarkerHover(item,kind,color){
  if(!state.map||!validCoords(item))return;
  hideMarkerHover();
  const type=kind==='mahalla'?'MFY':kind==='economic-zone'?'Iqtisodiy zona':kind==='business'?'Tashkilot':'Joy';
  state.hoverPopup=new maplibregl.Popup({closeButton:false,closeOnClick:false,offset:[0,-30],className:'marker-name-popup'})
    .setLngLat([Number(item.lng),Number(item.lat)])
    .setHTML(`<div class="marker-popup-card" style="--marker:${color}"><span>${esc(type)}</span><strong>${esc(item.name||item.companyName||'—')}</strong></div>`)
    .addTo(state.map);
}
function markerElement(item,kind,color){
  const el=document.createElement('button');
  el.type='button';
  el.className=`map-data-marker ${kind==='mahalla'?'mfy-marker':'place-marker'} marker-${kind}`;
  el.setAttribute('aria-label',item.name||'');
  el.innerHTML=`<span class="map-pin-3d" style="--marker:${color}"><span class="map-pin-face"><span class="map-pin-core"></span><span class="map-pin-glint"></span></span><span class="map-pin-foot"></span></span>`;
  el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();hideMarkerHover();openDetail(item,kind)});
  el.addEventListener('mouseenter',()=>showMarkerHover(item,kind,color));
  el.addEventListener('mouseleave',hideMarkerHover);
  return el;
}
function addMarker(item,kind,color){
  if(!validCoords(item))return;
  const el=markerElement(item,kind,color);
  const marker=new maplibregl.Marker({element:el,anchor:'bottom',pitchAlignment:'map',rotationAlignment:'map'}).setLngLat([Number(item.lng),Number(item.lat)]).addTo(state.map);
  state.markers.push({item,kind,marker,el});
}
function renderMarkers(){if(!state.map)return;clearMarkers();const layer=state.activeLayer;if(layer==='all'||layer==='mahalla')state.data.mahallas.forEach(m=>addMarker(m,'mahalla',getSpecializationColor(m.specialization)));state.data.places.forEach(p=>{if(layer==='all'||layer===p.category)addMarker(p,'place',getCategoryColor(p.category))});state.data.businesses.forEach(b=>{if(layer==='all'||layer==='business'||layer===b.category)addMarker(b,'business',b.categoryColor||getCategoryColor(b.category))});state.data.economicZones.forEach(z=>{if(layer==='all'||layer==='economic-zone')addMarker(z,'economic-zone','#5ed8ff')});applyMarkerFilters()}
function applyMarkerFilters(){state.markers.forEach(m=>{let dim=false;if(m.kind==='mahalla'&&state.selectedSpecialization)dim=m.item.specialization!==state.selectedSpecialization;if(m.kind==='business'&&state.selectedOrganizationType)dim=m.item.organizationType!==state.selectedOrganizationType;m.el.classList.toggle('is-dim',dim)})}

function renderDistrictMetrics(){
  const d=state.data.district,host=$('#districtMetrics');
  if(host){
    const vals=[[d.population,'Umumiy aholi'],[d.households,'Umumiy xonadon'],[d.families,'Umumiy oila'],[d.mahallas,'MFY soni'],[state.data.businesses.length,'Tashkilotlar'],[state.data.economicZones.length,'Iqtisodiy zona loyihalari']];
    host.innerHTML=vals.map(([v,l])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>Tasdiqlangan</small></div>`).join('');
  }
  setText('#districtUpdated',d.updatedAt||'—');renderPassportAnalytics();renderInvestorMetrics();
}
function renderInvestorMetrics(){const host=$('#investorMetrics');if(!host)return;const d=state.data.district;host.innerHTML=[[d.population,'Aholi'],[d.areaKm2,'km²'],[d.mahallas,'MFY'],[state.data.businesses.length,'Tashkilot'],[state.data.economicZones.length,'EIZ loyihalari']].map(([v,l])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>Tasdiqlangan</small></div>`).join('')}
function renderPassportAnalytics(){
  const d=state.data.district;
  const mapReadyOrganizations=state.data.businesses.filter(validCoords).length;
  const mapReadyEconomicZones=state.data.economicZones.filter(validCoords).length;
  setText('#passportIndustry',d.industryVolume||'—');setText('#passportAgriculture',d.agricultureVolume||'—');setText('#passportServices',d.servicesVolume||'—');
  setText('#passportUnemployment',d.unemploymentRate?`${d.unemploymentRate} %`:'—');setText('#passportPoverty',d.povertyRate?`${d.povertyRate} %`:'—');setText('#passportHealthcare',d.healthcareCount?`${fmt(d.healthcareCount)} ta muassasa`:'—');
  setText('#passportFounded',d.founded||'—');setText('#passportGovernor',d.governor||'—');setText('#passportArea',d.areaKm2?`${fmt(d.areaKm2)} km²`:'—');setText('#passportBorder',d.borderLengthKm?`${d.borderLengthKm} km`:'—');
  setText('#passportOrganizations',`${fmt(state.data.businesses.length)} ta`);
  setText('#passportEconomicZones',`${fmt(state.data.economicZones.length)} ta`);
  setText('#passportMapReadyOrganizations',`${fmt(mapReadyOrganizations)} ta`);
  setText('#passportMapReadyEconomicZones',`${fmt(mapReadyEconomicZones)} ta`);
  setText('#passportDataPoints',`${fmt(state.data.mahallas.length+state.data.businesses.length+state.data.economicZones.length)} ta`);
  renderDistrictSpecializationStats();
}
function renderDistrictSpecializationStats(){const host=$('#districtSpecializationStats');if(!host)return;const stats=getSpecializationStats(),max=Math.max(1,...stats.map(x=>x.count));host.innerHTML=stats.map(x=>`<div class="passport-bar-row"><span class="label" title="${esc(x.name)}">${esc(x.name)}</span><span class="passport-bar"><i style="width:${x.count/max*100}%;--bar-color:${x.color}"></i></span><b>${x.count}</b></div>`).join('')}


async function openPassportMode(){
  closeDetail(false);
  await closeMajorPanels();
  if(!document.body.classList.contains('passport-mode'))state.passportCamera=getCamera();
  document.body.classList.add('passport-mode');
  state.activePanel='district';
  setDockActive(null);
  requestAnimationFrame(()=>state.map?.resize());
  await showSmooth('#districtPanel',{duration:390,keyframes:[{opacity:0,transform:'translate3d(24px,0,0)'},{opacity:1,transform:'translate3d(0,0,0)'}]});
  setTimeout(()=>{state.map?.resize();fitDistrict(true)},580);
}
async function closePassportMode(restore=true){
  if(!document.body.classList.contains('passport-mode'))return;
  await hideSmooth('#districtPanel',{duration:240,keyframes:[{opacity:1,transform:'translate3d(0,0,0)'},{opacity:0,transform:'translate3d(18px,0,0)'}]});
  document.body.classList.remove('passport-mode');
  state.activePanel='explore';
  requestAnimationFrame(()=>state.map?.resize());
  setTimeout(()=>{
    state.map?.resize();
    if(restore&&state.passportCamera)restoreCamera(state.passportCamera,760);
    else fitDistrict(true);
    state.passportCamera=null;
  },580);
}

function renderDetailHero(item,kind){
  const hero=$('#detailHero');if(!hero)return;
  const image=item?.imageUrl;
  hero.classList.toggle('has-image',!!image);
  hero.style.backgroundImage=image?`linear-gradient(180deg,rgba(4,7,10,.08),rgba(4,7,10,.72)),url("${String(image).replace(/"/g,'%22')}")`:'';
  hero.style.backgroundSize=image?'cover':'';
  hero.style.backgroundPosition=image?'center':'';
  const symbol=$('#detailSymbol');
  if(symbol)symbol.classList.toggle('on-image',!!image);
}
async function openDetail(item,kind){if(!item)return;if(document.body.classList.contains('passport-mode'))closePassportMode(false);await closeMajorPanels();if(!state.selected)state.detailCamera=getCamera();state.selected={item,kind};setText('#detailKicker',kind==='mahalla'?'Mahalla fuqarolar yig‘ini':kind==='business'?(item.categoryName||'Tashkilot'):kind==='economic-zone'?(item.zoneName||'Iqtisodiy zona loyihasi'):kind==='product'?'Mahsulot':categoryLabel(getCategory(item.category)));setText('#detailTitle',item.name||item.officialName||'—');setText('#detailDescription',kind==='mahalla'?(item.specialization?`Ixtisoslashuv: ${item.specialization}`:'Ma’lumot mavjud emas'):kind==='economic-zone'?(item.activityType||'Iqtisodiy zona loyihasi'):(item.description||item.address||'Ma’lumot mavjud emas'));
  const verify=$('#detailVerification');if(verify)verify.innerHTML=`<span class="badge ${item.verified?'verified':'demo'}"><span class="icon">${svg(item.verified?'shield':'info')}</span>${item.verified?'Tasdiqlangan':'Tasdiqlanmagan'}</span>${item.updatedAt?`<span class="badge">${esc(item.updatedAt)}</span>`:''}`;
  const stats=[];if(kind==='mahalla')stats.push([item.population,'Aholi'],[item.households,'Xonadon'],[item.families,'Oila']);if(kind==='business'){if(item.organizationType)stats.push([item.organizationType,'Tashkilot turi']);if(item.sector)stats.push([item.sector,'Sektor'])}if(kind==='economic-zone'){if(item.occupiedAreaHa!==null)stats.push([`${item.occupiedAreaHa} ha`,'Maydon']);if(item.inn)stats.push([item.inn,'INN']);if(item.districtCity)stats.push([item.districtCity,'Hudud'])}const sh=$('#detailStats');if(sh)sh.innerHTML=stats.map(([v,l])=>`<div class="detail-stat"><strong>${typeof v==='number'?fmt(v):esc(v)}</strong><span>${esc(l)}</span></div>`).join('');renderDetailExtra(item,kind);const icon=kind==='mahalla'?'home':kind==='business'?getCategoryIcon(item.category):kind==='economic-zone'?'chart':kind==='product'?'package':'marker';if($('#detailSymbol'))$('#detailSymbol').innerHTML=`<span class="icon">${svg(icon)}</span>`;renderDetailHero(item,kind);flyToItem(item);showSmooth('#detailCard',{duration:340,keyframes:[{opacity:0,transform:'translate3d(24px,0,0) scale(.985)'},{opacity:1,transform:'translate3d(0,0,0) scale(1)'}]});state.markers.forEach(m=>m.el.classList.toggle('is-active',String(m.item.id)===String(item.id)));setTimeout(showConnector,920)}
const DETAIL_LABELS={
  id:'ID',legacy_id:'Tartib ID',slug:'Slug',name:'Nomi',official_name:'Rasmiy nomi',chairman:'MFY raisi',phone:'Telefon',
  specialization:'Ixtisoslashuv',population:'Aholi',households:'Xonadon',families:'Oilalar',schools:'Maktablar',
  kindergartens:'Bog‘chalar',clinics:'Tibbiyot muassasalari',mosques:'Masjidlar',shops:'Savdo nuqtalari',
  latitude:'Latitude',longitude:'Longitude',image_url:'Rasm URL',source:'Manba',updated_at:'Yangilangan sana',
  verified:'Tasdiqlangan',status:'Holat',inn:'INN',organization_type:'Tashkilot turi',sector:'Sektor',activity:'Faoliyat',
  category_id:'Kategoriya ID',mahalla_id:'MFY ID',address:'Manzil',website:'Veb-sayt',responsible_person:'Rahbar / mas’ul',
  source_no:'Manbadagi №',district_city:'Hudud',street:'Ko‘cha',registration_date:'Ro‘yxatdan o‘tgan sana',
  registration_excel_serial:'REG_DATA serial',location_raw:'Lokatsiya manbasi',latitude_raw:'Latitude (asl)',
  longitude_raw:'Longitude (asl)',location_status_raw:'Lokatsiya holati',location_verified:'Lokatsiya tasdiqlangan',
  source_row_numbers:'Excel qatorlari',source_duplicate_count:'Takrorlar soni',zone_name:'Iqtisodiy zona',
  company_name:'Korxona',occupied_area_ha:'Egallagan maydon (ha)',activity_type:'Faoliyat turi',
  founder_citizenship:'Ta’sischi / fuqaroligi',executive_director:'Ijrochi direktor',phone_original:'Telefon (asl)',
  phone_digits:'Telefon raqamlari',source_date:'Manba sanasi',source_file:'Manba fayli',description:'Tavsif',
  created_at:'Yaratilgan sana'
};
const DETAIL_SKIP=new Set(['category','_raw']);
function detailValue(v){
  if(v===null||v===undefined||v==='')return null;
  if(typeof v==='boolean')return v?'Ha':'Yo‘q';
  if(typeof v==='object')return null;
  return String(v);
}
function detailRowsFromRaw(item){
  const raw=item?._raw||{};
  const rows=[];
  Object.entries(raw).forEach(([key,value])=>{
    if(DETAIL_SKIP.has(key)||key==='image_url')return;
    const shown=detailValue(value);if(shown===null)return;
    rows.push([DETAIL_LABELS[key]||key.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase()),shown,key]);
  });
  return rows;
}
function renderDetailExtra(item,kind){
  const host=$('#detailExtra');if(!host)return;
  const preferred=[];
  if(kind==='mahalla'){
    if(item.head)preferred.push(['MFY raisi',item.head]);
    if(item.phone)preferred.push(['Telefon',item.phone]);
    if(item.schools)preferred.push(['Maktablar',item.schools]);
    if(item.kindergartens)preferred.push(['Bog‘chalar',item.kindergartens]);
    if(item.clinics)preferred.push(['Tibbiyot',item.clinics]);
    if(item.mosques)preferred.push(['Masjidlar',item.mosques]);
    if(item.shops)preferred.push(['Savdo nuqtalari',item.shops]);
  }
  if(kind==='business'){
    if(item.responsiblePerson)preferred.push(['Rahbar / mas’ul',item.responsiblePerson]);
    if(item.phone)preferred.push(['Telefon',item.phone]);
    if(item.address)preferred.push(['Manzil',item.address]);
    if(item.website)preferred.push(['Veb-sayt',item.website]);
  }
  if(kind==='economic-zone'){
    if(item.zoneName)preferred.push(['Iqtisodiy zona',item.zoneName]);
    if(item.activityType)preferred.push(['Faoliyat turi',item.activityType]);
    if(item.founderCitizenship)preferred.push(['Ta’sischi / fuqaroligi',item.founderCitizenship]);
    if(item.executiveDirector)preferred.push(['Ijrochi direktor',item.executiveDirector]);
    if(item.phoneOriginal)preferred.push(['Telefon',item.phoneOriginal]);
  }
  const preferredKeys=new Set(preferred.map(([l])=>l));
  const rawRows=detailRowsFromRaw(item).filter(([label])=>!preferredKeys.has(label));
  const rowHtml=([...[...preferred].map(([l,v])=>[l,v]),...rawRows.map(([l,v])=>[l,v])]).map(([l,v])=>
    `<div class="passport-row detail-data-row"><span>${esc(l)}</span><strong>${esc(v)}</strong></div>`
  ).join('');
  host.innerHTML=rowHtml?`<div class="detail-extra-grid"><div class="detail-data-title">To‘liq ma’lumot</div>${rowHtml}</div>`:'';
}
function closeDetail(restore=true){const had=!!state.selected;hideSmooth('#detailCard',{duration:220,keyframes:[{opacity:1,transform:'translate3d(0,0,0) scale(1)'},{opacity:0,transform:'translate3d(22px,0,0) scale(.99)'}]});document.body.classList.remove('detail-focus');hideConnector();state.markers.forEach(m=>m.el.classList.remove('is-active'));state.selected=null;if(restore&&had&&state.detailCamera)restoreCamera(state.detailCamera,820);state.detailCamera=null}

function showConnector(){if(!state.selected||window.innerWidth<=760){hideConnector();return}$('#uxConnector')?.classList.remove('hidden');updateConnector()}
function hideConnector(){$('#uxConnector')?.classList.add('hidden');if(state.connectorFrame){cancelAnimationFrame(state.connectorFrame);state.connectorFrame=null}}
function scheduleConnectorUpdate(){if(!state.selected||state.connectorFrame)return;state.connectorFrame=requestAnimationFrame(()=>{state.connectorFrame=null;updateConnector()})}
function updateConnector(){
  if(!state.selected||!state.map||window.innerWidth<=760)return;
  const marker=state.markers.find(m=>String(m.item.id)===String(state.selected.item.id)),card=$('#detailCard'),s=$('#uxConnector');
  if(!marker||!card||!s||card.classList.contains('hidden'))return;
  const mr=marker.el.getBoundingClientRect(),cr=card.getBoundingClientRect(),w=innerWidth,h=innerHeight;
  s.setAttribute('viewBox',`0 0 ${w} ${h}`);
  const x1=mr.left+mr.width/2,y1=mr.top+mr.height/2,x2=cr.left,y2=cr.top+Math.min(cr.height*.38,170),d=Math.max(80,Math.abs(x2-x1)*.42);
  const c1x=x1+d,c1y=y1,c2x=x2-d*.62,c2y=y2,path=`M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
  $$('path',s).forEach(p=>p.setAttribute('d',path));
  const pulse=$('.connector-pulse',s);
  if(pulse){
    const t=.56,mt=1-t;
    const px=mt*mt*mt*x1+3*mt*mt*t*c1x+3*mt*t*t*c2x+t*t*t*x2;
    const py=mt*mt*mt*y1+3*mt*mt*t*c1y+3*mt*t*t*c2y+t*t*t*y2;
    pulse.setAttribute('cx',px.toFixed(1));pulse.setAttribute('cy',py.toFixed(1));
  }
}

async function openFilterPanel(){
  if(state.selected)closeDetail(false);
  await closeMajorPanels();document.body.classList.remove('filter-closed');$('#explorePanel')?.classList.remove('hidden');state.activePanel='explore';setDockActive('explore');
  if(!motionDisabled())$('#explorePanel')?.animate([{opacity:0,transform:'translate3d(-16px,0,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:320,easing:easeOut()});
}
function closeFilterPanel(){closeLayerList();document.body.classList.add('filter-closed');state.activePanel='map';setDockActive('map')}
function hideSearchSmooth(){return hideSmooth('#searchDialog',{duration:230,keyframes:[{opacity:1,transform:'translate3d(-50%,0,0) scale(1)'},{opacity:0,transform:'translate3d(-50%,-8px,0) scale(.99)'}]})}
async function closeMajorPanels(except=null){const jobs=[];['investorPanel','productsPanel'].forEach(id=>{if(id!==except)jobs.push(hideSmooth('#'+id,{duration:260}))});if(except!=='searchDialog')jobs.push(hideSearchSmooth());if(except!=='aiPanel')jobs.push(hideSmooth('#aiPanel',{duration:230}));await Promise.all(jobs)}
function setDockActive(name){$$('.dock-item').forEach(x=>x.classList.toggle('active',!!name&&x.dataset.nav===name))}
async function openPanel(name){if(name==='explore'){await openFilterPanel();return}closeDetail(false);if(document.body.classList.contains('passport-mode'))closePassportMode(false);await closeMajorPanels();document.body.classList.add('filter-closed');if(name==='invest')await showSmooth('#investorPanel',{duration:420});if(name==='products')await showSmooth('#productsPanel',{duration:420});state.activePanel=name;setDockActive(name)}
async function openInvestorMode(){await openPanel('invest');state.activeLayer='business';renderCategories();renderMarkers();state.map?.easeTo({pitch:56,bearing:-10,duration:motionDisabled()?0:750,essential:true})}
async function closeInvestorMode(){await hideSmooth('#investorPanel',{duration:280});await openFilterPanel();state.map?.easeTo({pitch:DEFAULT_MAP_PITCH,bearing:DEFAULT_MAP_BEARING,duration:motionDisabled()?0:600,essential:true})}

function allSearchItems(){return[...state.data.mahallas.map(x=>({...x,_kind:'mahalla',_type:'MFY'})),...state.data.businesses.map(x=>({...x,_kind:'business',_type:x.categoryName||'Tashkilot'})),...state.data.economicZones.map(x=>({...x,_kind:'economic-zone',_type:'Iqtisodiy zona'})),...state.data.places.map(x=>({...x,_kind:'place',_type:categoryLabel(getCategory(x.category))})),...state.data.products.map(x=>({...x,_kind:'product',_type:'Mahsulot'}))]}
function searchLocal(q){q=normalize(q).trim();const all=allSearchItems();if(!q)return all.slice(0,12);const terms=q.split(/\s+/);return all.map(item=>{const hay=normalize([item.name,item.officialName,item.specialization,item.description,item.industry,item.sector,item.address,item.categoryName,item.organizationType,item.zoneName,item.districtCity,item.inn,item.activityType,item.executiveDirector,item._type].filter(Boolean).join(' '));let score=hay.startsWith(q)?4:0;terms.forEach(t=>{if(hay.includes(t))score+=2});return{item,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,30).map(x=>x.item)}
function renderSearchResults(q=''){const host=$('#searchResults');if(!host)return;const rows=searchLocal(q);if(!rows.length){host.innerHTML='<div class="search-empty">Natija topilmadi</div>';return}host.innerHTML=rows.map(i=>`<button type="button" class="search-result" data-search-id="${esc(i.id)}" data-search-kind="${esc(i._kind)}"><span class="result-icon"><span class="icon">${svg(i._kind==='mahalla'?'home':i._kind==='business'?'briefcase':i._kind==='economic-zone'?'chart':'marker')}</span></span><span class="result-copy"><strong>${esc(i.name)}</strong><small>${esc(i.specialization||i.organizationType||i.address||i.description||'')}</small></span><span class="result-type">${esc(i._type)}</span></button>`).join('');$$('[data-search-id]',host).forEach(btn=>btn.addEventListener('click',()=>{const item=allSearchItems().find(x=>String(x.id)===btn.dataset.searchId&&x._kind===btn.dataset.searchKind);hideSearchSmooth();setTimeout(()=>openDetail(item,item._kind),140)}))}

function renderProducts(){const host=$('#productGrid');if(!host)return;if(!state.data.products.length){host.innerHTML='<div class="search-empty">Hozircha mahsulotlar kiritilmagan.</div>';return}host.innerHTML=state.data.products.map(p=>`<button class="product-card" type="button" data-product="${esc(p.id)}"><div class="product-visual"><span class="icon">${svg('package')}</span></div><div class="product-info"><small>${esc(p.category||'')}</small><strong>${esc(p.name)}</strong><p>${esc(p.description||'')}</p></div></button>`).join('')}
function renderLanguages(){const host=$('#languageGrid');if(!host)return;host.innerHTML=LANGUAGES.map(l=>`<button type="button" class="language-option ${l.code===state.lang?'active':''}" data-lang="${l.code}"><span class="language-code">${esc(l.short)}</span><span><strong>${esc(l.native)}</strong><small>${esc(l.name)}</small></span></button>`).join('');$$('.language-option',host).forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)))}

function renderAISuggestions(){
  const host=$('#aiSuggestions');if(!host)return;
  const suggestions={
    uz:['Farovon MFY haqida ayt','Tashkilotlar soni nechta?','Iqtisodiy zonalar haqida ayt','Eng ko‘p aholili MFY qaysi?'],
    en:['Tell me about Farovon mahalla','How many organizations are there?','Tell me about economic zones','Which mahalla has the largest population?'],
    ru:['Расскажи о махалле Farovon','Сколько организаций в районе?','Расскажи об экономических зонах','Какая махалля самая населённая?']
  };
  const list=suggestions[state.lang]||suggestions.en;
  host.innerHTML=list.map(text=>`<button type="button" class="ai-suggestion">${esc(text)}</button>`).join('');
  $$('.ai-suggestion',host).forEach(button=>button.addEventListener('click',()=>askAI(button.textContent)));
}
function ensureAIWelcome(){
  const host=$('#aiMessages');
  if(host&&!host.children.length)addMessage('assistant','Uchko‘prik tumani bo‘yicha MFYlar, tashkilotlar va iqtisodiy zonalardagi tasdiqlangan ma’lumotlardan foydalanib javob beraman.');
}
function addMessage(role,text,sources=[]){
  const host=$('#aiMessages');if(!host)return null;
  const el=document.createElement('div');el.className=`message ${role}`;
  const copy=document.createElement('div');copy.className='message-copy';copy.textContent=text;el.appendChild(copy);
  if(role==='assistant'&&text&&text!=='—'){
    const speak=document.createElement('button');speak.type='button';speak.className='message-speak';speak.title='Ovozda eshitish';speak.innerHTML=svg('speaker');
    speak.addEventListener('click',()=>speakAI(text,true));el.appendChild(speak);
  }
  if(sources.length){
    const row=document.createElement('div');row.className='source-row';
    sources.forEach(source=>{const badge=document.createElement('span');badge.className='badge verified';badge.textContent=source;row.appendChild(badge)});
    el.appendChild(row);
  }
  host.appendChild(el);host.scrollTop=host.scrollHeight;return el;
}
function localAI(question){
  const q=normalize(question),d=state.data.district,m=state.data.mahallas;
  if(/nechta.*(mfy|mahalla)|how many.*mahalla/.test(q))return{text:`Uchko‘prik tumanida ${fmt(d.mahallas)} ta MFY mavjud.`,sources:['Supabase · MFYlar']};
  if(/nechta.*(tashkilot|korxona)|how many.*org/.test(q))return{text:`Bazadagi faol tashkilotlar soni ${fmt(state.data.businesses.length)} ta.`,sources:['Supabase · Tashkilotlar']};
  if(/iqtisodiy zona|eiz|economic zone/.test(q)&&/nechta|soni|how many/.test(q))return{text:`Bazadagi iqtisodiy zona loyihalari soni ${fmt(state.data.economicZones.length)} ta.`,sources:['Supabase · Iqtisodiy zonalar']};
  if(/eng.*kop.*aholi|largest.*population|most populous/.test(q)){
    const top=[...m].sort((a,b)=>b.population-a.population)[0];
    return top?{text:`${top.name} — ${fmt(top.population)} nafar.`,sources:['Supabase · MFYlar'],focus:top}:{text:'Bu ma’lumot hozircha tasdiqlangan bazada mavjud emas.',sources:['Supabase']};
  }
  const spec=getSpecializationStats().find(x=>q.includes(normalize(x.name)));
  if(spec)return{text:`${spec.name} bo‘yicha ${spec.count} ta MFY topildi.`,action:'specialization',specialization:spec.name,sources:['Supabase · MFYlar']};
  const hit=searchLocal(question)[0];if(hit)return{text:`${hit.name} topildi.`,focus:hit,sources:['Supabase']};
  return{text:'Bu ma’lumot hozircha tasdiqlangan bazada mavjud emas.',sources:['Supabase']};
}
function stripForSpeech(text){return String(text||'').replace(/[*_#`>\[\]{}]/g,' ').replace(/\s+/g,' ').trim()}
function blobToBase64(blob){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onloadend=()=>{const value=String(reader.result||'');resolve(value.includes(',')?value.split(',')[1]:value)};
    reader.onerror=reject;reader.readAsDataURL(blob);
  });
}
function base64ToBlob(base64,mimeType='audio/wav'){
  const binary=atob(base64),bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new Blob([bytes],{type:mimeType});
}
function stopAIAudio(){
  const audio=state.voice.audio;
  if(audio){try{audio.pause();audio.currentTime=0}catch{}}
  state.voice.audio=null;
  if(state.voice.objectUrl){try{URL.revokeObjectURL(state.voice.objectUrl)}catch{}state.voice.objectUrl=null;}
}
function updateAIVoiceButton(){
  const button=$('#aiVoiceToggle');if(!button)return;
  button.classList.toggle('active',state.aiVoiceEnabled);
  button.setAttribute('aria-pressed',state.aiVoiceEnabled?'true':'false');
  button.innerHTML=`<span class="icon">${svg(state.aiVoiceEnabled?'speaker':'volumeOff')}</span>`;
  button.title=state.aiVoiceEnabled?'Ovozli javob yoqilgan':'Ovozli javob o‘chirilgan';
}
async function speakAI(text,force=false){
  if(!state.aiVoiceEnabled&&!force)return;
  const clean=stripForSpeech(text);if(!clean)return;
  stopAIAudio();
  try{
    const response=await fetch('/api/aiSpeech',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:clean,lang:state.lang})});
    const json=await response.json().catch(()=>null);
    if(!response.ok||!json?.ok||!json?.audio)throw new Error(json?.error||`TTS HTTP ${response.status}`);
    const blob=base64ToBlob(json.audio,json.mimeType||'audio/wav');
    const objectUrl=URL.createObjectURL(blob),audio=new Audio(objectUrl);
    state.voice.audio=audio;state.voice.objectUrl=objectUrl;
    const cleanup=()=>{if(state.voice.audio===audio)state.voice.audio=null;if(state.voice.objectUrl===objectUrl){URL.revokeObjectURL(objectUrl);state.voice.objectUrl=null;}};
    audio.onended=cleanup;audio.onerror=cleanup;
    await audio.play();
  }catch(error){console.warn('Gemini TTS:',error)}
}
function toggleAIVoice(){
  state.aiVoiceEnabled=!state.aiVoiceEnabled;
  localStorage.setItem('uchkoprik-ai-voice',state.aiVoiceEnabled?'1':'0');
  if(!state.aiVoiceEnabled)stopAIAudio();
  updateAIVoiceButton();
}
async function askAI(question){
  question=String(question||'').trim();if(!question)return;
  await openAI();addMessage('user',question);if($('#aiInput'))$('#aiInput').value='';
  const loadingMessage=addMessage('system','Uchko‘prik AI tasdiqlangan ma’lumotlarni tahlil qilmoqda…');
  let answer=null;
  try{
    const response=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:question,lang:state.lang})});
    const json=await response.json().catch(()=>null);
    if(response.ok&&json?.ok)answer=json;else console.warn('Uchko‘prik AI:',json?.error||response.status);
  }catch(error){console.warn('Uchko‘prik AI:',error)}
  loadingMessage?.remove();
  if(!answer)answer=localAI(question);
  addMessage('assistant',answer.text||'—',answer.sources||[]);
  if(answer.text&&state.aiVoiceEnabled)speakAI(answer.text);
  if(answer.action==='specialization'){
    state.activeLayer='mahalla';state.selectedSpecialization=answer.specialization;renderCategories();renderMarkers();openFilterPanel();
  }
  if(answer.action==='invest')openInvestorMode();
  if(answer.focus)setTimeout(()=>openDetail(answer.focus,answer.focus._kind||answer.focus.type||'mahalla'),220);
}
async function openAI(){
  if(state.selected)closeDetail(false);
  if(document.body.classList.contains('passport-mode'))closePassportMode(false);
  await closeMajorPanels('aiPanel');
  await showSmooth('#aiPanel',{duration:320,keyframes:[{opacity:0,transform:'translate3d(14px,12px,0) scale(.99)'},{opacity:1,transform:'translate3d(0,0,0) scale(1)'}]});
  ensureAIWelcome();updateAIVoiceButton();setDockActive('ai');
}
function preferredAudioMimeType(){
  const types=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];
  for(const type of types){if(window.MediaRecorder&&MediaRecorder.isTypeSupported?.(type))return type;}
  return '';
}
function setVoiceRecordingUI(recording){
  const button=$('#voiceBtn');if(!button)return;
  button.classList.toggle('listening',recording);button.classList.toggle('recording',recording);
  button.setAttribute('aria-pressed',recording?'true':'false');button.title=recording?'Yozishni tugatish':'Ovozli savol';
}
function releaseVoiceStream(){
  if(state.voice.stream)state.voice.stream.getTracks().forEach(track=>{try{track.stop()}catch{}});
  state.voice.stream=null;
}
async function transcribeVoiceBlob(blob){
  if(!blob||!blob.size)throw new Error('Audio yozilmadi');
  const base64=await blobToBase64(blob);
  const response=await fetch('/api/aiTranscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({audio:base64,mimeType:blob.type||'audio/webm',lang:state.lang})});
  const json=await response.json().catch(()=>null);
  if(!response.ok||!json?.ok)throw new Error(json?.error||'Ovoz aniqlanmadi');
  return String(json.text||'').trim();
}
async function processVoiceRecording(blob){
  const button=$('#voiceBtn');
  try{
    button?.classList.add('processing');
    const text=await transcribeVoiceBlob(blob);
    if(!text)throw new Error('Gap aniqlanmadi');
    if($('#aiInput'))$('#aiInput').value=text;
    await askAI(text);
  }catch(error){console.warn('Voice:',error);toast('Ovozli savol',error.message||'Ovozni aniqlab bo‘lmadi')}
  finally{button?.classList.remove('processing')}
}
async function beginVoiceRecording(){
  if(!navigator.mediaDevices?.getUserMedia){toast('Mikrofon','Brauzer mikrofonni qo‘llab-quvvatlamaydi');return;}
  if(!window.MediaRecorder){toast('Mikrofon','Bu brauzer audio yozishni qo‘llab-quvvatlamaydi');return;}
  try{
    stopAIAudio();
    const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}});
    state.voice.stream=stream;state.voice.chunks=[];
    const preferred=preferredAudioMimeType();
    const recorder=preferred?new MediaRecorder(stream,{mimeType:preferred,audioBitsPerSecond:64000}):new MediaRecorder(stream);
    state.voice.recorder=recorder;state.voice.recording=true;
    recorder.ondataavailable=event=>{if(event.data&&event.data.size>0)state.voice.chunks.push(event.data)};
    recorder.onerror=event=>{console.warn('MediaRecorder:',event.error);state.voice.recording=false;setVoiceRecordingUI(false);releaseVoiceStream();};
    recorder.onstop=async()=>{
      const mimeType=recorder.mimeType||state.voice.chunks[0]?.type||preferred||'audio/webm';
      const blob=new Blob(state.voice.chunks,{type:mimeType});
      state.voice.chunks=[];state.voice.recording=false;state.voice.recorder=null;setVoiceRecordingUI(false);releaseVoiceStream();
      await processVoiceRecording(blob);
    };
    recorder.start(250);setVoiceRecordingUI(true);
    setTimeout(()=>{if(state.voice.recording&&state.voice.recorder===recorder)stopVoiceRecording();},30000);
  }catch(error){
    console.warn('Microphone:',error);state.voice.recording=false;state.voice.recorder=null;setVoiceRecordingUI(false);releaseVoiceStream();
    toast('Mikrofon',error?.name==='NotAllowedError'?'Mikrofondan foydalanishga ruxsat berilmadi':'Mikrofonni ishga tushirib bo‘lmadi');
  }
}
function stopVoiceRecording(){
  const recorder=state.voice.recorder;
  if(!recorder||recorder.state==='inactive')return;
  try{recorder.stop()}catch(error){console.warn('Recorder stop:',error);state.voice.recording=false;setVoiceRecordingUI(false);releaseVoiceStream();}
}
function startVoice(){
  if(state.voice.recording)stopVoiceRecording();else beginVoiceRecording();
}
function setupVoice(){
  state.aiVoiceEnabled=localStorage.getItem('uchkoprik-ai-voice')!=='0';
  updateAIVoiceButton();setVoiceRecordingUI(false);
}
function openSheet(id){showSmooth('#'+id,{duration:300})}function closeSheet(id){hideSmooth('#'+id,{duration:220})}
function loadPrefs(){
  let p={};
  try{p=JSON.parse(localStorage.getItem('uchkoprik-prefs')||'{}')}catch{}

  // Old builds could leave reduce-motion enabled permanently.
  // Migrate once to the new motion preference format so animations are on by default.
  if(p.motionVersion!==MOTION_PREF_VERSION){
    p={...p,reduceMotion:false,motionVersion:MOTION_PREF_VERSION};
    localStorage.setItem('uchkoprik-prefs',JSON.stringify(p));
  }

  document.documentElement.dataset.theme=p.light?'light':'dark';
  document.documentElement.classList.toggle('reduce-motion',p.reduceMotion===true);
  document.documentElement.classList.toggle('reduce-transparency',!!p.reduceTransparency);
  document.documentElement.classList.toggle('high-contrast',!!p.highContrast);
  const liquidGlass=p.liquidGlass!==false;
  document.documentElement.classList.toggle('liquid-glass',liquidGlass&&!p.reduceTransparency);
  document.documentElement.style.setProperty('--font-scale',p.fontScale||1);

  if($('#lightModeToggle'))$('#lightModeToggle').checked=!!p.light;
  if($('#reduceMotionToggle'))$('#reduceMotionToggle').checked=p.reduceMotion===true;
  if($('#reduceTransparencyToggle'))$('#reduceTransparencyToggle').checked=!!p.reduceTransparency;
  if($('#highContrastToggle'))$('#highContrastToggle').checked=!!p.highContrast;
  if($('#liquidGlassToggle'))$('#liquidGlassToggle').checked=p.liquidGlass!==false;
}
function savePrefs(){
  const previousTheme=document.documentElement.dataset.theme;
  const p={
    light:!!$('#lightModeToggle')?.checked,
    reduceMotion:!!$('#reduceMotionToggle')?.checked,
    reduceTransparency:!!$('#reduceTransparencyToggle')?.checked,
    highContrast:!!$('#highContrastToggle')?.checked,
    liquidGlass:$('#liquidGlassToggle')?$('#liquidGlassToggle').checked:true,
    fontScale:Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1,
    motionVersion:MOTION_PREF_VERSION
  };
  localStorage.setItem('uchkoprik-prefs',JSON.stringify(p));
  loadPrefs();
  if(previousTheme!==document.documentElement.dataset.theme)applyMapTheme();
  updateIdleSphereTheme();
}
function setFont(key){document.documentElement.style.setProperty('--font-scale',{small:.92,normal:1,large:1.12}[key]||1);$$('[data-font]').forEach(b=>b.classList.toggle('active',b.dataset.font===key));savePrefs()}

/* =========================================================
   PRESENTATION STUDIO ENGINE
   presentation_slides jadvali mavjud bo‘lmasa eski 6 slayd fallback sifatida ishlaydi.
========================================================= */

const FALLBACK_PRESENTATION_SCENES=()=>[
  {slug:'fallback-intro',eyebrow:'DIGITAL DISTRICT',title:'Uchko‘prik tumani',body:'Raqamli hudud, xarita va tasdiqlangan ma’lumotlar.',centerLat:40.54,centerLng:71.045,zoom:9.70,pitch:25,bearing:0,cameraDurationMs:1900,displayDurationMs:6500,mapLayer:'mahalla',showMap:true,layout:'hero',slideType:'hero',accentColor:'#7cefff',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'none'},
  {slug:'fallback-mahallas',eyebrow:'51 MFY',title:'Mahallalar',body:'51 ta mahalla yagona interaktiv xaritada.',centerLat:40.54,centerLng:71.045,zoom:10.40,pitch:42,bearing:-8,cameraDurationMs:2000,displayDurationMs:6500,mapLayer:'mahalla',showMap:true,layout:'split',slideType:'mfy',accentColor:'#5ff09a',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'platform'},
  {slug:'fallback-population',eyebrow:'AHOLI',title:'{{district.population}}',body:'Tuman aholisi va mahallalar kesimidagi tasdiqlangan statistika.',centerLat:40.540,centerLng:71.030,zoom:10.80,pitch:50,bearing:9,cameraDurationMs:2100,displayDurationMs:6500,mapLayer:'mahalla',showMap:true,layout:'stats',slideType:'statistics',accentColor:'#7cefff',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'district'},
  {slug:'fallback-economy',eyebrow:'IQTISODIYOT',title:'Investor Mode',body:'Sanoat, qishloq xo‘jaligi, xizmatlar va investitsiya muhiti.',centerLat:40.530,centerLng:71.070,zoom:11.20,pitch:55,bearing:-12,cameraDurationMs:2200,displayDurationMs:6500,mapLayer:'business',showMap:true,layout:'stats',slideType:'investment',accentColor:'#ffb648',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'economy'},
  {slug:'fallback-area',eyebrow:'HUDUD',title:'{{district.areaKm2}} km²',body:'Hudud, infratuzilma va tashkilotlar yagona raqamli xaritada.',centerLat:40.500,centerLng:71.010,zoom:11.00,pitch:48,bearing:13,cameraDurationMs:2100,displayDurationMs:6500,mapLayer:'all',showMap:true,layout:'split',slideType:'map',accentColor:'#8b7cff',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'platform'},
  {slug:'fallback-final',eyebrow:'AI · MAP · DATA',title:'Digital District',body:'Delegatsiya va boshqaruv uchun zamonaviy raqamli taqdimot.',centerLat:40.540,centerLng:71.045,zoom:9.90,pitch:58,bearing:0,cameraDurationMs:2200,displayDurationMs:7000,mapLayer:'all',showMap:true,layout:'hero',slideType:'final',accentColor:'#7cefff',mediaType:'none',galleryUrls:[],customStats:[],statsPreset:'none'}
];

function normalizePresentationSlide(row){
  const jsonArray=v=>Array.isArray(v)?v:[];
  return {
    id:row.id,slug:row.slug||row.id,playlistId:row.playlist_id,sortOrder:Number(row.sort_order||0),active:row.active!==false,
    slideType:row.slide_type||'hero',layout:row.layout||'hero',eyebrow:row.eyebrow||'',title:row.title||'',body:row.body||'',
    accentColor:row.accent_color||'#7cefff',translations:row.translations&&typeof row.translations==='object'?row.translations:{},
    entityType:row.entity_type||'none',entityId:row.entity_id||null,showMap:row.show_map!==false,mapLayer:row.map_layer||'mahalla',
    centerLat:toCoord(row.center_lat),centerLng:toCoord(row.center_lng),zoom:Number(row.zoom??10.2),pitch:Number(row.pitch??42),bearing:Number(row.bearing??-8),
    cameraDurationMs:Number(row.camera_duration_ms||2000),displayDurationMs:Number(row.display_duration_ms||6500),
    mediaType:row.media_type||'none',mediaUrl:row.media_url||null,galleryUrls:jsonArray(row.gallery_urls),overlayStrength:Number(row.overlay_strength??.55),
    statsPreset:row.stats_preset||'none',customStats:jsonArray(row.custom_stats),ctaLabel:row.cta_label||'',ctaUrl:row.cta_url||''
  };
}

async function loadPresentationData(){
  state.data.presentationSlides=[];state.data.presentationPlaylist=null;state.presentation.playlist=null;
  try{
    const params=new URLSearchParams(location.search),requested=params.get('presentation');
    let playlist=null;
    if(requested){
      const r=await window.sb.from('presentation_playlists').select('*').eq('slug',requested).eq('active',true).limit(1).maybeSingle();
      if(!r.error)playlist=r.data;
    }
    if(!playlist){
      const r=await window.sb.from('presentation_playlists').select('*').eq('active',true).eq('is_default',true).limit(1).maybeSingle();
      if(r.error)throw r.error;playlist=r.data;
    }
    if(!playlist){
      const r=await window.sb.from('presentation_playlists').select('*').eq('active',true).order('created_at',{ascending:true}).limit(1).maybeSingle();
      if(r.error)throw r.error;playlist=r.data;
    }
    if(!playlist)return;
    const slides=await window.sb.from('presentation_slides').select('*').eq('playlist_id',playlist.id).eq('active',true).order('sort_order',{ascending:true});
    if(slides.error)throw slides.error;
    state.data.presentationPlaylist=playlist;
    state.data.presentationSlides=(slides.data||[]).map(normalizePresentationSlide);
    state.presentation.playlist=playlist;
  }catch(error){
    console.warn('Presentation Studio jadvali topilmadi yoki o‘qilmadi. Fallback slaydlar ishlatiladi:',error?.message||error);
  }
}

function presentationScenes(){return state.data.presentationSlides.length?state.data.presentationSlides:FALLBACK_PRESENTATION_SCENES()}
function localizedSlideValue(slide,key){return slide?.translations?.[state.lang]?.[key]??slide?.[key]??''}
function presentationEntity(slide){
  if(!slide||!slide.entityId||slide.entityType==='none')return null;
  const id=String(slide.entityId);
  if(slide.entityType==='mahalla')return state.data.mahallas.find(x=>String(x.uuid||x.id)===id||String(x.id)===id)||null;
  if(slide.entityType==='organization')return state.data.businesses.find(x=>String(x.id)===id)||null;
  if(slide.entityType==='economic-zone')return state.data.economicZones.find(x=>String(x.id)===id)||null;
  return null;
}
function presentationContext(slide){
  const entity=presentationEntity(slide),d=state.data.district;
  return {district:d,entity,counts:{mahallas:state.data.mahallas.length,organizations:state.data.businesses.length,economicZones:state.data.economicZones.length,dataPoints:state.data.mahallas.length+state.data.businesses.length+state.data.economicZones.length}};
}
function getPath(obj,path){return String(path||'').split('.').reduce((v,k)=>v==null?undefined:v[k],obj)}
function presentationValue(v){if(v===null||v===undefined||v==='')return '—';if(typeof v==='number')return fmt(v);return String(v)}
function resolvePresentationTemplate(text,slide){
  const ctx=presentationContext(slide);
  return String(text||'').replace(/\{\{\s*([\w.]+)\s*\}\}/g,(_,path)=>presentationValue(getPath(ctx,path)));
}
function presentationStats(slide){
  const d=state.data.district,entity=presentationEntity(slide),custom=(slide.customStats||[]).filter(x=>x&&x.label);
  if(custom.length)return custom.slice(0,6).map(x=>({label:resolvePresentationTemplate(x.label,slide),value:resolvePresentationTemplate(x.value,slide)}));
  if(slide.statsPreset==='district')return [
    {value:fmt(d.population),label:'Aholi'},{value:`${fmt(d.areaKm2)} km²`,label:'Maydon'},{value:fmt(state.data.mahallas.length),label:'MFY'},{value:fmt(state.data.businesses.length),label:'Tashkilot'}
  ];
  if(slide.statsPreset==='economy')return [
    {value:d.industryVolume||'—',label:'Sanoat'},{value:d.agricultureVolume||'—',label:'Qishloq xo‘jaligi'},{value:d.servicesVolume||'—',label:'Xizmatlar'},{value:fmt(state.data.economicZones.length),label:'EIZ loyihalari'}
  ];
  if(slide.statsPreset==='platform')return [
    {value:fmt(state.data.mahallas.length),label:'MFY'},{value:fmt(state.data.businesses.length),label:'Tashkilot'},{value:fmt(state.data.economicZones.length),label:'Iqtisodiy zona'},{value:fmt(state.data.mahallas.length+state.data.businesses.length+state.data.economicZones.length),label:'Jami yozuv'}
  ];
  if(slide.statsPreset==='entity'&&entity){
    if(slide.entityType==='mahalla')return [{value:fmt(entity.population),label:'Aholi'},{value:fmt(entity.households),label:'Xonadon'},{value:fmt(entity.families),label:'Oila'},{value:entity.specialization||'—',label:'Ixtisoslashuv'}];
    if(slide.entityType==='organization')return [{value:entity.organizationType||'—',label:'Turi'},{value:entity.sector||'—',label:'Yo‘nalish'},{value:entity.phone||'—',label:'Telefon'},{value:entity.inn||'—',label:'INN'}];
    if(slide.entityType==='economic-zone')return [{value:entity.occupiedAreaHa!=null?`${entity.occupiedAreaHa} ha`:'—',label:'Maydon'},{value:entity.activityType||'—',label:'Faoliyat'},{value:entity.executiveDirector||'—',label:'Rahbar'},{value:entity.inn||'—',label:'INN'}];
  }
  return [];
}
function renderPresentationStats(slide){
  const host=$('#presentationStats');if(!host)return;const stats=presentationStats(slide);
  host.classList.toggle('hidden',!stats.length);
  host.innerHTML=stats.map(x=>`<div class="presentation-stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');
}
function renderPresentationMedia(slide){
  const host=$('#presentationMedia');if(!host)return;
  host.className='presentation-media hidden';host.innerHTML='';
  const mediaType=slide.mediaType||'none',url=slide.mediaUrl;
  if(mediaType==='image'&&url){host.className='presentation-media image';host.innerHTML=`<img src="${esc(url)}" alt="" loading="eager">`;return}
  if(mediaType==='video'&&url){host.className='presentation-media video';host.innerHTML=`<video src="${esc(url)}" autoplay muted loop playsinline preload="metadata"></video>`;host.querySelector('video')?.play?.().catch(()=>{});return}
  if(mediaType==='gallery'&&(slide.galleryUrls||[]).length){host.className='presentation-media gallery';host.innerHTML=(slide.galleryUrls||[]).slice(0,6).map((u,i)=>`<figure style="--i:${i}"><img src="${esc(u)}" alt="" loading="eager"></figure>`).join('');return}
}
function renderPresentationEntity(slide){
  const host=$('#presentationEntity');if(!host)return;const entity=presentationEntity(slide);
  if(!entity){host.classList.add('hidden');host.innerHTML='';return}
  const label=slide.entityType==='mahalla'?'MFY':slide.entityType==='organization'?'Tashkilot':'Iqtisodiy zona';
  const sub=entity.specialization||entity.organizationType||entity.activityType||entity.zoneName||'';
  host.classList.remove('hidden');host.innerHTML=`<span>${esc(label)}</span><strong>${esc(entity.name||entity.companyName||'—')}</strong>${sub?`<small>${esc(sub)}</small>`:''}`;
}
function renderPresentationCTA(slide){
  const btn=$('#presentationCta');if(!btn)return;const label=resolvePresentationTemplate(localizedSlideValue(slide,'ctaLabel'),slide),url=slide.ctaUrl;
  btn.classList.toggle('hidden',!label);btn.textContent=label||'';btn.dataset.url=url||'';
}
function presentationMarkerRows(slide){
  const layer=slide?.mapLayer||'mahalla',rows=[];
  if(layer==='none')return rows;
  if(layer==='all'||layer==='mahalla')state.data.mahallas.filter(validCoords).forEach(x=>rows.push([x,getSpecializationColor(x.specialization),'mahalla']));
  if(layer==='all'||layer==='business')state.data.businesses.filter(validCoords).forEach(x=>rows.push([x,x.categoryColor||'#8b7cff','business']));
  if(layer==='all'||layer==='economic-zone')state.data.economicZones.filter(validCoords).forEach(x=>rows.push([x,'#5ed8ff','economic-zone']));
  return rows;
}
function clearPresentationMarkers(){
  (state.presentation.markers||[]).forEach(m=>m.remove());state.presentation.markers=[];state.presentation.markerKey='';
}
function setupPresentationLayers(){
  const map=state.presentation.map,slide=state.presentation.currentSlide;if(!map||!map.isStyleLoaded())return;
  const rows=presentationMarkerRows(slide),key=`${slide?.mapLayer||'mahalla'}:${rows.length}`;
  if(state.presentation.markerKey===key&&state.presentation.markers?.length===rows.length)return;
  clearPresentationMarkers();
  rows.forEach(([item,color,kind])=>{
    const el=document.createElement('div');el.className=`presentation-map-marker presentation-${kind}`;el.style.setProperty('--marker',color);el.innerHTML='<span class="presentation-pin-shape"><span></span></span>';
    const marker=new maplibregl.Marker({element:el,anchor:'bottom',pitchAlignment:'map',rotationAlignment:'map'}).setLngLat([Number(item.lng),Number(item.lat)]).addTo(map);state.presentation.markers.push(marker);
  });
  state.presentation.markerKey=key;
}
function animateSceneCopy(){
  if(motionDisabled())return;
  const els=[$('#sceneEyebrow'),$('#sceneTitle'),$('#sceneText'),$('#presentationStats'),$('#presentationMedia'),$('#presentationEntity')].filter(Boolean).filter(el=>!el.classList.contains('hidden'));
  els.forEach((el,index)=>{cancelMotion(el);el.animate([{opacity:0,transform:'translate3d(0,18px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:500+index*55,delay:index*35,easing:easeOut()})});
}
function updatePresentationControls(){if($('#scenePlay'))$('#scenePlay').innerHTML=`<span class="icon">${svg(state.presentation.playing?'pause':'play')}</span>`}
function waitForPresentationMap(){const map=state.presentation.map;if(!map)return Promise.resolve();if(map.loaded()&&map.isStyleLoaded())return Promise.resolve();return new Promise(resolve=>map.once('idle',resolve))}
async function openPresentation(){
  clearTimeout(state.presentation.timer);if(state.selected)closeDetail(false);if(document.body.classList.contains('passport-mode'))await closePassportMode(false);await closeMajorPanels();
  const all=presentationScenes();if(!all.length){toast('Prezentatsiya','Faol slaydlar topilmadi');return}
  state.presentation.index=0;state.presentation.playing=state.presentation.playlist?.autoplay!==false;
  await showSmooth('#presentationOverlay',{duration:420,keyframes:[{opacity:0,transform:'scale(1.012)'},{opacity:1,transform:'scale(1)'}]});
  if(!state.presentation.map){
    state.presentation.map=new maplibregl.Map({container:'presentationMap',style:getMapStyleUrl(),center:[70.88,40.62],zoom:8.7,pitch:42,bearing:-8,interactive:false,attributionControl:false,fadeDuration:120});
    state.presentation.map.on('load',setupPresentationLayers);state.presentation.map.on('styledata',()=>{state.presentation.markerKey='';setupPresentationLayers()});
  }
  requestAnimationFrame(()=>requestAnimationFrame(()=>state.presentation.map?.resize()));await waitForPresentationMap();state.presentation.map?.resize();renderScene({opening:true});scheduleScene();
}
async function closePresentation(){
  clearTimeout(state.presentation.timer);state.presentation.map?.stop();$('#presentationMedia video')?.pause?.();
  await hideSmooth('#presentationOverlay',{duration:300,keyframes:[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.008)'}]});
}
function renderScene({opening=false}={}){
  const all=presentationScenes(),slide=all[state.presentation.index];if(!slide)return;state.presentation.currentSlide=slide;
  const entity=presentationEntity(slide),overlay=$('#presentationOverlay');if(overlay){overlay.dataset.layout=slide.layout||'hero';overlay.dataset.slideType=slide.slideType||'hero';overlay.style.setProperty('--presentation-accent',slide.accentColor||'#7cefff');overlay.style.setProperty('--presentation-overlay',String(Math.max(0,Math.min(1,slide.overlayStrength??.55))));overlay.classList.toggle('presentation-no-map',slide.showMap===false)}
  setText('#sceneEyebrow',resolvePresentationTemplate(localizedSlideValue(slide,'eyebrow'),slide));setText('#sceneTitle',resolvePresentationTemplate(localizedSlideValue(slide,'title'),slide));setText('#sceneText',resolvePresentationTemplate(localizedSlideValue(slide,'body'),slide));setText('#sceneCounter',`${state.presentation.index+1} / ${all.length}`);
  renderPresentationStats(slide);renderPresentationMedia(slide);renderPresentationEntity(slide);renderPresentationCTA(slide);updatePresentationControls();animateSceneCopy();
  const progress=$('#presentationProgress');if(progress){progress.style.transition='none';progress.style.width='0%';requestAnimationFrame(()=>{progress.style.transition=`width ${Math.max(1000,Number(slide.displayDurationMs||6500))}ms linear`;progress.style.width=state.presentation.playing?'100%':'0%'})}
  const map=state.presentation.map;if(!map)return;if(!map.loaded()||!map.isStyleLoaded()){map.once('idle',()=>renderScene({opening}));return}
  setupPresentationLayers();map.stop();
  const entityCenter=entity&&validCoords(entity)?[Number(entity.lng),Number(entity.lat)]:null;
  const center=slide.centerLng!==null&&slide.centerLat!==null?[slide.centerLng,slide.centerLat]:(entityCenter||[71.045,40.54]);
  map.flyTo({center,zoom:Number(slide.zoom||10.2),pitch:motionDisabled()?0:Number(slide.pitch||0),bearing:Number(slide.bearing||0),duration:motionDisabled()?0:(opening?Math.max(900,Number(slide.cameraDurationMs||2000)):Number(slide.cameraDurationMs||2000)),curve:1.35,speed:.62,essential:true});
}
function scheduleScene(){
  clearTimeout(state.presentation.timer);if(!state.presentation.playing)return;const all=presentationScenes(),slide=all[state.presentation.index];if(!slide)return;
  state.presentation.timer=setTimeout(()=>{const atEnd=state.presentation.index>=all.length-1;if(atEnd&&state.presentation.playlist?.loop===false){state.presentation.playing=false;updatePresentationControls();return}state.presentation.index=(state.presentation.index+1)%all.length;renderScene();scheduleScene()},Math.max(1000,Number(slide.displayDurationMs||6500)));
}
function sceneStep(delta){const all=presentationScenes();if(!all.length)return;state.presentation.index=(state.presentation.index+delta+all.length)%all.length;renderScene();scheduleScene()}
function togglePresentationPlay(){state.presentation.playing=!state.presentation.playing;updatePresentationControls();scheduleScene()}


function ensureIdleOverlay(){
  let overlay=$('#idleSphereOverlay');
  if(!overlay){
    overlay=document.createElement('section');
    overlay.id='idleSphereOverlay';
    overlay.setAttribute('aria-hidden','true');
    document.body.appendChild(overlay);
  }
  if(!$('#idleSphereStars',overlay)){
    const stars=document.createElement('div');
    stars.id='idleSphereStars';
    stars.setAttribute('aria-hidden','true');
    overlay.prepend(stars);
  }
  if(!$('#idleSphereClose',overlay)){
    const close=document.createElement('button');
    close.id='idleSphereClose';
    close.type='button';
    close.setAttribute('aria-label','Sphere rejimini yopish');
    close.title='Yopish';
    close.innerHTML=`<span class="icon">${svg('x')}</span>`;
    overlay.appendChild(close);
  }
  if(!$('#idleSphereCanvas',overlay)){
    const canvas=document.createElement('div');
    canvas.id='idleSphereCanvas';
    overlay.appendChild(canvas);
  }
  if(!$('#idleSphereLabel',overlay)){
    const label=document.createElement('div');
    label.id='idleSphereLabel';
    label.textContent='UCHKO‘PRIK DIGITAL DISTRICT';
    overlay.appendChild(label);
  }
  populateIdleStars();
}
function populateIdleStars(){
  const host=$('#idleSphereStars');
  if(!host)return;
  const total=innerWidth<760?110:180;
  host.innerHTML='';
  for(let i=0;i<total;i++){
    const star=document.createElement('span');
    star.className='idle-star';
    star.style.left=`${Math.random()*100}%`;
    star.style.top=`${Math.random()*100}%`;
    star.style.setProperty('--size',`${(Math.random()*2.4+.8).toFixed(2)}px`);
    star.style.setProperty('--alpha',`${(Math.random()*.65+.2).toFixed(2)}`);
    star.style.setProperty('--dur',`${(Math.random()*3.6+1.8).toFixed(2)}s`);
    star.style.setProperty('--delay',`${(Math.random()*4).toFixed(2)}s`);
    host.appendChild(star);
  }
}
async function initIdleSphere(){
  ensureIdleOverlay();
  if(state.idle.initialized)return;
  const container=$('#idleSphereCanvas');
  if(!container)return;
  try{
    const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,1,.1,100);
    camera.position.z=3.35;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setClearColor(0x000000,0);
    container.innerHTML='';
    container.appendChild(renderer.domElement);
    const count=innerWidth<760?4200:7600,positions=new Float32Array(count*3),gold=Math.PI*(3-Math.sqrt(5));
    for(let i=0;i<count;i++){
      const y=1-(i/(count-1))*2,r=Math.sqrt(Math.max(0,1-y*y)),th=gold*i;
      positions[i*3]=Math.cos(th)*r;
      positions[i*3+1]=y;
      positions[i*3+2]=Math.sin(th)*r;
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const mat=new THREE.PointsMaterial({size:innerWidth<760?.0125:.0105,color:0xffffff,transparent:true,opacity:.96,depthWrite:false,blending:THREE.AdditiveBlending});
    const points=new THREE.Points(geo,mat),group=new THREE.Group();
    group.add(points);scene.add(group);
    const ambient=new THREE.AmbientLight(0xffffff,1);scene.add(ambient);
    const resize=()=>{const w=Math.max(1,container.clientWidth),h=Math.max(1,container.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
    new ResizeObserver(resize).observe(container);resize();
    state.idle={...state.idle,initialized:true,renderer,scene,camera,group,points,dragging:false,lastX:0,lastY:0,targetX:.12,targetY:0};
    const canvas=renderer.domElement;
    canvas.style.touchAction='none';
    canvas.addEventListener('pointerdown',e=>{state.idle.dragging=true;state.idle.lastX=e.clientX;state.idle.lastY=e.clientY;canvas.setPointerCapture?.(e.pointerId)});
    canvas.addEventListener('pointermove',e=>{
      const rect=canvas.getBoundingClientRect();
      if(!state.idle.dragging){
        state.idle.targetY+=(((e.clientX-rect.left)/Math.max(1,rect.width))-.5)*.00025;
        state.idle.targetX=.12+(.5-((e.clientY-rect.top)/Math.max(1,rect.height)))*.08;
        return;
      }
      const dx=e.clientX-state.idle.lastX,dy=e.clientY-state.idle.lastY;
      state.idle.targetY+=dx*.0045;
      state.idle.targetX=Math.max(-.7,Math.min(.7,state.idle.targetX+dy*.0035));
      state.idle.lastX=e.clientX;state.idle.lastY=e.clientY;
    },{passive:true});
    const release=()=>{state.idle.dragging=false};
    canvas.addEventListener('pointerup',release,{passive:true});canvas.addEventListener('pointercancel',release,{passive:true});canvas.addEventListener('pointerleave',release,{passive:true});
    state.idle.renderFrame=()=>{if(!state.idle.active){state.idle.frame=null;return}const t=performance.now();if(!state.idle.dragging)state.idle.targetY+=.00135;group.rotation.x+=(state.idle.targetX-group.rotation.x)*.045;group.rotation.y+=(state.idle.targetY-group.rotation.y)*.055;group.rotation.z=Math.sin(t*.00011)*.045;group.scale.setScalar(1+Math.sin(t*.00072)*.007);points.material.opacity=.82+Math.sin(t*.0013)*.12;renderer.render(scene,camera);state.idle.frame=requestAnimationFrame(state.idle.renderFrame)};
  }catch(e){console.warn('Idle sphere:',e)}
}
function updateIdleSphereTheme(){if(!state.idle.points)return;state.idle.points.material.color.setHex(0xffffff)}
function resetIdleTimer(){clearTimeout(state.idle.timer);if(state.idle.active)return;state.idle.timer=setTimeout(()=>enterIdleMode(false),state.idle.timeout)}
async function enterIdleMode(manual=false){
  ensureIdleOverlay();
  if(state.idle.active)return;
  if(!state.idle.initialized)await initIdleSphere();
  if(!state.idle.initialized)return;
  closeDetail(false);
  await closeMajorPanels();
  if(document.body.classList.contains('passport-mode'))closePassportMode(false);
  populateIdleStars();
  state.idle.active=true;
  state.idle.manualGraceUntil=manual?Date.now()+650:0;
  document.body.classList.add('idle-mode');
  $('#idleSphereOverlay')?.setAttribute('aria-hidden','false');
  if(!state.idle.frame&&state.idle.renderFrame)state.idle.frame=requestAnimationFrame(state.idle.renderFrame);
  if(!motionDisabled())$('#idleSphereCanvas')?.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.35)'},{opacity:1,transform:'translate(-50%,-50%) scale(1)'}],{duration:760,easing:easeOut()});
}
function exitIdleMode(){
  if(!state.idle.active)return;
  state.idle.active=false;if(state.idle.frame){cancelAnimationFrame(state.idle.frame);state.idle.frame=null}
  if(!motionDisabled())$('#idleSphereCanvas')?.animate([{opacity:1,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(.45)'}],{duration:420,easing:'cubic-bezier(.4,0,.2,1)'});
  document.body.classList.remove('idle-mode');
  $('#idleSphereOverlay')?.setAttribute('aria-hidden','true');
  setTimeout(()=>{if(!motionDisabled())$('#map')?.animate([{opacity:.15,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:520,easing:easeOut()})},260);
}
function setupIdleDetection(){
  let last=0;
  const onActivity=(ev)=>{
    const now=Date.now();
    if(state.idle.active)return;
    if(ev==='pointermove'&&now-last<380)return;
    last=now;
    resetIdleTimer();
  };
  ['pointerdown','pointermove','keydown','wheel','touchstart'].forEach(ev=>window.addEventListener(ev,()=>onActivity(ev),{passive:true}));
  window.addEventListener('resize',populateIdleStars,{passive:true});
  resetIdleTimer();
}

function ensureSphereTestButton(){
  ensureIdleOverlay();
  let button=$('#sphereTestBtn');
  if(!button){
    button=document.createElement('button');
    button.id='sphereTestBtn';
    button.type='button';
    button.className='sphere-test-button glass floating';
    button.setAttribute('aria-label','Sphere animatsiyasini sinash');
    button.title='Sphere animatsiyasini sinash';
    button.innerHTML=`<span class="icon">${svg('globe')}</span><span class="sphere-test-label">Sphere</span>`;
    document.body.appendChild(button);
  }
  if(button.dataset.sphereBound==='1')return;
  button.dataset.sphereBound='1';
  button.addEventListener('click',async e=>{
    e.preventDefault();
    e.stopPropagation();
    liquidPress(button);
    if(state.idle.active)return;
    clearTimeout(state.idle.timer);
    await enterIdleMode(true);
  });
}
function toast(title,body=''){const host=$('#toastHost');if(!host)return;const el=document.createElement('div');el.className='toast';el.innerHTML=`<strong>${esc(title)}</strong>${body?`<small>${esc(body)}</small>`:''}`;host.appendChild(el);setTimeout(()=>el.remove(),3200)}
function renderAllTextual(){renderCategories();renderEconomicZoneFilters();renderLayerList();renderProducts();renderDistrictMetrics();renderAISuggestions()}

function setupEvents(){
  $('#exploreClose')?.addEventListener('click',closeFilterPanel);$('#filterToggle')?.addEventListener('click',openFilterPanel);$('#layerListToggle')?.addEventListener('click',toggleLayerList);$('#layerListClose')?.addEventListener('click',closeLayerList);$('#layerListSearch')?.addEventListener('input',e=>{state.layerListQuery=e.target.value;renderLayerList()});$('#fitDistrict')?.addEventListener('click',()=>{state.activeLayer='all';state.selectedSpecialization=null;state.selectedOrganizationType=null;renderCategories();renderMarkers();fitDistrict()});$('#specializationReset')?.addEventListener('click',()=>{state.selectedSpecialization=null;renderSpecializationFilters();applyMarkerFilters();renderLayerList()});$('#organizationFilterReset')?.addEventListener('click',()=>{state.selectedOrganizationType=null;renderOrganizationFilters();applyMarkerFilters();renderLayerList()});
  $('#districtPassportBtn')?.addEventListener('click',openPassportMode);$('#districtClose')?.addEventListener('click',()=>closePassportMode());
  $('#searchOpen')?.addEventListener('click',async()=>{if(state.selected)closeDetail(false);if(document.body.classList.contains('passport-mode'))closePassportMode(false);await closeMajorPanels('searchDialog');await showSmooth('#searchDialog',{duration:300,keyframes:[{opacity:0,transform:'translate3d(-50%,-10px,0) scale(.99)'},{opacity:1,transform:'translate3d(-50%,0,0) scale(1)'}]});renderSearchResults();setTimeout(()=>$('#globalSearch')?.focus(),40)});$('#searchClose')?.addEventListener('click',()=>hideSearchSmooth());$('#globalSearch')?.addEventListener('input',e=>renderSearchResults(e.target.value));
  $$('.dock-item').forEach(btn=>btn.addEventListener('click',()=>{const nav=btn.dataset.nav;if(nav==='explore')return openFilterPanel();if(nav==='map'){closeMajorPanels();closeDetail();if(document.body.classList.contains('passport-mode'))closePassportMode();closeFilterPanel();fitDistrict();return}if(nav==='ai')return openAI();if(nav==='invest')return openInvestorMode();if(nav==='products')return openPanel('products')}));
  $('#investorClose')?.addEventListener('click',closeInvestorMode);$('#showBusinesses')?.addEventListener('click',()=>{state.activeLayer='business';renderCategories();renderMarkers();closeInvestorMode()});$('#askInvestment')?.addEventListener('click',()=>askAI('Uchko‘prik investitsiya imkoniyatlari haqida umumiy ma’lumot ber'));$('#productsClose')?.addEventListener('click',openFilterPanel);
  $('#detailClose')?.addEventListener('click',()=>closeDetail());$('#detailDirections')?.addEventListener('click',()=>{const i=state.selected?.item;if(validCoords(i))window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${i.lat},${i.lng}`)}`,'_blank','noopener')});$('#detailAsk')?.addEventListener('click',()=>{if(state.selected)askAI(`${state.selected.item.name} haqida ma’lumot ber`)});$('#detailShare')?.addEventListener('click',async()=>{const i=state.selected?.item;try{if(navigator.share)await navigator.share({title:i?.name||'Uchko‘prik',url:location.href});else{await navigator.clipboard.writeText(location.href);toast('Havola nusxalandi')}}catch{}});
  $('#aiClose')?.addEventListener('click',()=>{stopAIAudio();if(state.voice.recording)stopVoiceRecording();hideSmooth('#aiPanel',{duration:260});setDockActive(state.activePanel==='explore'?'explore':'map')});$('#aiVoiceToggle')?.addEventListener('click',toggleAIVoice);$('#aiForm')?.addEventListener('submit',e=>{e.preventDefault();askAI($('#aiInput')?.value)});$('#voiceBtn')?.addEventListener('click',startVoice);
  $('#languageBtn')?.addEventListener('click',()=>openSheet('languageSheet'));$('#accessibilityBtn')?.addEventListener('click',()=>openSheet('accessibilitySheet'));$$('[data-sheet-close]').forEach(btn=>btn.addEventListener('click',()=>closeSheet(btn.dataset.sheetClose)));$$('.sheet-backdrop').forEach(s=>s.addEventListener('click',e=>{if(e.target===s)closeSheet(s.id)}));['lightModeToggle','reduceMotionToggle','reduceTransparencyToggle','highContrastToggle','liquidGlassToggle'].forEach(id=>$('#'+id)?.addEventListener('change',savePrefs));$$('[data-font]').forEach(btn=>btn.addEventListener('click',()=>setFont(btn.dataset.font)));
  $('#presentationBtn')?.addEventListener('click',openPresentation);$('#presentationExit')?.addEventListener('click',closePresentation);$('#scenePrev')?.addEventListener('click',()=>sceneStep(-1));$('#sceneNext')?.addEventListener('click',()=>sceneStep(1));$('#scenePlay')?.addEventListener('click',togglePresentationPlay);$('#idleSphereClose')?.addEventListener('click',()=>{exitIdleMode();resetIdleTimer()});
  $('#presentationCta')?.addEventListener('click',()=>{const url=$('#presentationCta')?.dataset.url;if(url)window.open(url,'_blank','noopener')});
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#searchOpen')?.click()}
    const presentationOpen=!$('#presentationOverlay')?.classList.contains('hidden');
    if(e.key==='Escape'){
      if(presentationOpen){closePresentation();return}
      if(state.selected){closeDetail();return}
      if(document.body.classList.contains('passport-mode')){closePassportMode();return}
      hideSearchSmooth();
      hideSmooth('#aiPanel',{duration:180});
    }
    if(presentationOpen){
      if(e.key==='ArrowRight'){e.preventDefault();sceneStep(1)}
      if(e.key==='ArrowLeft'){e.preventDefault();sceneStep(-1)}
      if(e.key===' '){e.preventDefault();togglePresentationPlay()}
    }
  });
  window.addEventListener('resize',()=>{scheduleConnectorUpdate();state.map?.resize();state.presentation.map?.resize()});
}

async function boot(){
  detectLanguage();
  loadPrefs();
  document.documentElement.classList.add('motion-ready');
  ensureIdleOverlay();
  ensureSphereTestButton();
  bindIcons();
  console.log('Uchko‘prik Digital District ishga tushmoqda...');

  await loadData();
  applyLanguage();
  renderLanguages();
  setupEvents();
  setupVoice();
  initMap();
  ensureAIWelcome();
  setupIdleDetection();
  const initialQuery=new URLSearchParams(location.search).get('q');
  if(initialQuery){
    setTimeout(()=>{
      const input=$('#globalSearch');if(input)input.value=initialQuery;
      $('#searchOpen')?.click();
      setTimeout(()=>renderSearchResults(initialQuery),80);
    },420);
  }
  if(new URLSearchParams(location.search).get('present')==='1')setTimeout(()=>openPresentation(),720);
  requestAnimationFrame(()=>requestAnimationFrame(animateChromeIn));

  if('serviceWorker' in navigator){
    let reloading=false;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{
      if(reloading)return;
      reloading=true;
      location.reload();
    });
    navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'})
      .then(registration=>registration.update())
      .catch(error=>console.warn('Service Worker:',error));
  }

  console.log('Uchko‘prik Digital District tayyor.');
}
boot().catch(error=>{console.error('Application error:',error);toast('Application error',error.message)});
