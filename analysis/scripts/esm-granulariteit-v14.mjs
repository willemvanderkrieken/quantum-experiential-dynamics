// ============================================================================
// ESM-toets emotionele GRANULARITEIT (Barrett) — grondt de v6.1 karaktertrait 'granulariteit'.
// Granulariteit = binnen-persoon gemiddelde correlatie tussen emotie-items van DEZELFDE valentie.
// Lage correlatie = items bewegen onafhankelijk = fijne differentiatie (hoge granulariteit).
// Maat (differentiatie D) = 1 - gemiddelde paar-correlatie onder de NEGATIEVE items (standaard in de literatuur).
// Toetsen: (1) is D een echte individuele trait? -> verdeling/spreiding over personen.
//          (2) Barrett-voorspelling: hogere granulariteit <-> lagere emotionele inertie (AR(1) phi neg-affect)?
// Data: Bringmann2013 + Bringmann2016 + Fried2021. Standalone; raakt het model niet.
// ============================================================================
import { readFileSync } from 'node:fs';
const stripQ=s=>s.replace(/^"|"$/g,'').trim();
const num=s=>{const v=parseFloat(s);return Number.isFinite(v)?v:NaN;};

function b2013(){ const p='data/empirie/EmotionTimeSeries-master/DataFromAuthors/Bringmann2013/pone.0060188.s004.txt';
  const L=readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x.length);const hdr=L[0].split(',').map(stripQ);const idx=n=>hdr.indexOf(n);
  const off=(L[1].split(',').length===hdr.length+1)?1:0;const iS=idx('subjno'),iD=idx('dayno'),iB=idx('beepno');
  const neg=['pieker','angstig_','somber__'].map(idx);const rows=[];
  for(let i=1;i<L.length;i++){const c=L[i].split(',').map(stripQ);const v=j=>(c[j+off]==='NA'||c[j+off]==null)?NaN:num(c[j+off]);
    rows.push({sub:v(iS),day:v(iD),beep:v(iB),neg:neg.map(v)});}return {name:'Bringmann2013',rows,order:(a,b)=>a.day-b.day||a.beep-b.beep};}
function b2016(){ const p='data/empirie/EmotionTimeSeries-master/DataFromAuthors/Bringmann2016/Data95.csv';
  const L=readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x.length);const hdr=L[0].split(';').map(stripQ);const idx=n=>hdr.indexOf(n);
  const iS=idx('ID');const neg=['KWAAD','DEPRE','DROEV','ANGST'].map(idx);const rows=[];
  for(let i=1;i<L.length;i++){const c=L[i].split(';').map(stripQ);const v=j=>{const x=num(c[j]);return(x===9999||!Number.isFinite(x))?NaN:x;};
    rows.push({sub:v(iS),ord:i,neg:neg.map(v)});}return {name:'Bringmann2016',rows,order:(a,b)=>a.ord-b.ord};}
function fried(){ const p='data/empirie/EmotionTimeSeries-master/DataFromAuthors/Fried2021/4.Data/clean_ema.csv';
  const L=readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x.length);const iNeg=[6,7,8,10,14];const rows=[];
  for(let i=1;i<L.length;i++){const c=L[i].split(',').map(stripQ);const v=j=>{const x=num(c[j]);return Number.isFinite(x)?x:NaN;};
    rows.push({sub:c[0],ord:i,neg:iNeg.map(v)});}return {name:'Fried2021',rows,order:(a,b)=>a.ord-b.ord};}

function pearson(x,y){const a=[],b=[];for(let i=0;i<x.length;i++){if(Number.isFinite(x[i])&&Number.isFinite(y[i])){a.push(x[i]);b.push(y[i]);}}
  if(a.length<10)return null;const ma=a.reduce((s,v)=>s+v,0)/a.length,mb=b.reduce((s,v)=>s+v,0)/b.length;
  let sab=0,saa=0,sbb=0;for(let i=0;i<a.length;i++){sab+=(a[i]-ma)*(b[i]-mb);saa+=(a[i]-ma)**2;sbb+=(b[i]-mb)**2;}
  return (saa<1e-9||sbb<1e-9)?null:sab/Math.sqrt(saa*sbb);}
function ar1(s){const x=[],y=[];for(let i=1;i<s.length;i++){if(Number.isFinite(s[i])&&Number.isFinite(s[i-1])){x.push(s[i-1]);y.push(s[i]);}}
  if(x.length<15)return null;const mx=x.reduce((a,b)=>a+b,0)/x.length,my=y.reduce((a,b)=>a+b,0)/y.length;
  let sxy=0,sxx=0;for(let i=0;i<x.length;i++){sxy+=(x[i]-mx)*(y[i]-my);sxx+=(x[i]-mx)**2;}return sxx<1e-9?null:sxy/sxx;}
const mean=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:NaN;
const sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(v=>(v-m)**2)));};
const quant=(a,q)=>{const s=[...a].sort((x,y)=>x-y);const i=(s.length-1)*q,lo=Math.floor(i);return s[lo]+(i-lo)*((s[Math.min(lo+1,s.length-1)])-s[lo]);};

function analyze(ds){
  const by=new Map();for(const r of ds.rows){if(r.sub==null||r.sub==='')continue;if(!by.has(r.sub))by.set(r.sub,[]);by.get(r.sub).push(r);}
  const Ds=[], phis=[], paired=[];
  for(const[,rr]of by){ rr.sort(ds.order); const nItems=rr[0].neg.length;
    const series=Array.from({length:nItems},(_,k)=>rr.map(r=>r.neg[k]));
    if(series.some(s=>s.filter(Number.isFinite).length<15))continue;
    // gemiddelde paar-correlatie onder neg-items
    const cors=[]; for(let a=0;a<nItems;a++)for(let b=a+1;b<nItems;b++){const c=pearson(series[a],series[b]);if(c!=null)cors.push(c);}
    if(cors.length<1)continue; const D=1-mean(cors); // differentiatie (hoge D = hoge granulariteit)
    const negMean=rr.map(r=>{const v=r.neg.filter(Number.isFinite);return v.length?mean(v):NaN;});
    const phi=ar1(negMean);
    Ds.push(D); if(phi!=null){phis.push(phi); paired.push([D,phi]);}
  }
  // corr(D, phi) over personen
  const corrDphi=paired.length>=10?pearson(paired.map(p=>p[0]),paired.map(p=>p[1])):null;
  return {name:ds.name, n:Ds.length, D_mediaan:+quant(Ds,0.5).toFixed(2), D_IQR:[+quant(Ds,0.25).toFixed(2),+quant(Ds,0.75).toFixed(2)], D_sd:+sd(Ds).toFixed(2),
    phi_mediaan:+quant(phis,0.5).toFixed(2), corr_granulariteit_inertie:corrDphi!=null?+corrDphi.toFixed(2):'n.v.t.'};
}

console.log('=== ESM emotionele granulariteit (Barrett) — grondt de v6.1 trait ===');
console.log('D = differentiatie = 1 - gemiddelde paar-correlatie neg-items. Hoog = fijne granulariteit.');
console.log('Barrett-voorspelling: corr(granulariteit, inertie) < 0 (fijner onderscheid -> lagere inertie).\n');
for(const mk of [b2013,b2016,fried]){ const r=analyze(mk());
  console.log(`### ${r.name} (${r.n} personen)`);
  console.log(`  granulariteit D: mediaan ${r.D_mediaan}  IQR ${r.D_IQR[0]}..${r.D_IQR[1]}  sd ${r.D_sd}  -> individuele SPREIDING (trait?)`);
  console.log(`  neg-affect inertie phi: mediaan ${r.phi_mediaan}`);
  console.log(`  corr(granulariteit, inertie): ${r.corr_granulariteit_inertie}  (Barrett: negatief)\n`);
}
