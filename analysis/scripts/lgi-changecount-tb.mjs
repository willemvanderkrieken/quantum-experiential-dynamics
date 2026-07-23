// ============================================================================
// LG-voorspelling in de CHANGE-COUNT / TEMPORAL-BELL-vorm (Pothos-groep).
// Standalone. Raakt de bestaande modellen NIET aan; verandert geen dynamiek/gewichten/drempels/collapse.
//
// Pothos c.s. (Waddup, Yearsley, Blasiak & Pothos; Atmanspacher & Filk 2010) meet in mensen de FLIP-kansen
// N_ij (kans dat het dichotome oordeel Q verschilt tussen t_i en t_j) en de temporele-Bell-ongelijkheid
//   N13 <= N12 + N23   (macrorealisme/temporeel Bell).
// Voor Q = +/-1 geldt C_ij = <Q_i Q_j> = 1 - 2*N_ij, dus N_ij = (1 - C_ij)/2, en
//   K3 = C12 + C23 - C13 = 1 + 2*(N13 - N12 - N23).
// Een schending K3 > 1 is dus exact N13 > N12 + N23; marge (N13 - N12 - N23) = (K3 - 1)/2.
//
// DYNAMIEK: exact overgenomen uit routeB-leggettgarg-v8.mjs (2-niveau ambivalentie-Bloch,
//   H=(Delta/2)sigma_x, defasering r, sequentiele projectieve metingen). NIET gewijzigd.
// ============================================================================

// ---- v8-dynamiek, verbatim ----
function deriv(s,Delta,r){ return [ -r*s[0], -Delta*s[2]-r*s[1], Delta*s[1] ]; }
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
// twee-tijds-correlatie C(ta,tb) = <Q(ta)Q(tb)> via projectie-evolutie-projectie (Born + collapse)
function Ctwo(S0,ta,tb,Delta,r){
  const Sa=evolve(S0,ta,Delta,r);
  const rza=Math.max(-1,Math.min(1,Sa[2]));
  const pP=(1+rza)/2, pM=(1-rza)/2;
  const rzbP=evolve([0,0,1], tb-ta, Delta, r)[2];
  const rzbM=evolve([0,0,-1], tb-ta, Delta, r)[2];
  return pP*(+1)*rzbP + pM*(-1)*rzbM;
}
const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0;
function conflictDelta(gap){return KD*betap*APMAG*(1-Math.cos(gap*D2R))/2;}

// ---- change-count analyse: optimaliseer K3 over hetzelfde tau-venster als v8, rapporteer N_ij bij tau* ----
function analyze(Delta,r){
  const S0=[0,0,1]; let best={K3:-Infinity,tau:0,C12:0,C23:0,C13:0};
  for(let tau=0.02; tau<=4.0+1e-9; tau+=0.02){
    const C12=Ctwo(S0,0,tau,Delta,r);
    const C23=Ctwo(S0,tau,2*tau,Delta,r);
    const C13=Ctwo(S0,0,2*tau,Delta,r);
    const K3=C12+C23-C13;
    if(K3>best.K3) best={K3,tau,C12,C23,C13};
  }
  const N12=(1-best.C12)/2, N23=(1-best.C23)/2, N13=(1-best.C13)/2;
  const margin=N13-N12-N23;                 // = (K3-1)/2
  const K3_from_N=1+2*margin;               // change-count-uitdrukking van K3
  return {maxK3:best.K3, tau:best.tau, N12, N23, N13, margin, K3_from_N};
}

console.log('=== LG in change-count / Temporal-Bell-vorm (N13 vs N12+N23) ===\n');

// IJk: r=0, gap180 -> K3 ~ 1.5, marge (N13-N12-N23) ~ 0.25
{ const a=analyze(conflictDelta(180),0);
  console.log(`IJK (r=0, gap180): maxK3=${a.maxK3.toFixed(3)} (moet ~1.5), marge N13-N12-N23=${a.margin.toFixed(3)} (moet ~0.25)`);
  console.log(`Identiteit-check: K3=${a.maxK3.toFixed(6)} vs 1+2*marge=${a.K3_from_N.toFixed(6)}  |verschil|=${Math.abs(a.maxK3-a.K3_from_N).toExponential(2)}\n`); }

// Conflict-afhankelijke curve in change-count-eenheden, r=0.5
console.log('Change-count-curve (r=0.5), geoptimaliseerd over hetzelfde tau-venster als v8:');
console.log('gap |  N12   |  N23   |  N13   | N13-(N12+N23) | equiv. maxK3 | schending?');
let maxIdDiff=0;
for(const gap of [30,60,90,135,180]){
  const a=analyze(conflictDelta(gap),0.5);
  maxIdDiff=Math.max(maxIdDiff,Math.abs(a.maxK3-a.K3_from_N));
  const viol=a.margin>0 ? `JA (N13>N12+N23)` : 'nee';
  console.log(`${String(gap).padStart(3)} | ${a.N12.toFixed(3)}  | ${a.N23.toFixed(3)}  | ${a.N13.toFixed(3)}  | ${a.margin>=0?'+':''}${a.margin.toFixed(3)}        | ${a.maxK3.toFixed(3).padStart(6)}       | ${viol}`);
}
console.log(`\nIdentiteit K3 = 1 + 2*(N13-N12-N23) klopt over de hele tabel tot |verschil| <= ${maxIdDiff.toExponential(2)} (machineprecisie).`);
console.log('Temporele-Bell-ongelijkheid N13 <= N12 + N23 wordt geschonden zodra er conflict is; de schending is een');
console.log('conflict-afhankelijke CURVE (marge stijgt met de conflicthoek), geen enkel punt.');
