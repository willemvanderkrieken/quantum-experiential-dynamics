// ============================================================================
// LGI-FALSIFICATIE TEST A — overleeft de schending het derde niveau (limbo-lek)?
// Standalone. Raakt de bestaande modellen NIET aan.
//
// Aanval: v8 rekent K3 op het GEISOLEERDE 2-niveau (waarneming<->conflict). De echte dynamica is een
//   qutrit: de limbo-koppeling g lekt kans uit de 2-toestand-oscillatie. Als de schending alleen bij
//   verwaarloosbare g bestaat, is de LGI-claim te sterk.
// Aanpak: LG-toets (identiek aan v8: Ctwo/K3/maxK3, projectieve metingen, Born) op de VOLLE qutrit open-
//   systeem-generator uit routeB-lindblad-qutrit-v6.mjs: H = Delta/2(|0><1|+|1><0|) + g/2(|0><2|+..+|2><1|),
//   plus defasering r (verval van alle off-diagonalen), op de 3x3 dichtheidsmatrix.
// Grofkorreling (legitiem voor LG): Q = +1 op P0=|0><0| (waarneming), Q = -1 op Pc=|1><1|+|2><2|
//   (niet-waarneming = conflict OF limbo). Projectieve metingen (Born + collapse), 3x3.
// ============================================================================

// ---- complexe 3x3 machinerie (uit v6) ----
const N3=3;
function zeros(){const m=[];for(let i=0;i<N3;i++){m.push([]);for(let j=0;j<N3;j++)m[i].push([0,0]);}return m;}
function cmul(a,b){return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]];}
function matmul(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++){let re=0,im=0;for(let k=0;k<N3;k++){const p=cmul(A[i][k],B[k][j]);re+=p[0];im+=p[1];}C[i][j]=[re,im];}return C;}
function madd(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]+B[i][j][0],A[i][j][1]+B[i][j][1]];return C;}
function msub(A,B){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]-B[i][j][0],A[i][j][1]-B[i][j][1]];return C;}
function mscaleR(A,s){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=[A[i][j][0]*s,A[i][j][1]*s];return C;}
function mscaleC(A,c){const C=zeros();for(let i=0;i<N3;i++)for(let j=0;j<N3;j++)C[i][j]=cmul(A[i][j],c);return C;}
function traceRe(A){return A[0][0][0]+A[1][1][0]+A[2][2][0];}
function buildH(Delta,g){const H=zeros();H[0][1]=[Delta/2,0];H[1][0]=[Delta/2,0];H[0][2]=[g/2,0];H[2][0]=[g/2,0];H[1][2]=[g/2,0];H[2][1]=[g/2,0];return H;}
function commutator(H,rho){ return mscaleC(msub(matmul(H,rho),matmul(rho,H)), [0,-1]); } // -i[H,rho]
function dephaseDeriv(rho,r){ const C=zeros(); for(let i=0;i<N3;i++)for(let j=0;j<N3;j++){ if(i!==j) C[i][j]=[-r*rho[i][j][0],-r*rho[i][j][1]]; } return C; } // verval off-diagonalen (defasering r)

const LG_DT=0.01;
function evolveRho(rho,T,H,r){ const steps=Math.max(0,Math.round(T/LG_DT)); let x=rho;
  const d=v=>madd(commutator(H,v),dephaseDeriv(v,r));
  for(let s=0;s<steps;s++){ const k1=d(x),k2=d(madd(x,mscaleR(k1,LG_DT/2))),k3=d(madd(x,mscaleR(k2,LG_DT/2))),k4=d(madd(x,mscaleR(k3,LG_DT)));
    x=madd(x,mscaleR(madd(madd(k1,mscaleR(k2,2)),madd(mscaleR(k3,2),k4)),LG_DT/6)); } return x; }

// projectieve meting Q=P0(+1) vs Pc=|1><1|+|2><2|(-1); Born-kansen + collapse
function ket0(){const m=zeros();m[0][0]=[1,0];return m;}
function collapseMinus(rho,pM){ const C=zeros(); for(let i=1;i<N3;i++)for(let j=1;j<N3;j++)C[i][j]=[rho[i][j][0]/pM,rho[i][j][1]/pM]; return C; } // Pc rho Pc / pM

function Ctwo(rho0,ta,tb,H,r){
  const rhoA=evolveRho(rho0,ta,H,r);
  const pP=Math.max(0,Math.min(1,rhoA[0][0][0])), pM=1-pP;
  let QP=0,QM=0;
  if(pP>1e-9){ const rbP=evolveRho(ket0(),tb-ta,H,r); QP=2*rbP[0][0][0]-1; }
  if(pM>1e-9){ const rbM=evolveRho(collapseMinus(rhoA,pM),tb-ta,H,r); QM=2*rbM[0][0][0]-1; }
  return pP*(+1)*QP + pM*(-1)*QM;
}
function maxK3(H,r){ const rho0=ket0(); let best=-Infinity,bt=0;
  for(let tau=0.02;tau<=4.0;tau+=0.04){ const k=Ctwo(rho0,0,tau,H,r)+Ctwo(rho0,tau,2*tau,H,r)-Ctwo(rho0,0,2*tau,H,r); if(k>best){best=k;bt=tau;} }
  return {K3:+best.toFixed(3),tau:+bt.toFixed(2)}; }

const D2R=Math.PI/180, betap=1.0, APMAG=0.6, KD=4.0;
function conflictDelta(gap){return KD*betap*APMAG*(1-Math.cos(gap*D2R))/2;} // = 2.4*(1-cos)/2 (v8/v7)

console.log('=== LGI-falsificatie TEST A: qutrit met limbo-lek g ===\n');
// IJk: g=0, r=0, gap180 -> maxK3 moet ~1.5 (2-niveau limiet)
{ const D=conflictDelta(180); const m=maxK3(buildH(D,0),0);
  console.log(`IJK (g=0, r=0, gap180): maxK3=${m.K3} bij tau=${m.tau}  (moet ~1.5, 2-niveau limiet)\n`); }

console.log('Sweep limbo-koppeling g = xi*Delta (v7 gebruikt xi=1; v6.1-model xi~1..1.8), r=0.5.');
console.log('gap |   g    (xi)  | maxK3');
const XIS=[0,0.5,1.0,1.5,2.0,3.0];
const GAPS=[30,60,90,135,180];
const table=[];
for(const gap of GAPS){ const D=conflictDelta(gap);
  for(const xi of XIS){ const g=xi*D; const m=maxK3(buildH(D,g),0.5);
    table.push({gap,xi,g:+g.toFixed(2),K3:m.K3});
    console.log(`${String(gap).padStart(3)} | ${g.toFixed(2).padStart(5)} (${xi.toFixed(1)}) | ${m.K3.toFixed(3)}${m.K3>1?' >1':' <=1'}`); }
}
// samenvatting: waar zakt K3 door 1 (bij welke xi/g), en de monotonie met conflict bij xi=1
console.log('\n--- Samenvatting ---');
for(const xi of XIS){ const row=GAPS.map(gap=>table.find(t=>t.gap===gap&&t.xi===xi).K3);
  const alle=row.every(k=>k>1); console.log(`  xi=${xi.toFixed(1)}: K3 over gaps ${JSON.stringify(row)} -> ${alle?'ALLE >1':'niet allemaal >1'}`); }
const xi1=GAPS.map(gap=>table.find(t=>t.gap===gap&&t.xi===1.0).K3);
const mono=xi1.every((k,i)=>i===0||k>=xi1[i-1]-1e-9);
console.log(`  Monotone stijging met conflict bij het model-tarief xi=1: ${mono?'JA':'NEE'}  (${JSON.stringify(xi1)})`);
