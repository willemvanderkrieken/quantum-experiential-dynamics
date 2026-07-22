// ============================================================================
// Route B als quantum-trajectorie (Monte Carlo wavefunction) — prototype v7.
// QUTRIT. Parallel, raakt bewustzijn-model-v5.html NIET.
//
// Kern (Willems keuze): GEEN cap, GEEN vaste deliberatietijd. Het collapse-moment
//   EMERGEERT uit de omgeving als een toevalsproces. Per run:
//     - toestand |psi> start in |0> (waarneming), evolueert unitair onder H
//       (H = ambivalentie-oscillatie: Delta koppelt |0><->|1>, g voedt |2>=limbo),
//     - de omgeving "meet" met tarief r (Poisson). Bij de EERSTE meting klapt de run
//       dicht in een pointer met Born-kans |c_i|^2. Dat moment = de beslistijd.
//   Uitkomst: |0> waarneming, |1> conflict (tegengestelde emotie), |2> verscheurd.
//   Landen in |2> is een echte, definitieve uitkomst ("ik ben er niet uit"), geen lus.
//
// Waarom de meetkans-som constant r is: de drie pointer-projectoren tellen op tot de
//   identiteit (P0+P1+P2=I), dus de totale meetkans is r*(p0+p1+p2)=r. De eerste meting
//   is dus Exponentieel(r): een emergente, verdeelde beslistijd. Het interessante zit in
//   hoe H de amplitude tussen de drie draait VOOR de meting.
//
// Endogeen: Delta,g uit het bron-conflict (uitgelijnd=0, tegengesteld=max).
// r = omgevingskoppeling (hoe snel je gedwongen wordt te kiezen; later uit urgentie/arousal).
// ============================================================================

function mulberry32(seed){let a=seed>>>0;return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
let rng=mulberry32(1);

// complexe 3-vector als [[re,im],[re,im],[re,im]]
function Hpsi(psi,Delta,g){ // (H psi), H reëel-symmetrisch
  // H = Delta/2 (|0><1|+|1><0|) + g/2 (|0><2|+|2><0|+|1><2|+|2><1|)
  const d=Delta/2, h=g/2;
  return [
    [d*psi[1][0]+h*psi[2][0], d*psi[1][1]+h*psi[2][1]],
    [d*psi[0][0]+h*psi[2][0], d*psi[0][1]+h*psi[2][1]],
    [h*psi[0][0]+h*psi[1][0], h*psi[0][1]+h*psi[1][1]],
  ];
}
function norm2(psi){return psi[0][0]**2+psi[0][1]**2+psi[1][0]**2+psi[1][1]**2+psi[2][0]**2+psi[2][1]**2;}
function renorm(psi){const n=Math.sqrt(norm2(psi))||1;for(let i=0;i<3;i++){psi[i][0]/=n;psi[i][1]/=n;}}

const DT=0.01, TMAX=400; // TMAX alleen numerieke veiligheid; jump komt met r>0 vrijwel altijd
function trajectory(Delta,g,r,noise){
  let psi=[[1,0],[0,0],[0,0]]; // start in |0> waarneming
  let t=0;
  for(let step=0;step<TMAX/DT;step++){
    // unitaire evolutie: psi += -i H psi dt  (Euler), dan hernormaliseren
    const Hp=Hpsi(psi,Delta,g);
    for(let i=0;i<3;i++){ // -i*(Hp) = [Hp.im, -Hp.re]
      psi[i][0]+=DT*(Hp[i][1]);
      psi[i][1]+=DT*(-Hp[i][0]);
    }
    renorm(psi);
    t+=DT;
    // omgeving meet met tarief r (Poisson): kans in dt = r*dt
    if(noise()<r*DT){
      const p0=psi[0][0]**2+psi[0][1]**2;
      const p1=psi[1][0]**2+psi[1][1]**2;
      const p2=psi[2][0]**2+psi[2][1]**2;
      const s=p0+p1+p2, x=noise()*s;
      const outcome = x<p0?0 : x<p0+p1?1 : 2;
      return {outcome, time:t};
    }
  }
  // veiligheids-fallback (zou zelden moeten gebeuren): meet nu
  const p0=psi[0][0]**2+psi[0][1]**2,p1=psi[1][0]**2+psi[1][1]**2,p2=psi[2][0]**2+psi[2][1]**2;
  const s=p0+p1+p2,x=noise()*s; return {outcome:x<p0?0:x<p0+p1?1:2, time:t};
}

function cell(Delta,g,r,N){
  rng=mulberry32(7070);
  let c=[0,0,0], tSum=0; const times=[];
  for(let i=0;i<N;i++){const res=trajectory(Delta,g,r,rng); c[res.outcome]++; tSum+=res.time; times.push(res.time);}
  times.sort((a,b)=>a-b);
  return {pPerc:c[0]/N, pConf:c[1]/N, pTorn:c[2]/N, meanT:+(tSum/N).toFixed(2), medT:+times[Math.floor(N/2)].toFixed(2)};
}

const N=4000, D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0, KG=4.0;
function conflictDelta(gapDeg){const f=(1-Math.cos(gapDeg*D2R))/2; return {Delta:KD*betap*APMAG*f, g:KG*betap*APMAG*f};}

console.log('=== Route B quantum-trajectorie QUTRIT v7 ===');
console.log(`N=${N} trajectoriën, r(omgeving)=0.4, Delta/g endogeen uit conflict.`);
console.log('Uitkomsten: waarneming | conflict | verscheurd. Beslistijd emergent (eerste meting).');

console.log('\n--- A. Regressie: geen conflict (gap=0) => altijd waarneming ---');
{const {Delta,g}=conflictDelta(0); const rr=cell(Delta,g,0.4,N);
 console.log(`  waarn ${(rr.pPerc*100).toFixed(0)}% | confl ${(rr.pConf*100).toFixed(0)}% | versch ${(rr.pTorn*100).toFixed(0)}% | mediaan-tijd ${rr.medT}`);}

console.log('\n--- B. Endogene dosis: conflict-hoek stuurt de uitkomstverdeling (r=0.4) ---');
console.log('  gap(deg) | waarneming | conflict | verscheurd | mediaan-tijd');
for(const gap of [0,30,60,90,120,150,180]){
  const {Delta,g}=conflictDelta(gap); const rr=cell(Delta,g,0.4,N);
  console.log(`  ${String(gap).padStart(6)}   | ${(rr.pPerc*100).toFixed(0).padStart(8)}%  | ${(rr.pConf*100).toFixed(0).padStart(6)}%  | ${(rr.pTorn*100).toFixed(0).padStart(8)}%   | ${rr.medT}`);
}

console.log('\n--- C. Deliberativiteit: aflees-tarief r bij vol conflict (gap=180) ---');
console.log('  Hoog r = haastig (dwingt snel), laag r = geduldig (meer tijd voor verscheurdheid).');
console.log('  r     | waarneming | conflict | verscheurd | mediaan-tijd');
const {Delta,g}=conflictDelta(180);
for(const r of [2.0,1.0,0.5,0.25,0.1]){
  const rr=cell(Delta,g,r,N);
  console.log(`  ${r.toFixed(2).padStart(4)}  | ${(rr.pPerc*100).toFixed(0).padStart(8)}%  | ${(rr.pConf*100).toFixed(0).padStart(6)}%  | ${(rr.pTorn*100).toFixed(0).padStart(8)}%   | ${rr.medT}`);
}
