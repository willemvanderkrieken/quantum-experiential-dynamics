# An Open Quantum Systems Architecture for Experiential State Evolution: Character, Deliberation, and Emergent Shared Realities

**Willem van der Krieken**
Flying Kiwi BV / Just Willem BV, Boekel, The Netherlands
willem@flyingkiwi.nl

*Preprint, version 1.0 draft, July 2026.*
*Model, code, and analyses archived at Zenodo, DOI 10.5281/zenodo.21470110.*
*Interactive simulation: single self-contained HTML file, included in the archive.*

## Abstract

We present a computational architecture for the evolution of emotional (experiential) states, built on the mathematical formalism of open quantum systems and implemented as a fully interactive multi-agent simulation. Each agent's state lives on Russell's circumplex, mapped to the Bloch equator of a qubit so that opposite emotions correspond to orthogonal states and ambivalence registers as von Neumann entropy. Perception, retention of the immediately preceding state (after Husserl), autobiographical memory, and two socially bounded memory fields interfere in a five-source superposition; emotional intensity is defined as interference visibility, making ambivalence literally destructive interference. A single measure, the exact qubit trace distance between the current perception and the agent's memory density matrix (read through the Helstrom discriminability bound), drives a dual-process route choice in which recognition, surprise, deliberation, and an explicit indecision category all emerge from thresholds computed from the agent's own history, with no scale constants. Character is an initial density matrix with dynamically decaying weight; social coupling is bounded by P/√N, from which in-group dominance follows without additional parameters. Populations spontaneously form persistent subgroup realities: homogeneous populations converge on a shared reality, whereas opposed dispositional camps never merge. We report two empirical comparisons against open human datasets: deliberation-time distributions share the heavy-tailed, log-symmetric signature of 307,270 human decision times from 315 participants (a consistency check, with an honestly reported dispersion mismatch), and the model reproduces, parameter-free, the sign and order of the human coupling between emotional inertia and affect variability observed in 689 experience-sampling participants (model r ≈ +0.55, replication range 0.37–0.71; human weighted r ≈ +0.30). We document one prediction that failed under test, one retracted overclaim, and an open design question concerning the deliberation stopping rule, for which we report prototype results.

**Keywords:** quantum cognition, open quantum systems, affect dynamics, circumplex, emotional inertia, multi-agent simulation, decision times

## 1. Introduction

People do not respond to events with arbitrary emotions. Sometimes we recognise a situation and respond on learned autopilot; sometimes an event catches us off guard and we respond instinctively; sometimes we must deliberate, and occasionally deliberation fails to conclude at all. This paper develops a formal model in which these response modes, including the failure mode, are not programmed but emerge from a small set of quantum-mechanical rules; in which each simulated agent begins with a character that gradually yields to lived experience; and in which multiple agents spontaneously form groups that construct their own shared realities.

We work in the tradition of quantum cognition (Busemeyer & Bruza, 2012; Pothos & Busemeyer, 2022; Huang, Epping, Trueblood, Yearsley, Busemeyer & Pothos, 2025), which applies the mathematical structure of quantum theory to cognition without claiming quantum physics in the brain, and specifically in the open-quantum-systems strand developed by Khrennikov (2023). Within this field, most work targets judgment and decision phenomena (order effects, conjunction fallacies, probability updating). Emotional state evolution is comparatively underexplored; the closest existing work (Gnidko & Vasilenko, 2026) models quantum-like collective emotions in social networks with valence-arousal agents and an empirical social-media dataset, but with a deliberately thin formalism. Our contribution is complementary: a fully QM-consistent individual-level architecture (valid density matrices throughout, exact closed-form qubit trace distance and fidelity, open-system relaxation dynamics) from which social structure emerges, together with secondary analyses of open human datasets.

Our headline claims, each substantiated below:

1. **A qubit architecture on the circumplex in which all behavioural thresholds are emergent.** Route choice and group formation contain no scale constants; every threshold derives from the agent's own history (Sections 3, 6).
2. **Dual-process route choice from one measure.** The trace distance between perception and memory, read through the Helstrom bound, yields recognition (within the agent's own coherence length), surprise (beyond the adaptive quantile of its own experienced distances), deliberation in between, and indecision as truncated open-system relaxation: a measurable outcome category (Section 4).
3. **Emotional intensity as interference visibility.** Intensity = |Ψ| / max|Ψ|; ambivalence is destructive interference. An intensity hierarchy (instinct < deliberation < recognition) emerges rather than being imposed (Section 5).
4. **Character as a decaying initial density matrix.** Character strength is the Bloch length of ρ₀; its influence decays dynamically. Simulations show dose-dependent identity binding, conformity of weak characters, and resistance of strong ones (Section 6).
5. **Emergent shared and fragmented realities.** With social coupling bounded by P/√N, homogeneous populations converge on one shared reality while opposed camps maintain permanently separate subrealities; the route regime sets the binding strength (Section 7).

The only deliberate deviation from standard quantum mechanics is the collapse postulate: we use projective normalisation rather than the Born rule, stated explicitly as a postulate variant rather than an approximation. Throughout the paper we follow a policy of reporting failures alongside successes: one prediction was tested and not supported (Section 8.2), one initially claimed exact quantitative match was retracted after replication (Section 9), and one design limitation is documented with prototype results and posed as an open question (Section 10).

## 2. State space

An emotional state is a direction on Russell's (1980) circumplex: valence on the horizontal axis, arousal on the vertical. We map the emotion circle to the Bloch equator of a qubit by setting the state angle to half the emotion angle. This choice matters: with the full angle, a state vector and its negation generate the same density matrix, so an agent oscillating between joy and anger would register as maximally *coherent*. With the half-angle (Bloch) convention, opposite emotions are orthogonal, and ambivalence correctly registers as high von Neumann entropy and low purity. We discovered this as a live defect (the model initially measured an agent whose mean emotional directions differed by 154° as nearly identical, trace distance 0.037) and the correction changed downstream behaviour; we report it because the double-cover issue plausibly affects other quantum-cognition models of bipolar dimensions.

An agent's memory is summarised by the density matrix ρ over the (direction-normalised) remembered states. From ρ we obtain von Neumann entropy S, purity P, and the Bloch length m = √(2P − 1), which plays the role of memory coherence. All matrix quantities use exact closed qubit forms: fidelity F(ρ,σ) = tr(ρσ) + 2√(det ρ det σ), and trace distance T = ½‖ρ − σ‖₁ = √(dv² + dva²) for the traceless difference of two trace-one symmetric matrices. Both forms were verified numerically against eigenvalue reference implementations (max deviation ~10⁻¹⁵).

## 3. Superposition and intensity

At each perception event, five sources interfere:

Ψ = A_w + γ·A_r + δ·A_h + β_g·A_g + β_e·A_e, projectively normalised,

where A_w is the current perception, A_r the *retention* source (the immediately preceding collapsed state, weighted by γ = P·F; Husserl's retention, the just-past held in the now), A_h the autobiographical memory attractor weighted by δ = m(ρ_mem) (a Bloch-length reading of "coherent memory exerts its purity"), and A_g, A_e the group and external memory fields (Section 7). The retention source was not in early versions of the model: we added it after an in-silico test showed that γ as then implemented produced attractor pinning but no moment-to-moment carry-over. In other words, the model had habit but not retention, despite the Husserlian claim. Section 8.3 shows that adding it brings the model's emotional inertia into the empirically observed regime.

**Intensity as interference visibility.** We define the intensity of a collapse as I = |Ψ_prenorm| / (|A_w| + γ|A_r| + δ|A_h| + β_g|A_g| + β_e|A_e|) ∈ [0,1] (boundedness by the triangle inequality). I = 1 when all sources align (fully constructive interference); I → 0 under conflict. The collapsed state is the normalised direction scaled by I. Thus ambivalence is not a label but a mechanism: conflicting sources literally dampen the resulting emotion. The state proper remains a ray (the projective normalisation is untouched); intensity is a derived observable, in the spirit of interference visibility in interferometry. This yields an emergent intensity hierarchy, with surprise responses diffuse (mean |collapse| ≈ 0.5), deliberated responses intermediate, and recognised patterns most intense (median ≈ 0.9), because recognition presupposes alignment (Figure 3).

## 4. Route choice and indecision

For each perception we compute T, the trace distance between the pure perception state and the memory density matrix. Via the Helstrom bound, T is the optimal single-shot discriminability: p_error = (1 − T)/2. Route choice uses two thresholds, both computed from the agent's own history:

- **Recognition (route C):** T < ξ, the agent's own dispositional self-fluctuation (the trace distance between ρ over its runs −20..−10 and −10..0): perception indistinguishable from the self within its own noise.
- **Surprise (route A):** T > Q90 of the agent's own recent history of experienced distances: surprise is relative and habituates (adaptation-level flavour).
- **Deliberation (route B)** in between: open-system relaxation, i.e. repeated stochastic environment interaction plus projection until stability, with the stability requirement scaled by a decision-precision parameter τ_d = ξ₀/(1 − P₀ + 0.1) derived from character. Deliberations that fail to stabilise within 50,000 iterations are truncated and flagged as **indecisive**: a distinct outcome category, marked in all visualisations and in the exported data.

Two honest notes. First, the originally documented recognition criterion S < 1.5(1 − P) is mathematically unsatisfiable for qubits (S and P are deterministically linked through the Bloch length; S(m) > 1.5(1 − P(m)) for all m < 1); an earlier implementation silently compensated with a near-vacuous criterion, which made recognition dominate at 83%. The emergent-threshold formulation above replaced both. Second, with these thresholds deliberation becomes the dominant route (~65-75%), surprise stabilises near 10% by construction of the quantile, and the pure-versus-mixed floor T ≥ (1 − m)/2 suppresses recognition; these are documented consequences of the design choice, not tuned targets.

The decision-precision parameter has a large, monotone effect: across agents, median deliberation length spans three orders of magnitude (≈10 to ≈4,000 iterations from the most tolerant to the most precise decision style), and indecision occurs exclusively in low-τ_d ("ruminative") agents (Figure 2).

## 5. Character and identity

Character is an initial density matrix ρ₀ = I/2 + m₀(|θ₀/2⟩⟨θ₀/2| − I/2) with base mood θ₀ and strength m₀ = √(2p₀ − 1), p₀ ∈ [0.5, 1) being its purity (the physical range: half the naive [0,1] slider range is a single maximally mixed state, another defect found and fixed during development). Character influence decays as k_w = exp(−λ·runs) with λ = (σ_w/ξ₀)·0.05 + S(1 − P)·0.3, σ_w derived analytically from the stimulus bandwidth. It acts, k_w-weighted, on three channels: a retention-like feedback colouring perception (capped at the γ bound), blending into A_h, and a floor on δ.

Simulation results: agents bind to their target zone dose-dependently (with p₀ = 0.99, 67% of collapses fall in the target zone versus 33-44% at p₀ = 0.70); identical characters nevertheless differentiate through path dependence (symmetry breaking); weak characters conform to the majority's reality while strong opposed characters resist and remain themselves; and a defected agent can act as a bridge that periodically merges two camps, a linkage-dependent phenomenon we report rather than hide.

## 6. Group formation

Group affinity is the trace distance between agents' *dispositional* density matrices (k_w ρ₀ + (1 − k_w) ρ over full memory): the paper's group-formation claim implemented literally, with agglomerative clustering and a merge threshold of 1.5× the mean dispositional self-fluctuation. Below your own noise, two agents are indistinguishable (coherence-length logic; the same yardstick as route recognition). Group identities persist across runs via member-overlap matching, giving measurable per-agent group histories.

## 7. Social dynamics: shared and fragmented realities

The social sources A_g (own group) and A_e (everyone else) carry weights bounded by the documented constraint β ≤ P/√N applied at the natural group sizes: β_g ≤ P/√|group| and β_e ≤ P/√N_population. Because groups are smaller than populations, in-group dominance (β_g ≥ β_e) follows from the bound with no additional parameter.

Key results (Figure 5): (i) A homogeneous or weakly charactered population of five agents converges on a single shared reality (mean pairwise distance of latest states 0.13 after ~85 runs each). (ii) Two strongly opposed camps (two versus three agents, orthogonal base moods) never merge: across 100-120 runs the between-camp distance stays at 1.2-1.7 while within-camp distances remain at 0.1-0.5; group membership persisted uninterrupted for entire sessions. (iii) The convergence outcome is governed by the population's dispositional structure, while the route regime governs binding strength: under recognition dominance group membership was volatile (mean 17 runs) and camps merged episodically via bridge agents; under deliberation dominance membership became effectively permanent (mean >119 runs), because deliberation mixes the group field into every collapse and thus binds inward, not outward. (iv) A directionless agent (m₀ = 0) placed in a majority adopts the majority's reality entirely: conformity as an emergent β effect.

## 8. Empirical comparisons on open human data

Both comparisons are secondary analyses of openly shared datasets; no new human data were collected. Scripts and outputs are in the archive.

### 8.1 Decision-time distributions (consistency check)

The model's deliberation lengths and human decision times share a distributional signature: strongly right-skewed on the raw scale, near-symmetric after log transform. Across eight datasets from the Confidence Database (Rahnev et al., 2020; Adler 2018 E1-E3, Arbuzova 2021, Bang 2019, Hellmann 2023, Konishi 2019 motion and colour; 307,270 trials, 315 participants), the log transform at least halves the skewness for 308/315 participants (98%); pooled skewness falls from 3.5-16.1 (raw) to 0.23-1.79 (log). The model shows the same signature (e.g., 4.5 → 0.08 for a single decision style, n = 1,110).

We stress the epistemic status: this shape is predicted by virtually every sequential-sampling account and by simple multiplicative-noise processes, so it is a *necessary condition*, not discriminating evidence. Moreover, the model's log-scale dispersion is substantially larger than the human one (sd(ln) ≈ 2.0 versus ≈ 0.5), and its log-distribution is plateau-like rather than bell-shaped (Figure 1, where the mismatch is stated in the figure itself). Section 10 traces this to the stopping rule and reports prototype results toward a resolution. A mapping RT = t₀ + c·iterations (shifted-lognormal spirit; t₀ as the non-decision component) is available but involves two free constants per fit and is therefore not claimed as evidence.

### 8.2 A failed prediction, reported

We predicted that slower deciders should show heavier decision-time tails (both driven by τ_d). Across the same 315 participants the weighted correlation between median RT and tail weight (p95/median) was −0.13, and with sd(ln RT) 0.00: no support. Diagnosis: median RT is dominated by non-decision time and general speed, not stopping precision. The prediction requires a within-person operationalisation (log-dispersion after t₀ correction; omission rates; choice-deferral paradigms) before it can be retested. It remains open, with this null result on record.

### 8.3 Emotional inertia (qualitative structural support)

Emotional inertia, the lag-1 autocorrelation of affect in daily life, is among the best-documented phenomena in affect dynamics. In-silico testing first *falsified* our own architecture: γ as originally implemented produced no positive inertia (pinning to a lifetime attractor is not carry-over), and a legacy cap saturated γ for nearly all agents. Adding the retention source (Section 3) and removing the cap brought model inertia into the human range and, without any tuning, produced a positive coupling between inertia and affect variability. Against six open experience-sampling datasets (EmotionTimeSeries archive: Bringmann 2013, 2016; Rowland & Wenzel 2020; Wright 2017; Fisher 2017; Fried 2021; total 689 participants; the Vrijen 2018 dataset was excluded because reuse requires the original authors' permission), the human weighted coupling is r = +0.30 (dataset range 0.00-0.54); the model's coupling is r = +0.55 averaged over eight replications (range 0.37-0.71). Same sign and order, model coupling stronger than the human average (Figure 4, where both values are displayed). We initially reported an exact match from a single model run (+0.29); replication exposed this as sampling luck, and the claim was retracted. The correction is part of the archived record. Open robustness checks: Likert-discretising the model output and a floor-effect control, since both could inflate couplings on either side.

The structural reason for the coupling is itself a testable commitment: one quantity, γ = P·F, drives both retention and attractor pinning, so the model predicts inertia and (low) variability to be intertwined; if human data ultimately show a much weaker latent coupling, retention requires its own parameter.

## 9. Methodological honesty

The development process is fully version-controlled and archived. Along the way we found and fixed: a fidelity-based measure misnamed as trace distance (replaced by the exact trace distance, which incidentally improved group persistence from 8.6 to 17.3 runs in camp experiments, the correct mathematics discriminating better than the proxy); an unsatisfiable documented route criterion (Section 4); the double-cover defect (Section 2); the dead half of the character-strength range (Section 5); a saturating γ cap; and the retention gap (Section 8.3). One overclaim (the exact inertia-coupling match) was retracted after replication. Remaining calibration constants (the stimulus magnitude distribution, route-B noise scales, and window lengths) are enumerated in the archived audit; analytic choices in the empirical comparisons were not preregistered.

## 10. Open question: the deliberation stopping rule

The current rule stops deliberation when three consecutive iterations happen to fall within a coherence-scaled margin: a coincidence-waiting process whose per-run rate varies, which provably yields the overdispersed, plateau-like log-distribution of Figure 1, in contrast with the bell-shaped human log-RT. The natural quantum resolution would replace coincidence-waiting with accumulation. We prototyped two candidates. Measurement-induced purification (stop when the density matrix over recent iterations is sufficiently pure) degenerates: iteration directions are almost always instantly concentrated, so it fires at the window minimum. Einselection-style self-reinforcement (the deliberation feeds its own running mean back with growing weight; pointer-state selection through repeated interaction) narrows sd(ln) from ≈2.0 to ≈1.2 with routes and the τ_d dose effect intact, but eliminates both the heavy tail and indecision, which we regard as valuable properties (the truncation boundary is never reached once self-reinforcement forces convergence). Retaining all three properties appears to require the selection rate to vary strongly with intra-run conflict; our first attempt (rate ∝ interference visibility) differentiates too weakly. We note the close kinship of this question to quantum sequential-sampling approaches (e.g., Huang, Busemeyer, Ebelt & Pothos, 2025) and pose it as an explicit open problem; prototype scripts are archived.

## 11. Limitations

No new human data; both anchors are secondary analyses with unregistered analytic choices. The state space is a single qubit: the dominance dimension (PAD) is absent, and fear versus anger collapse into one zone. The stimulus model (magnitude distribution) is exogenous and should become emergent from attention/expectation. The stopping-rule mismatch of Section 10 is unresolved. Comparisons of model agents with humans mix continuous states with Likert items and ignore night gaps in experience-sampling lags. The architecture has been modified substantially during a compressed development period; although every change passed a regression battery (decision-time shape, route mix, camp persistence), overfitting-to-own-tests cannot be fully excluded and external replication is welcome. The simulation runs in any browser without dependencies.

## 12. Conclusion

A single coherent quantum formalism (density matrices on the Bloch equator, interference with retention, trace-distance discriminability with history-emergent thresholds, bounded social coupling) produces, without scale constants: dual-process routing with indecision as a measurable outcome; an intensity hierarchy in which ambivalence is destructive interference; dose-dependent character binding with conformity and resistance; and populations that either fuse into one reality or split into permanent subrealities depending on their dispositional structure. Two contact points with human data survive honest scrutiny at their stated strength: the distributional signature of decision times (as a consistency check) and the inertia-variability coupling (as parameter-free structural agreement). The failures and open questions are part of the contribution: they mark exactly where this architecture must next be disciplined by data.

## AI use statement

The conceptual ideas, design decisions, and the phenomenological perspective underlying this model are the author's own. The author, who has a software engineering rather than an academic background, used Anthropic's Claude as a modelling partner to translate these ideas into the quantum-mechanical formalism, to implement and audit the mathematics, and to run the analyses reported here. All derivations and results were verified in executable code, which is archived with this paper; the author reviewed and takes full responsibility for all content.

## Data and code availability

Everything required to reproduce this paper (the interactive model as one self-contained HTML file, all analysis scripts, simulation outputs, and the audit and review documents) is archived at DOI 10.5281/zenodo.21470110 (v1.0) and maintained at the public repository *quantum-experiential-dynamics*. Third-party datasets are referenced, not redistributed.

## References (to be completed for submission)

- Busemeyer, J. R., & Bruza, P. D. (2012). *Quantum Models of Cognition and Decision.* Cambridge University Press.
- Gnidko, K., & Vasilenko, I. (2026). Quantum-like phenomena in the spread of collective emotions in social networks. *Proc. IITI'25*, Springer LNNS 1762, 352-361.
- Huang, J., Busemeyer, J. R., Ebelt, Z., & Pothos, E. M. (2025). Bridging the gap between subjective probability and probability judgments: The Quantum Sequential Sampler. *Psychological Review, 132*, 916-955.
- Huang, J., Epping, G., Trueblood, J. S., Yearsley, J. M., Busemeyer, J. R., & Pothos, E. M. (2025). An overview of the quantum cognition research programme. *Psychonomic Bulletin & Review.*
- Khrennikov, A. (2023). *Open Quantum Systems in Biology, Cognitive and Social Sciences.* Springer.
- Kuppens, P., Allen, N. B., & Sheeber, L. B. (2010). Emotional inertia and psychological maladjustment. *Psychological Science, 21*, 984-991.
- Pothos, E. M., & Busemeyer, J. R. (2022). Quantum cognition. *Annual Review of Psychology, 73*, 749-778.
- Rahnev, D., et al. (2020). The Confidence Database. *Nature Human Behaviour, 4*, 317-325.
- Rosner, A., Basieva, I., Barque-Duran, A., Glöckner, A., von Helversen, B., Khrennikov, A., & Pothos, E. M. (2022). Ambivalence in cognition. *Cognitive Psychology, 134*, 101464.
- Russell, J. A. (1980). A circumplex model of affect. *Journal of Personality and Social Psychology, 39*, 1161-1178.
- (Plus: Haslbeck EmotionTimeSeries archive; the six ESM source papers; Lindeløv shiny-rt; Helstrom 1976; Zurek on einselection; Husserl on time-consciousness.)
