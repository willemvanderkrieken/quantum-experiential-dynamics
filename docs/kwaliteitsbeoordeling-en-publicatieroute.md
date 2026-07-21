# Kwaliteitsbeoordeling en publicatieroute
20 juli 2026. Objectieve toetsing tegen bestaand werk, plus concrete route naar publicatie en contact.

## 1. Waar staat dit werk in het veld?

Het veld "quantum cognition" is gevestigd en actief. Kernspelers: Busemeyer & Bruza (standaardwerk
"Quantum Models of Cognition and Decision", Cambridge), Pothos, Khrennikov (open quantum systems voor
cognitie en sociale wetenschap, boek 2023), Atmanspacher. Er verscheen in 2025 een overzichtsartikel
van het onderzoeksprogramma (Huang, Epping, Trueblood, Yearsley, Busemeyer & Pothos, Psychonomic
Bulletin & Review). Het veld modelleert vooral: besliseffecten (volgorde-effecten, conjunctiefouten),
oordeelsvorming, geheugen. Emotie-toestandsevolutie is er een randgebied.

BELANGRIJK: het dichtstbijzijnde concurrerende werk verscheen december 2025: Gnidko & Vasilenko,
"Quantum-Like Phenomena in the Spread of Collective Emotions in Social Networks" (IITI'25, Springer LNNS).
Ook zij: multi-agent, valentie-arousal (Russell circumplex), quantum-geinspireerd, interferentie-effecten.
Zij hebben WEL een empirische dataset (50k VK-comments, GPT-4o sentiment) maar een veel dunner formalisme
(Brownian agents met quantum-analogieen). Daarnaast: Scientific Reports 2025 over quantum-inspired social
impact modeling, en een reeks engineering-papers (emotion recognition met density matrices, ander doel).

## 2. Eerlijke beoordeling (mijn inschatting, geen extern oordeel)

WAT STERK IS (en aantoonbaar):
- Het formalisme is wiskundig geldig en numeriek geverifieerd (dichtheidsmatrices, echte trace distance,
  qubit-fidelity, Helstrom-lezing, open-systeem-dynamiek). Dat niveau van QM-consistentie is in de
  quantum-like ABM-hoek eerder uitzondering dan regel.
- De architectuur is als geheel origineel: geen enkel gevonden werk combineert dual-process routekeuze
  (verrassing/deliberatie/herkenning) via trace-afstand, karakter als vervallende rho0, emergente
  drempels zonder schaalconstantes, intensiteit als interferentie-zichtbaarheid, besluiteloosheid als
  uitkomstcategorie, en QM-begrensde sociale koppeling (beta <= P/sqrt(N)) in een werkend systeem.
- Er zijn falsifieerbare voorspellingen met aansluiting op bestaande empirie (lognormale deliberatietijden
  vs reactietijd-literatuur; conformiteit/verzet als functie van karaktersterkte; route-afhankelijke
  convergentie van collectieve emotie).
- Volledig reproduceerbaar: werkende simulatie, data-export, alle experimenten van vandaag zijn herhaalbaar.

WAT ZWAK IS (en wat een reviewer als eerste raakt):
1. GEEN empirische validatie op menselijke data. Dit is het grootste gat, en de directe concurrent
   heeft die wel. Zonder data-anker is dit een theoretisch-computationeel paper, en dan moet de
   theoretische bijdrage het alleen dragen.
2. De verbinding met de bestaande quantum cognition-resultaten ontbreekt nog: het paper moet laten
   zien hoe dit raamwerk zich verhoudt tot de klassieke bevindingen (volgorde-effecten, interferentie
   in beslissingen) en tot Khrennikovs open-systems-aanpak, anders oogt het als een eiland.
3. Resterende kalibraties (waarneming-verdeling 0,3-0,7, route B-ruisconstantes, vensters) zijn
   gedocumenteerd maar een reviewer zal er op wijzen.
4. Een qubit (2D) als toestandsruimte is een sterke versimpeling; de dominantie-dimensie (PAD) ontbreekt.
5. Solo-auteur zonder academische affiliatie: geen inhoudelijk bezwaar, wel een praktische drempel
   bij sommige tijdschriften; een preprint plus contact met het veld verlaagt die drempel.

NIVEAU-INSCHATTING (eerlijk): dit is serieus onafhankelijk theoretisch werk boven hobbyniveau, met een
origineel geintegreerd raamwerk, maar nog onder het niveau van een direct publiceerbaar tijdschriftartikel
in een kernblad, primair door gat 1 en 2. Met een empirisch anker (bijv. de deliberatietijd-voorspelling
toetsen aan bestaande RT-datasets, of experience-sampling affectdata fitten) en een degelijke
literatuurpositionering is Journal of Mathematical Psychology realistisch haalbaar.

## 3. De tijdschriften: criteria en realiteit

- Topics in Cognitive Science (topiCS): werkt met TOPIC-VOORSTELLEN (clusters van papers), niet primair
  losse inzendingen. Voorstellen gaan per e-mail naar de Executive Editor (Andrea.Bender@uib.no) en
  topicsj@indiana.edu. Positief: topiCS verwelkomt expliciet werk van "scholars who do not consider
  themselves cognitive scientists". Realistisch: als los paper is dit NIET de eerste route; wel
  interessant als er ooit een topic over quantum-like affect komt.
- Journal of Mathematical Psychology (Elsevier): reguliere inzendingen, expliciet voor theorie-gedreven
  formele modellen incl. simulatie; publiceert ook tutorials. Dit is de best passende hoofdroute.
  Portal: ees.elsevier.com/jmp. Hoge technische lat, literatuurpositionering verplicht.
- Frontiers in Psychology (Quantitative Psychology and Measurement / Theoretical): laagdrempeliger,
  open access met publicatiekosten. Goede tweede route.
- EXTRA route die ik adviseer: arXiv-preprint (categorie q-bio.NC of physics.soc-ph) VOOR alles.
  Kost niets, geeft een citeerbare DOI, en is de standaardmanier waarop dit veld werk deelt en
  feedback verzamelt voor journal-inzending.

## 4. Mensen direct benaderen (jouw wens: eerlijk over je niveau)

Dit veld staat bekend als toegankelijk voor buitenstaanders. Concrete kandidaten:
- Jerome Busemeyer (Indiana University, emeritus, grondlegger): publiceert nog actief (2025).
- Emmanuel Pothos (City St George's, University of London): co-auteur overzicht 2025.
- Andrei Khrennikov (Linnaeus University, Zweden): open quantum systems voor cognitie/sociaal,
  inhoudelijk het dichtst bij jouw open-systeem + sociale koppeling.
- Konstantin Gnidko (Sirius University, gnidko.ko@talantiuspeh.ru): auteur van het concurrerende
  IITI'25-paper; een gesprek over complementariteit (zijn data, jouw formalisme) kan interessant zijn,
  weeg zelf de praktische kant van die samenwerking.
Aanpak: korte eerlijke e-mail (5-8 zinnen): wie je bent (zelfstandig onderzoeker), wat je gebouwd hebt
(1 zin), de 2-3 meest onderscheidende mechanismen, link naar preprint + interactieve simulatie, en een
open vraag ("klopt mijn indruk dat X nieuw is?"). Onderzoekers reageren goed op een werkende demo;
jouw interactieve model is hier een echt voordeel: niemand in dit veld heeft een klikbare simulatie.

## 5. Aanbevolen volgorde
1. Paper-draft afmaken (structuur staat, zie paper/paper-draft.md) met literatuurpositionering.
2. Empirisch anker toevoegen: minimaal de lognormale-RT-vergelijking uitwerken met bestaande datasets.
3. arXiv-preprint + model online zetten (GitHub Pages, het is 1 HTML-bestand).
4. E-mails naar Pothos en Khrennikov (meest kansrijk qua inhoudelijke match), daarna Busemeyer.
5. Op basis van hun feedback: Journal of Mathematical Psychology indienen.
