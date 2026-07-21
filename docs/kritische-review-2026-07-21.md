# Kritische review van de empirische resultaten (adversarieel, op verzoek van Willem)
21 juli 2026. Doel: de resultaten aanvallen zoals een vijandige reviewer dat zou doen,
en vaststellen wat er overeind blijft. Een replicatie-meting maakte deel uit van deze review.

## 1. Anker 1 (RT-vorm): zwakker dan gepresenteerd
a) NIET-DIAGNOSTISCH. Rechts-scheve, lognormaal-achtige beslistijden worden voorspeld door
   vrijwel ELK serieus model (drift-diffusion, LBA, race-modellen) en zelfs door triviale
   multiplicatieve-ruisprocessen. Dat ons model deze vorm produceert onderscheidt het van niets.
   Het is een noodzakelijke voorwaarde, geen bewijs. De kwalificatie "bevestigd op publicabel
   niveau" was te sterk; correct is: consistentiecheck geslaagd.
b) TE MILD CRITERIUM. "Log-transformatie halveert de scheefheid" wordt gehaald door bijna elke
   rechts-scheve verdeling (exponentieel, gamma, Weibull). De 98% was daarmee vrijwel a priori
   gegarandeerd. Een echte toets is een formele modelvergelijking (lognormaal vs ex-Gaussisch
   vs gamma per persoon, AIC/BIC), en die is nog niet gedaan.
c) VRIJE PARAMETERS. De sd(log)-discrepantie (model ~2,0 vs mens ~0,55) wordt "verklaard" met
   een shifted mapping met per fit twee vrije parameters (t0, c). Daarmee kan bijna alles passen.
d) SELECTIE EN KEUZES ACHTERAF. Datasets gekozen op beschikbaarheid, analysekeuzes (RT-venster,
   minimum-n) na het zien van pilotdata, geen preregistratie.
WAT TE DOEN: herformuleren als consistentie + de unieke voorspellingen benadrukken die WEL
onderscheiden (besluiteloosheid als categorie, intensiteit-RT-koppeling); formele
verdelingsvergelijking toevoegen; discussie-alinea over niet-diagnosticiteit.

## 2. Anker 2 (inertie-koppeling): overclaimed, nu gecorrigeerd
a) DE "EXACTE MATCH" WAS TOEVAL VAN EEN RUN. Replicatie (8x, elk 30 entiteiten): model-koppeling
   gemiddeld +0,55, bereik 0,37-0,71. De eerder gerapporteerde +0,29 was een lage trekking.
   Mens: +0,30 gewogen (0,00-0,54 per dataset). CORRECTE claim: het model voorspelt parametervrij
   een POSITIEVE koppeling van vergelijkbare orde; hij is in het model 1,5-2x sterker dan
   gemiddeld bij mensen, met overlappende bereiken. Geen exacte reproductie.
b) APPELS EN PEREN. Model gemeten op continue val/aro-reeksen; mensen op Likert-items per emotie,
   met nachtgrenzen in de lags. Eerlijke vergelijking vereist het discretiseren en item-iseren
   van modeloutput; niet gedaan.
c) SAMENSTELLING. De menselijke gewogen r leunt zwaar op Wright 2017 (+0,54, n=225): een
   klinische steekproef (pathologisch narcisme) met uitsluitend negatieve-affect-items.
d) MOGELIJK GEDEELD ARTEFACT. Vloereffecten (mensen die laag op de schaal zitten hebben mechanisch
   lage SD en lage meetbare autocorrelatie) kunnen bij mens EN model een positieve koppeling
   genereren. Niet uitgesloten; controle-analyse nodig (subset weg van de vloer; model door
   Likert-discretisatie halen).
WAT TE DOEN: draft en anker2-document corrigeren (gebeurd, zie onder); replicatie-gemiddelde
met bereik rapporteren; discretisatie-controle en vloer-controle op de takenlijst.

## 3. Methodologisch (geldt voor alles van vandaag)
- Garden of forking paths: drempels, vensters en criteria zijn gaandeweg gekozen door dezelfde
  persoon (mij) die ook de uitkomsten beoordeelde. Geen preregistratie, geen blinde analyse.
- Het model is vandaag meermaals gewijzigd en steeds getoetst op dezelfde simulatie-harnas;
  risico van overfitten op eigen tests. Mitigatie: de menselijke datasets fungeren als extern
  ijkpunt en zijn niet aangepast, maar de analysekeuzes daarop wel.
- Meerdere kerngetallen elders in de documentatie komen uit enkele runs zonder
  onzekerheidsmarges. Voor het paper: alles wat geciteerd wordt repliceren met bereik.

## 4. Wat overeind blijft na deze review
- De wiskundige geldigheid (numeriek geverifieerd) en de originaliteit van de architectuur.
- De eerlijk gerapporteerde falsificaties (T4b, de eerdere gamma-bevinding) en deze zelfcorrectie.
- Anker 2 als kwalitatief structureel resultaat: een parametervrije, vooraf onwaarschijnlijke
  voorspelling (positieve inertie-variabiliteit-koppeling) die de goede kant op wijst.
- De volledige reproduceerbaarheid: elke claim heeft een script en een git-geschiedenis.

## 5. Consequenties doorgevoerd
- paper-draft.md: secties 6 en 6b en T4a/T6 geherformuleerd (consistentie i.p.v. bevestiging;
  replicatiebereik i.p.v. exacte match).
- anker2-tussenstand.md: correctieparagraaf toegevoegd.
- Takenlijst voor het paper: formele verdelingsvergelijking, Likert-discretisatie-controle,
  vloer-controle, onzekerheidsmarges op alle geciteerde modelgetallen.
