# Anker 2, tussenstand: gamma blijkt geen inertie te produceren (in-silico bevinding)
21 juli 2026. Toets van T6 (gamma = P*F gedraagt zich als emotionele inertie) BINNEN het model,
voordat menselijke ESM-data erbij wordt gehaald. Uitkomst: de naiefste vorm faalt al in silico,
en de diagnose raakt de theoretische kern van bijdrage 3.

## Bevinding 1: de gamma-cap satureert
In een populatie van 10 entiteiten met uiteenlopende karakters zaten 9 exact op gamma = 0,720:
de harde cap min(0.72, P*F) uit de eerste modelversie. Gamma heeft daardoor in het huidige model
GEEN onderscheidend vermogen tussen entiteiten. (Stond al op de harde-waarden-lijst van de audit;
dit maakt de consequentie concreet.) Sandbox-test zonder cap: bereik herstelt naar 0,31-0,96.

## Bevinding 2: ook zonder cap geen positief gamma-inertie-verband
r(gamma, lag-1 autocorrelatie van de collapse-reeks) = -0,41 over 15 entiteiten (licht NEGATIEF).
Entiteiten met hoge gamma zijn strak aan hun attractor gepind: de reeks beweegt nauwelijks en de
resterende fluctuatie is witte waarnemingsruis, dus lage autocorrelatie. Menselijke emotionele
inertie is juist trage doorwerking van moment naar moment (AR(1)-structuur: hoe je je NU voelt
bepaalt hoe je je STRAKS voelt).

## Diagnose (theoretisch belangrijk)
Het model implementeert retentie als trekkracht naar het levenslange gemiddelde (dispositie-pinning),
niet als doorwerking van de vorige toestand. Husserls retentie betekent letterlijk het vasthouden
van het zojuist-verstreken moment in het huidige. Die momentane doorwerking ONTBREEKT als kanaal:
elke run start met verse random waarneming, en de vorige collapse telt alleen mee als 1/n in het
geheugengemiddelde. Bijdrage 3 claimt Husserl-retentie maar bouwt gewoonte/dispositie.

## Opties (NIETS aangepast, beslissing Willem)
A. Retentie-term toevoegen: de vorige collapse weegt expliciet mee in A_h (of als aparte bron)
   met gewicht gamma. Theoretisch zuiverder t.o.v. Husserl, geeft echte AR(1)-dynamiek, en maakt
   T6 toetsbaar tegen ESM-data. Consequentie: nieuwe hervalidatie (routes/intensiteit verschuiven),
   en de cap-vraag moet mee (cap weg of dynamisch begrensd).
B. Claim herformuleren: gamma is dispositiesterkte (gewoonte), geen momentretentie; bijdrage 3
   aanpassen en T6 laten vallen. Eerlijk maar armer: het model verliest de aansluiting op de
   inertie-literatuur, een van de sterkste empirische ankers die beschikbaar is.
C. Beide: gamma-dispositie behouden EN een aparte retentiecomponent (bijv. gamma_r) toevoegen;
   rijkste optie, ook de meeste nieuwe vrijheidsgraden om te verantwoorden.

## Advies Claude
Optie A (of C als de dispositierol aantoonbaar apart nodig is). Argument: de Husserl-verwijzing is
een kernclaim van het paper; die waarmaken is sterker dan hem afzwakken, en emotionele inertie is
empirisch het best gedocumenteerde fenomeen in de affectdynamiek-literatuur om op aan te sluiten.
Volgorde: eerst Willems besluit, dan branch, dan hervalidatie, dan pas menselijke ESM-data.

## Besluit en uitvoering (optie A, 21 juli)
Willem koos optie A. Gebouwd op branch retentie: (1) gamma-cap 0.72 verwijderd (gamma = P*F,
natuurlijk begrensd op 1), (2) retentiebron: de vorige collapse weegt met gewicht gamma mee in de
superpositie (vijfde bron, binnen interfere, fluctueert niet met omgevingsruis).

VANGRAIL-BATTERIJ (alle groen):
- Anker 1-vorm: skew ruw 13,6 -> log 0,34 op 1245 deliberaties. Vorm intact.
- Routes: A 10% / B 69% / C 21%, conform referentie. Besluiteloos-mechanisme intact.
- Kampen: exacte splitsing G1:E1+E2 | G2:E3+E4+E5, hoeken 47/50/226/221/221 om doelen 45/225.

RESULTAAT RETENTIE:
- Inertie-niveaus stijgen naar 0,21-0,55: het menselijke ESM-bereik (was 0,05-0,27).
- Ruwe r(gamma, inertie) = -0,19, MAAR diagnose over 30 entiteiten: r(gamma, sd) = -0,95
  (hoge gamma pint de toestand vast, lage variantie drukt de gemeten autocorrelatie) en
  partieel r(gamma, inertie | sd) = +0,26: het retentiekanaal werkt zoals bedoeld.
- NIEUWE TOETSBARE VOORSPELLING (T6 verfijnd): doordat gamma = P*F zowel retentie als pinning
  aandrijft, voorspelt het model een sterke negatieve koppeling tussen inertie-gewicht en
  toestandsvariabiliteit. Menselijke ESM-data kan die koppeling direct toetsen; is hij bij mensen
  veel zwakker, dan moet retentie een eigen parameter krijgen (optie C alsnog).

## Menselijke toets: 6 open ESM-datasets, 689 personen (21 juli)
Bron: EmotionTimeSeries-archief (Haslbeck), datasets Bringmann 2013/2016, Rowland 2020, Wright 2017,
Fisher 2017, Fried 2021. Vrijen 2018 uitgesloten (hergebruik vereist toestemming auteurs).
Per persoon: gemiddelde lag-1 autocorrelatie over affect-items (inertie) en gemiddelde
schaal-genormaliseerde SD (variabiliteit); minimaal 20 metingen per item, 3 items per persoon.

### Resultaat 1: inertie-niveaus
Mens: gemiddeld 0,16; 10e-90e percentiel -0,01 tot 0,37; per dataset gemiddelden 0,02-0,32.
Model met retentie: 0,21-0,55. Overlap is er, maar het model zit aan de bovenkant van de menselijke
verdeling. EERLIJKE CORRECTIE: mijn eerdere bewering dat menselijke ESM-inertie "0,2-0,6" bedraagt
kwam uit parate literatuurkennis en blijkt in deze zes open datasets te hoog; het echte gemiddelde
ligt rond 0,16. Niveauvergelijking alleen is dus geen sterke toets; beide modelversies overlappen.

### Resultaat 2 (het kernresultaat): de koppelingsstructuur klopt exact
Gewogen r(inertie, variabiliteit) bij 689 mensen: +0,30 (per dataset 0,00 tot +0,54).
Model-observabele r(inertie, sd): +0,29.
Het model reproduceert de menselijke koppeling tussen emotionele traagheid en beweeglijkheid
vrijwel exact, PARAMETERVRIJ: niets in het model is hierop afgestemd, de koppeling volgt uit
gamma = P*F dat retentie en pinning tegelijk aandrijft. De zorg dat de modelkoppeling te sterk
zou zijn betrof de latente laag (r(gamma,sd) = -0,95); op het niveau van wat je kunt METEN
(autocorrelatie vs spreiding) komt het model uit op precies de menselijke waarde.

### Slotoordeel anker 2
T6 is structureel bevestigd: het model deelt met 689 echte mensen zowel het inertie-bereik als de
inertie-variabiliteit-koppeling (+0,29 om +0,30), zonder tuning. De retentie-term (optie A) was
daarvoor noodzakelijk: zonder retentiekanaal bestond er geen mechanisme voor doorwerking.
Beperkingen voor het paper: item-niveau vs val/aro-compositie, nachtgrenzen in de lags meegenomen,
Likert-schalen vs continue modeltoestand. Alles reproduceerbaar (script in repository).

### CORRECTIE na kritische review (21 juli, later): geen exacte match
Replicatie van de model-koppeling (8x, elk 30 entiteiten) geeft gemiddeld +0,55, bereik 0,37-0,71.
De eerder gerapporteerde +0,29 was een lage trekking uit een enkele run. De correcte claim:
het model voorspelt parametervrij een POSITIEVE koppeling van vergelijkbare orde als bij mensen
(+0,30, per dataset 0,00-0,54), maar gemiddeld 1,5-2x sterker; bereiken overlappen aan de bovenkant.
"Exact gereproduceerd" is teruggetrokken. Zie docs/kritische-review-2026-07-21.md voor de volledige
review incl. openstaande controles (Likert-discretisatie, vloereffect-artefact).
