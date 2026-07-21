# Paper draft — werkdocument in twee lagen
Elke sectie heeft een LEESLAAG (begrijpelijk, Nederlands, voor Willem en elke geinteresseerde lezer)
en een EXPERTLAAG (formeel, wordt Engels in de definitieve versie). De leeslaag is niet "de simpele
versie ernaast": hij dwingt ons het echt te begrijpen, en delen ervan worden de introductie.

Werktitel: "An Open Quantum Systems Architecture for Experiential State Evolution:
Character, Deliberation, and Emergent Shared Realities"
(NL: Een open-kwantumsysteem-architectuur voor experientiele toestandsevolutie)

---

## 1. Introductie

LEESLAAG
Mensen schieten bij een gebeurtenis niet willekeurig in een emotie. Soms herkennen we de situatie en
reageren we op de automatische piloot. Soms overvalt iets ons en reageren we instinctief. En soms
moeten we wikken en wegen, en heel af en toe komen we daar niet uit. Dit paper bouwt een wiskundig
model waarin die drie routes, en zelfs het niet-uitkomen, niet geprogrammeerd zijn maar vanzelf
ontstaan uit een klein aantal kwantummechanische regels. Elke gesimuleerde persoon heeft een
startkarakter dat langzaam plaatsmaakt voor geleefde ervaring, en meerdere personen samen vormen
spontaan groepen met een eigen gedeelde werkelijkheid.

EXPERTLAAG (kernclaims, elk onderbouwd in secties 2-6)
1. Een 2x2 dichtheidsmatrix-architectuur op de Russell-circumplex (Bloch-equator, emotiehoek/2)
   waarin ALLE gedragsdrempels emergent zijn uit de eigen geschiedenis: geen schaalconstantes in
   routekeuze of groepsvorming.
2. Dual-process routekeuze uit een maat: de trace-afstand tussen waarneming en geheugentoestand,
   met Helstrom-interpretatie (onderscheidbaarheidskans). Herkenning binnen de eigen coherentielengte,
   verrassing boven het adaptieve kwantiel van de eigen ervaring, deliberatie ertussen, en
   besluiteloosheid als afgebroken relaxatie: een meetbare uitkomstcategorie.
3. Emotionele intensiteit als interferentie-zichtbaarheid: |Psi|/max|Psi|; ambivalentie is letterlijk
   destructieve interferentie. Emergente intensiteitshierarchie instinct < deliberatie < herkenning.
4. Karakter als initiele dichtheidsmatrix rho0 met dynamisch verval; karaktersterkte = Bloch-lengte.
   Gemeten: dosis-afhankelijke identiteitsbinding, conformiteit van zwakke en verzet van sterke karakters.
5. Sociale koppeling begrensd door P/sqrt(N) levert emergente subrealiteiten: homogene populaties
   convergeren volledig, tegengestelde kampen vormen permanente gescheiden werkelijkheden (119,6 runs
   lidmaatschapsduur zonder een enkele versmelting), en de routeverdeling bepaalt de bindingssterkte.
Afbakening: quantum-formalisme als wiskundige structuur voor cognitie (traditie Busemeyer & Bruza,
Khrennikov), geen claim over kwantumfysica in het brein. Enige afwijking van standaard QM:
projectieve normalisatie i.p.v. Born-regel als expliciet collapse-postulaat.

Positionering (nog uit te schrijven): t.o.v. quantum cognition kernprogramma (Huang et al. 2025,
Psychon Bull Rev), Khrennikov open quantum systems (2023), en het dichtstbijzijnde werk
Gnidko & Vasilenko (IITI'25): zij quantum-like collectieve emoties met empirische socialenetwerkdata
maar dun formalisme; wij een volledig QM-consistent individueel-cognitief raamwerk met emergente
sociale structuur. Complementair, niet overlappend.

## 2. Formeel model

LEESLAAG
Een emotie is een richting op een cirkel: rechts is prettig, links onprettig, boven opgewonden,
onder kalm. Het geheugen van een persoon vatten we samen in een wiskundig object (een dichtheidsmatrix)
dat onthoudt welke richtingen vaak voorkwamen en hoe eenduidig iemand is. Tegenovergestelde emoties
zijn in dit object maximaal verschillend, zoals het hoort: wie heen en weer schiet tussen blij en boos
is niet stabiel maar juist maximaal in de war.

EXPERTLAAG
- Toestandsruimte: qubit; emotiecirkel = Bloch-equator via theta_toestand = theta_emotie/2.
- rho over geheugen (per-entry genormaliseerde richtingen); S (von Neumann), P (purity),
  Bloch-lengte m = sqrt(2P-1). Delta (eigen-geheugen-amplitude) = m: coherentie oefent zichzelf uit.
- Superpositie: Psi = A_w + delta*A_h + beta_g*A_groep + beta_e*A_extern, projectief genormaliseerd.
- Intensiteit I = |Psi_prenorm| / (|A_w| + delta|A_h| + beta_g|A_g| + beta_e|A_e|) in [0,1];
  collapse-punt = richting x I. Bewijs begrensdheid: driehoeksongelijkheid.
- Trace distance in gesloten qubit-vorm T = sqrt(dv^2 + dva^2) (traceloos verschil), exact geverifieerd.
- Fidelity qubit gesloten vorm F = tr(r1 r2) + 2 sqrt(det r1 det r2).
- KRITIEKE correctie t.o.v. eerdere versies (eerlijk rapporteren): het criterium S < 1.5(1-P) is voor
  qubits onvervulbaar (S en P gekoppeld via m); zie sectie 3.

## 3. Routekeuze en besluiteloosheid

LEESLAAG
Bij elke nieuwe waarneming meet het model hoe ver die afstaat van wat de persoon kent. Valt hij binnen
de eigen normale variatie, dan is het herkenning: direct een geleerde reactie. Is hij verder weg dan
negentig procent van alles wat de persoon ooit meemaakte, dan is het een verrassing: een oerreactie.
Alles ertussen wordt overwogen, en wie te lang wikt zonder ergens uit te komen is besluiteloos: dat
gebeurt vrijwel alleen bij persoonlijkheden die we bewust als piekeraars hebben ingesteld.

EXPERTLAAG
- T(rho_w_pure, rho_mem); C als T < xi (zelf-fluctuatie: trace-afstand tussen rho van run -20..-10 en
  -10..0); A als T > Q90 van de eigen Tw-historie (venster 30); B ertussen. Geen constantes.
- Helstrom: p_fout = (1-T)/2 geeft T de betekenis van optimale onderscheidbaarheid.
- Route B = open-systeem relaxatie: herhaalde stochastische omgevingsinteractie + projectie tot
  stabiliteit; stabiliteitseis geschaald met tau_d = xi0/(1-P0+0.1) (beslisprecisie). Gemeten
  dosis-effect over drie ordes van grootte (mediaan 12 vs 4.256 iteraties).
- Besluiteloosheid: afbreken op 50k iteraties, gemarkeerde uitkomstcategorie; komt exclusief voor
  bij lage-tau_d-karakters. Deliberatietijden zwaarstaartig (lognormaal-achtig): koppeling aan
  RT-literatuur = falsifieerbare voorspelling.
- Eerlijke rapportage: de emergente drempels maken deliberatie dominant (~65-75%); de pure-gemengd
  vloer T_min=(1-m)/2 onderdrukt herkenning. Gedocumenteerde ontwerpkeuze incl. alternatieven.

## 4. Karakter en identiteit

LEESLAAG
Iedereen begint met een aanleg: een grondstemming, een sterkte en een beslisstijl (van piekeraar tot
vlotte beslisser). Die aanleg kleurt de eerste ervaringen en vervaagt daarna, zoals een accent dat
slijt. Wat overblijft is identiteit die uit geleefde ervaring bestaat. In onze simulaties zie je
letterlijk dat een zwak karakter door de groep wordt opgeslokt en een sterk karakter zichzelf blijft.

EXPERTLAAG
- rho0 = I/2 + m(pure(theta0/2) - I/2), m = sqrt(2 p0 - 1); p0 in [0.5, 1) (fysisch bereik).
- Verval kw = exp(-lambda runCount), lambda = (sigma_w/xi0) 0.05 + S(1-P) 0.3; sigma_w analytisch
  uit stimulus-bandbreedte.
- Drie kanalen (kw-gewogen): retentie-feedback op waarneming (cap = gamma-grens), menging in A_h,
  delta-vloer. Gemeten: doelbinding 177-183 om doel 180; p0-dosisrespons (0,99 geeft 67% doelzone
  vs 33-44% bij 0,70); symmetriebreking bij identieke karakters; brugfenomeen bij overlopers.

## 5. Sociale dynamiek: groepen en subrealiteiten

LEESLAAG
Personen die qua aard op elkaar lijken vormen vanzelf groepen, en elke groep bouwt een eigen gedeelde
kijk op de wereld. Een samenleving van gelijkgestemden groeit naar een werkelijkheid toe. Twee kampen
met tegengestelde aard blijven permanent in hun eigen werkelijkheid, hoe lang je ook wacht, omdat
overleg binnen de groep de eigen werkelijkheid versterkt en de invloed van buiten wiskundig begrensd is.

EXPERTLAAG
- Affiniteit: trace-afstandsmatrix op dispositie-rho's (kw rho0 + (1-kw) rho_geheugen, volledig geheugen);
  agglomeratief, drempel = 1.5x gemiddelde zelf-fluctuatie (coherentielengte). Stabiele groeps-IDs
  (Jaccard-matching) maken groepshistorie per entiteit meetbaar.
- beta_g <= P/sqrt(|groep|), beta_e <= P/sqrt(N): beta_g >= beta_e volgt uit de grens (geen parameter).
- Resultaten: homogene populatie convergeert volledig (spread 0,13); tegengestelde kampen: permanente
  subrealiteiten (binnen-spread 0,2-0,4, tussen-kampen 1,2-1,6, duur 119,6 runs, nul versmeltingen);
  regime-vergelijking: onder herkenningsdominantie zijn groepen vluchtig (17,3 runs) en versmelten
  ze via brug-entiteiten. Convergentie = f(dispositiestructuur); routeregime = bindingssterkte.
- Emergente conformiteit: richtingloze entiteit (m=0) adopteert de groepsrealiteit volledig.

## 6. Empirische toets: beslistijden (anker 1, UITGEVOERD 21 juli 2026)

LEESLAAG
Als het model gelijk heeft, moet twijfelen bij echte mensen een herkenbare wiskundige handtekening
hebben: meestal kort, soms extreem lang, met een lange staart van uitschieters die bij het systeem
hoort, zoals treinvertragingen. We hebben die handtekening opgezocht in 307.000 echte beslissingen
van 315 mensen uit zeven verschillende experimenten (openbare data uit de Confidence Database).
Bij 98 procent van de mensen zit exact de vorm die het model produceert. Een tweede voorspelling,
dat trage beslissers ook meer uitschieters hebben, bleek NIET te kloppen: gemiddelde traagheid meet
vooral hoe snel ogen en handen zijn, niet hoe streng iemand voor zichzelf is bij het beslissen.
Die voorspelling gaat terug de werkplaats in, en dat schrijven we gewoon op.

EXPERTLAAG
- Data: Confidence Database (Rahnev et al. 2020), 8 datasets (Adler 2018 E1-E3, Arbuzova 2021,
  Bang 2019, Hellmann 2023, Konishi 2019 motion/kleur), 307.270 trials, 315 proefpersonen,
  RT-vensters 0,15-30 s. Volledig reproduceerbaar (analysescript in repository).
- T4a (vorm) BEVESTIGD: route B-iteratieverdelingen van het model zijn lognormaal-achtig
  (skew ruw 1,9-4,6 -> log ~0); menselijke beslistijden idem: gepoold skew ruw 3,5-16,1 -> log
  0,23-1,79; log-transformatie halveert de scheefheid bij 308/315 pp (98%), consistent over taken.
- Mapping: RT = t0 + c*iteraties (shifted lognormal); t0 = niet-beslissingscomponent (route A/C-
  tijdschaal), c enige vrije schaalfactor; sd(log)-discrepantie (model ~2,0 vs mens ~0,55) wordt
  hierdoor verklaard en is een expliciete kalibratiekeuze.
- T4b (individuele verschillen) NIET ONDERSTEUND zoals geoperationaliseerd: gewogen r(mediaan-RT,
  staartgewicht p95/med) = -0,13, r(mediaan, sd_log) = 0,00 over 315 pp; per dataset heterogeen
  (-0,37..+0,54). Diagnose: mediaan-RT is proxy voor t0/algemene snelheid, niet voor stopprecisie
  tau_d. Herformulering vereist (binnen-persoon-operationalisatie: omissies, uitstel, log-spreiding
  gegeven t0-correctie); null-bevinding wordt gerapporteerd.
- Moeilijkheidseffect heterogeen over taken (van -0,98 tot +0,37 afhankelijk van taakontwerp):
  geen simpele modelclaim; discussiepunt (ambiguiteit t.o.v. geheugen is geen stimuluscontrast).

## 6b. Empirische toets: emotionele traagheid (anker 2, UITGEVOERD 21 juli 2026)

LEESLAAG
Sommige mensen zijn emotioneel stroperig: hun gevoel van nu sleept door naar straks. Dat heet
emotionele inertie en is goed gemeten in dagboekonderzoek. Ons model had eerst helemaal geen
mechanisme voor dat doorslepen: het onthield wie je bent, maar niet hoe je je net voelde. Toen we
dat repareerden, precies zoals de filosoof Husserl retentie bedoelde (het zojuist voorbije werkt
door in het nu), gebeurde er iets bijzonders: het model kreeg niet alleen menselijke traagheid,
maar ook het subtiele verband dat stroperige mensen ook net iets beweeglijker zijn in hun
uitschieters. Die koppeling is bij 689 echte mensen +0,30 en in het model gemiddeld +0,55
(replicatiebereik 0,37-0,71): dezelfde richting en vergelijkbare orde, zonder dat we daar iets
op hebben afgesteld, al is de modelkoppeling sterker dan de menselijke.

EXPERTLAAG
- Data: 6 open ESM-datasets uit het EmotionTimeSeries-archief (Bringmann 2013/2016, Rowland 2020,
  Wright 2017, Fisher 2017, Fried 2021), 689 personen; Vrijen 2018 uitgesloten (toestemmingsvereiste).
- Maten per persoon: gemiddelde lag-1 autocorrelatie over affect-items (inertie) en
  schaal-genormaliseerde SD (variabiliteit); >=20 metingen per item, >=3 items.
- Aanleiding: in-silico bleek gamma eerst GEEN inertie te produceren (dispositie-pinning i.p.v.
  doorwerking) en satureerde de historische cap 0.72. Correctie: cap verwijderd, retentiebron
  toegevoegd (vorige collapse, gewicht gamma, vijfde term in de superpositie). Vangrails
  (RT-vorm anker 1, routeverdeling, subrealiteiten) bleven groen.
- Resultaat: inertie-niveaus model 0,21-0,55 vs mens p10-p90 -0,01-0,37 (overlap, model bovenkant);
  koppeling r(inertie, variabiliteit): mens gewogen +0,30 (0,00..0,54 per dataset), model
  gemiddeld +0,55 over 8 replicaties (bereik 0,37-0,71). Parametervrij dezelfde richting en
  vergelijkbare orde; de modelkoppeling is 1,5-2x sterker dan de menselijke (volgt uit gamma=P*F
  dat retentie en attractor-pinning tegelijk aandrijft). Openstaande controles: Likert-discretisatie
  van modeloutput en vloereffect-artefact (zie kritische review).
- Eerlijkheid: de gangbare literatuurindicatie van inertie-niveaus (~0,2-0,6) bleek in deze open
  data te hoog (gemiddeld 0,16); niveauvergelijkingen zijn daardoor zwakker dan koppelingstoetsen.

## 7. Simulatieresultaten (op te nemen figuren)
1. Circumplex met intensiteitsverdeling per route (hierarchie A < B < C).
2. Routeverdeling en Tw-verdeling; besluiteloosheid per tau_d.
3. Deliberatietijd-verdeling (log-schaal) + RT-literatuurvergelijking.
4. Kampenexperiment: spread-trajecten (globaal, binnen, tussen) over 120 runs.
5. Convergentie vs dispositiestructuur (homogeen vs kampen), zelfde routeregime.
6. Karakterverval: kw-curve en dosisrespons p0.

## 8. Discussie (aanzet)
- Beperkingen: geen menselijke data (eerst RT-anker), 2D zonder dominantie-dimensie (PAD),
  resterende kalibraties (stimulusverdeling, ruisconstantes) expliciet benoemd.
- Verhouding tot quantum cognition kernresultaten en Khrennikov open systems: uit te schrijven.
- Ethiek/interpretatie: model van experientiele structuur, geen bewustzijnsclaim.

## 9. Testbare voorspellingen (herzien na anker 1)
T1: hogere P0 -> snellere identiteitsbinding (dosisrespons gemeten in silico; humaan analoog formuleren).
T2: superadditieve purity van groepen 3-6 (nog te meten, bijdrage 11).
T3: route-sequentiestructuur: herkenningsdominantie na identiteitsvorming, terugval naar A bij outliers.
T4a (CONSISTENT, herkwalificatie na kritische review): deliberatietijden zijn lognormaal-achtig
    zwaarstaartig; 98% van 315 pp over 307k trials. LET OP: deze vorm wordt door vrijwel elk
    sequentieel model voorspeld en is dus een noodzakelijke voorwaarde, geen onderscheidend bewijs.
    Onderscheidend zijn de aanvullende voorspellingen: besluiteloosheid als uitkomstcategorie en
    de intensiteit-RT-koppeling. Formele verdelingsvergelijking (lognormaal vs ex-Gauss vs gamma)
    staat open. Zie sectie 6 en de kritische review.
T4b (OPEN, naief gefalsifieerd): tau_d-verschillen tussen personen zijn NIET zichtbaar in
    mediaan-RT vs staartgewicht (r ~ 0). Herformuleren als binnen-persoon-voorspelling
    (omissies/uitstel/log-spreiding na t0-correctie) voordat opnieuw getoetst.
T5 (nieuw): collectieve emotieconvergentie voorspelbaar uit dispositiespreiding van de populatie.
T6 (KWALITATIEF ONDERSTEUND, 21 juli 2026, na kritische review): gamma-retentie produceert
    menselijke-orde emotionele inertie en parametervrij een positieve inertie-variabiliteit-koppeling
    (model +0,55 [0,37-0,71] over replicaties; mens +0,30 [0,00-0,54] over 689 personen, 6 datasets).
    Zelfde richting, vergelijkbare orde, modelkoppeling sterker. Vereiste de retentie-term.
    Openstaand: Likert-discretisatie-controle en vloereffect-controle. Zie sectie 6b.
