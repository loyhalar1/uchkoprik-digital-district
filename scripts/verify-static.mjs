import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename=fileURLToPath(import.meta.url);
const root=path.resolve(path.dirname(__filename),'..');
const publicDir=path.join(root,'public');
const indexPath=path.join(publicDir,'index.html');
const appPath=path.join(publicDir,'assets/js/app.js');
const html=fs.readFileSync(indexPath,'utf8');
const js=fs.readFileSync(appPath,'utf8');

const ids=[...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m=>m[1]);
const seen=new Set();
const duplicates=[];
for(const id of ids){if(seen.has(id))duplicates.push(id);seen.add(id)}
if(duplicates.length)throw new Error(`Duplicate HTML ids: ${[...new Set(duplicates)].join(', ')}`);

const requiredIds=[
  'map','explorePanel','detailCard','searchDialog','aiPanel','districtPanel',
  'presentationOverlay','presentationMap','scenePrev','scenePlay','sceneNext','presentationExit',
  'languageSheet','accessibilitySheet','toastHost'
];
for(const id of requiredIds){if(!seen.has(id))throw new Error(`Missing required HTML id: #${id}`)}

const directRefs=[...js.matchAll(/\$\(['"]#([^'"]+)['"]\)/g)].map(m=>m[1]);
const dynamic=new Set(['idleSphereOverlay','idleSphereStars','idleSphereClose','idleSphereCanvas','idleSphereLabel','sphereTestBtn','districtTopMahallas']);
for(const id of directRefs){
  if(id.includes(' ')||id.includes(':'))continue;
  if(!seen.has(id)&&!dynamic.has(id))throw new Error(`app.js references missing element: #${id}`);
}

for(const m of html.matchAll(/(?:src|href)=["'](\/[^"'#?]+)["']/g)){
  const rel=m[1];
  if(rel==='/'||rel.startsWith('/uz'))continue;
  const target=path.join(publicDir,rel.replace(/^\//,''));
  if(!fs.existsSync(target))throw new Error(`Missing local asset: ${rel}`);
}

console.log(`Static verification passed (${ids.length} ids, ${new Set(directRefs).size} JS id refs).`);
