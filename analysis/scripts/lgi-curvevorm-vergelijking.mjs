// ============================================================================
// CURVE-VORM-VERGELIJKING: is de VORM van onze K3-curve modelspecifiek, of gewoon "stijgend"?
// Standalone. Raakt de modeldynamiek/gewichten/drempels/collapse NIET aan; puur extra analyse.
//
// Pothos: een stijgende K3-curve is generiek voor coherente systemen. Wij laten zien dat de
// VORM van onze curve (de geometrische overlap (1-cos(theta))/2) meetbaar verschilt van een
// lineaire of een conflict-onafhankelijke (constante) koppeling, bij gelijk eindpunt.
//
// DYNAMIEK: exact overgenomen uit routeB-leggettgarg-v8.mjs (H=(Delta/2)sigma_x, defasering r,
//   dichotome Q via sequentiele projectieve metingen, maxK3 over tau). NIET gewijzigd.
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
function Ctwo(S0,ta,tb,Delta,r){
  const Sa=evolve(S0,ta,Delta,r);
  const rza=Math.max(-1,Math.min(1,Sa[2]));
  const pP=(1+rza)/2, pM=(1-rza)/2;
  const rzbP=evolve([0,0,1], tb-ta, Delta, r)[2];
  const rzbM=evolve([0,0,-1], tb-ta, Delta, r)[2];
  return pP*(+1)*rzbP + pM*(-1)*rzbM;
}
// optimaliseer K3 over hetzelfde tau-venster als v8; geef ook de flip-kansen N_ij (change-count) terug
function analyze(Delta,r){
  const S0=[0,0,1]; let best={K3:-Infinity,C12:0,C23:0,C13:0};
  for(let tau=0.02; tau<=4.0+1e-9; tau+=0.02){
    const C12=Ctwo(S0,0,tau,Delta,r), C23=Ctwo(S0,tau,2*tau,Delta,r), C13=Ctwo(S0,0,2*tau,Delta,r);
    const K3=C12+C23-C13;
    if(K3>best.K3) best={K3,C12,C23,C13};
  }
  const N12=(1-best.C12)/2, N23=(1-best.C23)/2, N13=(1-best.C13)/2;
  return {maxK3:best.K3, N12, N23, N13, margin:N13-N12-N23};
}

// ---- drie koppelings-afbeeldingen, genormaliseerd op hetzelfde eindpunt Delta(180)=Kmax ----
const Kmax=2.4, D2R=Math.PI/180, R=0.5;
const mapM=t=>Kmax*(1-Math.cos(t*D2R))/2;   // MODEL: geometrische overlap (1-cos)/2
const mapL=t=>Kmax*(t/180);                  // LINEAIR
const mapK=t=>Kmax;                          // CONSTANT (conflict-onafhankelijk)

console.log('=== Curve-vorm-vergelijking: is de VORM modelspecifiek? ===\n');

// IJk: r=0, theta=180, model -> maxK3 ~ 1.5
{ const a=analyze(mapM(180),0);
  console.log(`IJK (r=0, theta=180, MODEL): maxK3=${a.maxK3.toFixed(3)} (moet ~1.5)\n`); }

// ---- Output 1: maxK3(theta) voor M, L, K over 0..180 stap 15; RMS-afstand M vs L en M vs K ----
console.log('Output 1  maxK3(theta) bij r=0.5, drie koppelingsvormen (zelfde eindpunt bij 180):');
console.log('theta | maxK3(M) | maxK3(L) | maxK3(K)');
let sL=0,sK=0,nn=0;
for(let t=0;t<=180;t+=15){
  const M=analyze(mapM(t),R).maxK3, L=analyze(mapL(t),R).maxK3, K=analyze(mapK(t),R).maxK3;
  sL+=(M-L)**2; sK+=(M-K)**2; nn++;
  console.log(`${String(t).padStart(5)} | ${M.toFixed(3).padStart(8)} | ${L.toFixed(3).padStart(8)} | ${K.toFixed(3).padStart(8)}`);
}
const rmsL=Math.sqrt(sL/nn), rmsK=Math.sqrt(sK/nn);
console.log(`\nRMS-afstand in maxK3 over de curve:  M vs L = ${rmsL.toFixed(3)}   M vs K = ${rmsK.toFixed(3)}`);
console.log('(hoe groter, hoe sterker de vorm van M afwijkt van het alternatief)\n');

// ---- Output 2: onderscheidbaarheid bij realistische bemonstering (change-count, n per hoek) ----
// Observabele = genormaliseerde marge m(theta)=N13-(N12+N23)=(K3-1)/2. Onder M als grondwaarheid
// heeft elke N_ij binomiale ruis Var=N(1-N)/n; Var(m)=(Var12+Var23+Var13). Chi-kwadraat-scheiding
// D = som_theta (m_M - m_alt)^2 / Var_M(theta,n). Simpele, deterministische scheidingsmaat.
const angles=[30,60,90,135,180];
function sep(n){
  let DL=0,DK=0;
  for(const t of angles){
    const aM=analyze(mapM(t),R), mM=aM.margin;
    const mL=analyze(mapL(t),R).margin, mK=analyze(mapK(t),R).margin;
    const varm=(aM.N12*(1-aM.N12)+aM.N23*(1-aM.N23)+aM.N13*(1-aM.N13))/n;
    if(varm>0){ DL+=(mM-mL)**2/varm; DK+=(mM-mK)**2/varm; }
  }
  return {DL,DK};
}
// RMS in marge-eenheden (schaalvrij, los van n) ter context
let rL=0,rK=0;
for(const t of angles){ const mM=analyze(mapM(t),R).margin, mL=analyze(mapL(t),R).margin, mK=analyze(mapK(t),R).margin; rL+=(mM-mL)**2; rK+=(mM-mK)**2; }
rL=Math.sqrt(rL/angles.length); rK=Math.sqrt(rK/angles.length);

console.log('Output 2  onderscheidbaarheid van de VORM bij n proefpersonen per hoek (change-count):');
console.log(`RMS in genormaliseerde marge over 5 hoeken:  M vs L = ${rL.toFixed(3)}   M vs K = ${rK.toFixed(3)}`);
console.log('Chi-kwadraat-scheiding D (M is grondwaarheid; 5 hoeken, kritiek p=0.05 ~ 11.07):');
console.log('  n   | D(M vs L) | D(M vs K) | scheidbaar van L? | scheidbaar van K?');
for(const n of [100,400]){
  const {DL,DK}=sep(n);
  console.log(`${String(n).padStart(5)} | ${DL.toFixed(1).padStart(9)} | ${DK.toFixed(1).padStart(9)} | ${(DL>11.07?'ja':'nee').padStart(17)} | ${(DK>11.07?'ja':'nee').padStart(17)}`);
}
// D schaalt lineair met n; benodigde n om de drempel 11.07 te halen:
const d1=sep(1);
const nL=d1.DL>0?Math.ceil(11.07/d1.DL):Infinity, nK=d1.DK>0?Math.ceil(11.07/d1.DK):Infinity;
console.log(`\nBenodigde n per hoek voor p=0.05-scheiding:  van K ~ ${nK}   van L ~ ${nL}`);
console.log('sqrt(D) ~ aantal sigma scheiding. De model-vorm (1-cos) is glashelder te scheiden van de');
console.log('CONSTANTE koppeling (al bij n=100). Van de LINEAIRE koppeling is de vorm dichtbij: scheiding');
console.log('vergt grotere n. De discriminerende handtekening zit in de lage-conflict-onzet: (1-cos)/2 is');
console.log('daar kwadratisch vlak (~theta^2), een lineaire koppeling niet. De voorspelling is de VORM.');
