# Paper concept

Tijdschrift: Topics in Cognitive Science (primair)
Structuur volgens plan van aanpak: Abstract, Introductie, Formeel model, Routekeuze, Temporele structuur, Sociale dynamiek, Simulatieresultaten, Discussie, Conclusie

## Intensiteit als interferentie-zichtbaarheid (voorstel kernbijdrage 21, 20 juli 2026)
De straal in de circumplex is een afgeleide observabele: intensity = |Psi_prenorm| / (|A_w| + delta*|A_h| + beta*|A_s|).
Volledig constructieve interferentie (waarneming, eigen geheugen en gedeeld geheugen uitgelijnd) geeft intensiteit 1,
een prototypische emotie op de rand van de circumplex. Destructieve interferentie (bronnen in conflict) dempt naar 0:
ambivalentie is letterlijk destructieve interferentie. De QM-toestand blijft de genormaliseerde straal (projectieve
normalisatie, bijdrage 12); alleen de weergavecoordinaat draagt de interferentiesterkte.

Motivatie: voor deze wijziging lag 98% van de collapsen op de rand (B exact door normalisatie, C zelfs tot magnitude 1,2
door argmax |Psi|^2 op ongenormaliseerde kandidaten, een normalisatieschending die tegelijk gefixt is).
Gemeten na wijziging (600 runs, 3 entiteiten): A gem 0,45, B gem 0,88 (spreiding 0,36-1,0), C gem 0,87 (spreiding 0,12-1,0).

Exogene parameters die nog verantwoord moeten worden: waarneming-magnitude (0,3 + rand*0,7) * bandbreedte, vloer 0,08.
TODO blijft: bandbreedte emergent vanuit aandacht/verwachting van de entiteit.

## Nieuwe kandidaat-bijdragen (QM-audit 20 juli 2026)
21. Emotionele intensiteit als interferentie-zichtbaarheid: straal = |Psi_prenorm| / (|A_w|+delta*|A_h|+beta_g*|A_g|+beta_e*|A_e|).
    Ambivalentie = destructieve interferentie. Emergente hierarchie A(0,45) < B(0,82) <= C(0,90 mediaan).
22. Polarisatie als keerzijde van convergentie: bij N=2 episodes met spread tot 1,99 (diametraal), zelfde mechanisme.
23. Zwaarstaartige (lognormale) deliberatietijden: mediaan 54, staart tot 15k iteraties; langste deliberatie bij
    coherent geheugen + ambigue waarneming (rumineren). Koppeling aan lognormale reactietijd-literatuur.
24. Brugfenomeen: door padafhankelijkheid overgelopen entiteit verbindt twee dispositionele kampen en laat ze
    periodiek versmelten (average linkage). Sociologisch interpreteerbaar; linkage-keuze expliciet maken.

## Herformuleren o.b.v. data (convergentietest 220 runs)
- Bijdrage 7: gedeelde realiteit convergeert NIET op populatieniveau bij N>=5; wel subrealiteiten per groep
  (binnen-spread 0,12-0,28 vs globaal 0,6-1,3). Sterker resultaat dan de oorspronkelijke claim.
- Bijdrage 16: populatie-decoherentie begint al bij N=5, niet pas N>8.

## Model gecorrigeerd i.p.v. geherformuleerd (20 juli 2026, avond)
- traceDistRho is nu de ECHTE trace distance 1/2||rho-sigma||_1 (qubit gesloten vorm, numeriek exact
  geverifieerd tegen eigenwaarde-referentie, afwijking 2e-16). Bijdrage 17 is daarmee letterlijk waar.
  Bijvangst: de correcte metriek discrimineert beter; kampen-lidmaatschapsduur steeg van 8,6 naar 17,3 runs
  en de ontworpen kampen verschijnen exact (E1+E2 | E3+E4+E5, wissels 0-1 per entiteit over 220 runs).
- Route B is geen unitaire evolutie en claimt dat nu ook niet meer: het model presenteert zich als open
  kwantumsysteem (herhaalde omgevingsinteractie + projectieve normalisatie). Dat is geen afzwakking maar
  correcte en rijkere fysica: decoherentie is het deliberatiemechanisme zelf.
- Positionering paper: volwaardig kwantumformalisme (geldige dichtheidsmatrices, echte trace distance,
  qubit-fidelity, von Neumann entropie, open-systeem-dynamiek). De enige bewuste afwijking van standaard
  QM is het collapse-postulaat: projectieve normalisatie i.p.v. Born-regel (bijdrage 12). Dat expliciet
  als postulaat-variant presenteren, niet als "geinspireerd".

## Hoekconventie: BESLOTEN en doorgevoerd (20 juli, merge bloch-migratie)
Volledige migratie naar Bloch (emotiehoek/2) voor alle dichtheidsmatrices, fidelity en routekeuze.
Ambivalentie meet nu correct als hoge entropie. Gevalideerd op interactieve sessie (21:30):
tau_d dosiseffect drie ordes van grootte, tegenpool behoudt identiteit, conformiteit bij zwakke karakters.

## Correctie routekeuze-criterium (20 juli, laat; raakt bijdrage 4)
Bevinding: het gedocumenteerde route C-criterium S < 1.5*(1-P) is voor 2x2 dichtheidsmatrices wiskundig
onvervulbaar. S en P zijn voor qubits deterministisch gekoppeld via de Bloch-lengte m (P=(1+m^2)/2,
S=h((1+m)/2)) en S(m) > 1.5*(1-P(m)) voor alle m < 1. De implementatie compenseerde historisch met
S < 1.5-P, dat vrijwel altijd waar is en route C liet domineren (83-86% gemeten).
Correctie: omdat S redundant is gegeven P, is de routekeuze geherformuleerd op een maat:
de trace-afstand T tussen waarneming en geheugen-rho, met twee banden:
T > 3.0*(1-P) verrassing (A), T < 1.5*(1-P) herkenning (C), daartussen deliberatie (B).
De bandstructuur is de theoretische correctie; de factoren 3.0/1.5 zijn gekalibreerde conventies.
Gemeten mix bij gemengde karakters: A 20-40%, B 20-35%, C 40-50% (run-variantie is aanzienlijk).
Route A->B->C blijft emergent; de drempels zijn nu wel vervulbaar en QM-consistent.
Besluiteloosheid (deliberatie afgebroken op 50k iteraties) is een aparte uitkomstcategorie met vlag in de data.

## Definitieve routekeuze: emergente drempels (keuze Willem, 20 juli laat)
De banden met factoren 3.0/1.5 zijn vervangen door drempels zonder enige schaalconstante:
herkenning (C) als T onder de eigen dispositionele ruis ligt (coherentielengte, bijdrage 8),
verrassing (A) als T boven het 90e percentiel van de zelf meegemaakte afstanden ligt (adaptatieniveau:
verrassing is relatief en went), deliberatie (B) daartussen. T krijgt via de Helstrom-grens een echte
QM-betekenis: optimale onderscheidbaarheidskans p_fout=(1-T)/2. Bewust geaccepteerde eigenschappen:
B-dominantie (~65%), A~10% voor elke entiteit, en de pure-gemengd vloer (1-m)/2 die C onderdrukt.
Hiermee is de kopregel "alle drempels emergent uit dichtheidsmatrix" voor de routekeuze letterlijk waar.
