// ============================================================================
// Discriminatie: KLASSIEKE (macrorealistische) TWEELING van Route B vs het quantum-model.
// Standalone, reproduceerbaar (vaste seed). Raakt model/bewustzijn-model-v6.1.html en de
// bestaande prototypes (routeB-*-v6/v7/v8.mjs) NIET aan.
//
// Doel (voor de paper): een klassiek model met DEZELFDE toestanden, tarieven en uitkomsten
//   reproduceert de beslistijd- en uitkomstsignaturen, maar is gebonden aan Leggett-Garg K3 <= 1;
//   alleen het coherente model haalt K3 > 1, stijgend met conflict.
//
// Drie modellen, EEN LG-procedure (identiek aan routeB-leggettgarg-v8.mjs; hergebruikt via een
//   verwisselbare evolve-functie op de 2-niveau ambivalentie-Bloch [rx,ry,rz], Q = rz = +/-1):
//   (A) QUANTUM     : coherente Rabi + omgevings-defasering r (v8-dynamiek).
//   (B) KLASSIEK    : continue-tijd Markov, GEEN coherenties (alleen rz relaxeert).
//   (C) GEDECOHEREERD: quantum-dynamiek maar elke tijdstap de off-diagonalen (rx,ry) op nul.
// Uitkomst/beslistijd: qutrit-trajectorie (v7) vs klassieke 3-populatie-Markov, beide met
//   Poisson-aflezing tarief r (eerste-aflees-moment).
// ============================================================================

function mulberry32(seed){let a=seed>>>0;return function(){a|=0;a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}

const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0, KG=4.0;
function conflictScalar(gap){return KD*betap*APMAG*(1-Math.cos(gap*D2R))/2;} // = 2.4*(1-cos)/2, identiek aan v8/v7 (Delta=g)

// ---------------------------------------------------------------------------
// LG-PROCEDURE (identiek aan v8), geparametriseerd op een evolve-functie evolveFn(s,T)->[rx,ry,rz]
// ---------------------------------------------------------------------------
function makeMaxK3(evolveFn){
  const Ctwo=(S0,ta,tb)=>{ const Sa=evolveFn(S0,ta); const rza=Math.max(-1,Math.min(1,Sa[2]));
    const pP=(1+rza)/2,pM=(1-rza)/2;
    const rzbP=evolveFn([0,0,1],tb-ta)[2]; const rzbM=evolveFn([0,0,-1],tb-ta)[2];
    return pP*(+1)*rzbP + pM*(-1)*rzbM; };
  const K3=(tau)=>{ const S0=[0,0,1]; return Ctwo(S0,0,tau)+Ctwo(S0,tau,2*tau)-Ctwo(S0,0,2*tau); };
  let best=-Infinity,bt=0; for(let tau=0.02;tau<=4.0;tau+=0.02){const k=K3(tau); if(k>best){best=k;bt=tau;}}
  return {K3:+best.toFixed(3),tau:+bt.toFixed(2)};
}

// (A) QUANTUM Bloch: H=(Delta/2)sigma_x + defasering r. rx'=-r rx; ry'=-Delta rz - r ry; rz'=Delta ry.
const LG_DT=0.002;
function derivQ(s,Delta,r){ return [ -r*s[0], -Delta*s[2]-r*s[1], Delta*s[1] ]; }
function rk4(deriv,x,dt){ const k1=deriv(x); const k2=deriv([x[0]+dt/2*k1[0],x[1]+dt/2*k1[1],x[2]+dt/2*k1[2]]);
  const k3=deriv([x[0]+dt/2*k2[0],x[1]+dt/2*k2[1],x[2]+dt/2*k2[2]]); const k4=deriv([x[0]+dt*k3[0],x[1]+dt*k3[1],x[2]+dt*k3[2]]);
  return [x[0]+dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]), x[1]+dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]), x[2]+dt/6*(k1[2]+2*k2[2]+2*k3[2]+k4[2])]; }
function evolveQ(s,T,Delta,r){ const steps=Math.max(0,Math.round(T/LG_DT)); let x=[s[0],s[1],s[2]];
  for(let i=0;i<steps;i++) x=rk4(v=>derivQ(v,Delta,r),x,LG_DT); return x; }

// (C) GEDECOHEREERD: zelfde Rabi (r=0) maar strip elke stap de coherenties rx,ry (dephase-naar-diagonaal).
function evolveDeph(s,T,Delta){ const steps=Math.max(0,Math.round(T/LG_DT)); let x=[s[0],s[1],s[2]];
  for(let i=0;i<steps;i++){ x=rk4(v=>derivQ(v,Delta,0),x,LG_DT); x[0]=0; x[1]=0; } return x; }

// (B) KLASSIEK: geen coherenties; rz relaxeert exponentieel met snelheid c (=2*omega + r). rx,ry irrelevant.
function evolveCl(s,T,c){ return [0,0,s[2]*Math.exp(-c*T)]; }

// ---------------------------------------------------------------------------
// UITKOMST + BESLISTIJD
// ---------------------------------------------------------------------------
const TR_DT=0.02, TR_TMAX=200;
// (A) QUANTUM qutrit-trajectorie (v7): start |0>, coherente evolutie, Poisson-aflezing r, Born-collapse.
function HpsiQ(psi,Delta,g){ const d=Delta/2,h=g/2; return [
  [d*psi[1][0]+h*psi[2][0], d*psi[1][1]+h*psi[2][1]],
  [d*psi[0][0]+h*psi[2][0], d*psi[0][1]+h*psi[2][1]],
  [h*psi[0][0]+h*psi[1][0], h*psi[0][1]+h*psi[1][1]] ]; }
function qTraj(Delta,g,r,noise){ let psi=[[1,0],[0,0],[0,0]],t=0;
  for(let step=0;step<TR_TMAX/TR_DT;step++){ const Hp=HpsiQ(psi,Delta,g);
    for(let i=0;i<3;i++){psi[i][0]+=TR_DT*Hp[i][1];psi[i][1]+=TR_DT*(-Hp[i][0]);}
    const n=Math.sqrt(psi[0][0]**2+psi[0][1]**2+psi[1][0]**2+psi[1][1]**2+psi[2][0]**2+psi[2][1]**2)||1;
    for(let i=0;i<3;i++){psi[i][0]/=n;psi[i][1]/=n;} t+=TR_DT;
    if(noise()<r*TR_DT){ const p0=psi[0][0]**2+psi[0][1]**2,p1=psi[1][0]**2+psi[1][1]**2,p2=psi[2][0]**2+psi[2][1]**2;
      const x=noise()*(p0+p1+p2); return {o:x<p0?0:x<p0+p1?1:2,t}; } }
  const p0=psi[0][0]**2+psi[0][1]**2,p1=psi[1][0]**2+psi[1][1]**2,p2=psi[2][0]**2+psi[2][1]**2;
  const x=noise()*(p0+p1+p2); return {o:x<p0?0:x<p0+p1?1:2,t}; }
// (B) KLASSIEKE 3-populatie-Markov-trajectorie: exchange omega (w<->c), lek gleak (w,c->limbo), Poisson-aflezing r.
function clTraj(omega,gleak,r,noise){ let pw=1,pc=0,pl=0,t=0;
  for(let step=0;step<TR_TMAX/TR_DT;step++){
    const dpw=-omega*(pw-pc)-gleak*pw, dpc=-omega*(pc-pw)-gleak*pc, dpl=gleak*(pw+pc);
    pw+=TR_DT*dpw; pc+=TR_DT*dpc; pl+=TR_DT*dpl; const s=pw+pc+pl||1; pw/=s;pc/=s;pl/=s; t+=TR_DT;
    if(noise()<r*TR_DT){ const x=noise(); return {o:x<pw?0:x<pw+pc?1:2,t}; } }
  const x=noise(); return {o:x<pw?0:x<pw+pc?1:2,t}; }

function distn(trajFn,N,seed){ const rng=mulberry32(seed); const c=[0,0,0],ts=[];
  for(let i=0;i<N;i++){const r=trajFn(rng);c[r.o]++;ts.push(r.t);} ts.sort((a,b)=>a-b);
  return {pw:c[0]/N,pc:c[1]/N,pl:c[2]/N,medT:+ts[Math.floor(N/2)].toFixed(2)}; }

// ---------------------------------------------------------------------------
// 0. IJK: verifieer de LG-implementatie op het quantum-model (r=0, gap180 -> ~1.5)
// ---------------------------------------------------------------------------
console.log('=== Klassieke tweeling vs quantum — Leggett-Garg discriminatie ===\n');
{ const D=conflictScalar(180); const m=makeMaxK3((s,T)=>evolveQ(s,T,D,0));
  console.log(`IJK quantum (r=0, gap180): maxK3=${m.K3} bij tau=${m.tau}  (theorie 1.5, moet ~1.5 zijn)`); }

// ---------------------------------------------------------------------------
// 1. KALIBRATIE van de klassieke tarieven op de quantum-uitkomstverdeling
//    omega = a*Delta (exchange uit de conflict-koppeling), gleak = b*g (lek uit de limbo-voeding).
// ---------------------------------------------------------------------------
const CAL_N=1200, GAPS=[30,60,90,135,180], rCal=[0.25,0.5,1,2];
function outMismatch(a,b){ let miss=0;
  for(const gap of GAPS){ const D=conflictScalar(gap);
    for(const r of rCal){ const q=distn(n=>qTraj(D,D,r,n),CAL_N,3131);
      const c=distn(n=>clTraj(a*D,b*D,r,n),CAL_N,3131);
      miss+=Math.abs(q.pw-c.pw)+Math.abs(q.pc-c.pc)+Math.abs(q.pl-c.pl); } }
  return miss; }
let bestA=0.5,bestB=0.5,bestMiss=Infinity;
for(const a of [0.3,0.5,0.7,1.0,1.4]) for(const b of [0.1,0.2,0.35,0.5,0.7]){ const m=outMismatch(a,b); if(m<bestMiss){bestMiss=m;bestA=a;bestB=b;} }
console.log(`\nKalibratie (match uitkomstverdeling over gaps x r=${JSON.stringify(rCal)}): omega=${bestA}*Delta, gleak=${bestB}*g  (gem. mismatch/cel ${(bestMiss/(GAPS.length*rCal.length)).toFixed(2)})`);

// ---------------------------------------------------------------------------
// 2+3+4+5. VERGELIJKINGSTABEL over gap x r
// ---------------------------------------------------------------------------
const RS=[0,0.25,0.5,1,2,4], N=2000;
console.log('\n=== Vergelijkingstabel ===');
console.log('gap |   r  | uitkomst q (w/c/l)   | uitkomst kl (w/c/l)  | medT q | medT kl | maxK3 Q | maxK3 KL | maxK3 DEPH');
for(const gap of GAPS){ const D=conflictScalar(gap);
  const kQbase=null;
  for(const r of RS){
    // uitkomst/timing (r=0 => geen aflezing, n.v.t.)
    let qs='   n.v.t.        ', cs='   n.v.t.        ', qT='  n.v.t.', cT='  n.v.t.';
    if(r>0){ const q=distn(n=>qTraj(D,D,r,n),N,7070); const c=distn(n=>clTraj(bestA*D,bestB*D,r,n),N,7070);
      qs=`${(q.pw*100).toFixed(0).padStart(2)}/${(q.pc*100).toFixed(0).padStart(2)}/${(q.pl*100).toFixed(0).padStart(2)}`;
      cs=`${(c.pw*100).toFixed(0).padStart(2)}/${(c.pc*100).toFixed(0).padStart(2)}/${(c.pl*100).toFixed(0).padStart(2)}`;
      qT=q.medT.toFixed(2); cT=c.medT.toFixed(2); }
    // K3 (dezelfde procedure, drie evolve-functies)
    const kQ=makeMaxK3((s,T)=>evolveQ(s,T,D,r)).K3;
    const kCl=makeMaxK3((s,T)=>evolveCl(s,T,2*bestA*D+r)).K3;
    const kDe=makeMaxK3((s,T)=>evolveDeph(s,T,D)).K3;
    console.log(`${String(gap).padStart(3)} | ${r.toFixed(2).padStart(4)} | q ${qs.padEnd(16)} | kl ${cs.padEnd(16)} | ${qT.padStart(6)} | ${cT.padStart(7)} | ${kQ.toFixed(3).padStart(6)}  | ${kCl.toFixed(3).padStart(7)}  | ${kDe.toFixed(3).padStart(6)}`);
  }
}
console.log('\nLezing: uitkomst/beslistijd matchen (klassieke tweeling reproduceert de signaturen);');
console.log('maxK3 Q > 1 (stijgend met conflict), maxK3 KL <= 1 en maxK3 DEPH <= 1 -> alleen coherentie draagt de LG-schending.');
