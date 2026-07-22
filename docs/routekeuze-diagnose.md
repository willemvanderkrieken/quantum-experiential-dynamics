# Diagnose routekeuze A/B/C (standalone, model ONGEWIJZIGD)

Zelfde discipline als Fase A: eerst kwantificeren waar de routekeuze wringt, pas daarna eventueel
interveniëren. Methode: faithful in-browser harness over 7 echte entiteiten (sessie 20260722-1044,
169/125/115/23/22/20/19 runs, incl. Tw-historie), M=300 synthetische percepties per entiteit, met de
ECHTE modelfuncties (`traceDistRho`, `densityMatrixOf`, `rhoPureOf`, `selfFluctOf`, `purityOf`). Niets
aan het model gewijzigd.

Huidige keuze (`determineRouteFor`): T = trace-afstand tussen waarneming en geheugen-rho.
T > eigen p90(Tw) → A (verrassing); T < eigen zelffluctuatie xi → C (herkenning); ertussen → B.

## Bevindingen

### 1. Extreme gevoeligheid voor gekleurde vs zuivere waarneming (groot effect)
De keuze gebruikt `currentAW`, en die bevat de verwachting-kleuring (fb) al (dezelfde dubbeltelling als
bij b). Gevolg, gemeten:
- HUIDIG (gekleurd): mix **A 8% / B 79% / C 13%**, gemiddelde T = 0,352.
- ZUIVERE waarneming: mix **A 43% / B 50% / C 7%**, gemiddelde T = 0,561.

De kleuring trekt de waarneming naar het geheugen (T 0,56 → 0,35), onderdrukt verrassing (A 43% → 8%) en
blaast B op (50% → 79%). De hele A/B/C-mix hangt dus aan één modelkeuze. Niet robuust. (Let op: 43% is niet
per se "juist": zuivere percepties zijn willekeurig en vaak ver van een gevestigde dispositie. De les is de
gevoeligheid, niet dat zuiver beter is.)

### 2. Herkenning (C) is structureel vaak ONMOGELIJK (duidelijkste defect)
De waarneming is een zuivere toestand, het geheugen gemengd; de trace-afstand heeft een vloer
T_min = (1−m)/2 (m = Bloch-lengte/purity van het geheugen). Als xi < T_min kan T nooit onder xi komen en is
C wiskundig onbereikbaar. Gemeten: **57% van de toestanden heeft C onmogelijk door de vloer**, en **4 van de
7 entiteiten** kunnen NOOIT herkennen (bijv. entiteit 3: xi 0,095 vs T_min 0,406). Herkenning zou altijd
bereikbaar moeten zijn; dit is een echt structureel gebrek dat gedrag naar B duwt.

### 3. A ligt vastgepind rond ~10%
De p90-drempel maakt A per constructie ~10% (gemeten 8% bij de gekleurde maat), ongeacht hoe verrassend de
wereld echt is. Adaptatie is een goed idee (verrassing is relatief), maar het model kan een oprecht
verrassende periode niet als verhoogde A-frequentie uitdrukken.

## Oordeel
De routekeuze is een echt verbeterpunt, niet alleen esthetisch. Punt 2 (C-vloer) is het helderste defect;
punt 1 (gekleurd vs zuiver) is een grote, niet-robuuste gevoeligheid; punt 3 (A vastgepind) is een
verdedigbare keuze met een reële beperking.

**Belangrijk voor de interventie:** het is GEEN one-liner. "Gewoon zuivere waarneming gebruiken" laat A naar
43% springen en botst met de p90-drempel die op de gekleurde T geijkt is. Een goede fix is een kleine
herontwerp:
- consistente waarnemings-vs-verwachting-ontleding bij de keuze (zoals nu in Route B), inclusief her-ijking
  van de verrassingsdrempel op dezelfde maat;
- de C-vloer aanpakken zodat herkenning bereikbaar is (bijv. afstand tot de dichtstbijzijnde zuivere
  component van rho, of een vloer-gecorrigeerde maat);
- eventueel saillantie b / bandbreedte de keuze laten kleuren.

**Randvoorwaarden:** de A/B/C-mix is een kopregel van het model en staat in de paper; elke wijziging
herschikt die mix. LGI en de bestaande ankers blijven guardrail. Doorvoeren pas na akkoord en na een
Fase B-interventietoets met vooraf vastgelegde succes/faal-criteria.

## Voorstel-richting getest: herkenning = max-fideliteit tot een cluster (niet tot het gemiddelde)
De juiste QM-grootheid voor "lijkt dit op iets dat ik ken" is de Born-overlap/fideliteit met de best
passende geheugencluster: `recognition = max_k <phi|rho_k|phi> = max_k |<phi|psi_k>|^2`, GEEN trace-afstand
tot de gemiddelde (gemengde) geheugen-rho. Geen purity-vloer, want je meet overlap met een component.
In-browser aangetoond op de 7 entiteiten, voor een percept dat EXACT op de grootste eigen cluster ligt:
- HUIDIG (afstand tot gemiddelde): 5 van 7 entiteiten herkennen dit NIET (T >= xi door de vloer; bijv.
  ent1 T=0,30 vs xi 0,265; ent3 T=0,41=vloer).
- VOORSTEL (max-fideliteit tot cluster): fideliteit 1,0 bij ALLE 7 -> herkend. Vloer weg.

Wiskundige subtiliteit: op een qubit (2D) is deelruimte-projectie over clusters triviaal; het moet dus de
MAX-fideliteit tot een cluster zijn (getest), niet een projectie. Fideliteit is een fysische grootheid;
het max is een klassieke beslisregel (zelfde hybride status als de rest van de routekeuze). De routekeuze
raakt de Route B-Hamiltoniaan NIET, dus de LGI kan hier per constructie niet sneuvelen.

Nog te ontwerpen in Fase B: per-cluster herkenningsdrempel (uit clusterspreiding/coherentie, geen losse knop),
symmetrische verrassing (A = past bij geen enkele cluster; vervangt de p90-pinning), en de leercurve
(herkenning stijgt met ervaring) als vooraf vastgelegd succescriterium met validatie.

## FASE B-toets uitgevoerd (achter toggle ROUTE_C_V61, branch feature/routekeuze-v61) — NIET DOORGEVOERD
Mechanisme gebouwd: `recognitionScore` = max over clusters van vestiging (recente massa/(massa+1)) x fideliteit
tot centroid; recency via exp(−λ·leeftijd); `determineRouteFor` gebruikt dit op de ZUIVERE waarneming.
In-model gevalideerd op de 7 entiteiten (sessie 1044).

WAT SLAAGT (robuust):
- **Vloer weg:** alle 7 entiteiten herkennen nu (C-rate 0,19–0,40), ook de eerder geblokkeerde.
- **Mix niet meer B-dominant** (afhankelijk van λ), drempel-sweep glad (geen mesje-op-de-rand).

WAT FAALT (eerlijk, pre-registratie):
- **Intrinsieke λ-spanning:** trage λ → over-herkenning (mix C 0,57–0,64, volwassen entiteit herkent bijna
  alles); snelle λ (dispositie-tempo) → balans-mix (A32/B39/C29) maar abrupt vergeten (dominant patroon
  0,75→0,01 in 20 runs, psychologisch te snel).
- **Geen schone leercurve:** onder de huidige UNIFORME (ruis)waarneming ontaardt herkenning in
  "dekking-opvullen" (C-rate piekt naar ~1,0 bij sommige geheugengroottes, niet-monotoon).
- **Nette mix vereist hand-getunede REC_C/REC_A** → faalt het "geen afgestelde constante"-criterium.

CONCLUSIE (eerste ronde): het concept (fideliteit-tot-cluster, vloer weg) klopt, maar de λ-keuze verschoof
alleen over-herkenning ↔ te-snel-vergeten.

## VERDIEPING (na kritiek: λ-vorm heropend, niet alleen -grootte)
- **Vestiging als AANDEEL i.p.v. absoluut** (share = massa_k/Σmassa) lost de λ-spanning EN de over-herkenning
  op: mix vrijwel λ-ongevoelig (C ~0,07 over λ 0,02–0,10 vs 0,46–0,70 bij absoluut). Verspreide massa →
  niets steekt eruit → geen dekking-opvulling. Echte winst; de vorm was het probleem, niet de grootte.
- **Maar leer-/vergeetcurve blijven grillig/klif**, ook met activiteit-gestuurde versheid (grootte × exp(−λ·
  runs-sinds-laatste-bezoek)). ROOT CAUSE gevonden: `clusterMemoryOf` is INSTABIEL. De drempel is GLOBAAL
  (0,3 × globale spreiding) en hij herclustert elke keer vanaf nul. Toets: 40 runs in een verre regio
  toevoegen liet het aantal clusters 6 → 1 (alles samengesmolten) → 7 springen. De kliffen in de curves zijn
  artefacten hiervan, niet van de leeftijdsformule.

**Echte voorwaarde vooraf: STABIELE, PERSISTENTE CLUSTERING** (clusters met identiteit, incrementeel
bijgewerkt, LOKALE i.p.v. globale drempel).

## STABIELE CLUSTERING GETOETST — WERKT
**Leider-clustering** (lokale vaste straal TAU: een run sluit aan bij het dichtstbijzijnde cluster binnen TAU,
anders nieuw cluster; incrementeel, clusters houden identiteit):
- **Zinnige aantallen** bij TAU=0,55 (6–7 clusters voor volwassen entiteiten, vergelijkbaar met het oude 5–9).
- **Stabiel:** 140 runs in een verre regio toevoegen laat het aantal 6 → 6 → 6 → 6 (oud: 6 → 1 → 7).
- **Vergeetcurve nu GLAD** (aandeel + versheid op stabiele clusters): R van een verlaten patroon 0,265 → 0,15
  → 0,048 → 0,016 → 0 (monotoon, geen klif).
- **Leren is per-patroon:** herkenning stijgt terwijl een patroon herhaald wordt, daalt als het losgelaten wordt.
  Een monotoon stijgende TOTAALcurve vereist een stationaire/gestructureerde omgeving; het mechanisme zelf is gezond.

RESULTAAT: de hele keten wordt gezond met (1) stabiele leider-clustering, (2) aandeel-vestiging,
(3) activiteit-gestuurde versheid. λ-fudge en over-herkenning weg, vergeten glad, vloer weg. TAU (herkennings-
grein) is de resterende parameter, te verantwoorden als perceptuele resolutie, niet af te stellen op uitkomst.

## Locatie, diameter, dispositie (na vragen)
- **Clusterlocatie:** prototype = hoofd-eigenvector van de cluster-dichtheidsmatrix (op de equator = circulair
  gemiddelde in de halve-hoek). Niet hard vastgelegd; stabiliseert vanzelf met ervaring (1/n-effect). QM-net.
- **Diameter:** begrensd door de aansluit-straal (fideliteits-drempel = herkenningsgrein). MASSA mag groeien
  (leren/vestiging), DIAMETER niet (voorkomt walken). Gemeten diameters ~0,4–0,6 rond TAU=0,55, geen walken.
- **Dispositie-jitter (per stap, entiteit 1):** grootste-cluster OUD 0,019; grootste-cluster LEIDER 0,037
  (argmax wisselt tussen vergelijkbare clusters); exp-gewogen gemiddelde (huidige biaVal) 0,138 (recency-zwaar,
  grilligst); **aandeel-gewogen prototype (leider) 0,011 (rustigst)**.
- CONCLUSIE: stabiele dispositie = stabiele clustering + GLADDE aggregatie (aandeel-gewogen prototype = ρ_geheugen),
  NIET het argmax-cluster en NIET het recency-zware exp-gemiddelde. Twee tijdschalen: dispositie = traag/stabiel
  aggregaat; herkenning = recency-gevoelige versheid.

## ZACHTE (fuzzy) clustering getoetst — beantwoordt diameter/overlap/randvervaging
Van harde vaste-straal naar ZACHT lidmaatschap met per-cluster DATA-GEDREVEN breedte sigma_k (Born-overlap /
Gaussische kern). Getoetst op entiteit 1:
- **Diameter niet vast:** sigma_k varieert per cluster (0,15–0,42), = eigen empirische spreiding. Strak patroon
  smal, los patroon breed.
- **Overlap:** een punt tussen twee clusters telt in beide mee (lidmaatschap 0,91 resp. 0,47), zacht gewogen.
- **Randvervaging:** Gaussisch lidmaatschap dooft naar de rand (op 2sigma ~0,14); buitenste collapsen tellen minder.
- **Stabiel:** dispositie-jitter 0,013 (massa-gewogen prototype), op niveau van de harde variant (0,011).
- Kanttekening: de zachte variant maakt veel kleine clusters (44), gevoelig voor seed-breedte S0 en
  nieuwheidsdrempel THETA. Maar door de massa-weging doet het aantal er niet toe (kleine clusters ~0 massa/aandeel,
  bewegen dispositie noch herkenning). Optioneel overlappende clusters samenvoegen bij het inbouwen; niet nodig.
- **Diameter (data-gedreven én begrensd zonder vaste cap):** getoetst met een driftende stroom. σ bleef in alle
  gevallen ~0,15 (stilstaand 1 cluster; drift-90° zonder recency 5 clusters, met recency 3), NOOIT groeiend.
  De begrenzing komt van de nieuwheidsdrempel: collapsen buiten de kern zaaien een NIEUW cluster i.p.v. het oude
  op te rekken. Diversiteit → meer clusters, niet grotere. Recency-weging laat een cluster onder drift de beweging
  VOLGEN i.p.v. groeien (5 → 3). In een verzadigd veld neemt het clusteraantal nauwelijks toe (nieuwe collapsen
  versterken bestaande kernen: massa groeit, diameter niet) — gewenst gedrag, geen probleem.
- QM-net: lidmaatschap = <phi|rho_k|phi> (Born-overlap); sigma_k uit de mixedness van rho_k. S0/THETA = de
  perceptuele grein (resolutie + nieuwheidsgevoeligheid), cognitief betekenisvol, niet op uitkomst afgesteld.

VOLGENDE (ontwerp nu voldoende scherp): in het model bouwen achter een toggle. Zachte clustering (per-cluster
data-gedreven sigma) vervangt de globale drempel in `clusterMemoryOf`; dispositie A_h = massa-gewogen prototype
(= rho_geheugen), per-entiteit, NIET de groepsdetectie; herkenning = recency-gewogen aandeel x Born-overlap.
Mix + dispositie-stabiliteit in-model valideren, bij groen licht doorvoeren + de fading/ontploffing-UI (die nu
precies de zachte randvervaging visualiseert). Gestructureerde waarneming blijft de aparte verrijking voor een
rijke leercurve. Stabiele versie blijft master tot doorvoering.

## Cluster-vestiging: singletons tellen niet als herkenbaar patroon
`clusterMemoryOf` (regel ~734) maakt bij een niet-passende run een cluster van EEN run (`clusters.push([entry])`).
Op je data: in volgroeid geheugen een kleine franje (ent1: 1 singleton, ~1% van de runs), maar bij jonge
entiteiten tot ~9% van de runs. Nu onschuldig (herkenning is nog gemiddelde-gebaseerd), MAAR zodra herkenning
"past bij een cluster" wordt, maakt elke singleton één losse ervaring meteen herkenbaar. Dat ondermijnt de
leercurve (herkenning hoort een HERHAALD patroon te vereisen).
Fix zonder magische minimumgrootte: weeg de herkenningsbijdrage van elke cluster met zijn massa/coherentie
(bijv. n/(n+1) of 1−e^(−n/tau)), zodat een singleton ~niets bijdraagt en de herkenningssterkte vloeiend
groeit met herhaling. Bayesiaans verdedigbaar (meer waarnemingen = meer "bekend"). Dit IS het mechanisme
achter de leercurve: vroeg geen gevestigde clusters -> verrassing/deliberatie; later gevestigde clusters ->
herkenning. Cluster-vestiging hoort dus in de Fase B-herbouw van de routekeuze.
