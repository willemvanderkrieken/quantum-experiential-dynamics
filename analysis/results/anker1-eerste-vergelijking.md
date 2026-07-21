# Anker 1, eerste mens-model-vergelijking (pilot)
21 juli 2026. Volledig zelfstandig uitgevoerd: modeldata gegenereerd uit de actuele modelcode,
menselijke reactietijden opgehaald uit een openbare dataset, vormvergelijking gedraaid.

## Data
- MENS: mental-rotation reactietijden, open data van J.K. Lindelov (github.com/lindeloev/shiny-rt,
  mrt_data.csv): 268 trials, 3 proefpersonen, RT's 0,15-11,8 s. Opgeslagen in data/empirie/mrt_data.csv.
  Context: Lindelovs eigen gids concludeert onafhankelijk dat de (shifted) lognormal de beste
  standaardfit is voor menselijke RT's. Dat is precies de vorm die het model voorspelt.
- MODEL: 558 route B-deliberaties over vijf tau_d-niveaus (xi 0,10-0,95), 160 runs per entiteit,
  gegenereerd met de definitieve emergente drempels. data/empirie/deliberatie-simulatie.json.

## Resultaat: de vorm klopt
|            | skew ruw | skew log | oordeel |
|------------|----------|----------|---------|
| Mens (268) | 2,17     | 0,47     | rechts-scheef, log-transformatie normaliseert: lognormaal-achtig |
| Model (553)| 3,65     | -0,28    | rechts-scheef, log-transformatie normaliseert: lognormaal-achtig |
Per proefpersoon (1,55-2,68 ruw naar 0,32-0,66 log) en per tau-niveau (1,85-4,64 naar -0,82-0,02)
is het patroon consistent. De kernvoorspelling T4 (zwaarstaartige, lognormaal-achtige
deliberatietijden) is kwalitatief bevestigd op echte menselijke data.

## Eerlijke discrepantie (rapporteren, niet verstoppen)
De spreiding op log-schaal is bij het model ~4x groter (sd(log) ~2,0) dan bij de mens (~0,55).
Verklaring en modelverbetering ineen: menselijke RT bevat een niet-beslissingscomponent
(motoriek/perceptie) die als vloer werkt en de relatieve spreiding drukt. Dat is exact waarom
de literatuur de SHIFTED lognormal gebruikt. Mapping-voorstel voor het paper:
RT = t0 + c * iteraties, met t0 = niet-beslissingstijd (de route A/C-tijdschaal!) en c de enige
vrije schaalfactor. De besluiteloosheid-censoring op 50k drukt de log-skew bij lage tau licht negatief;
ook benoemen.

## Status en vervolg
- Dit is een PILOT (3 proefpersonen). Voor het paper: zelfde analyse op de Confidence Database
  (OSF, duizenden proefpersonen); download vergt mogelijk een handmatige stap van Willem.
- Individuele-verschillen-toets (tragere personen = zwaardere staarten = model lage tau_d) kan
  op de grotere dataset.
- Anker 2 (emotionele inertie vs gamma) is de volgende.

## Opschaling: Adler 2018 (Confidence Database, 46.837 trials, 11 proefpersonen)
1. VORMVOORSPELLING STERK BEVESTIGD: skew ruw 7,74 -> log 0,63 gepoold; bij 11 van de 11
   proefpersonen halveert de log-transformatie de scheefheid minimaal (individueel: ruw 2,6-18,9
   naar log 0,4-2,0). De lognormaal-achtige vorm van T4 staat nu op bijna 47.000 echte trials.
2. INDIVIDUELE-VERSCHILLEN-VOORSPELLING HIER NIET BEVESTIGD (eerlijk rapporteren): correlatie
   tussen mediaan-RT en staartgewicht r=-0,05, met sd(log) r=-0,09. Kanttekeningen: slechts 11
   proefpersonen (te weinig power voor tussen-persoon-correlaties), RT_decConf bevat ook de
   confidence-respons, en getrainde psychofysica-proefpersonen zijn een smalle populatie.
   Vervolg: meerdere datasets uit de database poolen (30+ proefpersonen, liefst verschillende taken).
3. MOEILIJKHEIDSEFFECT: monotone trend (mediaan 0,74s bij niveau 1 naar 0,65s bij niveau 6), maar de
   RICHTING van de codering (is 1 makkelijk of moeilijk?) staat in de readme van de studie die nog
   niet gedownload is. Niet claimen voor de codering geverifieerd is: readme_Adler_2018_Expt1.txt
   van OSF halen.

## Definitieve toets: 8 datasets, 307.270 trials, 315 proefpersonen (Confidence Database)
Datasets: Adler 2018 E1-E3, Arbuzova 2021, Bang 2019, Hellmann 2023, Konishi 2019 (motion + kleur).

### T4a, VORM: robuust bevestigd
Gepoolde scheefheid ruw 3,5-16,1 -> log 0,23-1,79 in alle acht datasets. Op persoonsniveau halveert
de log-transformatie de scheefheid bij 308 van de 315 proefpersonen (98%). De lognormaal-achtige,
zwaarstaartige vorm die het deliberatiemechanisme produceert is een robuuste eigenschap van echte
menselijke beslistijden over taken en labs heen. Dit is het empirische kernfiguur voor het paper.

### T4b, INDIVIDUELE VERSCHILLEN: niet ondersteund zoals geoperationaliseerd
Gewogen gemiddeld over 315 pp: r(mediaan, staartgewicht) = -0,13; r(mediaan, sd_log) = 0,00.
Per dataset heterogeen (-0,37 tot +0,54). Conclusie: "tragere personen hebben zwaardere staarten"
klopt zo niet. Diagnose: de mediaan-RT is een slechte proxy voor tau_d, want die wordt gedomineerd
door niet-beslissingstijd en algemene snelheid, niet door stopprecisie. Herformulering nodig:
tau_d voorspelt de VERHOUDING binnen een persoon (spreiding op log-schaal, omissies, uitstel),
en de toetsbare operationalisatie moet uit het model zelf worden afgeleid voor een nieuwe ronde.
In het paper: T4b als open voorspelling met deze null-bevinding erbij.

### Moeilijkheidseffect: heterogeen, geen simpele claim
Adler E1/E3: moeilijker = SNELLER (r=-0,98/-0,65); Adler E2: licht langzamer (+0,22);
Hellmann: moeilijker = langzamer (klassiek, r=-0,99 op coherentie); Konishi: zwak/onduidelijk.
De relatie hangt af van taakontwerp (deadline, simultane confidence-respons, snelheidsdruk).
Het model doet ook geen simpele voorspelling hier: ambiguiteit t.o.v. GEHEUGEN (T-middenband)
is niet hetzelfde als stimuluscontrast. Geen claim opnemen; wel als discussiepunt.

### Slotoordeel anker 1
De vormclaim staat op publicabel niveau (98% van 315 pp, 300k+ trials, meerdere taken).
De individuele-verschillen-claim is eerlijk gefalsifieerd in zijn naiefste vorm en moet
theoretisch scherper voordat hij terugkomt. Precies zo hoort empirie het model te disciplineren.
