// Hervatbare convergentietest: node ctest_chunk.js <N> <rondes_dit_stuk>
const fs=require('fs');
const N=parseInt(process.argv[2]||'5');
const CHUNK=parseInt(process.argv[3]||'60');
const STATE='/tmp/ctest-state-N'+N+'.json';
const src=fs.readFileSync('/tmp/model.js','utf8');
const dummy={style:{},textContent:'',value:'',innerHTML:'',addEventListener:()=>{},appendChild:()=>{},removeChild:()=>{},children:[],classList:{add:()=>{},remove:()=>{},toggle:()=>{}},dataset:{},getContext:()=>({setTransform:()=>{},clearRect:()=>{},fillRect:()=>{},beginPath:()=>{},arc:()=>{},fill:()=>{},stroke:()=>{},moveTo:()=>{},lineTo:()=>{},closePath:()=>{},fillText:()=>{},save:()=>{},restore:()=>{},setLineDash:()=>{},clip:()=>{},createRadialGradient:()=>({addColorStop:()=>{}})}),offsetWidth:400,nodeType:1};
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
  entities=[];
  for(let i=1;i<=${N};i++) entities.push({id:i,name:'E'+i,runCount:0,color:'#fff',memory:[],profielen:[],groupHist:[]});
  groupTracks=[];nextGroupId=1;_groupCache=null;_groupCacheRun=-1;
}

for(let r=startRound+1;r<=startRound+${CHUNK};r++){
  entities.forEach(e=>{ runActive=false; doRunForEntity(e.id); });
  if(r%20===0){
    _groupCache=null;_groupCacheRun=-1;
    const groups=getCachedGroups();
    const multi=groups.filter(g=>g.members.length>1);
    let within=null;
    if(multi.length){
      const ws=multi.map(g=>pairSpread(g.members.map(lastOf)));
      within=ws.reduce((s,v)=>s+v,0)/ws.length;
    }
    const centers=entities.map(e=>clusterCenter(e.memory.slice(-10)));
    console.log('N=${N} run '+String(r).padStart(3)+': globaal='+pairSpread(entities.map(lastOf)).toFixed(2)
      +' centra10='+pairSpread(centers).toFixed(2)
      +' groepen='+multi.length+(within!=null?' binnen='+within.toFixed(2):'')
      +' ['+multi.map(g=>'G'+g.gid+':'+g.members.map(m=>m.name).join('+')).join(' | ')+']');
  }
}
const endRound=startRound+${CHUNK};
fs.writeFileSync(STATE,JSON.stringify({
  round:endRound,
  entities,
  groupTracks:groupTracks.map(t=>({gid:t.gid,members:[...t.members]})),
  nextGroupId
}));
if(endRound>=220){
  const switches=entities.map(e=>{let sw=0;for(let i=1;i<e.groupHist.length;i++)if(e.groupHist[i].gid!==e.groupHist[i-1].gid)sw++;return sw;});
  console.log('N=${N} EINDE na '+endRound+' rondes. Groepswissels per entiteit: '+switches.join(','));
  // groepsduur: gemiddelde lengte van aaneengesloten zelfde gid (excl 0)
  const durs=[];
  entities.forEach(e=>{
    let cur=null,len=0;
    e.groupHist.forEach(h=>{
      if(h.gid===cur){len++;}
      else{if(cur!==null&&cur!==0&&len>0)durs.push(len);cur=h.gid;len=1;}
    });
    if(cur!==null&&cur!==0)durs.push(len);
  });
  if(durs.length)console.log('N=${N} gem. groepslidmaatschap-duur: '+(durs.reduce((s,v)=>s+v,0)/durs.length).toFixed(1)+' runs (n='+durs.length+')');
}
console.log('CHUNK KLAAR t/m ronde '+endRound);
`;
eval(src+test);
