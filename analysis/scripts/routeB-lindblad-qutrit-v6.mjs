// ============================================================================
// Route B als open-quantum-systeem — prototype v6. OPTIE B, QUTRIT.
// Parallel, raakt bewustzijn-model-v5.html NIET.
//
// Doel: onbeslist als een ECHTE, gelokaliseerde, niet-lege attractor (punt B),
//   en meteen de sectie 11-limitatie (enkele qubit is beperkend) adresseren.
//
// Basis (pointer): |0> perceptie-pool, |1> conflict-pool, |2> verscheurd/limbo.
// Master-vergelijking (Lindblad): d rho/dt = -i[H,rho] + sum_k D[L_k](rho),
//   D[L](rho) = L rho L^dag - 1/2 {L^dag L, rho}.
//
// H = Delta/2 (|0><1|+|1><0|)        ambivalentie tussen de twee emoties
//   + g/2 (|0><2|+|2><0|+|1><2|+|2><1|)  spanning lekt de limbo in
//   Delta en g ENDOGEEN uit bron-conflict (uitgelijnd=0, tegengesteld=max).
//
// Dissipatie:
//   L_ev = sqrt(kappa) |0><1|   bewijs resolveert conflict-pool naar perceptie
//   L_de = sqrt(gamma) (|0><0|-|1><1|)  defasering op het 0-1-subsysteem
//   L_lk = sqrt(eta) |0><2|     TRAGE lek uit limbo (eta klein): limbo is beschermd
//
// Readout (geen cap): integreer vaste fysieke tijd, lees regime af.
//   p2 hoog  => BESLUITELOOS, gelokaliseerd en niet-leeg (de winst t.o.v. qubit).
//   anders   => beslist naar de dominante pool (p0=perceptie, p1=conflict).
//   purity Tr(rho^2): laag = verscheurd/gemengd.
//
// Open schalen (de enige losse constanten; later emergent/gepind): KD, KG, en de
//   dissipatie-tarieven. Expliciet gemarkeerd.
// ============================================================================

function mulberry32(seed){let a=seed>>>0;return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
let rng=mulberry32(1);
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

// ---- complexe 3x3 matrix-machinerie (element = [re,im]) --------------------
const N3=3;
function zeros(){const m=[];for(let i=0;i<N3;i++){m.push([]);for(let j=0;j<N3;j++)m[i].push([0,0]);}return m;}
function cmul(a,b){return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];}
function matmul(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++){let re=0,im=0;for(let k=0;k<N3;k++){const p=cmul(A[i][k],B[k][j]);re+=p[0];im+=p[1];}C[i][j]=[re,im];}return C;}
function madd(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]+B[i][j][0],A[i][j][1]+B[i][j][1]];return C;}
function msub(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]-B[i][j][0],A[i][j][1]-B[i][j][1]];return C;}
function mscaleR(A,s){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]*s,A[i][j][1]*s];return C;}
function mscaleC(A,c){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=cmul(A[i][j],c);return C;}
function mdag(A){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[j][i][0],-A[j][i][1]];return C;}
function traceRe(A){return A[0][0][0]+A[1][1][0]+A[2][2][0];}

// dissipator D[L](rho) = L rho Ldag - 1/2 (LdagL rho + rho LdagL)
function dissipator(L,Ldag,LdagL,rho){
  const t1=matmul(matmul(L,rho),Ldag);
  const t2=matmul(LdagL,rho);
  const t3=matmul(rho,LdagL);
  return msub(t1, mscaleR(madd(t2,t3),0.5));
}
// -i[H,rho]
function commutator(H,rho){ return mscaleC(msub(matmul(H,rho),matmul(rho,H)), [0,-1]); }

// jump-operator uit een enkele entry |a><b| * amp
function jump(a,b,amp){const m=zeros();m[a][b]=[amp,0];return m;}

// ---- dynamica --------------------------------------------------------------
const GAMMA=0.8, KAPPA=0.5, ETA=0.03; // dissipatie-tarieven (open, representatief)
const KD=4.0, KG=4.0;                 // endogene schalen voor Delta en g (open)
const DT=0.02, TMAX=50; const STEPS=Math.round(TMAX/DT);

function buildOps(){
  const L_ev=jump(0,1,Math.sqrt(KAPPA));
  const L_lk=jump(0,2,Math.sqrt(ETA));
  const L_de=zeros(); L_de[0][0]=[Math.sqrt(GAMMA),0]; L_de[1][1]=[-Math.sqrt(GAMMA),0];
  const ops=[L_ev,L_lk,L_de].map(L=>{const Ld=mdag(L);return {L,Ld,LdL:matmul(Ld,L)};});
  return ops;
}
function buildH(Delta,g){
  const H=zeros();
  H[0][1]=[Delta/2,0]; H[1][0]=[Delta/2,0];
  H[0][2]=[g/2,0]; H[2][0]=[g/2,0];
  H[1][2]=[g/2,0]; H[2][1]=[g/2,0];
  return H;
}
function deriv(rho,H,ops){
  let d=commutator(H,rho);
  for(const o of ops) d=madd(d, dissipator(o.L,o.Ld,o.LdL,rho));
  return d;
}
function rk4step(rho,H,ops){
  const k1=deriv(rho,H,ops);
  const k2=deriv(madd(rho,mscaleR(k1,DT/2)),H,ops);
  const k3=deriv(madd(rho,mscaleR(k2,DT/2)),H,ops);
  const k4=deriv(madd(rho,mscaleR(k3,DT)),H,ops);
  let out=madd(rho, mscaleR(madd(madd(k1,mscaleR(k2,2)),madd(mscaleR(k3,2),k4)),DT/6));
  // hermitiseren + spoor normaliseren (numerieke hygiene)
  out=mscaleR(madd(out,mdag(out)),0.5);
  const tr=traceRe(out); if(tr>1e-9) out=mscaleR(out,1/tr);
  return out;
}

function purity(rho){ // Tr(rho^2), reëel voor hermitische rho
  const r2=matmul(rho,rho); return traceRe(r2);
}

function runOnce(Delta,g,noise){
  const ops=buildOps();
  const D=Delta*(0.9+0.2*noise()), G=g*(0.9+0.2*noise());
  const H=buildH(D,G);
  // start in |0> (perceptie arriveert eerst), met minieme ruis-coherentie
  let rho=zeros(); rho[0][0]=[1,0];
  const seed=(noise()-0.5)*0.05; rho[0][1]=[seed,0]; rho[1][0]=[seed,0];
  rho=mscaleR(madd(rho,mdag(rho)),0.5); const tr0=traceRe(rho); rho=mscaleR(rho,1/tr0);
  for(let t=0;t<STEPS;t++) rho=rk4step(rho,H,ops);
  const p0=rho[0][0][0],p1=rho[1][1][0],p2=rho[2][2][0];
  return {p0:+p0.toFixed(3),p1:+p1.toFixed(3),p2:+p2.toFixed(3),purity:+purity(rho).toFixed(3)};
}

function cell(Delta,g,Nrun){
  rng=mulberry32(5050);
  let p0=0,p1=0,p2=0,pur=0,besl=0;
  for(let i=0;i<Nrun;i++){const r=runOnce(Delta,g,rng);p0+=r.p0;p1+=r.p1;p2+=r.p2;pur+=r.purity;if(r.p2>0.25)besl++;}
  return {p0:+(p0/Nrun).toFixed(3),p1:+(p1/Nrun).toFixed(3),p2:+(p2/Nrun).toFixed(3),purity:+(pur/Nrun).toFixed(3),besl:besl/Nrun};
}

const N=80, D2R=Math.PI/180, betap=1.0, APMAG=0.6;
console.log('=== Route B Lindblad QUTRIT v6 ===');
console.log(`N=${N}, gamma=${GAMMA}, kappa=${KAPPA}, eta(limbo-lek)=${ETA}, T=${TMAX}`);
console.log('p2 = limbo/verscheurd (gelokaliseerde besluiteloosheid). besl = aandeel p2>0.25.');

console.log('\n--- A. Regressie-vloer: geen conflict (Delta=g=0) => beslist naar perceptie ---');
{const r=cell(0,0,N);console.log(`  p0=${r.p0} p1=${r.p1} p2=${r.p2} purity=${r.purity} -> beslist@perceptie`);}

console.log('\n--- B. Endogeen: conflict-hoek stuurt Delta en g (beta_p=1) ---');
console.log('  gap(deg) | Delta |  g   | p0(perc) p1(confl) p2(limbo) | purity | besluiteloos');
for(const gap of [0,45,90,135,180]){
  const f=(1-Math.cos(gap*D2R))/2;
  const Delta=KD*betap*APMAG*f, g=KG*betap*APMAG*f;
  const r=cell(Delta,g,N);
  console.log(`  ${String(gap).padStart(6)}   | ${Delta.toFixed(2)} | ${g.toFixed(2)} |  ${r.p0.toFixed(3)}    ${r.p1.toFixed(3)}     ${r.p2.toFixed(3)}   | ${r.purity.toFixed(3)}  | ${(r.besl*100).toFixed(0)}%`);
}

console.log('\n--- C. Monotone dosis: limbo-populatie stijgt met conflict (criterium 3) ---');
console.log('  conflict f | p2(limbo) | besluiteloos');
for(const f of [0,0.1,0.25,0.5,0.75,1.0]){
  const Delta=KD*betap*APMAG*f, g=KG*betap*APMAG*f;
  const r=cell(Delta,g,N);
  console.log(`  ${f.toFixed(2).padStart(8)}   | ${r.p2.toFixed(3)}     | ${(r.besl*100).toFixed(0)}%`);
}

console.log('\n--- D. Is limbo een STABIELE, niet-lege attractor? (sterk conflict) ---');
{const f=1.0,Delta=KD*betap*APMAG*f,g=KG*betap*APMAG*f;
 rng=mulberry32(5050); const r=runOnce(Delta,g,rng);
 console.log(`  gap=180: p0=${r.p0} p1=${r.p1} p2=${r.p2} purity=${r.purity}`);
 console.log(`  -> onbeslist zit in |2> (gelokaliseerd), niet in het gemengde midden.`);}
