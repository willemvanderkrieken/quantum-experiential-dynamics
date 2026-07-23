# Curve-vorm-vergelijking: is de K3-curve modelspecifiek?

**Script:** `data/empirie/lgi-curvevorm-vergelijking.mjs` · **Stand:** 23 juli 2026

## Aanleiding
Feedback van prof. Pothos: een stijgende K3-curve is op zich generiek voor coherente
systemen. De vraag is dus niet of K3 stijgt, maar of de VORM van onze curve modelspecifiek
is. Deze analyse vergelijkt drie koppelings-afbeeldingen die alledrie hetzelfde eindpunt
delen, zodat alleen de vorm verschilt en niet de schaal.

## Opzet
De 2-niveau LG-dynamiek is exact overgenomen uit `routeB-leggettgarg-v8.mjs`
(H = (Delta/2) sigma_x, defasering r, dichotome Q via sequentiele projectieve metingen,
maxK3 geoptimaliseerd over tau). Er is niets aan die dynamiek, de gewichten, de drempels of
de collapse-regels veranderd. Alleen de koppeling Delta als functie van de conflicthoek theta
wisselt, alledrie genormaliseerd op Delta(180) = Kmax = 2.4:

- (M) MODEL: Delta = Kmax * (1 - cos(theta)) / 2   (de geometrische overlap, ons model)
- (L) LINEAIR: Delta = Kmax * (theta / 180)
- (K) CONSTANT: Delta = Kmax   (koppeling onafhankelijk van conflict)

IJk: r = 0, theta = 180, model geeft maxK3 = 1.500 (verwacht ~1.5).

## Output 1: maxK3(theta), r = 0.5

| theta | maxK3(M) | maxK3(L) | maxK3(K) |
|------:|:--------:|:--------:|:--------:|
|     0 | 1.000    | 1.000    | 1.392    |
|    15 | 1.005    | 1.074    | 1.392    |
|    30 | 1.055    | 1.156    | 1.392    |
|    45 | 1.139    | 1.216    | 1.392    |
|    60 | 1.216    | 1.259    | 1.392    |
|    75 | 1.274    | 1.291    | 1.392    |
|    90 | 1.316    | 1.316    | 1.392    |
|   105 | 1.344    | 1.335    | 1.392    |
|   120 | 1.364    | 1.351    | 1.392    |
|   135 | 1.377    | 1.364    | 1.392    |
|   150 | 1.386    | 1.375    | 1.392    |
|   165 | 1.391    | 1.384    | 1.392    |
|   180 | 1.392    | 1.392    | 1.392    |

RMS-afstand in maxK3 over de curve: M vs L = 0.043, M vs K = 0.203.

De constante koppeling is trivialiter een vlakke lijn (Delta hangt niet van theta af). De
model- en lineaire curve delen begin- en eindpunt; het verschil zit in de tussenliggende vorm.
Bij lage conflicthoek blijft M kwadratisch vlak (theta = 15 geeft 1.005), terwijl L daar al
duidelijk gestegen is (1.074). Rond theta = 90 kruisen ze en daarna ligt M iets boven L.

## Output 2: onderscheidbaarheid bij realistische bemonstering
Observabele = genormaliseerde marge m(theta) = N13 - (N12 + N23) = (K3 - 1) / 2, gemeten in het
change-count-paradigma. Onder M als grondwaarheid heeft elke flip-kans binomiale ruis
Var = N(1 - N)/n; de marge-variantie is de som over de drie termen (independente-conditie-
benadering). De scheidingsmaat is chi-kwadraat D = som_theta (m_M - m_alt)^2 / Var_M(theta, n)
over de vijf hoeken {30, 60, 90, 135, 180}; kritieke waarde p = 0.05 bij 5 punten is ~11.07.

RMS in genormaliseerde marge over de vijf hoeken: M vs L = 0.025, M vs K = 0.087.

| n   | D(M vs L) | D(M vs K) | scheidbaar van L | scheidbaar van K |
|----:|:---------:|:---------:|:----------------:|:----------------:|
| 100 | 1.3       | 15.5      | nee              | ja               |
| 400 | 5.3       | 62.0      | nee              | ja               |

Benodigde n per hoek voor p = 0.05-scheiding: van K ~72, van L ~835.

## Betekenis (eerlijk)
De model-curve heeft een specifieke (1 - cos)-vorm. Tegenover een conflict-onafhankelijke
(constante) koppeling is die vorm glashelder onderscheidbaar, al bij n = 100 per hoek. Dat
sluit de nul-these "de koppeling doet er niet toe" ruim uit.

Tegenover een LINEAIRE koppeling ligt de vorm dicht bij elkaar: bij n = 100 en n = 400 is het
verschil statistisch niet te scheiden met deze vijf hoeken; daarvoor is ongeveer n ~835 per
hoek nodig. Dat verzwijgen we niet. De discriminerende handtekening zit in de lage-conflict-
onzet: (1 - cos(theta))/2 gedraagt zich daar kwadratisch (evenredig met theta^2) en blijft dus
vlak, terwijl een lineaire koppeling meteen stijgt. Een experiment dat de vorm wil toetsen moet
daarom dicht bemonsteren bij kleine conflicthoeken, niet alleen bij grote.

Conclusie: de voorspelling van het model is de VORM van de curve, niet de kale schending. Die
vorm is meetbaar verschillend van een conflict-onafhankelijke koppeling bij bescheiden n, en
verschilt van een lineaire koppeling in de lage-conflict-onzet, toetsbaar met dichtere
bemonstering daar of met grotere n.
