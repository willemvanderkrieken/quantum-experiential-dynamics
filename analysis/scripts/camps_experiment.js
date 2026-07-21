// Kampenexperiment onder emergente routedrempels: houden subrealiteiten stand onder B-dominantie?
// Hervatbaar: node kampen_emergent.js <rondes_dit_stuk>
const fs=require('fs');
const CHUNK=parseInt(process.argv[2]||'60');
const STATE='/tmp/kampen-emergent-state.json';
const src=fs.readFileSync('/tmp/model.js','utf8');
const dummy={style:{},textContent:'',value:'70',innerHTML:'',addEventListener:()=>{},appendChild:()=>{},removeChild:()=>{},children:[],classList:{add:()=>{},remove:()=>{},toggle:()=>{}},dataset:{},getContext:()=>({setTransform:()=>{},clearRect:()=>{},fillRect:()=>{},beginPath:()=>{},arc:()=>{},fill:()=>{},stroke:()=>{},moveTo:()=>{},lineTo:()=>{},closePath:()=>{},fillText:()=>{},save:()=>{},restore:()=>{},setLineDash:()=>{},clip:()=>{},createRadialGradient:()=>({addColorStop:()=>{}})}),offsetWidth:400,nodeType:1};
global.document={getElementById:()=>({...dummy}),querySelectorAll:()=>[],createElement:()=>({...dummy}),addEventListener:()=>{}};
global.window={addEventListener:()=>{}};
global.devicePixelRatio=1;global.requestAnimationFrame=()=>0;global.cancelAnimationFrame=()=>{};
global.navigator={clipboard:{writeText:()=>Promise.resolve()}};
global.setTimeout=(f,t)=>0;

const test=`
;animEnabled=false;
updateAllUI=()=>{};updateSharedStats=()=>{};drawSharedCircumplex=()=>{};autoExport=()=>{};updateEntityButtons=()=>{};updateIndividualUI=()=>{};
function pairSpread(list){
  if(list.length<2) return 0;
  let s=0,n=0;
  for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){s+=euclidean(list[i],list[j]);n++;}
  return s/n;
}
function lastOf(e){return e.memory[e.memory.length-1];}

let startRound=0;
if(fs.existsSync(STATE)){
  const st=JSON.parse(fs.readFileSync(STATE,'utf8'));
  entities=st.entities;
  groupTracks=st.groupTracks.map(t=>({gid:t.gid,members:new Set(t.members)}));
  nextGroupId=st.nextGroupId;
  startRound=st.round;
  _groupCache=null;_groupCacheRun=-1;
} else {
  const K=(p0,th,xi)=>({p0,theta0:th,xi0:xi,rho0:makeRho0(p0,th)});
  // Twee sterke tegengestelde kampen: E1/E2 op 45 graden, E3/E4/E5 op 225 graden
  entities=[
    {id:1,name:'E1',runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[],karakter:K(0.85,Math.PI*0.25,0.5)},
    {id:2,name:'E2',runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[],karakter:K(0.85,Math.PI*0.25,0.5)},
    {id:3,name:'E3',runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[],karakter:K(0.85,Math.PI*1.25,0.5)},
    {id:4,name:'E4',runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[],karakter:K(0.85,Math.PI*1.25,0.5)},
    {id:5,name:'E5',runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[],karakter:K(0.85,Math.PI*1.25,0.5)}
  ];
  groupTracks=[];nextGroupId=1;_groupCache=null;_groupCacheRun=-1;
}

for(let r=startRound+1;r<=startRound+${CHUNK};r++){
  entities.forEach(e=>{ runActive=false; doRunForEntity(e.id); });
  if(r%20===0){
    _groupCache=null;_groupCacheRun=-1;
    const groups=getCachedGroups();
    const multi=groups.filter(g=>g.members.length>1);
    // kamp-spreads: kamp1=E1+E2, kamp2=E3+E4+E5
    const k1=entities.filter(e=>e.id<=2).map(lastOf);
    const k2=entities.filter(e=>e.id>=3).map(lastOf);
    const c1={val:k1.reduce((s,e)=>s+e.val,0)/k1.length,aro:k1.reduce((s,e)=>s+e.aro,0)/k1.length};
    const c2={val:k2.reduce((s,e)=>s+e.val,0)/k2.length,aro:k2.reduce((s,e)=>s+e.aro,0)/k2.length};
    console.log('run '+String(r).padStart(3)
      +': globaal='+pairSpread(entities.map(lastOf)).toFixed(2)
      +' binnen-k1='+pairSpread(k1).toFixed(2)
      +' binnen-k2='+pairSpread(k2).toFixed(2)
      +' tussen-kampen='+euclidean(c1,c2).toFixed(2)
      +' groepen=['+multi.map(g=>'G'+g.gid+':'+g.members.map(m=>m.name).join('+')).join(' | ')+']');
  }
}
const endRound=startRound+${CHUNK};
fs.writeFileSync(STATE,JSON.stringify({round:endRound,entities,groupTracks:groupTracks.map(t=>({gid:t.gid,members:[...t.members]})),nextGroupId}));
if(endRound>=120){
  const allm=entities.flatMap(e=>e.memory);
  const c={A:0,B:0,C:0};allm.forEach(m=>c[m.route]++);
  console.log('EINDE. routes: A='+Math.round(100*c.A/allm.length)+'% B='+Math.round(100*c.B/allm.length)+'% C='+Math.round(100*c.C/allm.length)+'% | besluiteloos='+allm.filter(m=>m.besluiteloos).length);
  entities.forEach(e=>{
    let v=0,a=0;e.memory.forEach(m=>{v+=m.val;a+=m.aro;});
    const deg=((Math.atan2(a,v)*180/Math.PI)+360)%360;
    console.log(e.name+' (doel '+((e.karakter.theta0*180/Math.PI)%360).toFixed(0)+'): gerealiseerd '+deg.toFixed(0)+' graden');
  });
  const durs=[];entities.forEach(e=>{let cur=null,ln=0;(e.groupHist||[]).forEach(h=>{if(h.gid===cur){ln++;}else{if(cur!==null&&cur!==0&&ln>0)durs.push(ln);cur=h.gid;ln=1;}});if(cur!==null&&cur!==0)durs.push(ln);});
  console.log('gem. lidmaatschapsduur: '+(durs.length?(durs.reduce((s,v)=>s+v,0)/durs.length).toFixed(1):'-')+' runs');
}
console.log('CHUNK KLAAR t/m ronde '+endRound);
`;
eval(src+test);
