# LG-voorspelling in de change-count / Temporal-Bell-vorm

**Script:** `data/empirie/lgi-changecount-tb.mjs` · **Stand:** 23 juli 2026

## Aanleiding
Feedback van prof. Pothos: druk de bestaande Leggett-Garg-voorspelling uit in de
"change-count" / Temporal-Bell-vorm die zijn groep in mensen meet (Waddup, Yearsley,
Blasiak & Pothos; Atmanspacher & Filk 2010). Daar wordt niet K3 zelf gerapporteerd,
maar de flip-kansen N_ij (de kans dat een dichotoom oordeel Q verschilt tussen twee
meetmomenten) en de ongelijkheid:

> N13 <= N12 + N23   (macrorealisme / temporeel Bell)

## Wat er is gedaan
De 2-niveau LG-dynamiek is **exact** overgenomen uit `routeB-leggettgarg-v8.mjs`
(H = (Delta/2) sigma_x, defasering r, dichotome Q via sequentiele projectieve metingen).
Er is niets aan die dynamiek, de gewichten, de drempels of de collapse-regels veranderd.
Alleen de uitdrukking is anders: voor Q = +/-1 geldt

> C_ij = <Q_i Q_j> = 1 - 2 * N_ij,   dus   N_ij = (1 - C_ij) / 2,

en daaruit volgt de exacte identiteit

> K3 = C12 + C23 - C13 = 1 + 2 * (N13 - N12 - N23).

De schendingsmarge in change-count-eenheden is dus (N13 - N12 - N23) = (K3 - 1) / 2.
De N_ij worden gerapporteerd bij dezelfde tau die K3 maximaliseert (hetzelfde tau-venster
als v8), zodat de curve direct vergelijkbaar is met de bestaande maxK3.

## IJk
Bij r = 0 en conflicthoek 180 graden:
- maxK3 = 1.500 (verwacht ~1.5)
- marge (N13 - N12 - N23) = 0.250 (verwacht ~0.25)
- identiteit: K3 = 1.499976 versus 1 + 2*marge = 1.499976, |verschil| = 0.00e+0

De identiteit klopt over de hele onderstaande tabel tot |verschil| <= 2.22e-16
(machineprecisie). Dit is de ijk tegen v8: dezelfde dynamiek, andere observabele, zelfde getal.

## Conflict-afhankelijke curve (r = 0.5)
Geoptimaliseerd over hetzelfde tau-venster als v8:

| conflicthoek | N12   | N23   | N13   | N13 - (N12 + N23) | equiv. maxK3 | schending |
|-------------:|:-----:|:-----:|:-----:|:-----------------:|:------------:|:---------:|
|           30 | 0.051 | 0.051 | 0.129 | +0.028            | 1.055        | ja        |
|           60 | 0.137 | 0.137 | 0.382 | +0.108            | 1.216        | ja        |
|           90 | 0.180 | 0.180 | 0.517 | +0.158            | 1.316        | ja        |
|          135 | 0.206 | 0.206 | 0.601 | +0.189            | 1.377        | ja        |
|          180 | 0.218 | 0.218 | 0.632 | +0.196            | 1.392        | ja        |

N12 en N23 zijn gelijk (symmetrische stap); N13 is telkens duidelijk groter dan hun som.
De schending groeit monotoon met de conflicthoek.

## Betekenis
De model-voorspelling in het Temporal-Bell-observabele (N13 > N12 + N23) is toetsbaar in
het change-judgment-paradigma van Waddup/Yearsley/Pothos; de voorspelling is een
conflict-afhankelijke curve, geen enkel punt. Waar een macrorealistische verklaring de
flip-kansen additief houdt (N13 <= N12 + N23), voorspelt het model een positieve marge die
oploopt met de mate van conflict tussen waarneming en verwachting. Dat maakt het een
gradueel, kalibreerbaar aangrijppunt voor een mensexperiment, in plaats van een enkele
ja/nee-drempel: de vorm van de curve (marge tegen conflicthoek) is zelf de handtekening.
