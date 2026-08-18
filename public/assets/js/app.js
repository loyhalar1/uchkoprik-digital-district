import { LANGUAGES, t, langMeta } from './i18n.js';

const ICONS = {
  search:'<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.7-3.7"></path>',
  presentation:'<rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path>',
  accessibility:'<circle cx="12" cy="4.5" r="2"></circle><path d="M5 8h14M12 7v6m0 0-4 8m4-8 4 8"></path>',
  chevronDown:'<path d="m7 10 5 5 5-5"></path>', x:'<path d="M6 6l12 12M18 6 6 18"></path>',
  chart:'<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"></path>', package:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path><path d="m4 7.5 8 4.5 8-4.5M12 12v9"></path>',
  landmark:'<path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 21h20M12 3l9 4H3l9-4Z"></path>',
  briefcase:'<rect x="3" y="7" width="18" height="12" rx="2"></rect><path d="M9 7V5h6v2m-12 5h18"></path>',
  sparkles:'<path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM5 14l1 2.8L9 18l-3 1-1 3-1-3-3-1 3-1.2L5 14Z"></path>',
  shield:'<path d="M12 3 20 6v5c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3Z"></path><path d="m9 12 2 2 4-4"></path>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  navigation:'<path d="m4 4 16 7-7 2-2 7-7-16Z"></path>', share:'<circle cx="18" cy="5" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="18" cy="19" r="2"></circle><path d="m8 11 8-5m-8 7 8 5"></path>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>', arrowUp:'<path d="m12 19 0-14m-6 6 6-6 6 6"></path>',
  compass:'<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"></path>', map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"></path><path d="M9 3v15m6-12v15"></path>',
  arrowRight:'<path d="M5 12h14m-5-5 5 5-5 5"></path>', arrowLeft:'<path d="M19 12H5m5-5-5 5 5 5"></path>', pause:'<path d="M9 5v14M15 5v14"></path>', play:'<path d="m8 5 11 7-11 7V5Z"></path>',
  school:'<path d="m3 10 9-5 9 5-9 5-9-5Z"></path><path d="M7 13v4c2.6 2 7.4 2 10 0v-4M21 10v6"></path>',
  health:'<path d="M12 21s-7-4.4-7-10.2C5 7.5 7.2 5 10 5c1.4 0 2.6.7 3 1.5C13.4 5.7 14.6 5 16 5c2.8 0 5 2.5 5 5.8C21 16.6 12 21 12 21Z"></path><path d="M8 12h8M12 8v8"></path>',
  service:'<path d="M4 7h16v12H4z"></path><path d="M8 7V4h8v3M8 12h8"></path>', home:'<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"></path>',
  marker:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
  info:'<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path>'
};

const iconForCategory = {mahalla:'home',business:'briefcase',education:'school',health:'health',culture:'landmark',service:'service',investment:'chart'};
const state = {
  lang:'uz', data:{mahallas:[],categories:[],places:[],businesses:[],products:[],district:{}},
  map:null, markers:[], selected:null, activeCategories:new Set(['mahalla']), activePanel:'explore',
  presentation:{map:null,index:0,timer:null,playing:true}, voiceRecognition:null
};

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const fmt = n => new Intl.NumberFormat(state.lang === 'zh' ? 'zh-CN' : state.lang).format(Number(n)||0);
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':'&quot;'}[c]));
function svg(name){ return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||ICONS.info}</svg>`; }
function bindIcons(root=document){ $$('[data-icon]',root).forEach(el=>el.innerHTML=svg(el.dataset.icon)); }
function tr(key){ return t(state.lang,key); }

function detectLanguage(){
  const seg = location.pathname.split('/').filter(Boolean)[0];
  state.lang = LANGUAGES.some(l=>l.code===seg) ? seg : (localStorage.getItem('uchkoprik-lang') || 'uz');
}
function applyLanguage(){
  const meta=langMeta(state.lang);
  document.documentElement.lang=meta.code; document.documentElement.dir=meta.dir;
  $('#langShort').textContent=meta.short;
  $$('[data-i18n]').forEach(el=>el.textContent=tr(el.dataset.i18n));
  $$('[data-i18n-placeholder]').forEach(el=>el.placeholder=tr(el.dataset.i18nPlaceholder));
  $$('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',tr(el.dataset.i18nAria)));
  localStorage.setItem('uchkoprik-lang',state.lang);
  renderAllTextual();
}
function setLanguage(code){
  if(!LANGUAGES.some(l=>l.code===code)) return;
  state.lang=code; applyLanguage(); closeSheet('languageSheet'); renderLanguages();
  const parts=location.pathname.split('/').filter(Boolean); if(parts.length && LANGUAGES.some(l=>l.code===parts[0])) parts[0]=code; else parts.unshift(code);
  history.pushState({},'',`/${parts.join('/')}${location.search}${location.hash}`);
}

async function fetchJSON(url){ const r=await fetch(url,{headers:{accept:'application/json'}}); if(!r.ok) throw new Error(`${r.status}`); return r.json(); }
async function loadData(){
  try{
    const payload=await fetchJSON(`/api/bootstrap?lang=${encodeURIComponent(state.lang)}`);
    if(payload?.ok && payload.data){ state.data=payload.data; return; }
  }catch(e){ console.info('API bootstrap fallback:',e.message); }
  const [mahallas,demo,district]=await Promise.all([fetchJSON('/data/mahallas.json'),fetchJSON('/data/demo.json'),fetchJSON('/data/district.json')]);
  state.data={mahallas,categories:demo.categories,places:demo.places,businesses:demo.businesses,products:demo.products,district};
}

function initMap(){
  const reduced=document.documentElement.classList.contains('reduce-motion');
  state.map=new maplibregl.Map({
    container:'map', style:'https://tiles.openfreemap.org/styles/liberty', center:[71.045,40.54], zoom:10.2, pitch:reduced?0:15, bearing:0,
    attributionControl:true, cooperativeGestures:false
  });
  state.map.addControl(new maplibregl.NavigationControl({showCompass:true,visualizePitch:true}),'top-right');
  state.map.on('load',()=>{ renderMarkers(); fitDistrict(false); });
}

function clearMarkers(){ state.markers.forEach(x=>x.marker.remove()); state.markers=[]; }
function markerElement(item,color,kind){
  const el=document.createElement('button'); el.type='button'; el.className=kind==='mahalla'?'mfy-marker':'place-marker'; el.setAttribute('aria-label',item.name);
  if(kind==='mahalla') el.innerHTML=`<span class="mfy-dot" style="--marker:${color}"></span>`;
  else el.innerHTML=`<span class="place-pin" style="--marker:${color}"><span class="icon">${svg(iconForCategory[item.category]||'marker')}</span></span>`;
  el.addEventListener('click',e=>{e.stopPropagation();openDetail(item,kind);}); return el;
}
function addMarker(item,kind,color){
  if(!Number.isFinite(Number(item.lng))||!Number.isFinite(Number(item.lat)))return;
  const el=markerElement(item,color,kind); const marker=new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([Number(item.lng),Number(item.lat)]).addTo(state.map);
  state.markers.push({item,kind,marker,el});
}
function renderMarkers(){
  if(!state.map) return; clearMarkers();
  const cats=state.data.categories || [];
  if(state.activeCategories.has('mahalla')) (state.data.mahallas||[]).forEach((m,i)=>addMarker({...m,type:'mahalla',category:'mahalla'},'mahalla',cats.find(c=>c.id==='mahalla')?.color || `hsl(${(i*37)%360} 75% 65%)`));
  (state.data.places||[]).forEach(p=>{if(state.activeCategories.has(p.category)) addMarker(p,'place',cats.find(c=>c.id===p.category)?.color||'#65e5ff')});
  (state.data.businesses||[]).forEach(b=>{if(state.activeCategories.has('business')) addMarker(b,'business',cats.find(c=>c.id==='business')?.color||'#a78bfa')});
}
function fitDistrict(animate=true){
  if(!state.map || !state.data.mahallas?.length) return;
  const b=new maplibregl.LngLatBounds(); state.data.mahallas.forEach(m=>b.extend([m.lng,m.lat]));
  state.map.fitBounds(b,{padding:{top:110,bottom:100,left:window.innerWidth>760?390:40,right:40},duration:animate&&!document.documentElement.classList.contains('reduce-motion')?900:0,maxZoom:11.4});
}
function flyTo(item,pitch=25){
  if(!state.map)return; state.map.flyTo({center:[item.lng,item.lat],zoom:13.2,pitch:document.documentElement.classList.contains('reduce-motion')?0:pitch,duration:document.documentElement.classList.contains('reduce-motion')?0:850,essential:true});
}

function renderQuickStats(){
  const d=state.data.district||{}; $('#quickStats').innerHTML=[
    [d.mahallas||state.data.mahallas.length,tr('mahallas')],[d.population,tr('population')],[d.households,tr('households')],[d.families,tr('families')]
  ].map(([v,l])=>`<div class="stat-chip"><strong>${fmt(v)}</strong><span>${esc(l)}</span></div>`).join('');
}
function renderCategories(){
  const el=$('#categoryChips'); el.innerHTML=(state.data.categories||[]).filter(c=>c.active!==0).map(c=>`<button class="category-chip ${state.activeCategories.has(c.id)?'active':''}" style="--chip:${c.color||'#65e5ff'}" data-category="${esc(c.id)}"><span class="dot" style="color:${c.color||'#65e5ff'};background:${c.color||'#65e5ff'}"></span><span>${esc(categoryLabel(c))}</span></button>`).join('');
  $$('.category-chip',el).forEach(btn=>btn.addEventListener('click',()=>toggleCategory(btn.dataset.category)));
}
function categoryLabel(c){
  const map={mahalla:'mahallas',business:'businesses',education:'education',health:'health',culture:'culture',service:'services',investment:'investment'};
  return map[c.id]?tr(map[c.id]):c.name;
}
function toggleCategory(id,force){
  const on=force===undefined?!state.activeCategories.has(id):force; if(on)state.activeCategories.add(id); else state.activeCategories.delete(id);
  renderCategories(); renderMarkers();
}
function renderProducts(){
  $('#productGrid').innerHTML=(state.data.products||[]).map(p=>`<button class="product-card" data-product="${esc(p.id)}"><div class="product-visual"><span class="icon">${svg('package')}</span></div><div class="product-info"><small>${esc(p.category||'')}</small><strong>${esc(p.name)}</strong><p>${esc(p.description||'')}</p></div></button>`).join('');
  $$('.product-card').forEach(x=>x.addEventListener('click',()=>openDetail(state.data.products.find(p=>p.id===x.dataset.product),'product')));
}
function renderDistrictMetrics(){
  const d=state.data.district||{}; const items=[[d.mahallas||51,tr('mahallas')],[d.population,tr('totalPopulation')],[d.households,tr('totalHouseholds')],[d.families,tr('totalFamilies')]];
  $('#districtMetrics').innerHTML=items.map(([v,l])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>${esc(tr('sourceOfficial'))}</small></div>`).join('');
  $('#districtUpdated').textContent=d.updatedAt||'—';
  $('#investorMetrics').innerHTML=[
    [d.population,tr('population'),true],[state.data.businesses.length,tr('businesses'),state.data.businesses.every(x=>x.verified)],
    [d.mahallas||51,tr('mahallas'),true],[state.data.products.length,tr('products'),false]
  ].map(([v,l,official])=>`<div class="metric-card"><strong>${fmt(v)}</strong><span>${esc(l)}</span><small>${esc(official?tr('sourceOfficial'):tr('sourceDemo'))}</small></div>`).join('');
}
function renderLanguages(){
  $('#languageGrid').innerHTML=LANGUAGES.map(l=>`<button class="language-option ${l.code===state.lang?'active':''}" data-lang="${l.code}"><span class="language-code">${l.short}</span><span><strong>${esc(l.native)}</strong><small>${esc(l.name)}</small></span></button>`).join('');
  $$('.language-option').forEach(x=>x.addEventListener('click',()=>setLanguage(x.dataset.lang)));
}
function renderAllTextual(){ renderQuickStats();renderCategories();renderProducts();renderDistrictMetrics();renderAISuggestions(); }

function openDetail(item,kind){
  if(!item)return; state.selected={item,kind};
  $('#detailKicker').textContent = kind==='mahalla'?tr('mahallas'):kind==='business'?tr('businesses'):kind==='product'?tr('products'):(categoryLabel(state.data.categories.find(c=>c.id===item.category)||{id:item.category,name:item.category})||tr('places'));
  $('#detailTitle').textContent=item.name||item.officialName||'—';
  $('#detailDescription').textContent=item.description || (kind==='mahalla' ? `${tr('specialization')}: ${item.specialization||'—'}` : tr('unknown'));
  $('#detailVerification').innerHTML=`<span class="badge ${item.verified?'verified':'demo'}"><span class="icon">${svg(item.verified?'shield':'info')}</span>${esc(item.verified?tr('verified'):tr('demo'))}</span>${item.updatedAt?`<span class="badge">${esc(tr('lastUpdated'))}: ${esc(item.updatedAt)}</span>`:''}`;
  const stat=[]; if(kind==='mahalla'){stat.push([item.population,tr('population')],[item.households,tr('households')],[item.families,tr('families')]);}
  if(kind==='business'&&item.industry)stat.push([item.industry,tr('specialization')]); if(kind==='product'&&item.producer)stat.push([item.producer,tr('businesses')]);
  $('#detailStats').innerHTML=stat.map(([v,l])=>`<div class="detail-stat"><strong>${typeof v==='number'?fmt(v):esc(v)}</strong><span>${esc(l)}</span></div>`).join('');
  $('#detailSymbol').innerHTML=`<span class="icon">${svg(kind==='product'?'package':kind==='business'?'briefcase':kind==='mahalla'?'home':iconForCategory[item.category]||'marker')}</span>`;
  $('#detailCard').classList.remove('hidden');
  if(item.lat&&item.lng) flyTo(item);
  state.markers.forEach(x=>x.el.classList.toggle('is-active',x.item.id===item.id));
}
function closeDetail(){ $('#detailCard').classList.add('hidden'); state.selected=null; state.markers.forEach(x=>x.el.classList.remove('is-active')); }

function openPanel(name){
  ['investorPanel','productsPanel','districtPanel'].forEach(id=>$('#'+id).classList.add('hidden'));
  if(name==='explore'){ $('#explorePanel').classList.remove('hidden'); state.activePanel='explore'; }
  else { $('#explorePanel').classList.add('hidden'); const id={invest:'investorPanel',products:'productsPanel',district:'districtPanel'}[name]; if(id) $('#'+id).classList.remove('hidden'); state.activePanel=name; }
  $$('.dock-item').forEach(x=>x.classList.toggle('active',x.dataset.nav===name));
}
function openSheet(id){ $('#'+id).classList.remove('hidden'); }
function closeSheet(id){ $('#'+id).classList.add('hidden'); }
function toast(title,body=''){ const el=document.createElement('div'); el.className='toast'; el.innerHTML=`<strong>${esc(title)}</strong>${body?`<small>${esc(body)}</small>`:''}`; $('#toastHost').appendChild(el); setTimeout(()=>el.remove(),3200); }

function allSearchItems(){
  return [
    ...(state.data.mahallas||[]).map(x=>({...x,_kind:'mahalla',_type:tr('mahallas')})),
    ...(state.data.businesses||[]).map(x=>({...x,_kind:'business',_type:tr('businesses')})),
    ...(state.data.places||[]).map(x=>({...x,_kind:'place',_type:categoryLabel(state.data.categories.find(c=>c.id===x.category)||{id:x.category,name:x.category})})),
    ...(state.data.products||[]).map(x=>({...x,_kind:'product',_type:tr('products')}))
  ];
}
function normalize(s){return String(s||'').toLowerCase().replace(/[ʻ’'`]/g,'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').normalize('NFC')}
function searchLocal(q){
  q=normalize(q).trim(); if(!q)return allSearchItems().slice(0,8);
  const terms=q.split(/\s+/); return allSearchItems().map(item=>{const hay=normalize([item.name,item.officialName,item.specialization,item.description,item.industry,item.producer,item._type].filter(Boolean).join(' ')); const score=terms.reduce((s,x)=>s+(hay.includes(x)?1:0),0)+(hay.startsWith(q)?2:0); return {item,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,30).map(x=>x.item);
}
function renderSearchResults(q=''){
  const rows=searchLocal(q); const host=$('#searchResults'); if(!rows.length){host.innerHTML=`<div class="search-empty">${esc(tr('noResults'))}</div>`;return;}
  host.innerHTML=rows.map(x=>`<button class="search-result" data-kind="${x._kind}" data-id="${esc(String(x.id))}"><span class="result-icon"><span class="icon">${svg(x._kind==='mahalla'?'home':x._kind==='business'?'briefcase':x._kind==='product'?'package':iconForCategory[x.category]||'marker')}</span></span><span class="result-copy"><strong>${esc(x.name)}</strong><small>${esc(x.specialization||x.industry||x.description||x.producer||'')}</small></span><span class="result-type">${esc(x._type)}</span></button>`).join('');
  $$('.search-result',host).forEach(btn=>btn.addEventListener('click',()=>{const item=allSearchItems().find(x=>String(x.id)===btn.dataset.id&&x._kind===btn.dataset.kind); $('#searchDialog').classList.add('hidden');openDetail(item,item._kind);}));
}

function renderAISuggestions(){
  const byLang={
    uz:['Eng ko‘p aholili MFY qaysi?','Tumanda nechta MFY bor?','Korxonalarni xaritada ko‘rsat','Investor uchun umumiy ma’lumot'],
    en:['Which mahalla has the largest population?','How many mahallas are there?','Show businesses on the map','Give me an investor overview'],
    ru:['Какая махалля самая населённая?','Сколько махаллей в районе?','Покажи предприятия','Информация для инвестора'],
    zh:['哪个社区人口最多？','该地区有多少个社区？','在地图上显示企业','给我投资者概览'],
    ar:['ما الحي الأكثر سكاناً؟','كم عدد الأحياء في المنطقة؟','اعرض الشركات على الخريطة','أعطني نظرة عامة للمستثمر'],
    tr:['En kalabalık mahalle hangisi?','İlçede kaç mahalle var?','İşletmeleri haritada göster','Yatırımcı özeti ver'],
    ko:['인구가 가장 많은 마할라는 어디인가요?','지구에 마할라가 몇 개 있나요?','지도에 기업을 표시해 주세요','투자자 개요를 알려 주세요'],
    de:['Welche Mahalla hat die größte Bevölkerung?','Wie viele Mahallas gibt es?','Unternehmen auf der Karte anzeigen','Gib mir einen Investorenüberblick'],
    fr:['Quelle mahalla a la plus grande population ?','Combien de mahallas y a-t-il ?','Afficher les entreprises sur la carte','Donnez-moi un aperçu pour investisseur'],
    es:['¿Qué mahalla tiene más población?','¿Cuántas mahallas hay?','Mostrar empresas en el mapa','Dame un resumen para inversores']
  };
  const suggestions=byLang[state.lang]||byLang.en;
  $('#aiSuggestions').innerHTML=suggestions.map(s=>`<button class="ai-suggestion">${esc(s)}</button>`).join('');
  $$('.ai-suggestion').forEach(x=>x.addEventListener('click',()=>askAI(x.textContent)));
}
function ensureAIWelcome(){ if(!$('#aiMessages').children.length) addMessage('assistant',tr('aiWelcome')); }
function addMessage(role,text,sources=[]){ const el=document.createElement('div'); el.className=`message ${role}`; el.textContent=text; if(sources.length){const row=document.createElement('div');row.className='source-row';sources.forEach(s=>{const b=document.createElement('span');b.className='badge verified';b.textContent=s;row.appendChild(b)});el.appendChild(row)} $('#aiMessages').appendChild(el); $('#aiMessages').scrollTop=$('#aiMessages').scrollHeight; }
function localAI(question){
  const q=normalize(question), d=state.data.district||{}, m=state.data.mahallas||[];
  const F={
    uz:{count:n=>`Uchko‘prik tumanidagi tasdiqlangan bazada ${n} ta MFY mavjud.`,pop:n=>`Tuman bo‘yicha yuklangan MFY ma’lumotlarining jami aholisi ${n} nafar.`,top:(name,n)=>`Tasdiqlangan MFY ma’lumotlari bo‘yicha eng ko‘p aholi ${name} MFYda: ${n} nafar.`,business:'Xaritadagi “Korxonalar” qatlamini yoqdim. Demo yozuvlar rasmiy ma’lumot sifatida ko‘rsatilmaydi.',invest:'Investor rejimida tuman aholisi, MFYlar, korxonalar va mahalliy mahsulotlar bir joyda ko‘rsatiladi. Faqat tasdiqlangan qiymatlar rasmiy sifatida belgilanadi.',found:n=>`${n} topildi. Uni xaritada yoki ma’lumot kartasida ko‘rsatishim mumkin.`,unknown:'Bu ma’lumot tasdiqlangan bazada hozircha mavjud emas.'},
    en:{count:n=>`The verified district dataset contains ${n} mahallas.`,pop:n=>`The loaded verified mahalla dataset totals ${n} residents.`,top:(name,n)=>`According to the verified dataset, ${name} has the largest population: ${n} people.`,business:'I enabled the Businesses layer. Demo records are clearly marked as unverified.',invest:'Investor Mode brings together population, mahallas, businesses and local products. Only verified values are labeled as official.',found:n=>`I found ${n}. I can show it on the map and open its data card.`,unknown:'This information is not available in the verified dataset yet.'},
    ru:{count:n=>`В подтверждённой базе Учкуприкского района указано ${n} махаллей.`,pop:n=>`Суммарное население по загруженным данным махаллей: ${n} человек.`,top:(name,n)=>`По подтверждённым данным самая высокая численность населения в махалле ${name}: ${n} человек.`,business:'Я включил слой «Предприятия». Демо-записи явно помечены как неподтверждённые.',invest:'В режиме инвестора объединены население, махалли, предприятия и местная продукция. Официальными считаются только проверенные значения.',found:n=>`Найдено: ${n}. Я могу показать объект на карте и открыть карточку данных.`,unknown:'Этой информации пока нет в подтверждённой базе.'},
    zh:{count:n=>`已核实的地区数据集中共有 ${n} 个社区。`,pop:n=>`已加载并核实的社区数据合计人口为 ${n} 人。`,top:(name,n)=>`根据已核实的数据，${name} 的人口最多：${n} 人。`,business:'已启用企业图层。演示记录会明确标注为未核实。',invest:'投资者模式汇总人口、社区、企业和本地产品，只有已核实的值才会标记为官方数据。',found:n=>`已找到 ${n}，我可以在地图上显示并打开其数据卡片。`,unknown:'已核实的数据集中暂时没有这项信息。'},
    ar:{count:n=>`تحتوي قاعدة بيانات المنطقة الموثقة على ${n} حياً.`,pop:n=>`يبلغ إجمالي السكان في بيانات الأحياء الموثقة والمحملة ${n} نسمة.`,top:(name,n)=>`وفق البيانات الموثقة، يملك حي ${name} أكبر عدد من السكان: ${n} نسمة.`,business:'تم تفعيل طبقة الشركات. السجلات التجريبية مميزة بوضوح على أنها غير موثقة.',invest:'يجمع وضع المستثمر السكان والأحياء والشركات والمنتجات المحلية، ولا تُعتبر رسمية إلا القيم الموثقة.',found:n=>`تم العثور على ${n}. يمكنني إظهاره على الخريطة وفتح بطاقة البيانات.`,unknown:'هذه المعلومة غير متوفرة حالياً في قاعدة البيانات الموثقة.'},
    tr:{count:n=>`Doğrulanmış ilçe veri setinde ${n} mahalle bulunmaktadır.`,pop:n=>`Yüklenen doğrulanmış mahalle verilerindeki toplam nüfus ${n} kişidir.`,top:(name,n)=>`Doğrulanmış verilere göre en yüksek nüfus ${name} mahallesindedir: ${n} kişi.`,business:'İşletmeler katmanını açtım. Demo kayıtlar doğrulanmamış olarak açıkça işaretlenir.',invest:'Yatırımcı Modu nüfus, mahalleler, işletmeler ve yerel ürünleri bir araya getirir. Yalnızca doğrulanmış değerler resmî olarak işaretlenir.',found:n=>`${n} bulundu. Haritada gösterebilir ve veri kartını açabilirim.`,unknown:'Bu bilgi doğrulanmış veri setinde henüz mevcut değil.'},
    ko:{count:n=>`검증된 지구 데이터에는 ${n}개의 마할라가 있습니다.`,pop:n=>`불러온 검증된 마할라 데이터의 총인구는 ${n}명입니다.`,top:(name,n)=>`검증된 데이터에 따르면 ${name}의 인구가 가장 많습니다: ${n}명.`,business:'기업 레이어를 켰습니다. 데모 기록은 미검증 데이터로 명확히 표시됩니다.',invest:'투자자 모드는 인구, 마할라, 기업 및 지역 제품을 한곳에 모읍니다. 검증된 값만 공식 데이터로 표시됩니다.',found:n=>`${n}을(를) 찾았습니다. 지도에 표시하고 데이터 카드를 열 수 있습니다.`,unknown:'검증된 데이터 세트에 아직 이 정보가 없습니다.'},
    de:{count:n=>`Der verifizierte Bezirksdatensatz enthält ${n} Mahallas.`,pop:n=>`Die geladenen verifizierten Mahalla-Daten ergeben insgesamt ${n} Einwohner.`,top:(name,n)=>`Laut verifiziertem Datensatz hat ${name} die höchste Bevölkerung: ${n} Einwohner.`,business:'Ich habe die Unternehmensebene aktiviert. Demo-Einträge sind klar als nicht verifiziert gekennzeichnet.',invest:'Der Investorenmodus bündelt Bevölkerung, Mahallas, Unternehmen und lokale Produkte. Nur verifizierte Werte werden als offiziell gekennzeichnet.',found:n=>`${n} wurde gefunden. Ich kann den Eintrag auf der Karte anzeigen und die Datenkarte öffnen.`,unknown:'Diese Information ist im verifizierten Datensatz noch nicht verfügbar.'},
    fr:{count:n=>`Le jeu de données vérifié du district contient ${n} mahallas.`,pop:n=>`Les données vérifiées chargées pour les mahallas totalisent ${n} habitants.`,top:(name,n)=>`Selon les données vérifiées, ${name} possède la population la plus élevée : ${n} habitants.`,business:'J’ai activé la couche des entreprises. Les entrées de démonstration sont clairement marquées comme non vérifiées.',invest:'Le mode investisseur réunit population, mahallas, entreprises et produits locaux. Seules les valeurs vérifiées sont indiquées comme officielles.',found:n=>`${n} a été trouvé. Je peux l’afficher sur la carte et ouvrir sa fiche de données.`,unknown:'Cette information n’est pas encore disponible dans le jeu de données vérifié.'},
    es:{count:n=>`El conjunto de datos verificado del distrito contiene ${n} mahallas.`,pop:n=>`Los datos verificados de las mahallas cargadas suman ${n} habitantes.`,top:(name,n)=>`Según los datos verificados, ${name} tiene la mayor población: ${n} habitantes.`,business:'He activado la capa de empresas. Los registros de demostración están claramente marcados como no verificados.',invest:'El modo inversor reúne población, mahallas, empresas y productos locales. Solo los valores verificados se marcan como oficiales.',found:n=>`He encontrado ${n}. Puedo mostrarlo en el mapa y abrir su ficha de datos.`,unknown:'Esta información todavía no está disponible en el conjunto de datos verificado.'}
  };
  const f=F[state.lang]||F.en;
  if(/nechta.*(mfy|mahalla)|how many.*mahalla|сколько.*махалл|多少.*(社区|马哈拉)|كم.*(حي|محلة)|kac.*(mahalle|mahalla)|(?:몇.*(마할라|mahalla)|(마할라|mahalla).*몇)|wie viele.*mahalla|combien.*mahalla|cu[aá]ntas.*mahalla/.test(q)) return {text:f.count(fmt(d.mahallas||m.length)),sources:[tr('sourceOfficial')]};
  if(/eng.*(kop|ko‘p).*aholi|largest.*population|most populous|сам.*населен|最多.*人口|أكبر.*سكان|en (yuksek|fazla).*nufus|가장.*인구|hochst.*bevolkerung|plus.*population|mayor.*poblaci[oó]n/.test(q)){const top=[...m].sort((a,b)=>(b.population||0)-(a.population||0))[0];if(top)return {text:f.top(top.name,fmt(top.population)),sources:[tr('sourceOfficial')],focus:top};}
  if(/aholi|population|населен|人口|السكان|nufus|인구|bevolkerung|population|poblaci[oó]n/.test(q)) return {text:f.pop(fmt(d.population)),sources:[tr('sourceOfficial')]};
  if(/korxona|business|enterprise|предприят|企业|شركة|isletme|기업|unternehmen|entreprise|empresa/.test(q)) return {text:f.business,action:'business',sources:[tr('sourceOfficial')]};
  if(/invest|инвест|投资|استثمار|yatırım|투자/.test(q)) return {text:f.invest,action:'invest',sources:[tr('sourceOfficial')]};
  const hit=searchLocal(question)[0]; if(hit) return {text:f.found(hit.name),focus:hit,sources:[hit.verified?tr('sourceOfficial'):tr('sourceDemo')]};
  return {text:f.unknown,sources:[]};
}
async function askAI(question){
  question=String(question||'').trim(); if(!question)return; openAI(); addMessage('user',question); $('#aiInput').value=''; addMessage('system',state.lang==='uz'?'Tahlil qilinmoqda…':state.lang==='ru'?'Анализ…':'Analyzing…');
  let answer=null;
  try{ const r=await fetch('/api/ai',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:question,lang:state.lang})}); const j=await r.json(); if(r.ok&&j.ok) answer=j; }catch(e){}
  const systemMsg=$('#aiMessages .message.system:last-child'); if(systemMsg)systemMsg.remove();
  if(!answer) answer=localAI(question); addMessage('assistant',answer.text||tr('unknown'),answer.sources||[]);
  if(answer.action==='business'){state.activeCategories.add('business');renderCategories();renderMarkers();openPanel('map');fitDistrict();}
  if(answer.action==='invest') openInvestorMode();
  if(answer.focus){const hit=allSearchItems().find(x=>String(x.id)===String(answer.focus.id))||answer.focus; if(hit.lat&&hit.lng){setTimeout(()=>openDetail(hit,hit._kind||hit.type||'mahalla'),250)}}
  if(answer.speak && 'speechSynthesis' in window) speak(answer.text);
}
function openAI(){ $('#aiPanel').classList.remove('hidden'); ensureAIWelcome(); }
function speak(text){ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang={uz:'uz-UZ',en:'en-US',ru:'ru-RU',zh:'zh-CN',ar:'ar-SA',tr:'tr-TR',ko:'ko-KR',de:'de-DE',fr:'fr-FR',es:'es-ES'}[state.lang]||'en-US'; speechSynthesis.speak(u); }
function setupVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR)return;
  const rec=new SR(); rec.interimResults=false; rec.continuous=false; rec.onstart=()=>{$('#voiceBtn').classList.add('listening');$('#aiInput').placeholder=tr('listening')}; rec.onend=()=>{$('#voiceBtn').classList.remove('listening');$('#aiInput').placeholder=tr('askPlaceholder')}; rec.onerror=()=>rec.onend(); rec.onresult=e=>{const q=e.results[0][0].transcript;$('#aiInput').value=q;askAI(q)}; state.voiceRecognition=rec;
}
function startVoice(){ if(!state.voiceRecognition){toast(tr('voiceUnsupported'));return;} state.voiceRecognition.lang={uz:'uz-UZ',en:'en-US',ru:'ru-RU',zh:'zh-CN',ar:'ar-SA',tr:'tr-TR',ko:'ko-KR',de:'de-DE',fr:'fr-FR',es:'es-ES'}[state.lang]||'en-US'; state.voiceRecognition.start(); }

function openInvestorMode(){ openPanel('invest'); state.activeCategories.add('business');renderCategories();renderMarkers(); if(state.map&&!document.documentElement.classList.contains('reduce-motion'))state.map.easeTo({pitch:48,bearing:-7,duration:900}); }
function closeInvestorMode(){openPanel('explore');if(state.map)state.map.easeTo({pitch:15,bearing:0,duration:600})}

const scenes=()=>[
 {eyebrow:'DIGITAL DISTRICT',title:tr('presentationTitle'),text:tr('presentationIntro'),center:[71.045,40.54],zoom:9.7,pitch:25,bearing:0},
 {eyebrow:tr('mahallas'),title:tr('presentationMahallas'),text:tr('presentationMahallasText'),center:[71.045,40.54],zoom:10.4,pitch:42,bearing:-8},
 {eyebrow:tr('officialData'),title:tr('presentationPopulation'),text:tr('presentationPopulationText'),center:[71.03,40.54],zoom:10.8,pitch:50,bearing:9},
 {eyebrow:tr('investorMode'),title:tr('presentationEconomy'),text:tr('presentationEconomyText'),center:[71.07,40.53],zoom:11.2,pitch:55,bearing:-12},
 {eyebrow:tr('madeIn'),title:tr('presentationProducts'),text:tr('presentationProductsText'),center:[71.01,40.50],zoom:11,pitch:48,bearing:13},
 {eyebrow:'AI · MAP · DATA',title:tr('presentationFuture'),text:tr('presentationFutureText'),center:[71.045,40.54],zoom:9.9,pitch:58,bearing:0}
];
function openPresentation(){
  $('#presentationOverlay').classList.remove('hidden'); state.presentation.index=0; state.presentation.playing=true; $('#scenePlay').innerHTML=`<span class="icon">${svg('pause')}</span>`;
  if(!state.presentation.map){state.presentation.map=new maplibregl.Map({container:'presentationMap',style:'https://tiles.openfreemap.org/styles/liberty',center:[71.045,40.54],zoom:9.7,pitch:25,interactive:false,attributionControl:true});}
  renderScene(); scheduleScene();
}
function closePresentation(){ $('#presentationOverlay').classList.add('hidden'); clearTimeout(state.presentation.timer); }
function renderScene(){ const s=scenes()[state.presentation.index]; $('#sceneEyebrow').textContent=s.eyebrow;$('#sceneTitle').textContent=s.title;$('#sceneText').textContent=s.text;$('#sceneCounter').textContent=`${state.presentation.index+1} / ${scenes().length}`; if(state.presentation.map)state.presentation.map.flyTo({center:s.center,zoom:s.zoom,pitch:s.pitch,bearing:s.bearing,duration:document.documentElement.classList.contains('reduce-motion')?0:1800,essential:true}); }
function scheduleScene(){clearTimeout(state.presentation.timer);if(state.presentation.playing)state.presentation.timer=setTimeout(()=>{state.presentation.index=(state.presentation.index+1)%scenes().length;renderScene();scheduleScene()},6500)}
function sceneStep(delta){state.presentation.index=(state.presentation.index+delta+scenes().length)%scenes().length;renderScene();scheduleScene()}
function togglePresentationPlay(){state.presentation.playing=!state.presentation.playing;$('#scenePlay').innerHTML=`<span class="icon">${svg(state.presentation.playing?'pause':'play')}</span>`;scheduleScene()}

function loadPrefs(){
  const prefs=JSON.parse(localStorage.getItem('uchkoprik-prefs')||'{}');
  document.documentElement.dataset.theme=prefs.light?'light':'dark'; document.documentElement.classList.toggle('reduce-motion',!!prefs.reduceMotion); document.documentElement.classList.toggle('reduce-transparency',!!prefs.reduceTransparency); document.documentElement.classList.toggle('high-contrast',!!prefs.highContrast); document.documentElement.style.setProperty('--font-scale',prefs.fontScale||1);
  $('#lightModeToggle').checked=!!prefs.light;$('#reduceMotionToggle').checked=!!prefs.reduceMotion;$('#reduceTransparencyToggle').checked=!!prefs.reduceTransparency;$('#highContrastToggle').checked=!!prefs.highContrast;
}
function savePrefs(){const p={light:$('#lightModeToggle').checked,reduceMotion:$('#reduceMotionToggle').checked,reduceTransparency:$('#reduceTransparencyToggle').checked,highContrast:$('#highContrastToggle').checked,fontScale:Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1};localStorage.setItem('uchkoprik-prefs',JSON.stringify(p));loadPrefs();}
function setFont(key){const scale={small:.92,normal:1,large:1.12}[key]||1;document.documentElement.style.setProperty('--font-scale',scale);$$('[data-font]').forEach(x=>x.classList.toggle('active',x.dataset.font===key));savePrefs()}

function setupEvents(){
  $('#languageBtn').addEventListener('click',()=>openSheet('languageSheet')); $('#accessibilityBtn').addEventListener('click',()=>openSheet('accessibilitySheet')); $$('[data-sheet-close]').forEach(x=>x.addEventListener('click',()=>closeSheet(x.dataset.sheetClose)));
  $$('.sheet-backdrop').forEach(x=>x.addEventListener('click',e=>{if(e.target===x)x.classList.add('hidden')}));
  $('#searchOpen').addEventListener('click',()=>{$('#searchDialog').classList.remove('hidden');renderSearchResults();setTimeout(()=>$('#globalSearch').focus(),50)});$('#searchClose').addEventListener('click',()=>$('#searchDialog').classList.add('hidden'));$('#globalSearch').addEventListener('input',e=>renderSearchResults(e.target.value));
  $('#fitDistrict').addEventListener('click',()=>fitDistrict());$('#exploreClose').addEventListener('click',()=>$('#explorePanel').classList.add('hidden'));
  $$('.highlight-card').forEach(x=>x.addEventListener('click',()=>{if(x.dataset.mode==='invest')openInvestorMode();else openPanel(x.dataset.mode)}));
  $$('.dock-item').forEach(x=>x.addEventListener('click',()=>{const n=x.dataset.nav;if(n==='ai')openAI();else if(n==='invest')openInvestorMode();else if(n==='map'){openPanel('explore');$('#explorePanel').classList.add('hidden');fitDistrict();}else openPanel(n)}));
  $('#investorClose').addEventListener('click',closeInvestorMode);$('#productsClose').addEventListener('click',()=>openPanel('explore'));$('#districtClose').addEventListener('click',()=>openPanel('explore'));$('#showBusinesses').addEventListener('click',()=>{state.activeCategories.add('business');renderCategories();renderMarkers();fitDistrict();});$('#askInvestment').addEventListener('click',()=>askAI(state.lang==='uz'?'Uchko‘prik investitsiya imkoniyatlari haqida umumiy ma’lumot ber':'Give me an investor overview of Uchko‘prik'));
  $('#detailClose').addEventListener('click',closeDetail);$('#detailAsk').addEventListener('click',()=>{if(state.selected)askAI(`${state.selected.item.name} haqida ma’lumot ber`)});$('#detailDirections').addEventListener('click',()=>{const i=state.selected?.item;if(i?.lat&&i?.lng)window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(i.lat+','+i.lng)}`,'_blank','noopener')});$('#detailShare').addEventListener('click',async()=>{const i=state.selected?.item;const url=i?.slug?`${location.origin}/${state.lang}/${i.type==='mahalla'?'mahalla':i.type==='business'?'business':'place'}/${i.slug}`:location.href;try{if(navigator.share)await navigator.share({title:i?.name,url});else{await navigator.clipboard.writeText(url);toast(tr('copied'))}}catch(e){}});
  $('#aiOrb').addEventListener('click',openAI);$('#aiClose').addEventListener('click',()=>$('#aiPanel').classList.add('hidden'));$('#aiForm').addEventListener('submit',e=>{e.preventDefault();askAI($('#aiInput').value)});$('#voiceBtn').addEventListener('click',startVoice);
  $('#presentationBtn').addEventListener('click',openPresentation);$('#presentationExit').addEventListener('click',closePresentation);$('#scenePrev').addEventListener('click',()=>sceneStep(-1));$('#sceneNext').addEventListener('click',()=>sceneStep(1));$('#scenePlay').addEventListener('click',togglePresentationPlay);
  ['lightModeToggle','reduceMotionToggle','reduceTransparencyToggle','highContrastToggle'].forEach(id=>$('#'+id).addEventListener('change',savePrefs));$$('[data-font]').forEach(x=>x.addEventListener('click',()=>setFont(x.dataset.font)));
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#searchOpen').click()}if(e.key==='Escape'){$('#searchDialog').classList.add('hidden');$('#aiPanel').classList.add('hidden');closeDetail();if(!$('#presentationOverlay').classList.contains('hidden'))closePresentation()}if(!$('#presentationOverlay').classList.contains('hidden')){if(e.key==='ArrowRight')sceneStep(1);if(e.key==='ArrowLeft')sceneStep(-1);if(e.key===' ')togglePresentationPlay();}});
}

async function boot(){
  detectLanguage(); bindIcons(); loadPrefs(); await loadData(); applyLanguage(); renderLanguages(); setupEvents(); setupVoice(); initMap(); ensureAIWelcome();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
boot().catch(err=>{console.error(err);toast('Application error',err.message)});
