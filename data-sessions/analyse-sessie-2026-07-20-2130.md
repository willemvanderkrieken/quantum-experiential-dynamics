# Analyse validatiesessie 21:30 (eerste sessie op het gemigreerde model)
70 runs per entiteit, 5 karakters: E1 (0,70/180/0,50), E2 (0,16/180/0,18 zwak+piekeraar),
E3 (0,97/180/0,97 extreem+vlot), E4 (0,21/36/0,25 zwak+piekeraar), E5 (0,98/353/0,97 extreem+vlot).

## Bevindingen
1. Routeverdeling C=84% komt overeen met de simulatievoorspelling (86%): het branch-gedrag is
   reproduceerbaar op interactieve data. Lezing A (geleerd instinct domineert bij gevormde identiteit)
   is hiermee door Willem geaccepteerd en de branch is naar master gemerged.
2. tau_d dosiseffect is enorm en consistent: E2 (tau 0,15) gemiddeld 24.800 iteraties per deliberatie,
   E4 (tau 0,22) 2.527, de vlotte beslissers E3/E5 (tau ~6) gemiddeld 4.
   LET OP: E2 raakt de iteratie-guard van 50.000; extreme piekeraars worden afgekapt.
   Open beslissing: guard verhogen of "afgebroken deliberatie" als betekenisvol modelgedrag documenteren.
3. Karaktersterkte bepaalt conformiteit vs verzet: zwakke karakters conformeren (E4 liep over van
   doel 36 naar 208 graden, de meerderheidszone), extreme karakters houden stand (E5: doel 353 -> 345,
   vrijwel de hele sessie ongegroepeerd: de einzelganger). E2 (zwak) verloor na 22 runs zijn
   groepslidmaatschap en bleef daarna ongebonden zwerven.
4. Intensiteit blijft gelaagd: A 0,50 / B 0,68 / C 0,86. Deliberatie is het meest ambivalent.
5. Globale spread 1,03: subgroepen, geen populatieconvergentie. Consistent beeld.

## Papermateriaal
- tau_d als beslisprecisie is nu empirisch zichtbaar met drie ordes van grootte verschil (T4 herformuleren
  naar lage tau_d -> lange deliberatie, en dan direct toetsbaar).
- Conformiteit/verzet-drempel als functie van karaktersterkte: mogelijk kwantificeerbaar (bij welke p0
  houdt een minderheidsentiteit stand tegen een meerderheid?). Kandidaat-experiment.
