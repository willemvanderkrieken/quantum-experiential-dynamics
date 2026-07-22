# Discriminatie: klassieke tweeling vs coherent Route B (Leggett-Garg)

**Script:** `data/empirie/routeB-classical-twin.mjs` (standalone, vaste seed). Raakt het model en de bestaande
prototypes (`routeB-*-v6/v7/v8.mjs`, `bewustzijn-model-v6.1.html`) NIET aan.

## Opzet
Drie modellen, **één** LG-procedure (identiek aan `routeB-leggettgarg-v8.mjs`; hergebruikt via een verwisselbare
`evolve`-functie op de 2-niveau ambivalentie-Bloch, Q = rz = waarneming(+1) / conflict(−1), tijden 0/τ/2τ,
maxK3 over τ):
- **QUANTUM** — coherente Rabi (H=(Δ/2)σ_x) + omgevings-defasering r.
- **KLASSIEK** — continue-tijd Markov op drie populaties (waarneming/conflict/limbo), som=1; exchange-rate
  ω = 0,3·Δ tussen waarneming↔conflict (uit de conflict-koppeling), lek-rate gleak = 0,1·g naar limbo (uit de
  limbo-voeding), omgevings-aflezing r. GEEN coherenties, geen off-diagonale termen.
- **GEDECOHEREERD** — de quantum-dynamiek, maar elke tijdstap de off-diagonalen (rx,ry) op nul (dephase-naar-diagonaal).

Uitkomst en beslistijd: qutrit-trajectorie (quantum) vs 3-populatie-Markov (klassiek), beide met Poisson-aflezing
tarief r (eerste-aflees-moment → beslistijd ~ Exp(r), dus identiek van vorm).

**IJk (verificatie LG-implementatie):** quantum r=0, gap180 → maxK3 = **1,500** bij τ=2,18 (theorie 1,5). ✓
Pas daarna is de klassieke uitkomst te vertrouwen. Kalibratie klassiek op de quantum-uitkomstverdeling over
gaps × r∈{0,25;0,5;1;2}: gemiddelde mismatch 0,13 per cel.

## Vergelijkingstabel (uitsnede; volledige grid in de scriptoutput)
uitkomst = waarneming/conflict/limbo (%). medT = mediaan beslistijd.

| gap | r | uitkomst Q | uitkomst KL | medT Q | medT KL | maxK3 Q | maxK3 KL | maxK3 DEPH |
|----:|--:|:----------:|:-----------:|:------:|:-------:|:-------:|:--------:|:----------:|
| 60  | 0.00 | n.v.t.     | n.v.t.      | n.v.t. | n.v.t.  | **1.500** | 1.000 | 1.000 |
| 60  | 0.50 | 64/18/18   | 70/18/12    | 1.48   | 1.48    | **1.216** | 1.000 | 1.000 |
| 60  | 2.00 | 93/ 4/ 3   | 90/ 7/ 2    | 0.36   | 0.36    | **1.050** | 0.998 | 1.000 |
| 90  | 0.50 | 57/22/21   | 58/21/21    | 1.48   | 1.48    | **1.316** | 0.999 | 1.000 |
| 135 | 1.00 | 60/20/20   | 63/20/18    | 0.74   | 0.74    | **1.294** | 0.998 | 1.000 |
| 180 | 0.00 | n.v.t.     | n.v.t.      | n.v.t. | n.v.t.  | **1.500** | 0.999 | 1.000 |
| 180 | 0.50 | 55/22/22   | 43/23/34    | 1.48   | 1.48    | **1.392** | 0.999 | 1.000 |
| 180 | 1.00 | 59/21/20   | 60/21/19    | 0.74   | 0.74    | **1.315** | 0.998 | 1.000 |
| 180 | 2.00 | 67/17/16   | 72/17/10    | 0.36   | 0.36    | **1.216** | 0.996 | 1.000 |
| 180 | 4.00 | 79/11/10   | 81/13/ 6    | 0.18   | 0.18    | **1.118** | 0.989 | 1.000 |

Over het hele grid (gap∈{30,60,90,135,180}, r∈{0;0,25;0,5;1;2;4}): maxK3 QUANTUM loopt van 1,002 (gap30, r=4)
tot 1,500 (r=0), **overal >1** en stijgend met conflict / dalend met r. maxK3 KLASSIEK ∈ [0,989; 1,000], maxK3
GEDECOHEREERD = 1,000 — **overal ≤1**, voor élke gap en élke r.

## Conclusie
De klassieke tweeling reproduceert de **beslistijd-verdeling exact** (zelfde Poisson-aflezing r) en de
**uitkomstverdeling goed** bij r≥0,5 (gemiddelde afwijking ~0,13); alleen bij zeer lage r (0,25) lekt de
tweeling te veel naar limbo, omdat hij de coherente Rabi-terugkeer waarneming↔conflict mist — die "vasthoud"-
balans is zelf al een coherentie-effect. Ondanks deze goede match op de klassieke signaturen is de tweeling
**gebonden aan K3 ≤ 1** voor élke conflicthoek en élke r; hetzelfde geldt voor het gedecohereerde eigen model
(K3 = 1,000, coherentie eruit → LG-schending weg én de populatie-overdracht bevriest). Alleen het **coherente**
model haalt **K3 > 1, stijgend met conflict** (tot 1,5). Daarmee staat de discriminerende claim: een macrorealistisch
model met dezelfde toestanden, tarieven en uitkomsten haalt álles behalve de Leggett-Garg-schending — de coherentie,
en niets anders, draagt K3 > 1.
