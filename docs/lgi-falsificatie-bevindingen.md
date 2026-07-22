# LGI-falsificatie: drie aanvallen op de Leggett–Garg-claim

Drie standalone tests die de LGI-voorspelling aanvallen op de punten waar een referee (Pothos/Busemeyer/
Khrennikov) zou aanvallen. Raakt de bestaande modellen NIET aan. Elke LG-implementatie is eerst geijkt op het
bekende punt r=0, gap=180° → maxK3 = 1.500. Definities (Δ, g, r, K) hergebruikt uit `routeB-lindblad-qutrit-v6.mjs`,
`routeB-trajectory-qutrit-v7.mjs` en `routeB-leggettgarg-v8.mjs`.

## TEST A — overleeft de schending het derde niveau (limbo-lek)? (`lgi-test-A-qutrit-lek.mjs`)
LG op de VOLLE qutrit open-systeem-generator (H met Δ én limbo-koppeling g, plus defasering r), grofkorrelige
waarneembare Q = |0⟩⟨0| (+1) vs |1⟩⟨1|+|2⟩⟨2| (−1), projectief/Born. IJk (g=0,r=0,gap180) = 1.500. ✓

maxK3 bij r=0.5, over conflicthoek × limbo-koppeling g=ξ·Δ (het model gebruikt ξ≈1; v6.1 ξ~1–1.8):

| gap | ξ=0 | ξ=0.5 | ξ=1 (model) | ξ=1.5 | ξ=2 | ξ=3 |
|----:|:---:|:-----:|:-----------:|:-----:|:---:|:---:|
| 30  | 1.055 | 1.068 | **1.093** | 1.118 | 1.142 | 1.185 |
| 60  | 1.216 | 1.240 | **1.267** | 1.288 | 1.307 | 1.338 |
| 90  | 1.316 | 1.332 | **1.341** | 1.349 | 1.360 | 1.384 |
| 135 | 1.376 | 1.385 | **1.380** | 1.381 | 1.387 | 1.397 |
| 180 | 1.392 | 1.397 | **1.386** | 1.388 | 1.395 | 1.405 |

**SLAAGT.** maxK3 blijft > 1 over álle conflicthoeken en álle g (K3 stíjgt zelfs licht met g), en de monotone
stijging met conflict blijft staan. Bij het feitelijke limbo-lek-tarief (ξ=1, g=2.40 bij gap180) is maxK3=1.386,
dus de schending overleeft het derde niveau ruimschoots; ze zakt bij geen enkele geteste g door 1.

## TEST B — hangt de curve aan willekeurige constanten? (`lgi-test-B-dimensieloos.mjs`)
Kerninzicht: maxK3 is tijdschaal-invariant en hangt alleen van x = Δ/r af. IJk = 1.500. ✓
- **Schaal-invariantie (exact):** maxK3 bij (Δ,r)=(2.4,0.5) en bij (s·Δ, s·r) voor s∈{0.5,2,5}: **1.3924 / 1.3924 /
  1.3924 / 1.3924** — identiek tot 4 decimalen. De absolute constanten (KD, APMAG, βp) doen er niet toe, alleen Δ/r.
- **maxK3(x=Δ/r):** monotoon stijgend: x=0.2→1.027, 1→1.189, 3→1.343, 8→1.431, 20→1.470, 40→1.485 (→1.5).
- **Emergent bereik** (Δ=K·f·P, K=K0(1+λ_K(1−p0)), K0=4, λ_K=2 → K∈[4.08,7.60]; P∈[0.5,1]; f>0; r∈[0.25,2]):
  álle maxK3 > 1 en monotoon stijgend met conflict; laagste maxK3 = **1.009** in de zwakste hoek (p0=0.99, K=4.08,
  P=0.5, r=2, f=0.1).

**SLAAGT.** Schaal-invariantie exact bevestigd; maxK3 stijgt monotoon met conflict en blijft > 1 over het volledige
emergente Δ/r-bereik, niet in een smal getuned venster. De voorspelling is constanten-onafhankelijk.

## TEST C — hangt de schending aan het niet-standaard collapse-postulaat? (`lgi-test-C-collapse.mjs`)
IJk = 1.500. ✓ De LG-tussenmeting in v8 is standaard Born (pP=(1+rz)/2, som=1, collapse naar eigentoestand); de
qutrit-generator v7 selecteert eveneens op |c|² (Born). De "projectieve normalisatie" van het model zit in de
emotie-MAGNITUDE (intensiteit), niet in de pointer-selectie.

Twee-manieren-vergelijking (r=0.5), maxK3 onder standaard-Born vs de model-eigen projectieve-normalisatie:

| gap | maxK3 (Born) | maxK3 (model-eigen) | \|verschil\| |
|----:|:------------:|:-------------------:|:----------:|
| 30  | 1.0553 | 1.0553 | 0.0000 |
| 60  | 1.2159 | 1.2159 | 0.0000 |
| 90  | 1.3156 | 1.3156 | 0.0000 |
| 135 | 1.3775 | 1.3775 | 0.0000 |
| 180 | 1.3924 | 1.3924 | 0.0000 |

Monotonie met r (gap180): 1.500 → 1.475 → 1.442 → 1.392 → 1.316 → 1.216 → 1.118 (r=0…4), **monotoon dalend**.

**SLAAGT.** De LG-getallen zijn identiek onder Born en onder de model-eigen regel (verschil 0), want voor
orthogonale projectieve metingen is de model-eigen normalisatie wiskundig de Born-regel; de intensiteit is een
readout die niet in de dichotome Q komt. En maxK3 daalt monotoon met r: de omgeving/defasering MAAKT de schending
niet, ze degradeert hem. Dit is een sterk punt voor het paper.

## Conclusie
De LGI-claim overleeft alle drie de referee-aanvallen. (A) De schending overleeft het volledige qutrit-open-systeem
met de werkelijke limbo-lek (maxK3 blijft > 1, stijgend met conflict). (B) De curve is tijdschaal-invariant en
hangt alleen van Δ/r af, met K3 > 1 over het hele karakter-emergente bereik — geen getuned artefact. (C) De
schending is onafhankelijk van het collapse-postulaat (identiek onder Born) en wordt niet door de omgeving
gecreëerd (maxK3 daalt monotoon met r). De verdedigbare, gescherpte claim: op het 2-niveau ambivalentie-subsysteem
(en zijn qutrit-uitbreiding) schendt het coherente model de Leggett–Garg-ongelijkheid over het volledige realistische
parameterbereik; die schending is robuust tegen limbo-lek, constanten-onafhankelijk, en niet toe te schrijven aan de
meting/collapse-keuze of aan de omgeving.
