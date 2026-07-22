// ============================================================================
// LGI-FALSIFICATIE TEST C — hangt de schending aan het niet-standaard collapse-postulaat?
// Standalone. Raakt de bestaande modellen NIET aan.
//
// Aanval: het model gebruikt "projectieve normalisatie" i.p.v. de Born-regel voor toestandsselectie.
//   Is de LG-schending een artefact van die afwijking?
// (1) Verifieer dat de LG-tussenmeting STANDAARD projectief/Born is (zoals v8).
// (2) Isolatie: reken maxK3 met (i) standaard Born + von Neumann-projectie EN (ii) de model-eigen
//     projectieve-normalisatie, over de conflict-sweep. Rapporteer het verschil.
// (3) maxK3 moet monotoon DALEN met r (defasering degradeert, creeert niet).
// 2-niveau Bloch, LG-machinerie identiek aan routeB-leggettgarg-v8.mjs.
// ============================================================================

function deriv(s,Delta,r){ return [ -r*s[0], -Delta*s[2]-r*s[1], Delta*s[1] ]; }
function evolve(s,T,Delta,r,dt){ const steps=Math.max(0,Math.round(T/dt)); let x=[s[0],s[1],s[2]];
  for(let i=0;i<steps;i++){ const k1=deriv(x,Delta,r), k2=deriv([x[0]+dt/2*k1[0],x[1]+dt/2*k1[1],x[2]+dt/2*k1[2]],Delta,r),
    k3=deriv([x[0]+dt/2*k2[0],x[1]+dt/2*k2[1],x[2]+dt/2*k2[2]],Delta,r), k4=deriv([x[0]+dt*k3[0],x[1]+dt*k3[1],x[2]+dt*k3[2]],Delta,r);
    x=[x[0]+dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]),x[1]+dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]),x[2]+dt/6*(k1[2]+2*k2[2]+2*k3[2]+k4[2])]; } return x; }

// --- tussenmeting, TWEE regels ---
// (i) STANDAARD: Born pP=(1+rz)/2, pM=(1-rz)/2 (som=1); collapse naar de eigentoestand [0,0,+/-1].
function measStandard(Sa){ const rz=Math.max(-1,Math.min(1,Sa[2])); return {pP:(1+rz)/2,pM:(1-rz)/2,postP:[0,0,1],postM:[0,0,-1]}; }
// (ii) MODEL-EIGEN projectieve-normalisatie: reconstrueer rho uit Bloch, selecteer op het GEPROJECTEERDE
//   (ongenormaliseerde) gewicht w_k = <k|rho|k>, coll<->apse naar de GENORMALISEERDE projectie P_k rho P_k / w_k.
//   Voor orthogonale rang-1 projectoren |0>,|1> is dit wiskundig identiek aan Born + von Neumann.
function measModelEigen(Sa){ const rz=Math.max(-1,Math.min(1,Sa[2]));
  const rho00=(1+rz)/2, rho11=(1-rz)/2;          // diagonale (geprojecteerde) gewichten
  const wP=rho00, wM=rho11, Z=wP+wM;             // selecteer op geprojecteerd gewicht (= Born voor orthogonale projectoren)
  // genormaliseerde projectie P0 rho P0 / wP = |0><0| -> Bloch [0,0,1]; idem |1> -> [0,0,-1]
  return {pP:wP/Z, pM:wM/Z, postP:[0,0,1], postM:[0,0,-1]}; }

function CtwoRule(rule,ta,tb,Delta,r,dt){ const Sa=evolve([0,0,1],ta,Delta,r,dt); const m=rule(Sa);
  const rzbP=evolve(m.postP,tb-ta,Delta,r,dt)[2], rzbM=evolve(m.postM,tb-ta,Delta,r,dt)[2];
  return m.pP*(+1)*rzbP + m.pM*(-1)*rzbM; }
function maxK3Rule(rule,Delta,r){ const rate=Math.max(Delta,r,1e-6), dt=1/(200*rate);
  let best=-Infinity; for(let k=0.02;k<=8.0;k+=0.02){ const tau=k/rate;
    const v=CtwoRule(rule,0,tau,Delta,r,dt)+CtwoRule(rule,tau,2*tau,Delta,r,dt)-CtwoRule(rule,0,2*tau,Delta,r,dt); if(v>best)best=v; }
  return +best.toFixed(4); }

const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0;
const conflictDelta=gap=>KD*betap*APMAG*(1-Math.cos(gap*D2R))/2;

console.log('=== LGI-falsificatie TEST C: collapse-postulaat ===\n');
console.log('(1) v8-tussenmeting is standaard Born: pP=(1+rz)/2, pM=(1-rz)/2, som=1, collapse naar eigentoestand.');
console.log('    De qutrit-generator (routeB-trajectory-qutrit-v7) selecteert ook op |c|^2 (Born, cumulatief).');
console.log('    De "projectieve normalisatie" zit in de emotie-MAGNITUDE (intensiteit), niet in de pointer-selectie.\n');
console.log(`IJK (gap180, r=0): standaard maxK3=${maxK3Rule(measStandard,conflictDelta(180),0)}  (moet ~1.5)\n`);

// (2) TWEE-MANIEREN-VERGELIJKING over de conflict-sweep (r=0.5)
console.log('--- (2) maxK3 onder standaard-Born vs model-eigen projectieve-normalisatie (r=0.5) ---');
console.log('  gap | maxK3 (Born) | maxK3 (model-eigen) | |verschil|');
let maxDiff=0;
for(const gap of [30,60,90,135,180]){ const D=conflictDelta(gap);
  const a=maxK3Rule(measStandard,D,0.5), b=maxK3Rule(measModelEigen,D,0.5); const d=Math.abs(a-b); if(d>maxDiff)maxDiff=d;
  console.log(`  ${String(gap).padStart(3)} | ${a.toFixed(4).padStart(11)}  | ${b.toFixed(4).padStart(18)}  | ${d.toFixed(4)}`); }
console.log(`  -> maximaal verschil over de sweep: ${maxDiff.toFixed(4)} (=0 => het postulaat raakt de LG-voorspelling niet).`);

// (3) MONOTONIE met r: maxK3 moet DALEN met r (omgeving degradeert, creeert niet)
console.log('\n--- (3) maxK3 vs r (gap180): moet monotoon DALEN ---');
console.log('   r    | maxK3');
let prev=Infinity, mono=true; const D180=conflictDelta(180);
for(const r of [0,0.1,0.25,0.5,1,2,4]){ const k=maxK3Rule(measStandard,D180,r); if(k>prev+1e-6)mono=false; prev=k;
  console.log(`  ${r.toFixed(2).padStart(4)}  | ${k.toFixed(4)}`); }
console.log(`  -> monotoon dalend met r: ${mono?'JA':'NEE'} (JA => de omgeving MAAKT de schending niet, ze degradeert hem).`);
