# EXOhSPEC V11 — 33-Hour Closed-Loop Run Report

**Author:** Biswajit Jana  
**Supervisors:** Prof. Hugh Jones, Prof. Bill Martin  
**Run date:** 1–2 July 2026  
**Run duration:** 33.36 h  
**Data files:** `rt_stage2_v11.csv`, `exohspec_v11_final.py`

---

## 1. Summary

This report documents a 33.36-hour EXOhSPEC V11 closed-loop stabilisation run using TEC thermal correction and active-optics fine correction.

**Primary result:** across 31.44 h of feedback, V11 maintained all controller-coordinate feedback frames within ±0.5 px. The controller-coordinate radial RMS was 0.1634 px, with ΔX RMS = 0.0635 px and ΔY RMS = 0.1524 px.

The residual error was therefore dominated by the vertical direction, ΔY. Horizontal motion remained substantially smaller throughout the run.

> [!NOTE]
> The 100% containment result is relative to the adaptive controller reference. Relative to the initial fixed feedback reference, V11 achieved radial RMS = 0.225 px and 98.63% containment within ±0.5 px. Both metrics are reported because they answer different questions: closed-loop operating containment versus conservative physical drift.

---

## 2. Run overview

| Metric | Value |
|---|---:|
| Total logged duration | 33.36 h |
| Warm-up duration | 1.88 h, 96 frames |
| Feedback duration | 31.44 h, 1604 frames |
| Feedback ΔX RMS | 0.0635 px |
| Feedback ΔY RMS | 0.1524 px |
| Feedback radial RMS | 0.1634 px |
| Maximum \|ΔY\| | 0.4794 px |
| Controller-coordinate frames within ±0.5 px | 100.0% |
| Controller-coordinate frames within ±0.2 px | 81.0% |
| Fixed-reference frames within ±0.5 px | 98.63% |
| OPL residual RMS | 0.4341 µm |
| Median OPL model R² | 0.546 |
| TEC commands | 68 |
| AO commands | 69 |
| Maximum cumulative AO \|sx\| | 4 steps |
| Maximum cumulative AO \|sy\| | 11 steps |
| Rejected centroid frames | 0 |
| AO unload events | 0 |

---

## 3. Axis-resolved closed-loop performance

ΔY was the principal stability direction because it carried the larger residual motion and was the direction in which V8.3 later lost containment. V11 nevertheless remained stable in both axes:

- **ΔX RMS = 0.0635 px**
- **ΔY RMS = 0.1524 px**
- **Radial RMS = 0.1634 px**

Thus, ΔX was approximately 2.4 times quieter than ΔY. The remaining performance limit was vertical residual motion rather than horizontal drift.

![Feedback close-up: centroid residuals](figures/01c_dY_closeup_feedback.png)

The distribution comparison shows that the feedback residuals remain concentrated around zero, with ΔX narrower than ΔY.

![ΔY and ΔX distributions](figures/07_hist_dY_dX_side_by_side.png)

---

## 4. OPL model and spectral context

The OPL residual remained bounded but was not perfectly removed by the environmental model:

| OPL metric | Value |
|---|---:|
| Residual RMS | 0.4341 µm |
| Largest absolute residual | 1.233 µm |
| Fraction within ±0.5 µm | 73.4% |
| Median rolling model R² | 0.546 |

The centroid remained well controlled despite these residual OPL excursions. This indicates that the present controller has sufficient practical containment authority, while the OPL/environmental model remains the main area for further refinement.

![OPL residual and model fit quality](figures/03_opl_residual_r2.png)

The spectral analysis identifies periodic structure consistent with the control-loop timescales. These associations are informative but should not be interpreted as proof of causality without a separate open-loop or no-command comparison run.

| Candidate period | Frequency | Interpretation |
|---|---:|---|
| ~30 min | 5.54×10⁻⁴ Hz | Consistent with TEC-command rhythm |
| ~15 min | 1.11×10⁻³ Hz | Approximate harmonic |
| ~5 min | 3.32×10⁻³ Hz | Faster correction-scale structure |
| ~2.7 min | 6.09×10⁻³ Hz | Near-Nyquist residual structure |

![OPL power spectral density](figures/09_opl_psd_robust.png)

---

## 5. Full-run diagnostic

The stacked diagnostic provides the full temporal context: centroid residuals, radial error, TEC evolution, AO cumulative travel, OPL, and environmental telemetry.

The AO system remained within its travel envelope throughout the run. The y-axis ledger reached 11 steps but recovered without hitting the unload trigger at 14 steps.

![Nine-panel full-run diagnostic](figures/06_nine_panel_stacked.png)

---

## 6. Comparison with earlier control runs

<span style="color: #1a7f37;"><strong>🟢 Green</strong></span> indicates a bounded or sustained result within its stated comparison window.  
<span style="color: #cf222e;"><strong>🔴 Red</strong></span> indicates loss of long-duration containment or a fixed-model failure.  
The coloured circles remain visible even if GitHub does not apply custom HTML colours in a particular view.

| Run / regime | Control approach | Duration used | RMS ΔX | RMS ΔY | Radial RMS | Within ±0.5 px | Interpretation |
|---|---|---:|---:|---:|---:|---:|---|
| A — 23 Mar | Hybrid TEC + AO | 43.47 h | 0.7512 px | 0.3711 px | 0.8379 px | 51.56% | Mixed long run; historically the best ΔY RMS among the earlier A–E experiments |
| B — Apr V6 | Adaptive hybrid | 50.89 h | 0.3266 px | 1.7309 px | 1.7615 px | 37.89% | Mixed result; relatively calm thermal/OPL behaviour but weaker pixel containment |
| C — 15 Apr | Fixed-model hybrid | 47.11 h | 0.3007 px | 4.9816 px | 4.9907 px | 23.32% | <span style="color: #cf222e;"><strong>🔴 Fixed-model failure</strong></span> |
| D — 20 Apr | Fixed-prior / fixed-model | 35.19 h | 0.4394 px | 5.8756 px | 5.8920 px | 28.95% | <span style="color: #cf222e;"><strong>🔴 Late-run breakaway; fixed prior lost validity</strong></span> |
| E — 22–24 Apr | Attended TEC-primary + AO | 45.24 h | 0.5254 px | 1.2015 px | 1.3113 px | 47.82% | Partial recovery result; avoided the sustained −10 px-type runaway but included large excursions |
| V8.3 — TEC-only | TEC-only control | 28.4 min | — | — | 0.092 px | 100.0% | <span style="color: #1a7f37;"><strong>🟢 Excellent short controlled interval</strong></span> |
| V8.3 — early MIMO | MIMO feedback, first ≤6 h | 5.47 h | — | — | 0.225 px | 99.6% | <span style="color: #1a7f37;"><strong>🟢 Strong bounded early interval</strong></span>; not evidence of robust all-night control |
| V8.3 — full MIMO | MIMO feedback, complete run | 10.64 h | — | — | 1.016 px | 58.4% | <span style="color: #cf222e;"><strong>🔴 Late model mismatch and containment loss</strong></span> |
| V11 — fixed initial reference | Adaptive warm-up model + TEC + AO | 31.44 h feedback | — | — | 0.225 px | 98.63% | <span style="color: #1a7f37;"><strong>🟢 Conservative long-duration drift result</strong></span> |
| V11 — adaptive controller reference | Adaptive warm-up model + TEC + AO | 31.44 h feedback | 0.0635 px | 0.1524 px | 0.1634 px | 100.0% | <span style="color: #1a7f37;"><strong>🟢 Sustained closed-loop containment</strong></span> |

### V8.3 versus V11: direct interpretation

V8.3 demonstrated that the controller could achieve an excellent short interval: TEC-only operation reached 0.092 px radial RMS over 28.4 minutes, and the first 5.47 h of MIMO feedback achieved 0.225 px radial RMS with 99.6% of frames inside ±0.5 px. However, its full MIMO interval degraded to 1.016 px radial RMS and only 58.4% containment after a late model-mismatch and recovery-authority failure.

V11 matches the V8.3 early-MIMO radial RMS of 0.225 px when assessed against its initial fixed feedback reference, but sustains that performance for 31.44 h rather than 5.47 h. Relative to its adaptive controller reference, V11 achieves ΔX RMS = 0.0635 px, ΔY RMS = 0.1524 px, radial RMS = 0.1634 px, and 100% containment within ±0.5 px.

The remaining V11 residual is dominated by ΔY; ΔX is approximately 2.4 times quieter. V11 therefore represents a genuine improvement in both horizontal and vertical long-duration control, while the fixed-reference metric prevents overstating physical optical-train stability.

> **Caveat:** V11 is strong evidence from one 31.44-hour feedback run. A second independent long-duration repeat is required before claiming repeatability.
---

## 7. Reproducibility

- Source CSV: `rt_stage2_v11.csv`
- Controller source: `exohspec_v11_final.py`
- Analysis notebook: `EXOhSPEC_V11_analysis.ipynb`
- Controller basis: V6 preserved with V11 AO quiet-time relaxation and CCD cooler-settling gate.
- Figures: `results/figures/`
