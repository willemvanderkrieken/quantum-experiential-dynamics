# Convergentietest 220 runs per entiteit, N = 2 / 3 / 5 / 8
20 juli 2026. Gesimuleerd met de echte modelcode (intensiteitsmodel, groepsgewogen gedeeld geheugen actief).
Metrieken per 20 runs: globaal = gemiddelde paarafstand laatste collapse; centra10 = paarafstand van
per-entiteit centra over laatste 10 runs; binnen = gemiddelde paarafstand binnen gedetecteerde groepen.

## Ruwe verlopen (selectie)

N=2:  globaal 1,85 - 1,78 - 1,99 - 0,60 - 0,53 - 0,85 (episodisch: polarisatie EN convergentie wisselen)
N=3:  globaal 1,21 - 1,36 - 1,70 - 1,57 - 1,39 - 0,69 (convergeert tegen het einde, alle drie in 1 groep)
N=5:  globaal 0,97 - 1,24 - 1,28 - 1,40 - 1,09 - 1,20 (convergeert NOOIT; permanent 1-2 subgroepen, binnen 0,32-0,91)
N=8:  globaal 1,32 - 1,27 - 1,35 - 1,29 - 1,21 - 1,33 (convergeert NOOIT; permanent 2-3 subgroepen, binnen 0,49-0,91)

## Bevinding 1: het N-effect is bevestigd
Globale convergentie treedt alleen (episodisch) op bij N=2 en N=3. Vanaf N=5 is de globale spread
stabiel rond 1,2-1,35 over 220 runs en komt gedeelde realiteit op populatieniveau niet tot stand.
De eerdere observatie (sessie met 5 entiteiten, spread 1,33) was dus geen tijdschaalkwestie: 220 runs
verandert er niets aan. Dit is een schaalresultaat voor het paper, geen bug.

## Bevinding 2: subgroepen bestaan, maar subREALITEITEN nog niet
Bij N>=5 zijn er vrijwel altijd subgroepen en die zijn intern dichter (binnen ~0,5-0,7) dan de populatie
(~1,25). Dat steunt de richting van de subrealiteit-hypothese. MAAR: de groepen zijn extreem vluchtig.
Gemiddelde lidmaatschapsduur 1,2 runs; ~180 groepswissels per entiteit op 220 runs (N=5 en N=8 identiek).
Er zijn dus geen persistente groepen die een eigen gedeelde realiteit kunnen opbouwen. De hypothese vereist
persistentie, en die ontbreekt in de huidige detectie.

## Diagnose: de affiniteit meet momentane emotie, geen dispositie
affinityMatrix() werkt op de LAATSTE collapse per entiteit. Emotionele toestanden fluctueren per run
(by design), dus het groepslidmaatschap fluctueert mee. De centra over de laatste 10 runs zijn veel
stabieler (centra10 = 0,3-0,6 in alle condities): entiteiten HEBBEN stabiele disposities, de detectie
kijkt er alleen niet naar. Groepen horen te ontstaan op dispositionele gelijkenis, niet op momentane emotie.

## Bevinding 3 (bijvangst): polarisatie bij N=2
Bij N=2 komen episodes voor met spread 1,99, vrijwel maximaal: de twee entiteiten staan diametraal
tegenover elkaar en houden elkaar daar vast. Polarisatie als emergent effect van hetzelfde mechanisme
dat ook convergentie geeft. Mogelijk paperwaardig als aparte observatie.

## Over beta verhogen: nee
Bijdrage 10 stelt beta max P/sqrt(N) als QM-valide grens. De code hanteert nu een vaste cap van 0,6,
die voor N=5 (P/sqrt(5) ~ 0,27-0,45) de eigen theoretische grens al overschrijdt. Beta verder verhogen om
convergentie te forceren is dus het manipuleren van een eerdere hypothese, precies wat vermeden moet worden.
Er liggen twee ingrepen voor de hand die WEL binnen de eigen theorie blijven:
1. Affiniteit op cluster-centra van de laatste ~10 runs i.p.v. de laatste collapse (dispositie i.p.v. momentopname).
   Dit volgt bijdrage 17 (groepsaffiniteit via clustering) zuiverder dan de huidige momentane meting.
2. Beta expliciet splitsen in beta_groep en beta_extern (bijdrage 9: beta heeft twee componenten) i.p.v. de
   huidige dubbelweging van groepsgeheugen. Dan krijgt elke groep werkelijk een eigen subrealiteit-term
   en is kruisgroep-beinvloeding (beta_extern) apart instelbaar en meetbaar.
Beide zijn het implementeren van al geclaimde theorie, geen parameter-tuning.

## Voorspelling om daarna te toetsen
Met dispositionele affiniteit + gesplitste beta: persistente groepen (lidmaatschapsduur >> 1,2 runs),
binnen-groep spread die DAALT over runs (subrealiteit-convergentie), globale spread die hoog blijft,
en groepswissels die zeldzaam maar betekenisvol worden (beinvloeding vanuit andere groepen).
