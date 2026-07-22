// ============================================================================
// LGI-FALSIFICATIE TEST B — hangt de K3(conflict)-curve aan willekeurige constanten?
// Standalone. Raakt de bestaande modellen NIET aan.
//
// Aanval: de K3-getallen gebruiken KD=4, APMAG=0.6, betap=1, r=0.5 — gekozen constanten. Is de
//   stijgende curve een getuned artefact?
// Kerninzicht: voor H=(Delta/2)sigma_x met defasering r is maxK3 (geoptimaliseerd over tau) TIJDSCHAAL-
//   INVARIANT: onder t->t/s, Delta->s*Delta, r->s*r verandert maxK3 niet. Dus maxK3 hangt ALLEEN van de
//   dimensieloze x = Delta/r af, niet van de absolute magnitudes. De willekeurige constanten doen er dan
//   niet toe, alleen hun effect op Delta/r.
// LG-machinerie identiek aan routeB-leggettgarg-v8.mjs (2-niveau Bloch, Ctwo/K3), maxK3 over een log-tau-grid
//   (zodat het optimum bij elke schaal gevangen wordt).
// ============================================================================

function deriv(s,Delta,r){ return [ -r*s[0], -Delta*s[2]-r*s[1], Delta*s[1] ]; }
// SCHAAL-COVARIANTE integrator: dt evenredig aan 1/tempo, zodat de discretisatie dimensieloos identiek is
// onder (Delta,r)->(s*Delta,s*r). Dan hangt maxK3 numeriek ALLEEN van Delta/r af (exacte invariantie).
function evolve(s,T,Delta,r,dt){ const steps=Math.max(0,Math.round(T/dt)); let x=[s[0],s[1],s[2]];
  for(let i=0;i<steps;i++){ const k1=deriv(x,Delta,r), k2=deriv([x[0]+dt/2*k1[0],x[1]+dt/2*k1[1],x[2]+dt/2*k1[2]],Delta,r),
    k3=deriv([x[0]+dt/2*k2[0],x[1]+dt/2*k2[1],x[2]+dt/2*k2[2]],Delta,r), k4=deriv([x[0]+dt*k3[0],x[1]+dt*k3[1],x[2]+dt*k3[2]],Delta,r);
    x=[x[0]+dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]),x[1]+dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]),x[2]+dt/6*(k1[2]+2*k2[2]+2*k3[2]+k4[2])]; } return x; }
function Ctwo(S0,ta,tb,Delta,r,dt){ const Sa=evolve(S0,ta,Delta,r,dt); const rza=Math.max(-1,Math.min(1,Sa[2]));
  const pP=(1+rza)/2,pM=(1-rza)/2; const rzbP=evolve([0,0,1],tb-ta,Delta,r,dt)[2], rzbM=evolve([0,0,-1],tb-ta,Delta,r,dt)[2];
  return pP*(+1)*rzbP + pM*(-1)*rzbM; }
function K3(tau,Delta,r,dt){ const S0=[0,0,1]; return Ctwo(S0,0,tau,Delta,r,dt)+Ctwo(S0,tau,2*tau,Delta,r,dt)-Ctwo(S0,0,2*tau,Delta,r,dt); }
function maxK3(Delta,r){ const rate=Math.max(Delta,r,1e-6); const dt=1/(200*rate); // ~200 stappen per karakteristieke tijd
  let best=-Infinity,bt=0; for(let k=0.02;k<=8.0;k+=0.02){ const tau=k/rate; const v=K3(tau,Delta,r,dt); if(v>best){best=v;bt=tau;} }
  return {K3:+best.toFixed(4),tau:+bt.toFixed(3)}; }

const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0;
const protoDelta=gap=>KD*betap*APMAG*(1-Math.cos(gap*D2R))/2; // prototype-parametrisatie (v7/v8)

console.log('=== LGI-falsificatie TEST B: dimensieloze robuustheid ===\n');
console.log(`IJK (Delta=${protoDelta(180)}, r=0, gap180): maxK3=${maxK3(protoDelta(180),0).K3}  (moet ~1.5)\n`);

// 1. SCHAAL-INVARIANTIE: maxK3(Delta,r) == maxK3(s*Delta, s*r) tot >=3 decimalen
console.log('--- 1. Schaal-invariantie (bewijst: absolute KD/APMAG doen er niet toe, alleen Delta/r) ---');
const baseD=protoDelta(180), baseR=0.5;
console.log(`  basis (Delta=${baseD}, r=${baseR}): maxK3=${maxK3(baseD,baseR).K3}`);
for(const s of [0.5,2,5]){ const m=maxK3(s*baseD,s*baseR); console.log(`  s=${s}: (Delta=${(s*baseD).toFixed(2)}, r=${(s*baseR).toFixed(2)}) maxK3=${m.K3}`); }

// 2. maxK3 als functie van de DIMENSIELOZE x = Delta/r
console.log('\n--- 2. maxK3 vs x = Delta/r (curve; r=1 vast, Delta varieert) ---');
console.log('   x=D/r | maxK3');
for(const x of [0.2,0.5,1,2,3,5,8,12,20,40]){ const m=maxK3(x*1.0,1.0); console.log(`  ${String(x).padStart(5)}  | ${m.K3.toFixed(3)}`); }

// 3. ROBUUSTHEID OVER HET EMERGENTE BEREIK: Delta = K*f*P met K = K0*(1+lambda_K*(1-p0)) (v6-implementatie)
console.log('\n--- 3. Emergent bereik: Delta = K*f*P, K=K0(1+lambda_K(1-p0)), K0=4, lambda_K=2 ---');
const K0=4, LK=2;
const p0s=[0.99,0.75,0.55], Ps=[0.5,1.0], fs=[0.1,0.25,0.5,1.0], rs=[0.25,0.5,1,2];
let minK3=Infinity, minCfg=null, allAbove=true, monoOK=true;
for(const p0 of p0s){ const K=K0*(1+LK*(1-p0));
  for(const P of Ps){ for(const r of rs){
    const ks=fs.map(f=>maxK3(K*f*P, r).K3);
    for(let i=1;i<ks.length;i++){ if(ks[i]<ks[i-1]-0.02) monoOK=false; } // monotoon stijgend met conflict f
    ks.forEach((k,i)=>{ if(k<=1) allAbove=false; if(k<minK3){minK3=k;minCfg={p0,K:+K.toFixed(2),P,r,f:fs[i]};} });
  } }
}
console.log(`  p0-bereik [${p0s.join(',')}] -> K-bereik [${(K0*(1+LK*(1-0.99))).toFixed(2)}..${(K0*(1+LK*(1-0.55))).toFixed(2)}]`);
console.log(`  Over K x P x f(>0) x r: alle maxK3 > 1 ? ${allAbove?'JA':'NEE'};  monotoon stijgend met conflict ? ${monoOK?'JA':'NEE'}`);
console.log(`  laagste maxK3 in het bereik: ${minK3.toFixed(3)} bij ${JSON.stringify(minCfg)}`);
// voorbeeldtabel: sterkste karakter-K, P=1, over f en r
console.log('\n  Voorbeeld (K=8 [p0=0.5], P=1): maxK3 over conflict f x omgeving r');
console.log('   f \\ r |  0.25   0.5     1      2');
for(const f of fs){ const row=rs.map(r=>maxK3(8*f*1.0,r).K3.toFixed(3).padStart(6)); console.log(`  ${f.toFixed(2)}  | ${row.join('  ')}`); }
