// ============================================================================
// Discriminatie-toets: Leggett-Garg-ongelijkheid op de Route B-ambivalentie — v8.
// Parallel, raakt bewustzijn-model-v5.html NIET.
//
// Vraag: kan een KLASSIEK (macrorealistisch) model de tijd-correlaties van de
//   waarneming<->conflict-oscillatie namaken? Leggett-Garg K3 is de toets:
//     macrorealisme:  K3 <= 1
//     quantum-coherentie: K3 tot 1.5
//   K3 = C(0,tau) + C(tau,2tau) - C(0,2tau), met C = twee-tijds-correlatie van
//   Q = +/-1 (waarneming vs conflict), gemeten via projectie-evolutie-projectie.
//
// Twee-niveau ambivalentie-subsysteem (|0> waarneming, |1> conflict) op de Bloch:
//   H = (Delta/2) sigma_x  (ambivalentie-oscillatie; Delta endogeen uit conflict)
//   omgeving = defasering met tarief r (de "meting"/decoherentie).
//   Bloch (rx,ry,rz), Q = sigma_z (rz), defasering doodt rx,ry:
//     rx' = -r rx ;  ry' = -Delta rz - r ry ;  rz' = Delta ry
//
// Als K3 > 1 ONDANKS de omgevings-defasering r, dan is er een echte quantum-
//   handtekening die geen klassiek model kan reproduceren. Dat is discriminatie.
// ============================================================================

function deriv(s,Delta,r){ // s=[rx,ry,rz]
  return [ -r*s[0], -Delta*s[2]-r*s[1], Delta*s[1] ];
}
function evolve(s,T,Delta,r){
  const dt=0.001; const steps=Math.max(0,Math.round(T/dt));
  let x=[s[0],s[1],s[2]];
  for(let i=0;i<steps;i++){
    const k1=deriv(x,Delta,r);
    const k2=deriv([x[0]+dt/2*k1[0],x[1]+dt/2*k1[1],x[2]+dt/2*k1[2]],Delta,r);
    const k3=deriv([x[0]+dt/2*k2[0],x[1]+dt/2*k2[1],x[2]+dt/2*k2[2]],Delta,r);
    const k4=deriv([x[0]+dt*k3[0],x[1]+dt*k3[1],x[2]+dt*k3[2]],Delta,r);
    x=[x[0]+dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]),
       x[1]+dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]),
       x[2]+dt/6*(k1[2]+2*k2[2]+2*k3[2]+k4[2])];
  }
  return x;
}
// twee-tijds-correlatie C(ta,tb): meet Q op ta (projectie op sigma_z), evolueer, meet op tb
function Ctwo(S0,ta,tb,Delta,r){
  const Sa=evolve(S0,ta,Delta,r);
  const rza=Math.max(-1,Math.min(1,Sa[2]));
  const pP=(1+rza)/2, pM=(1-rza)/2;
  const rzbP=evolve([0,0,1], tb-ta, Delta, r)[2]; // gecollapst naar |0> (Q=+1)
  const rzbM=evolve([0,0,-1], tb-ta, Delta, r)[2]; // gecollapst naar |1> (Q=-1)
  return pP*(+1)*rzbP + pM*(-1)*rzbM;
}
function K3(tau,Delta,r){
  const S0=[0,0,1]; // start in |0> waarneming
  const C1=Ctwo(S0,0,tau,Delta,r);
  const C2=Ctwo(S0,tau,2*tau,Delta,r);
  const C3=Ctwo(S0,0,2*tau,Delta,r);
  return C1+C2-C3;
}
function maxK3(Delta,r){
  let best=-Infinity,bestTau=0;
  for(let tau=0.02;tau<=4.0;tau+=0.02){ const k=K3(tau,Delta,r); if(k>best){best=k;bestTau=tau;} }
  return {K3:+best.toFixed(3),tau:+bestTau.toFixed(2)};
}

const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0;
function conflictDelta(gap){return KD*betap*APMAG*(1-Math.cos(gap*D2R))/2;}

console.log('=== Leggett-Garg discriminatie-toets (v8) ===');
console.log('Macrorealisme (klassiek): K3 <= 1.  Quantum-coherentie: tot 1.5.');
console.log('K3 > 1 = handtekening die GEEN klassiek model kan namaken.\n');

console.log('--- IJk: zuivere Rabi zonder omgeving (r=0) ---');
{const gap=180, D=conflictDelta(gap); const m=maxK3(D,0);
 console.log(`  Delta=${D.toFixed(2)} (gap 180), r=0 -> max K3=${m.K3} bij tau=${m.tau}  (theorie: 1.5)`);}

console.log('\n--- Discrimineert v7 ONDANKS de omgevings-defasering r? (gap=180) ---');
console.log('  r      | max K3 | tau  | oordeel');
const D180=conflictDelta(180);
for(const r of [0.0,0.1,0.25,0.5,1.0,2.0,4.0]){
  const m=maxK3(D180,r);
  const oordeel = m.K3>1.0? 'QUANTUM (schending)' : 'klassiek verklaarbaar';
  console.log(`  ${r.toFixed(2).padStart(5)}  | ${m.K3.toFixed(3).padStart(5)}  | ${m.tau.toFixed(2)} | ${oordeel}`);
}

console.log('\n--- Hangt de schending van het conflict af? (r=0.5 vast) ---');
console.log('  gap(deg) | Delta | max K3 | oordeel');
for(const gap of [30,60,90,135,180]){
  const D=conflictDelta(gap); const m=maxK3(D,0.5);
  console.log(`  ${String(gap).padStart(6)}   | ${D.toFixed(2)} | ${m.K3.toFixed(3).padStart(5)}  | ${m.K3>1?'QUANTUM':'klassiek'}`);
}
