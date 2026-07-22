# Route B-verkenning: endogene bias b (saillantie verwachting vs waarneming)

**Standalone verkenning. Model (`bewustzijn-model-v6.1.html`) ONGEWIJZIGD.** Bouwt voort op
`data/empirie/routeB-trajectory-qutrit-v7.mjs`. Twee gebreken uit `protentie-bevindingen-fase1.md` §5:
(1) conflict-pool |1> wint bijna nooit; (2) dosis-respons verzadigt boven ~90°.

## Vooraf vastgelegd (tegen forking-paths)
- **SUCCES**: (i) er bestaat een regime waarin |1> de meerderheidsuitkomst is, gedreven door b (niet door
  een handgezette constante); (ii) bij vaste hoge f verandert variatie in b de uitkomst nog; (iii) monotoon/glad.
- **FAAL**: b werkt alleen via een afgestelde constante, of |1> winnen vereist f kunstmatig te breken. Dan stoppen.
- **HARDE RANDVOORWAARDE**: Leggett-Garg K3>1 (`routeB-leggettgarg-v8.mjs`) mag NIET sneuvelen. maxK3 voor/na meten.

## FASE A — DIAGNOSE (script: `routeB-bias-diagnose-v14.mjs`; dynamiek ongewijzigd)

### Waar zit de waarneming-bias?
**In de begintoestand `psi0 = |0>` (c0=1, c1=0, c2=0).** De readout is een eerlijke Born-trekking over
p0/p1/p2 (geen handgezette winnaar), en Delta koppelt |0><->|1| SYMMETRISCH. Omdat de toestand vol in
|0> start en de meting (Poisson, tarief r) de toestand vaak vroeg betrapt, wint waarneming structureel.
De bias zit dus NIET in readout, g of r, maar in de startpopulatie.

### Wat verzadigt precies?
- **Niet f.** f = (1−cos gap)/2 stijgt monotoon 0→1 (0,5 bij 90°, 1,0 bij 180°). Toch is de uitkomst
  vanaf ~80–90° vlak (waarneming 59%→56% terwijl f nog verdubbelt 0,5→1,0). Dus de **mapping f→uitkomst**
  verzadigt, niet f zelf.
- **De mapping verzadigt in het snelle-oscillatie-regime.** Ontkoppelde test (Delta,g lineair, los van f):
  de uitkomst plateaut zodra Delta > ~r (0,4). Zodra de ambivalentie-oscillatie veel sneller is dan het
  beslistarief r, wordt de uitkomst gezet door de TIJD-GEMIDDELDE populaties en maakt "hoe tegengesteld"
  niet meer uit. Endogeen: Delta = 2,4·f, dus Delta kruist r bij f≈0,17 (gap≈48°) en bereikt de plateau-knie
  (~2–3×r) bij gap≈80–90°. Precies waar de dosis-respons afvlakt. **Zelfde fenomeen.** Niet g apart.

### Wint |1> ooit?
**Nee.** Over een grid hoek×r is het maximale conflict-aandeel 25% (gap=180, r=0,05), waar waarneming nog
49% is. |1> wint nergens. **Defect (1) bevestigd.**

### Contra-proef (startpopulatie kantelen — alleen diagnostisch)
Een begin-amplitude op |1> verschuift de winnaar wél mee (c1=0,7 → waarneming 29%, conflict 28%,
verscheurd 43%). **De startpopulatie is de bias-knop → de hypothese (endogene bias b op de begintoestand)
is het juiste aangrijpingspunt.**

### Oordeel
- Defect (1), |1> wint nooit, is een **echt gebrek**: psychologisch horen sterke priors bij zwakke
  sensorische evidentie de waarneming te overstemmen; dat regime bestaat nu niet.
- Defect (2), verzadiging >90°: de plateau-vorm zelf is **verdedigbaar** (snelle oscillatie t.o.v. beslissing),
  maar het plateau-NIVEAU is vastgepind door c0=1. Er is geen as voor "hoe sterk is de prior vs de evidentie".
- **Eén gemeenschappelijke oorzaak (hypothese bevestigd):** de dynamiek gebruikt alleen de conflict-HOEK f
  en de begintoestand is hardgezet op waarneming. Er ontbreekt een saillantie-as b.
- **WRIKKEL voor Fase B:** een naïeve kanteling van de startpopulatie voedt vooral LIMBO, niet conflict
  (c1=0,7 gaf verscheurd 43% > conflict 28%), omdat elke |0>+|1>-coherentie via g naar |2> lekt. b moet |1>
  laten winnen in een regime met beheersbare limbo (sterke prior + zwakke/ambigue waarneming = matige f,
  dus matige g). Dat is de te vinden conditie.

→ Diagnose toont een echt gebrek. **Fase B gerechtvaardigd.**

## FASE B — INTERVENTIE (script: `routeB-bias-v15.mjs`)

### Wat is toegevoegd (allemaal uit bestaande grootheden, H ONGEWIJZIGD)
Causale keten, met **bandbreedte-emergent geïntegreerd** (openstaand punt, meegenomen):
- `expS = |gamma·A_r + delta·A_h|·(0.5+coherentie)` (saillantie/sterkte prior)
- `att_eff = att/(1+KEXP·expS)` — **bandbreedte emergent**: sterke coherente prior verbreedt de bandbreedte,
  dus minder aandacht voor de waarneming
- `aw_eff = |A_w|·att_eff` (effectieve, scherpe waarneming; brede bandbreedte = zwak)
- `b = expS/(aw_eff+expS)` in [0,1) — relatieve saillantie prior vs evidentie
- `psi0 = √(1−b)|0> + √b|1>` — de begintoestand kantelt (was hard |0>)
- `f`, `Delta=g=2.4·f` blijven IDENTIEK aan v7, dus H ongewijzigd.

### Resultaten (meerdere seeds, bereik)
- **Regressie:** b=0 reproduceert v7 exact (gap0→100% waarneming; gap180→56/22/22).
- **|1> kan winnen:** in tabel b×hoek wint |1> vanaf b≈0,5 (bij milde hoek) tot over het hele bereik bij
  b≈0,85 (74% bij gap30, 43% bij gap180). Wint het makkelijkst bij LAGE f (minder limbo-lek), precies de
  psychologisch juiste conditie (sterke prior, milde/zwakke evidentie).
- **Bereik hersteld bij vaste hoge f (gap180):** b 0→0,9 sweept waarneming (56%) → limbo (42%) → conflict
  (45%). De uitkomst beweegt weer, tegen de eerdere verzadiging in.
- **Emergente weg (gap120):** aandacht omlaag + coherente prior omhoog → b 0,26→0,95 → winnaar
  limbo→limbo→conflict→conflict→conflict (|1> tot 50%). De bandbreedte-emergente keten dóét het werk.
- **Robuust tegen KEXP:** b 0,88→0,95 over KEXP 0,5→3,0; |1> wint in alle gevallen (45–49%). Geen magische
  constante.
- **Monotonie:** |1>-aandeel stijgt glad en monotoon voor b≥0,2; een ondiepe dip (~3%, binnen seed-spreiding)
  bij b=0→0,1. Geen mesje-op-de-rand.
- **LGI-guardrail voor/na:** H is byte-identiek aan v7, dus de Leggett-Garg-schending is onveranderd.
  Los geverifieerd via `routeB-leggettgarg-v8.mjs`: maxK3 1,055–1,500, overal >1, voor = na.

### Nuance (eerlijk)
De overgang naar |1>-dominantie loopt vaak DOOR een limbo-dominant regime (matige b → verscheurd wint).
Dat is een emergente, plausibele volgorde: matige prior-vs-evidentie-spanning → verscheurd; alleen een
sterke prior overstemt de waarneming echt. Limbo zit dus tussen waarneming- en verwachting-dominantie in.

### VERDICT tegen de vooraf vastgelegde criteria
- (i) |1> meerderheid via emergente b, geen handgezette constante: **GEHAALD**.
- (ii) bij vaste hoge f beweegt de uitkomst nog met b (bereik hersteld): **GEHAALD**.
- (iii) monotoon/glad, geen mesje-op-de-rand: **GEHAALD** (met eerlijke ondiepe dip bij zeer lage b).
- Harde randvoorwaarde LGI K3>1: **BEHOUDEN** (H ongewijzigd; voor = na).
→ **SUCCES.** De hypothese klopt: één endogene bias b (saillantie), afgeleid uit bestaande grootheden en
met de bandbreedte emergent uit aandacht/verwachting, verhelpt beide gebreken zonder de quantum-handtekening
te breken. Dit is verkenning; doorvoering in het model pas bij akkoord (aparte beslissing).

## DOORVOERING in het model (bewustzijn-model-v6.1.html, toggle BIAS_B, standaard aan)
b afgeleid in `routeBparams()` uit grootheden die er al zijn: `expS = |gamma·A_r + delta·A_h|·(0.5+coherentie)`
tegen de ZUIVERE waarneming `|currentRawW|`. b kantelt de Route B-starttoestand in `routeBtrajectory`. H
(Delta,g) ongewijzigd → LGI intact. GEEN nieuwe vrije constante.

**Correctie tijdens doorvoering (dubbeltelling):** eerst gebruikte ik `|currentAW|` als evidentie, maar die
bevat de verwachting-kleuring `fb` al. Met de zuivere waarneming `|currentRawW|` klopt de maat en wordt het
gedrag schoner.

**In-model verificatie (627 Route B-runs, faithful synthetische harness, 3 entiteiten):**
- b typisch laag (mediaan ~0,27): de verwachting-wint-MEERDERHEID wordt zelden bereikt (alleen sterke prior
  + zwakke evidentie), psychologisch correct voor een algemene populatie.
- Route B mét b vs zonder: waarneming 64%→52%, conflict 18%→24%, limbo 18%→24%. De verschuiving splitst
  netjes over conflict EN limbo (met de foute maat ging het vrijwel alleen naar limbo).
- Aggregaat-limbo beheerst: ~7%→~10% van ALLE runs.
- **Oordeel: verbetering.** Minder waarnemings-dominantie (meer balans), conflict krijgt een eerlijk aandeel,
  limbo stijgt gematigd (echte verscheurdheid), quantum-handtekening intact. Doorgevoerd met BIAS_B aan.

**Relatie tot Route A/C (gevraagd):** de bias-as bestaat in A al impliciet (collapseRouteA weegt rawW tegen
fb via I_A). C is de overeenstemmings-route, waar prior en waarneming samenvallen, dus b is er minder relevant.
De grootste kruis-route-koppeling is de BANDBREEDTE-emergentie: die verandert de gedeelde waarneming en dus de
route-SELECTIE (trace-afstand T) voor A/B/C. Dat is een bewuste vervolgstap (nu is de bandbreedte nog de
globale situatie-schuif), niet meegenomen in deze contained Route B-doorvoering.
