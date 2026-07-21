# Bloch-migratie: voor/na-vergelijking (branch bloch-migratie)
20 juli 2026, laat. Drie kritieke ingrepen: (1) Bloch-conventie voor ALLE dichtheidsmatrices
(S, P, coherentie, routekeuze), (2) delta = Bloch-lengte van rho_mem (bijdrage 15),
(3) tau_d = xi0/(1-P0+0.1) in de route B-stabiliteit (bijdragen 6/19).
Vergeleken: simulatie-replica van Willems avondsessie-opzet (48 runs, zelfde 5 karakters)
tegen de echte nulmeting van 21:08.

## Wat aantoonbaar beter werd
1. Ambivalentie wordt eindelijk correct gemeten: pendelen tussen tegenovergestelde emoties geeft
   nu S=1,00 / P=0,50 / delta=0 (was S~0 / P~1: de blinde vlek is weg). Coherent geheugen: S=0,005, delta=0,85.
2. De tegenpool behoudt zijn identiteit: E5 (doel 0 graden) realiseert 8 graden.
   In de nulmeting werd E5 nog naar de meerderheid getrokken (gemiddelde richting 183).
3. tau_d werkt dosis-afhankelijk en groot: E3 (tau 0,40, piekeraar) gemiddeld 985 iteraties per
   deliberatie tegen 4-13 voor de anderen. De karakterloze entiteit delibereert het meest en het langst:
   psychologisch een sterk beeld (geen identiteit = alles moet overwogen).
4. Karakterbinding blijft: doelen 180 -> gerealiseerd 171-182; E5 doel 0 -> 8.
5. Spread (0,90) en lidmaatschapsduur (13,3 runs) vrijwel gelijk aan nulmeting (0,89 / 15,3): stabiel.

## Wat wezenlijk verschuift (beslispunt voor Willem)
1. ROUTEVERDELING: A=9 / B=24 / C=207 (86% C) tegen nulmeting A=32 / B=63 / C=142 (60% C).
   Oorzaak: met correcte (Bloch) S en P zijn coherente identiteiten echt coherent, dus S < 1.5-P
   is vrijwel altijd waar en patroonherkenning domineert. Deliberatie wordt de uitzondering,
   voorbehouden aan werkelijk ambivalente entiteiten (E3 doet 16 van de 24 B-runs).
   Lezing A: theoretisch juist, gevestigde identiteiten leven op geleerd instinct; route B is
   het bijzondere geval en dat is psychologisch verdedigbaar.
   Lezing B: 86% is te veel; dan moeten de routedrempels (1.5-P vorm, bijdrage 4) herijkt worden
   op de nieuwe S/P-schaal, wat een bewuste hercalibratie van een kernclaim is.
2. Groepsvorming is strikter: alleen G1:E1+E4 (de identieke defaults). E2 (p0 0,99) is nu
   onderscheidbaar van E1/E4 omdat zijn rho zuiverder is; de zelf-fluctuatiedrempel is in
   Bloch-eenheden kleiner. Zuiverder, maar minder inclusieve groepen.

## Status
Branch: bloch-migratie. Main staat op tag v5-stable-20260720 en is onaangetast.
Het artifact draait de BRANCH-versie zodat Willem het gedrag zelf kan voelen.
Merge-beslissing bij Willem: lezing A accepteren (mergen zoals het is) of eerst routedrempels
herijken op de nieuwe schaal (extra calibratieronde in de branch).
