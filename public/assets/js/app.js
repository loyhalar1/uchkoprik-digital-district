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
  info:'<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path>'
};

const iconForCategory={mahalla:'home',business:'briefcase',education:'school',health:'health',culture:'landmark',service:'service',investment:'chart',government:'landmark'};
const SPEC_COLORS={'Dehqonchilik':'#39e676','Chorvachilik':'#ffad2f','Kichik ishlab chiqarish':'#6b79ff','Bog‘dorchilik':'#21c7e8','Hunarmandchilik':'#ef59c7','Savdo va xizmat ko‘rsatish':'#a96bff'};
const FALLBACK_COLORS=['#39e676','#ffad2f','#6b79ff','#21c7e8','#ef59c7','#a96bff','#63e6ff','#ff7272'];

const state={
  lang:'uz', data:{mahallas:[],categories:[],places:[],businesses:[],products:[],district:{}},
  map:null, markers:[], selected:null, activeLayer:'mahalla', selectedSpecialization:null, selectedOrganizationType:null,
  activePanel:'explore', detailCamera:null, passportCamera:null, connectorFrame:null,
  presentation:{map:null,index:0,timer:null,playing:true}, voiceRecognition:null,
  idle:{timer:null,timeout:10*60*1000,active:false,initialized:false,renderer:null,scene:null,camera:null,group:null,frame:null}
};

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const normalize=v=>String(v||'').toLowerCase().replace(/[ʻ’'`]/g,'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');
const localeCode=()=>({uz:'uz-UZ',en:'en-US',ru:'ru-RU',zh:'zh-CN',ar:'ar-SA',tr:'tr-TR',ko:'ko-KR',de:'de-DE',fr:'fr-FR',es:'es-ES'}[state.lang]||'uz-UZ');
const fmt=v=>new Intl.NumberFormat(localeCode()).format(Number(v)||0);
const tr=k=>{try{return t(state.lang,k)}catch{return k}};
const safeDate=v=>{if(!v)return null;try{return new Date(v).toLocaleDateString(localeCode())}catch{return v}};
const validCoords=i=>Number.isFinite(Number(i?.lng))&&Number.isFinite(Number(i?.lat));
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
  scheduleLiquidGlassRedraw(el);
  if(motionDisabled())return Promise.resolve();
  const duration=options.duration||420;
  const keyframes=options.keyframes||[
    {opacity:0,translate:'0 14px',scale:.965,filter:'blur(8px)'},
    {opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}
  ];
  const anim=el.animate(keyframes,{duration,easing:options.easing||easeOut(),fill:'both'});
  return anim.finished.catch(()=>{}).finally(()=>{try{anim.cancel()}catch{}});
}

function hideSmooth(target,options={}){
  const el=typeof target==='string'?$(target):target;
  if(!el||el.classList.contains('hidden'))return Promise.resolve();
  cancelMotion(el);
  if(motionDisabled()){
    el.classList.add('hidden');
    return Promise.resolve();
  }
  const duration=options.duration||300;
  const keyframes=options.keyframes||[
    {opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'},
    {opacity:0,translate:'0 10px',scale:.975,filter:'blur(6px)'}
  ];
  const anim=el.animate(keyframes,{duration,easing:options.easing||'cubic-bezier(.4,0,.6,1)',fill:'both'});
  return anim.finished.catch(()=>{}).finally(()=>{
    el.classList.add('hidden');
    try{anim.cancel()}catch{}
  });
}

function animateChromeIn(){
  if(motionDisabled())return;
  const rows=[
    ['.topbar',0,'0 -18px'],
    ['#explorePanel',90,'-18px 0'],
    ['.dock',160,'0 22px']
  ];
  rows.forEach(([sel,delay,translate])=>{
    const el=$(sel);if(!el)return;
    el.animate([
      {opacity:0,translate,scale:.97,filter:'blur(10px)'},
      {opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}
    ],{duration:650,delay,easing:easeOut(),fill:'both'}).finished.catch(()=>{}).finally(()=>{el.getAnimations().forEach(a=>{try{a.cancel()}catch{}})});
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
   LIQUID GLASS REFRACTION ENGINE
   Adapted for vanilla JS from the user-provided MIT-licensed
   "liquid-glass" project by Nikita Stadnik.
   Runtime has no Astro/Tailwind/Anime.js dependency.
========================================================= */

const liquidGlassState = {
  initialized: false,
  supportsUrlFilter: null,
  observer: null,
  elements: new Set(),
  resizeTimer: null
};

function getDisplacementMap({height,width,radius,depth}){
  const safeHeight=Math.max(1,Math.round(height));
  const safeWidth=Math.max(1,Math.round(width));
  const safeRadius=Math.max(0,Number(radius)||0);
  const safeDepth=Math.max(1,Math.min(Number(depth)||10,Math.floor(Math.min(safeHeight,safeWidth)/3)));
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg height="${safeHeight}" width="${safeWidth}" viewBox="0 0 ${safeWidth} ${safeHeight}" xmlns="http://www.w3.org/2000/svg">
    <style>.mix{mix-blend-mode:screen}</style>
    <defs>
      <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((safeRadius/safeHeight)*15)}%" y2="${Math.floor(100-(safeRadius/safeHeight)*15)}%">
        <stop offset="0%" stop-color="#0F0"/><stop offset="100%" stop-color="#000"/>
      </linearGradient>
      <linearGradient id="X" x1="${Math.ceil((safeRadius/safeWidth)*15)}%" x2="${Math.floor(100-(safeRadius/safeWidth)*15)}%" y1="0" y2="0">
        <stop offset="0%" stop-color="#F00"/><stop offset="100%" stop-color="#000"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" height="${safeHeight}" width="${safeWidth}" fill="#808080"/>
    <g filter="blur(2px)">
      <rect x="0" y="0" height="${safeHeight}" width="${safeWidth}" fill="#000080"/>
      <rect x="0" y="0" height="${safeHeight}" width="${safeWidth}" fill="url(#Y)" class="mix"/>
      <rect x="0" y="0" height="${safeHeight}" width="${safeWidth}" fill="url(#X)" class="mix"/>
      <rect x="${safeDepth}" y="${safeDepth}" height="${Math.max(1,safeHeight-2*safeDepth)}" width="${Math.max(1,safeWidth-2*safeDepth)}" fill="#808080" rx="${safeRadius}" ry="${safeRadius}" filter="blur(${safeDepth}px)"/>
    </g>
  </svg>`);
}

function getDisplacementFilter({height,width,radius,depth,strength=36,chromaticAberration=1.25}){
  const map=getDisplacementMap({height,width,radius,depth});
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="displace" color-interpolation-filters="sRGB">
        <feImage x="0" y="0" height="${height}" width="${width}" href="${map}" result="displacementMap"/>
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength+chromaticAberration*2}" xChannelSelector="R" yChannelSelector="G"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR"/>
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength+chromaticAberration}" xChannelSelector="R" yChannelSelector="G"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG"/>
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB"/>
        <feBlend in="displacedR" in2="displacedG" mode="screen"/>
        <feBlend in2="displacedB" mode="screen"/>
      </filter>
    </defs>
  </svg>`)+"#displace";
}

function supportsBackdropFilterUrl(){
  if(liquidGlassState.supportsUrlFilter!==null)return liquidGlassState.supportsUrlFilter;
  const test=document.createElement('div');
  test.style.cssText='backdrop-filter:url(#test)';
  liquidGlassState.supportsUrlFilter=(test.style.backdropFilter==='url(#test)'||test.style.backdropFilter==='url("#test")');
  return liquidGlassState.supportsUrlFilter;
}

function glassConfig(el){
  const isButton=el.matches('button,.dock-item,.ux-top-button,.language-btn,.icon-btn,.sphere-test-button,.filter-specialization,.category-chip');
  const isLarge=el.matches('.explore-panel,.detail-card,.mode-panel,.search-dialog,.ai-panel,.sheet,.passport-card');
  return {
    depth:isButton?4:(isLarge?8:6),
    strength:isButton?8:(isLarge?18:12),
    chromaticAberration:isButton?.35:.65,
    blur:isButton?1:(isLarge?2.2:1.6),
    brightness:isButton?1.08:1.04,
    saturate:isButton?1.20:1.32
  };
}

function redrawLiquidGlass(el){
  if(!el||!el.isConnected)return;
  const rect=el.getBoundingClientRect();
  if(rect.width<2||rect.height<2)return;
  const styles=getComputedStyle(el);
  const radius=parseFloat(styles.borderTopLeftRadius)||0;
  const cfg=glassConfig(el);
  el.classList.add('liquid-refraction');
  if(document.documentElement.classList.contains('reduce-transparency')){
    el.style.removeProperty('backdrop-filter');
    el.style.removeProperty('-webkit-backdrop-filter');
    return;
  }
  if(supportsBackdropFilterUrl()){
    const filterUrl=getDisplacementFilter({
      height:Math.round(rect.height),
      width:Math.round(rect.width),
      radius,
      depth:cfg.depth,
      strength:cfg.strength,
      chromaticAberration:cfg.chromaticAberration
    });
    const value=`blur(${cfg.blur/2}px) url("${filterUrl}") blur(${cfg.blur}px) brightness(${cfg.brightness}) saturate(${cfg.saturate})`;
    el.style.setProperty('backdrop-filter',value,'important');
    el.style.setProperty('-webkit-backdrop-filter',`blur(${Math.max(8,Math.min(24,rect.width/28))}px) saturate(165%)`,'important');
  }else{
    const fallback=`blur(${Math.max(10,Math.min(28,rect.width/24))}px) saturate(170%)`;
    el.style.setProperty('backdrop-filter',fallback,'important');
    el.style.setProperty('-webkit-backdrop-filter',fallback,'important');
  }
}

function scheduleLiquidGlassRedraw(el){
  if(!el)return;
  requestAnimationFrame(()=>redrawLiquidGlass(el));
}

function initLiquidGlassElement(el){
  if(!el||el.dataset.liquidReady==='1')return;
  el.dataset.liquidReady='1';
  liquidGlassState.elements.add(el);
  el.classList.add('liquid-refraction');
  liquidGlassState.observer?.observe(el);
  redrawLiquidGlass(el);
}

function initLiquidGlassSystem(){
  if(liquidGlassState.initialized)return;
  liquidGlassState.initialized=true;
  liquidGlassState.observer=new ResizeObserver(entries=>{
    entries.forEach(entry=>scheduleLiquidGlassRedraw(entry.target));
  });
  const selector=[
    '.topbar','.explore-panel','.dock','.detail-card','.mode-panel',
    '.search-dialog','.ai-panel','.sheet','.passport-card'
  ].join(',');
  $$(selector).forEach(initLiquidGlassElement);
  const mutationObserver=new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(!(node instanceof HTMLElement))return;
      if(node.matches?.(selector))initLiquidGlassElement(node);
      node.querySelectorAll?.(selector).forEach(initLiquidGlassElement);
    }));
  });
  mutationObserver.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('resize',()=>{
    clearTimeout(liquidGlassState.resizeTimer);
    liquidGlassState.resizeTimer=setTimeout(()=>liquidGlassState.elements.forEach(redrawLiquidGlass),120);
  },{passive:true});
}

function refreshLiquidGlass(){
  liquidGlassState.elements.forEach(el=>scheduleLiquidGlassRedraw(el));
}

function detectLanguage(){const seg=location.pathname.split('/').filter(Boolean)[0];state.lang=LANGUAGES.some(l=>l.code===seg)?seg:(localStorage.getItem('uchkoprik-lang')||'uz')}
function applyLanguage(){const meta=langMeta(state.lang);document.documentElement.lang=meta.code;document.documentElement.dir=meta.dir;if($('#langShort'))$('#langShort').textContent=meta.short;$$('[data-i18n]').forEach(el=>{const v=tr(el.dataset.i18n);if(v&&v!==el.dataset.i18n)el.textContent=v});$$('[data-i18n-placeholder]').forEach(el=>el.placeholder=tr(el.dataset.i18nPlaceholder));$$('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',tr(el.dataset.i18nAria)));localStorage.setItem('uchkoprik-lang',state.lang);renderAllTextual()}
function setLanguage(code){if(!LANGUAGES.some(l=>l.code===code))return;state.lang=code;applyLanguage();renderLanguages();closeSheet('languageSheet')}

async function loadData(){
  if(!window.sb)throw new Error('Supabase client topilmadi. /assets/js/supabase.js ni tekshiring.');
  const [mRes,cRes,dRes,oRes]=await Promise.all([
    window.sb.from('mahallas').select('*').eq('status','active').order('legacy_id',{ascending:true}),
    window.sb.from('categories').select('*').eq('active',true).order('sort_order',{ascending:true}),
    window.sb.from('district').select('*').eq('slug','uchkoprik').single(),
    window.sb.from('organizations').select(`id,slug,name,inn,organization_type,sector,activity,mahalla_id,address,latitude,longitude,website,image_url,status,verified,category_id,source,created_at,updated_at,category:categories(id,slug,name,icon,color)`).eq('status','active')
  ]);
  if(mRes.error)throw new Error(`MFY: ${mRes.error.message}`);
  if(cRes.error)throw new Error(`Kategoriyalar: ${cRes.error.message}`);
  if(dRes.error)throw new Error(`Tuman: ${dRes.error.message}`);
  if(oRes.error)console.warn('Tashkilotlar:',oRes.error.message);

  const mahallas=(mRes.data||[]).map(m=>({id:m.legacy_id??m.id,uuid:m.id,legacyId:m.legacy_id,slug:m.slug,name:m.name||m.official_name||'Noma’lum MFY',officialName:m.official_name||m.name,head:m.chairman||null,phone:m.phone||null,specialization:m.specialization||'Belgilanmagan',population:Number(m.population||0),households:Number(m.households||0),families:Number(m.families||0),schools:Number(m.schools||0),kindergartens:Number(m.kindergartens||0),clinics:Number(m.clinics||0),mosques:Number(m.mosques||0),shops:Number(m.shops||0),lat:Number(m.latitude),lng:Number(m.longitude),imageUrl:m.image_url||null,verified:m.verified!==false,source:m.source||null,updatedAt:safeDate(m.updated_at),type:'mahalla',category:'mahalla'}));
  let categories=(cRes.data||[]).map(c=>({id:c.slug==='mahallas'?'mahalla':c.slug,dbId:c.id,slug:c.slug,name:c.name,icon:c.icon||'marker',color:c.color||'#63e6ff',active:c.active!==false,sortOrder:Number(c.sort_order||0)}));
  const businesses=(oRes.data||[]).map(o=>({id:o.id,slug:o.slug,name:o.name,inn:o.inn||null,organizationType:o.organization_type||'Tashkilot',sector:o.sector||null,industry:o.activity||null,description:o.activity||o.sector||'',mahallaId:o.mahalla_id||null,address:o.address||null,lat:Number(o.latitude),lng:Number(o.longitude),website:o.website||null,imageUrl:o.image_url||null,verified:o.verified===true,source:o.source||null,updatedAt:safeDate(o.updated_at),type:'business',category:o.category?.slug||'business',categoryName:o.category?.name||'Tashkilot',categoryColor:o.category?.color||'#8b7cff',categoryIcon:o.category?.icon||'briefcase'}));
  if(!categories.some(c=>c.id==='mahalla'))categories.unshift({id:'mahalla',slug:'mahallas',name:'MFYlar',icon:'home',color:'#63e6ff',active:true,sortOrder:0});
  if(businesses.length&&!categories.some(c=>c.id==='business'))categories.push({id:'business',slug:'business',name:'Tashkilotlar',icon:'briefcase',color:'#8b7cff',active:true,sortOrder:90});
  const pop=mahallas.reduce((s,x)=>s+x.population,0),hh=mahallas.reduce((s,x)=>s+x.households,0),fam=mahallas.reduce((s,x)=>s+x.families,0),d=dRes.data;
  const district={...d,mahallas:Number(d.mahalla_count)||mahallas.length,population:Number(d.population)||pop,households:hh,families:fam,areaKm2:Number(d.area_km2||0),governor:d.governor||null,founded:d.founded||null,industryVolume:d.industry_volume||null,agricultureVolume:d.agriculture_volume||null,servicesVolume:d.services_volume||null,unemploymentRate:Number(d.unemployment_rate||0),povertyRate:Number(d.poverty_rate||0),borderLengthKm:Number(d.border_length_km||0),healthcareCount:Number(d.healthcare_count||0),updatedAt:safeDate(d.updated_at)};
  state.data={mahallas,categories,businesses,places:[],products:[],district};
  console.log(`Supabase: ${mahallas.length} ta MFY yuklandi`);console.log(`Supabase: ${categories.length} ta kategoriya yuklandi`);console.log(`Supabase: ${businesses.length} ta tashkilot yuklandi`);
}

function getMapStyleUrl(){return document.documentElement.dataset.theme==='light'?'https://tiles.openfreemap.org/styles/positron':'https://tiles.openfreemap.org/styles/dark'}
function applyMapTheme(){if(!state.map)return;const camera=getCamera();state.map.setStyle(getMapStyleUrl());state.map.once('styledata',()=>{if(camera)restoreCamera(camera,0);renderMarkers()})}
function initMap(){const reduced=document.documentElement.classList.contains('reduce-motion');state.map=new maplibregl.Map({container:'map',style:getMapStyleUrl(),center:[71.045,40.54],zoom:10.2,pitch:reduced?0:10,bearing:0,attributionControl:true,cooperativeGestures:false});state.map.addControl(new maplibregl.NavigationControl({showCompass:true,visualizePitch:true}),'top-right');state.map.on('load',()=>{renderMarkers();fitDistrict(false)});state.map.on('move',scheduleConnectorUpdate);state.map.on('zoom',scheduleConnectorUpdate);state.map.on('resize',scheduleConnectorUpdate)}
function getCamera(){if(!state.map)return null;const c=state.map.getCenter();return{center:[c.lng,c.lat],zoom:state.map.getZoom(),pitch:state.map.getPitch(),bearing:state.map.getBearing()}}
function restoreCamera(cam,duration=700){if(!state.map||!cam)return;state.map.easeTo({...cam,duration:document.documentElement.classList.contains('reduce-motion')?0:duration})}
function fitDistrict(animate=true){if(!state.map||!state.data.mahallas.length)return;const b=new maplibregl.LngLatBounds();state.data.mahallas.forEach(m=>{if(validCoords(m))b.extend([m.lng,m.lat])});state.map.fitBounds(b,{padding:{top:100,bottom:90,left:window.innerWidth>760&&!document.body.classList.contains('filter-closed')?330:70,right:70},duration:animate&&!document.documentElement.classList.contains('reduce-motion')?850:0,maxZoom:11.4})}
function flyToItem(item){if(!state.map||!validCoords(item))return;const desktop=window.innerWidth>760;state.map.easeTo({center:desktop?[Number(item.lng)-.012,Number(item.lat)]:[Number(item.lng),Number(item.lat)],zoom:13.15,pitch:12,bearing:0,duration:document.documentElement.classList.contains('reduce-motion')?0:780})}

function getCategory(id){return state.data.categories.find(c=>c.id===id||c.slug===id)}
function getCategoryColor(id){return getCategory(id)?.color||'#63e6ff'}
function getCategoryIcon(id){const c=getCategory(id);if(c?.icon&&ICONS[c.icon])return c.icon;return iconForCategory[id]||'marker'}
function categoryLabel(c){if(!c)return'';const keys={mahalla:'mahallas',business:'businesses',education:'education',health:'health',culture:'culture',service:'services',investment:'investment'};if(keys[c.id]){const v=tr(keys[c.id]);if(v!==keys[c.id])return v}return c.name||c.slug||c.id}

function getSpecializationColor(name){if(SPEC_COLORS[name])return SPEC_COLORS[name];const unique=[...new Set(state.data.mahallas.map(m=>m.specialization).filter(Boolean))];return FALLBACK_COLORS[Math.max(0,unique.indexOf(name))%FALLBACK_COLORS.length]}
function getSpecializationStats(){const m=new Map();state.data.mahallas.forEach(x=>m.set(x.specialization||'Belgilanmagan',(m.get(x.specialization||'Belgilanmagan')||0)+1));return[...m.entries()].map(([name,count])=>({name,count,color:getSpecializationColor(name)})).sort((a,b)=>b.count-a.count)}
function getOrganizationTypes(){const m=new Map();state.data.businesses.forEach(x=>{const n=x.organizationType||x.categoryName||'Tashkilot';m.set(n,(m.get(n)||0)+1)});return[...m.entries()].map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count)}

function renderCategories(){const host=$('#categoryChips');if(!host)return;const rows=[{id:'all',name:'Barchasi',color:'#ffffff',icon:'map'},...state.data.categories.filter(c=>c.active!==false)];host.innerHTML=rows.map(c=>`<button class="category-chip ${state.activeLayer===c.id?'active':''}" type="button" data-category="${esc(c.id)}" style="--chip:${c.color||'#63e6ff'}"><span class="dot" style="color:${c.color||'#63e6ff'};background:${c.color||'#63e6ff'}"></span><span>${esc(c.id==='all'?'Barchasi':categoryLabel(c))}</span></button>`).join('');$$('.category-chip',host).forEach(btn=>btn.addEventListener('click',()=>{state.activeLayer=btn.dataset.category;state.selectedSpecialization=null;state.selectedOrganizationType=null;renderCategories();renderMarkers()}));renderSpecializationFilters();renderOrganizationFilters()}
function renderSpecializationFilters(){const section=$('#specializationFilters'),host=$('#specializationList');if(!section||!host)return;if(state.activeLayer!=='mahalla'){section.classList.add('hidden');return}const items=getSpecializationStats();section.classList.remove('hidden');host.innerHTML=items.map(i=>`<button class="filter-specialization ${state.selectedSpecialization===i.name?'active':''}" type="button" data-specialization="${esc(i.name)}" style="--spec-color:${i.color}"><span class="color"></span><span class="name">${esc(i.name)}</span><span class="count">${i.count}</span></button>`).join('');$$('[data-specialization]',host).forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.specialization;state.selectedSpecialization=state.selectedSpecialization===v?null:v;renderSpecializationFilters();applyMarkerFilters()}))}
function renderOrganizationFilters(){const section=$('#organizationFilters'),host=$('#organizationFilterList');if(!section||!host)return;const isOrg=state.activeLayer==='business'||(state.activeLayer!=='all'&&state.activeLayer!=='mahalla'&&state.data.businesses.some(b=>b.category===state.activeLayer));if(!isOrg||!state.data.businesses.length){section.classList.add('hidden');return}section.classList.remove('hidden');const items=getOrganizationTypes();host.innerHTML=items.map(i=>`<button class="filter-specialization ${state.selectedOrganizationType===i.name?'active':''}" type="button" data-organization-type="${esc(i.name)}" style="--spec-color:#8b7cff"><span class="color"></span><span class="name">${esc(i.name)}</span><span class="count">${i.count}</span></button>`).join('');$$('[data-organization-type]',host).forEach(btn=>btn.addEventListener('click',()=>{const v=btn.dataset.organizationType;state.selectedOrganizationType=state.selectedOrganizationType===v?null:v;renderOrganizationFilters();applyMarkerFilters()}))}

function clearMarkers(){state.markers.forEach(x=>x.marker.remove());state.markers=[]}
function markerElement(item,kind,color){const el=document.createElement('button');el.type='button';el.className=kind==='mahalla'?'mfy-marker':'place-marker';el.setAttribute('aria-label',item.name||'');el.title=item.name||'';el.innerHTML=kind==='mahalla'?`<span class="mfy-dot" style="--marker:${color}"></span>`:`<span class="place-pin" style="--marker:${color}"><span class="icon">${svg(getCategoryIcon(item.category))}</span></span>`;el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openDetail(item,kind)});return el}
function addMarker(item,kind,color){if(!validCoords(item))return;const el=markerElement(item,kind,color);const marker=new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([Number(item.lng),Number(item.lat)]).addTo(state.map);state.markers.push({item,kind,marker,el})}
function renderMarkers(){if(!state.map)return;clearMarkers();const layer=state.activeLayer;if(layer==='all'||layer==='mahalla')state.data.mahallas.forEach(m=>addMarker(m,'mahalla',getSpecializationColor(m.specialization)));state.data.places.forEach(p=>{if(layer==='all'||layer===p.category)addMarker(p,'place',getCategoryColor(p.category))});state.data.businesses.forEach(b=>{if(layer==='all'||layer==='business'||layer===b.category)addMarker(b,'business',b.categoryColor||getCategoryColor(b.category))});applyMarkerFilters()}
function applyMarkerFilters(){state.markers.forEach(m=>{let dim=false;if(m.kind==='mahalla'&&state.selectedSpecialization)dim=m.item.specialization!==state.selectedSpecialization;if(m.kind==='business'&&state.selectedOrganizationType)dim=m.item.organizationType!==state.selectedOrganizationType;m.el.classList.toggle('is-dim',dim)})}

function renderDistrictMetrics(){const d=state.data.district,host=$('#districtMetrics');if(host){const vals=[[d.population,'Umumiy aholi'],[d.households,'Umumiy xonadon'],[d.families,'Umumiy oila'],[d.mahallas,'MFY soni']];host.innerHTML=vals.map(([v,l])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>Tasdiqlangan</small></div>`).join('')}setText('#districtUpdated',d.updatedAt||'—');renderPassportAnalytics();renderInvestorMetrics()}
function renderInvestorMetrics(){const host=$('#investorMetrics');if(!host)return;const d=state.data.district;host.innerHTML=[[d.population,'Aholi'],[d.areaKm2,'km²'],[d.mahallas,'MFY'],[state.data.businesses.length,'Tashkilot']].map(([v,l])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>Tasdiqlangan</small></div>`).join('')}
function renderPassportAnalytics(){const d=state.data.district;setText('#passportIndustry',d.industryVolume||'—');setText('#passportAgriculture',d.agricultureVolume||'—');setText('#passportServices',d.servicesVolume||'—');setText('#passportUnemployment',d.unemploymentRate?`${d.unemploymentRate} %`:'—');setText('#passportPoverty',d.povertyRate?`${d.povertyRate} %`:'—');setText('#passportHealthcare',d.healthcareCount?`${fmt(d.healthcareCount)} ta muassasa`:'—');setText('#passportFounded',d.founded||'—');setText('#passportArea',d.areaKm2?`${fmt(d.areaKm2)} km²`:'—');setText('#passportBorder',d.borderLengthKm?`${d.borderLengthKm} km`:'—');renderDistrictSpecializationStats();renderDistrictTopMahallas()}
function renderDistrictSpecializationStats(){const host=$('#districtSpecializationStats');if(!host)return;const stats=getSpecializationStats(),max=Math.max(1,...stats.map(x=>x.count));host.innerHTML=stats.map(x=>`<div class="passport-bar-row"><span class="label" title="${esc(x.name)}">${esc(x.name)}</span><span class="passport-bar"><i style="width:${x.count/max*100}%;--bar-color:${x.color}"></i></span><b>${x.count}</b></div>`).join('')}
function renderDistrictTopMahallas(){const host=$('#districtTopMahallas');if(!host)return;const top=[...state.data.mahallas].sort((a,b)=>b.population-a.population).slice(0,5);host.innerHTML=top.map((m,i)=>`<button type="button" class="search-result" data-top-mahalla="${m.id}"><span class="result-icon">${i+1}</span><span class="result-copy"><strong>${esc(m.name)}</strong><small>${esc(m.specialization)}</small></span><span class="result-type">${fmt(m.population)}</span></button>`).join('');$$('[data-top-mahalla]',host).forEach(btn=>btn.addEventListener('click',()=>{const item=state.data.mahallas.find(m=>String(m.id)===btn.dataset.topMahalla);closePassportMode(false);setTimeout(()=>openDetail(item,'mahalla'),500)}))}

async function openPassportMode(){closeDetail(false);await closeMajorPanels();if(!document.body.classList.contains('passport-mode'))state.passportCamera=getCamera();document.body.classList.add('passport-mode');state.activePanel='district';setDockActive(null);showSmooth('#districtPanel',{duration:520,keyframes:[{opacity:0,translate:'38px 0',scale:.97,filter:'blur(10px)'},{opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}]});setTimeout(()=>{state.map?.resize();fitDistrict(true)},520)}
function closePassportMode(restore=true){if(!document.body.classList.contains('passport-mode'))return;hideSmooth('#districtPanel',{duration:340,keyframes:[{opacity:1,translate:'0 0',scale:1},{opacity:0,translate:'30px 0',scale:.98}]});document.body.classList.remove('passport-mode');state.activePanel='explore';setTimeout(()=>{state.map?.resize();if(restore&&state.passportCamera)restoreCamera(state.passportCamera,900);else fitDistrict(true);state.passportCamera=null},470)}

async function openDetail(item,kind){if(!item)return;if(document.body.classList.contains('passport-mode'))closePassportMode(false);await closeMajorPanels();if(!state.selected)state.detailCamera=getCamera();state.selected={item,kind};setText('#detailKicker',kind==='mahalla'?'Mahalla fuqarolar yig‘ini':kind==='business'?(item.categoryName||'Tashkilot'):kind==='product'?'Mahsulot':categoryLabel(getCategory(item.category)));setText('#detailTitle',item.name||item.officialName||'—');setText('#detailDescription',kind==='mahalla'?(item.specialization?`Ixtisoslashuv: ${item.specialization}`:'Ma’lumot mavjud emas'):(item.description||item.address||'Ma’lumot mavjud emas'));
  const verify=$('#detailVerification');if(verify)verify.innerHTML=`<span class="badge ${item.verified?'verified':'demo'}"><span class="icon">${svg(item.verified?'shield':'info')}</span>${item.verified?'Tasdiqlangan':'Tasdiqlanmagan'}</span>${item.updatedAt?`<span class="badge">${esc(item.updatedAt)}</span>`:''}`;
  const stats=[];if(kind==='mahalla')stats.push([item.population,'Aholi'],[item.households,'Xonadon'],[item.families,'Oila']);if(kind==='business'){if(item.organizationType)stats.push([item.organizationType,'Tashkilot turi']);if(item.sector)stats.push([item.sector,'Sektor'])}const sh=$('#detailStats');if(sh)sh.innerHTML=stats.map(([v,l])=>`<div class="detail-stat"><strong>${typeof v==='number'?fmt(v):esc(v)}</strong><span>${esc(l)}</span></div>`).join('');renderDetailExtra(item,kind);const icon=kind==='mahalla'?'home':kind==='business'?getCategoryIcon(item.category):kind==='product'?'package':'marker';if($('#detailSymbol'))$('#detailSymbol').innerHTML=`<span class="icon">${svg(icon)}</span>`;showSmooth('#detailCard',{duration:460,keyframes:[{opacity:0,translate:'30px 0',scale:.955,filter:'blur(12px)'},{opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}]});state.markers.forEach(m=>m.el.classList.toggle('is-active',String(m.item.id)===String(item.id)));flyToItem(item);setTimeout(showConnector,430)}
function renderDetailExtra(item,kind){const host=$('#detailExtra');if(!host)return;const rows=[];if(kind==='mahalla'){if(item.schools)rows.push(['Maktablar',item.schools]);if(item.kindergartens)rows.push(['Bog‘chalar',item.kindergartens]);if(item.clinics)rows.push(['Tibbiyot',item.clinics]);if(item.mosques)rows.push(['Masjidlar',item.mosques]);if(item.shops)rows.push(['Savdo nuqtalari',item.shops]);if(item.head)rows.push(['MFY raisi',item.head])}if(kind==='business'){if(item.address)rows.push(['Manzil',item.address]);if(item.website)rows.push(['Veb-sayt',item.website])}host.innerHTML=rows.length?`<div class="detail-extra-grid">${rows.map(([l,v])=>`<div class="passport-row"><span>${esc(l)}</span><strong>${typeof v==='number'?fmt(v):esc(v)}</strong></div>`).join('')}</div>`:''}
function closeDetail(restore=true){const had=!!state.selected;hideSmooth('#detailCard',{duration:280,keyframes:[{opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'},{opacity:0,translate:'28px 0',scale:.97,filter:'blur(8px)'}]});document.body.classList.remove('detail-focus');hideConnector();state.markers.forEach(m=>m.el.classList.remove('is-active'));state.selected=null;if(restore&&had&&state.detailCamera)restoreCamera(state.detailCamera,820);state.detailCamera=null}

function showConnector(){if(!state.selected||window.innerWidth<=760){hideConnector();return}$('#uxConnector')?.classList.remove('hidden');updateConnector()}
function hideConnector(){$('#uxConnector')?.classList.add('hidden');if(state.connectorFrame){cancelAnimationFrame(state.connectorFrame);state.connectorFrame=null}}
function scheduleConnectorUpdate(){if(!state.selected||state.connectorFrame)return;state.connectorFrame=requestAnimationFrame(()=>{state.connectorFrame=null;updateConnector()})}
function updateConnector(){if(!state.selected||!state.map||window.innerWidth<=760)return;const marker=state.markers.find(m=>String(m.item.id)===String(state.selected.item.id)),card=$('#detailCard'),s=$('#uxConnector');if(!marker||!card||!s||card.classList.contains('hidden'))return;const mr=marker.el.getBoundingClientRect(),cr=card.getBoundingClientRect(),w=innerWidth,h=innerHeight;s.setAttribute('viewBox',`0 0 ${w} ${h}`);const x1=mr.left+mr.width/2,y1=mr.top+mr.height/2,x2=cr.left,y2=cr.top+Math.min(cr.height*.42,190),d=Math.max(90,Math.abs(x2-x1)*.43),path=`M ${x1} ${y1} C ${x1+d} ${y1}, ${x2-d*.65} ${y2}, ${x2} ${y2}`;$$('path',s).forEach(p=>p.setAttribute('d',path))}

async function openFilterPanel(){await closeMajorPanels();document.body.classList.remove('filter-closed');$('#explorePanel')?.classList.remove('hidden');state.activePanel='explore';setDockActive('explore');if(!motionDisabled())$('#explorePanel')?.animate([{opacity:.15,translate:'-18px 0',filter:'blur(5px)'},{opacity:1,translate:'0 0',filter:'blur(0px)'}],{duration:430,easing:easeOut()});setTimeout(()=>state.map?.resize(),360)}
function closeFilterPanel(){document.body.classList.add('filter-closed');state.activePanel='map';setDockActive('map');setTimeout(()=>state.map?.resize(),360)}
async function closeMajorPanels(except=null){const jobs=[];['investorPanel','productsPanel'].forEach(id=>{if(id!==except)jobs.push(hideSmooth('#'+id,{duration:260}))});if(except!=='searchDialog')jobs.push(hideSmooth('#searchDialog',{duration:230}));if(except!=='aiPanel')jobs.push(hideSmooth('#aiPanel',{duration:230}));await Promise.all(jobs)}
function setDockActive(name){$$('.dock-item').forEach(x=>x.classList.toggle('active',!!name&&x.dataset.nav===name))}
async function openPanel(name){if(name==='explore'){await openFilterPanel();return}closeDetail();if(document.body.classList.contains('passport-mode'))closePassportMode();await closeMajorPanels();document.body.classList.add('filter-closed');if(name==='invest')await showSmooth('#investorPanel',{duration:420});if(name==='products')await showSmooth('#productsPanel',{duration:420});state.activePanel=name;setDockActive(name)}
function openInvestorMode(){openPanel('invest');state.activeLayer='business';renderCategories();renderMarkers();state.map?.easeTo({pitch:35,bearing:-5,duration:750})}
async function closeInvestorMode(){await hideSmooth('#investorPanel',{duration:280});await openFilterPanel();state.map?.easeTo({pitch:10,bearing:0,duration:550})}

function allSearchItems(){return[...state.data.mahallas.map(x=>({...x,_kind:'mahalla',_type:'MFY'})),...state.data.businesses.map(x=>({...x,_kind:'business',_type:x.categoryName||'Tashkilot'})),...state.data.places.map(x=>({...x,_kind:'place',_type:categoryLabel(getCategory(x.category))})),...state.data.products.map(x=>({...x,_kind:'product',_type:'Mahsulot'}))]}
function searchLocal(q){q=normalize(q).trim();const all=allSearchItems();if(!q)return all.slice(0,12);const terms=q.split(/\s+/);return all.map(item=>{const hay=normalize([item.name,item.officialName,item.specialization,item.description,item.industry,item.sector,item.address,item.categoryName,item.organizationType,item._type].filter(Boolean).join(' '));let score=hay.startsWith(q)?4:0;terms.forEach(t=>{if(hay.includes(t))score+=2});return{item,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,30).map(x=>x.item)}
function renderSearchResults(q=''){const host=$('#searchResults');if(!host)return;const rows=searchLocal(q);if(!rows.length){host.innerHTML='<div class="search-empty">Natija topilmadi</div>';return}host.innerHTML=rows.map(i=>`<button type="button" class="search-result" data-search-id="${esc(i.id)}" data-search-kind="${esc(i._kind)}"><span class="result-icon"><span class="icon">${svg(i._kind==='mahalla'?'home':i._kind==='business'?'briefcase':'marker')}</span></span><span class="result-copy"><strong>${esc(i.name)}</strong><small>${esc(i.specialization||i.organizationType||i.address||i.description||'')}</small></span><span class="result-type">${esc(i._type)}</span></button>`).join('');$$('[data-search-id]',host).forEach(btn=>btn.addEventListener('click',()=>{const item=allSearchItems().find(x=>String(x.id)===btn.dataset.searchId&&x._kind===btn.dataset.searchKind);$('#searchDialog')?.classList.add('hidden');openDetail(item,item._kind)}))}

function renderProducts(){const host=$('#productGrid');if(!host)return;if(!state.data.products.length){host.innerHTML='<div class="search-empty">Hozircha mahsulotlar kiritilmagan.</div>';return}host.innerHTML=state.data.products.map(p=>`<button class="product-card" type="button" data-product="${esc(p.id)}"><div class="product-visual"><span class="icon">${svg('package')}</span></div><div class="product-info"><small>${esc(p.category||'')}</small><strong>${esc(p.name)}</strong><p>${esc(p.description||'')}</p></div></button>`).join('')}
function renderLanguages(){const host=$('#languageGrid');if(!host)return;host.innerHTML=LANGUAGES.map(l=>`<button type="button" class="language-option ${l.code===state.lang?'active':''}" data-lang="${l.code}"><span class="language-code">${esc(l.short)}</span><span><strong>${esc(l.native)}</strong><small>${esc(l.name)}</small></span></button>`).join('');$$('.language-option',host).forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)))}

function renderAISuggestions(){const host=$('#aiSuggestions');if(!host)return;const list=state.lang==='uz'?['Eng ko‘p aholili MFY qaysi?','Tumanda nechta MFY bor?','Dehqonchilikka ixtisoslashgan MFYlarni ko‘rsat','Investor uchun umumiy ma’lumot']:['Which mahalla has the largest population?','How many mahallas are there?','Show agricultural mahallas','Give me an investor overview'];host.innerHTML=list.map(x=>`<button type="button" class="ai-suggestion">${esc(x)}</button>`).join('');$$('.ai-suggestion',host).forEach(btn=>btn.addEventListener('click',()=>askAI(btn.textContent)))}
function ensureAIWelcome(){const host=$('#aiMessages');if(host&&!host.children.length)addMessage('assistant','Uchko‘prik tumani bo‘yicha tasdiqlangan ma’lumotlardan foydalanib yordam beraman.')}
function addMessage(role,text,sources=[]){const host=$('#aiMessages');if(!host)return;const el=document.createElement('div');el.className=`message ${role}`;el.textContent=text;if(sources.length){const row=document.createElement('div');row.className='source-row';sources.forEach(s=>{const b=document.createElement('span');b.className='badge verified';b.textContent=s;row.appendChild(b)});el.appendChild(row)}host.appendChild(el);host.scrollTop=host.scrollHeight}
function localAI(question){const q=normalize(question),d=state.data.district,m=state.data.mahallas;if(/nechta.*(mfy|mahalla)|how many.*mahalla/.test(q))return{text:`Uchko‘prik tumanida ${fmt(d.mahallas)} ta MFY mavjud.`,sources:['Tasdiqlangan ma’lumot']};if(/eng.*kop.*aholi|largest.*population|most populous/.test(q)){const top=[...m].sort((a,b)=>b.population-a.population)[0];return{text:`${top.name} — ${fmt(top.population)} nafar.`,sources:['Tasdiqlangan ma’lumot'],focus:top}}const spec=getSpecializationStats().find(x=>q.includes(normalize(x.name)));if(spec)return{text:`${spec.name} bo‘yicha ${spec.count} ta MFY topildi.`,action:'specialization',specialization:spec.name};if(/invest/.test(q))return{text:`Uchko‘prik tumani aholisi ${fmt(d.population)} nafar, maydoni ${fmt(d.areaKm2)} km².`,action:'invest'};const hit=searchLocal(question)[0];if(hit)return{text:`${hit.name} topildi.`,focus:hit};return{text:'Bu ma’lumot hozircha tasdiqlangan bazada mavjud emas.'}}
async function askAI(question){question=String(question||'').trim();if(!question)return;openAI();addMessage('user',question);if($('#aiInput'))$('#aiInput').value='';addMessage('system','Tahlil qilinmoqda…');let answer=null;try{const r=await fetch('/api/ai',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:question,lang:state.lang})});if(r.ok){const j=await r.json();if(j?.ok)answer=j}}catch{}$('#aiMessages .message.system:last-child')?.remove();if(!answer)answer=localAI(question);addMessage('assistant',answer.text||'—',answer.sources||[]);if(answer.action==='specialization'){state.activeLayer='mahalla';state.selectedSpecialization=answer.specialization;renderCategories();renderMarkers();openFilterPanel()}if(answer.action==='invest')openInvestorMode();if(answer.focus)setTimeout(()=>openDetail(answer.focus,answer.focus._kind||answer.focus.type||'mahalla'),220)}
async function openAI(){await closeMajorPanels('aiPanel');await showSmooth('#aiPanel',{duration:420,keyframes:[{opacity:0,translate:'18px 16px',scale:.96,filter:'blur(10px)'},{opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}]});ensureAIWelcome();setDockActive('ai')}

function setupVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();r.interimResults=false;r.continuous=false;r.onstart=()=>$('#voiceBtn')?.classList.add('listening');r.onend=()=>$('#voiceBtn')?.classList.remove('listening');r.onresult=e=>{const q=e.results[0][0].transcript;if($('#aiInput'))$('#aiInput').value=q;askAI(q)};state.voiceRecognition=r}
function startVoice(){if(!state.voiceRecognition){toast('Ovozli qidiruv','Brauzer qo‘llab-quvvatlamaydi');return}state.voiceRecognition.lang=localeCode();state.voiceRecognition.start()}

function openSheet(id){showSmooth('#'+id,{duration:360,keyframes:[{opacity:0,filter:'blur(8px)'},{opacity:1,filter:'blur(0px)'}]});setTimeout(refreshLiquidGlass,80)}function closeSheet(id){hideSmooth('#'+id,{duration:260,keyframes:[{opacity:1},{opacity:0,filter:'blur(6px)'}]})}
function loadPrefs(){let p={};try{p=JSON.parse(localStorage.getItem('uchkoprik-prefs')||'{}')}catch{}document.documentElement.dataset.theme=p.light?'light':'dark';document.documentElement.classList.toggle('reduce-motion',!!p.reduceMotion);document.documentElement.classList.toggle('reduce-transparency',!!p.reduceTransparency);document.documentElement.classList.toggle('high-contrast',!!p.highContrast);document.documentElement.style.setProperty('--font-scale',p.fontScale||1);if($('#lightModeToggle'))$('#lightModeToggle').checked=!!p.light;if($('#reduceMotionToggle'))$('#reduceMotionToggle').checked=!!p.reduceMotion;if($('#reduceTransparencyToggle'))$('#reduceTransparencyToggle').checked=!!p.reduceTransparency;if($('#highContrastToggle'))$('#highContrastToggle').checked=!!p.highContrast}
function savePrefs(){const p={light:!!$('#lightModeToggle')?.checked,reduceMotion:!!$('#reduceMotionToggle')?.checked,reduceTransparency:!!$('#reduceTransparencyToggle')?.checked,highContrast:!!$('#highContrastToggle')?.checked,fontScale:Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1};localStorage.setItem('uchkoprik-prefs',JSON.stringify(p));loadPrefs();applyMapTheme();updateIdleSphereTheme();refreshLiquidGlass()}
function setFont(key){document.documentElement.style.setProperty('--font-scale',{small:.92,normal:1,large:1.12}[key]||1);$$('[data-font]').forEach(b=>b.classList.toggle('active',b.dataset.font===key));savePrefs()}

const scenes=()=>[
  {eyebrow:'DIGITAL DISTRICT',title:'Uchko‘prik tumani',text:'Raqamli hudud, xarita va tasdiqlangan ma’lumotlar.',center:[71.045,40.54],zoom:9.7,pitch:20,bearing:0},
  {eyebrow:'51 MFY',title:'Mahallalar',text:'51 ta mahalla yagona interaktiv xaritada.',center:[71.045,40.54],zoom:10.4,pitch:38,bearing:-7},
  {eyebrow:'AHOLI',title:fmt(state.data.district.population),text:'Tasdiqlangan tuman statistikasi.',center:[71.03,40.54],zoom:10.7,pitch:44,bearing:8},
  {eyebrow:'IQTISODIYOT',title:'Investor Mode',text:'Sanoat, qishloq xo‘jaligi va xizmatlar.',center:[71.07,40.53],zoom:11,pitch:50,bearing:-10},
  {eyebrow:'MADE IN UCHKO‘PRIK',title:'Mahalliy mahsulotlar',text:'Mahalliy ishlab chiqaruvchilar va mahsulotlar.',center:[71.01,40.50],zoom:10.8,pitch:42,bearing:10},
  {eyebrow:'AI · MAP · DATA',title:'Digital District',text:'Raqamli boshqaruv va zamonaviy hududiy ma’lumotlar.',center:[71.045,40.54],zoom:9.8,pitch:50,bearing:0}
];
function openPresentation(){showSmooth('#presentationOverlay',{duration:620,keyframes:[{opacity:0,scale:1.035,filter:'blur(14px)'},{opacity:1,scale:1,filter:'blur(0px)'}]});state.presentation.index=0;state.presentation.playing=true;if(!state.presentation.map)state.presentation.map=new maplibregl.Map({container:'presentationMap',style:getMapStyleUrl(),center:[71.045,40.54],zoom:9.7,pitch:20,interactive:false,attributionControl:true});renderScene();scheduleScene()}
function closePresentation(){hideSmooth('#presentationOverlay',{duration:360,keyframes:[{opacity:1,scale:1},{opacity:0,scale:1.025,filter:'blur(10px)'}]});clearTimeout(state.presentation.timer)}
function renderScene(){const all=scenes(),s=all[state.presentation.index];setText('#sceneEyebrow',s.eyebrow);setText('#sceneTitle',s.title);setText('#sceneText',s.text);setText('#sceneCounter',`${state.presentation.index+1} / ${all.length}`);if($('#scenePlay'))$('#scenePlay').innerHTML=`<span class="icon">${svg(state.presentation.playing?'pause':'play')}</span>`;state.presentation.map?.flyTo({center:s.center,zoom:s.zoom,pitch:s.pitch,bearing:s.bearing,duration:document.documentElement.classList.contains('reduce-motion')?0:1600})}
function scheduleScene(){clearTimeout(state.presentation.timer);if(!state.presentation.playing)return;state.presentation.timer=setTimeout(()=>{state.presentation.index=(state.presentation.index+1)%scenes().length;renderScene();scheduleScene()},6500)}
function sceneStep(d){state.presentation.index=(state.presentation.index+d+scenes().length)%scenes().length;renderScene();scheduleScene()}function togglePresentationPlay(){state.presentation.playing=!state.presentation.playing;renderScene();scheduleScene()}


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
    const animate=()=>{state.idle.frame=requestAnimationFrame(animate);if(!state.idle.active)return;const t=performance.now();if(!state.idle.dragging)state.idle.targetY+=.00135;group.rotation.x+=(state.idle.targetX-group.rotation.x)*.045;group.rotation.y+=(state.idle.targetY-group.rotation.y)*.055;group.rotation.z=Math.sin(t*.00011)*.045;group.scale.setScalar(1+Math.sin(t*.00072)*.007);points.material.opacity=.82+Math.sin(t*.0013)*.12;renderer.render(scene,camera)};
    animate();
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
  state.map?.resize();
  if(!motionDisabled())$('#idleSphereCanvas')?.animate([{opacity:0,scale:.24,rotate:'-8deg',filter:'blur(22px)'},{opacity:1,scale:1,rotate:'0deg',filter:'blur(0px)'}],{duration:1050,easing:easeOut()});
}
function exitIdleMode(){
  if(!state.idle.active)return;
  state.idle.active=false;
  if(!motionDisabled())$('#idleSphereCanvas')?.animate([{opacity:1,scale:1,filter:'blur(0px)'},{opacity:0,scale:.34,filter:'blur(18px)'}],{duration:620,easing:'cubic-bezier(.4,0,.2,1)'});
  document.body.classList.remove('idle-mode');
  $('#idleSphereOverlay')?.setAttribute('aria-hidden','true');
  setTimeout(()=>{state.map?.resize();if(!motionDisabled())$('#map')?.animate([{scale:.82,opacity:.12,filter:'blur(12px)'},{scale:1,opacity:1,filter:'blur(0px)'}],{duration:820,easing:easeOut()})},420);
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
function renderAllTextual(){renderCategories();renderProducts();renderDistrictMetrics();renderAISuggestions()}

function setupEvents(){
  $('#exploreClose')?.addEventListener('click',closeFilterPanel);$('#filterToggle')?.addEventListener('click',openFilterPanel);$('#fitDistrict')?.addEventListener('click',()=>{state.selectedSpecialization=null;state.selectedOrganizationType=null;renderSpecializationFilters();renderOrganizationFilters();applyMarkerFilters();fitDistrict()});$('#specializationReset')?.addEventListener('click',()=>{state.selectedSpecialization=null;renderSpecializationFilters();applyMarkerFilters()});$('#organizationFilterReset')?.addEventListener('click',()=>{state.selectedOrganizationType=null;renderOrganizationFilters();applyMarkerFilters()});
  $('#districtPassportBtn')?.addEventListener('click',openPassportMode);$('#districtClose')?.addEventListener('click',()=>closePassportMode());
  $('#searchOpen')?.addEventListener('click',async()=>{await closeMajorPanels('searchDialog');await showSmooth('#searchDialog',{duration:380,keyframes:[{opacity:0,translate:'0 -10px',scale:.97,filter:'blur(10px)'},{opacity:1,translate:'0 0',scale:1,filter:'blur(0px)'}]});renderSearchResults();setTimeout(()=>$('#globalSearch')?.focus(),40)});$('#searchClose')?.addEventListener('click',()=>hideSmooth('#searchDialog',{duration:240}));$('#globalSearch')?.addEventListener('input',e=>renderSearchResults(e.target.value));
  $$('.dock-item').forEach(btn=>btn.addEventListener('click',()=>{const nav=btn.dataset.nav;if(nav==='explore')return openFilterPanel();if(nav==='map'){closeMajorPanels();closeDetail();if(document.body.classList.contains('passport-mode'))closePassportMode();closeFilterPanel();fitDistrict();return}if(nav==='ai')return openAI();if(nav==='invest')return openInvestorMode();if(nav==='products')return openPanel('products')}));
  $('#investorClose')?.addEventListener('click',closeInvestorMode);$('#showBusinesses')?.addEventListener('click',()=>{state.activeLayer='business';renderCategories();renderMarkers();closeInvestorMode()});$('#askInvestment')?.addEventListener('click',()=>askAI('Uchko‘prik investitsiya imkoniyatlari haqida umumiy ma’lumot ber'));$('#productsClose')?.addEventListener('click',openFilterPanel);
  $('#detailClose')?.addEventListener('click',()=>closeDetail());$('#detailDirections')?.addEventListener('click',()=>{const i=state.selected?.item;if(validCoords(i))window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${i.lat},${i.lng}`)}`,'_blank','noopener')});$('#detailAsk')?.addEventListener('click',()=>{if(state.selected)askAI(`${state.selected.item.name} haqida ma’lumot ber`)});$('#detailShare')?.addEventListener('click',async()=>{const i=state.selected?.item;try{if(navigator.share)await navigator.share({title:i?.name||'Uchko‘prik',url:location.href});else{await navigator.clipboard.writeText(location.href);toast('Havola nusxalandi')}}catch{}});
  $('#aiClose')?.addEventListener('click',()=>{hideSmooth('#aiPanel',{duration:260});setDockActive(state.activePanel==='explore'?'explore':'map')});$('#aiForm')?.addEventListener('submit',e=>{e.preventDefault();askAI($('#aiInput')?.value)});$('#voiceBtn')?.addEventListener('click',startVoice);
  $('#languageBtn')?.addEventListener('click',()=>openSheet('languageSheet'));$('#accessibilityBtn')?.addEventListener('click',()=>openSheet('accessibilitySheet'));$$('[data-sheet-close]').forEach(btn=>btn.addEventListener('click',()=>closeSheet(btn.dataset.sheetClose)));$$('.sheet-backdrop').forEach(s=>s.addEventListener('click',e=>{if(e.target===s)closeSheet(s.id)}));['lightModeToggle','reduceMotionToggle','reduceTransparencyToggle','highContrastToggle'].forEach(id=>$('#'+id)?.addEventListener('change',savePrefs));$$('[data-font]').forEach(btn=>btn.addEventListener('click',()=>setFont(btn.dataset.font)));
  $('#presentationBtn')?.addEventListener('click',openPresentation);$('#presentationExit')?.addEventListener('click',closePresentation);$('#scenePrev')?.addEventListener('click',()=>sceneStep(-1));$('#sceneNext')?.addEventListener('click',()=>sceneStep(1));$('#scenePlay')?.addEventListener('click',togglePresentationPlay);$('#idleSphereClose')?.addEventListener('click',()=>{exitIdleMode();resetIdleTimer()});
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#searchOpen')?.click()}if(e.key==='Escape'){if(state.selected){closeDetail();return}if(document.body.classList.contains('passport-mode')){closePassportMode();return}$('#searchDialog')?.classList.add('hidden');$('#aiPanel')?.classList.add('hidden');if(!$('#presentationOverlay')?.classList.contains('hidden'))closePresentation()}if(!$('#presentationOverlay')?.classList.contains('hidden')){if(e.key==='ArrowRight')sceneStep(1);if(e.key==='ArrowLeft')sceneStep(-1)}});window.addEventListener('resize',()=>{scheduleConnectorUpdate();state.map?.resize()});
}

async function boot(){detectLanguage();loadPrefs();ensureIdleOverlay();ensureSphereTestButton();bindIcons();initLiquidGlassSystem();console.log('Uchko‘prik Digital District UX V2 ishga tushmoqda...');await loadData();applyLanguage();renderLanguages();setupEvents();setupVoice();initMap();ensureAIWelcome();setupIdleDetection();refreshLiquidGlass();requestAnimationFrame(()=>requestAnimationFrame(animateChromeIn));if('serviceWorker'in navigator){navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(e=>console.warn('Service Worker:',e))}console.log('Uchko‘prik Digital District UX V2 tayyor.')}
boot().catch(error=>{console.error('Application error:',error);toast('Application error',error.message)});
