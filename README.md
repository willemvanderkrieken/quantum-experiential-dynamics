# Quantum Experiential Dynamics

An open quantum systems architecture for experiential (emotional) state evolution:
character, deliberation, and emergent shared realities.

**Author:** Willem van der Krieken (Flying Kiwi BV / Just Willem BV, Boekel, The Netherlands)
**Status:** research preprint in preparation (July 2026). Parts of the documentation are in Dutch;
an English translation is in progress.

## This release — v1.3 (v6.1)

Version 1.3 (model v6.1) extends the v5 core described below with:

- **Route B as an open quantum system** — a qutrit trajectory over perception / conflict / limbo, with an
  emergent decision time (no iteration cap) and indecision (limbo) as a located, non-empty outcome.
- **Recognition via fidelity to memory clusters** on a stable soft-clustering layer, instead of trace distance
  to the mean density matrix (this removes the pure-vs-mixed floor that made recognition unreachable).
- **Emotional granularity** as a per-agent character trait (discrimination resolution), empirically grounded in
  ESM data and reproducing the Barrett granularity–inertia relationship.
- **Discrimination evidence:** a classical (macrorealist) twin reproduces the decision-time and outcome
  signatures but is bound to Leggett–Garg K3 ≤ 1; only the coherent model reaches K3 > 1, rising with conflict.
- **Falsification tests** of the Leggett–Garg claim (qutrit limbo-leak, dimensionless/scale-invariant robustness,
  collapse-postulate independence) — all passed.

See `docs/v6.1-clustering.md`, `docs/discriminatie-tweeling-bevindingen.md`, `docs/lgi-falsificatie-bevindingen.md`,
`docs/routekeuze-diagnose.md`, `docs/routeB-bias-verkenning.md`. The architecture summary below describes the v5
core that v6.1 builds on and refines.

## What this is

A fully implemented, mathematically verified quantum-formalism model of emotional state dynamics
on Russell's circumplex, in which every behavioural threshold is emergent from the agent's own
history (no scale constants in route choice or group formation). Core mechanisms:

1. **State space:** qubit density matrices; the emotion circle is the Bloch equator (state angle =
   emotion angle / 2), so opposite emotions are orthogonal and ambivalence registers as entropy.
2. **Five-source superposition:** perception + retention (previous collapse, weight gamma = P*F,
   after Husserl) + own memory (Bloch length of memory rho) + group memory + external memory,
   the last two bounded by P/sqrt(N).
3. **Route choice by one measure:** the trace distance (closed qubit form, exact) between the
   current perception and the memory density matrix, with Helstrom interpretation. Recognition
   within the agent's own coherence length; surprise above the adaptive quantile of its own
   experienced distances; deliberation in between; **indecision** as an explicit outcome category
   when open-system relaxation is truncated.
4. **Emotional intensity as interference visibility** (|Psi| / max |Psi|): ambivalence is literally
   destructive interference.
5. **Emergent social structure:** persistent subgroup realities from trace-distance affinity between
   dispositional density matrices, with populations converging or splitting depending on the
   dispositional structure.

## Empirical anchors (with honest caveats)

- **Decision-time shape (consistency check):** the model's deliberation times are lognormal-like
  heavy-tailed, as are 307,270 human decision times from 315 participants in 8 open datasets
  (Confidence Database). Note: this shape is predicted by most sequential-sampling models and is
  a necessary condition, not discriminating evidence. See `docs/kritische-review-2026-07-21.md`.
- **Emotional inertia (qualitative structural support):** with the retention term, the model
  produces human-order inertia and, parameter-free, a positive inertia-variability coupling
  (model mean r = +0.55, replication range 0.37-0.71; humans +0.30, dataset range 0.00-0.54,
  689 participants across 6 open ESM datasets). Same sign and order; the model coupling is
  stronger than the human average. One prediction (T4b) was tested and NOT supported as
  operationalised; this is reported, not hidden.

## Third-party data (not redistributed here)

Analyses reference the following open datasets, which are **not** included in this package and
should be obtained from their original sources: the Confidence Database (Rahnev et al. 2020,
osf.io/s46pr), the EmotionTimeSeries archive (Haslbeck, github.com/jmbh/EmotionTimeSeries),
and the mental-rotation RT data by J.K. Lindelov (github.com/lindeloev/shiny-rt).
See NOTICE-data.md for details.

## Run the model

Open `model/bewustzijn-model-v6.1.html` in any modern browser (double-click; no dependencies,
no build, no network required) — this is the current version (v6.1). The interface is in English
with a Dutch toggle. The original preprint-reference model is `model/bewustzijn-model-v5.html`.

## Reproduce the analyses

Scripts in `analysis/scripts/`; own simulation outputs in `analysis/results/` and `data-sessions/`.
Python 3 (stdlib + pyreadr for the ESM analysis) and Node.js 18+ suffice.

## Licence

Code and model: MIT (see LICENSE). Texts and documentation: CC BY 4.0.

## Citation

See CITATION.cff. A preprint will follow; until then please cite the Zenodo DOI of this archive.
