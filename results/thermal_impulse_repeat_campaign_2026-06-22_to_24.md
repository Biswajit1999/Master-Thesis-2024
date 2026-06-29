# Local thermal-impulse campaign and V8.3 closed-loop follow-up

**Thermal-impulse dates:** 22–24 June 2026  
**Closed-loop run:** 25–26 June 2026  
**Scope:** local thermal sensitivity, then a phase-resolved forensic assessment of V8.3 feedback behaviour.

> **Read this report as evidence, not a success claim.** The thermal-impulse campaign identifies likely disturbance pathways. V8.3 demonstrates an initially bounded feedback interval, but it does not demonstrate robust long-duration centroid stabilisation.

---

## 1. Thermal-impulse result: what is sensitive?

Each accessible location received the same nominal thermal input:

\[
P=2.20\ \mathrm{W},\qquad \Delta t=70\ \mathrm{s},\qquad E=154\ \mathrm{J}.
\]

| Location | Peak \(|\Delta Y|\) | Peak radial image response | Peak \(|\Delta\mathrm{OPL}|\) | Interpretation |
|---|---:|---:|---:|---|
| **Grating A (G2)** | **0.888 px** | **1.047 px** | 0.142 µm | Largest detector-plane response |
| Grating B | 0.200 px | 0.283 px | 0.054 µm | Smaller, clean comparison location |
| **Camera mount A / right mount** | 0.713 px | 0.941 px | **2.273 µm** | Largest OPL response |
| Camera mount B | 0.634 px | 0.652 px | 0.116 µm | Fast image response; strongest rigid-shift validation |

**Working hardware interpretation:** Grating A is the priority image-motion sensitivity location; Camera mount A is the priority OPL-sensitivity location. These are different observables and do not establish a single hardware culprit.

### Independent FITS check

| Location | FITS frames | Full-record MaxIm–FITS discrepancy RMS | Interpretation |
|---|---:|---:|---|
| Grating A | 41 | 0.183 px | Trend supported; amplitude remains method-dependent |
| Grating B | 72 | 0.098 px | Strong image-motion validation |
| Camera mount A | 72 | 0.389 px | Strong OPL result; later centroid behaviour needs caution |
| Camera mount B | 36 | **0.075 px** | Strongest rigid-shift validation |

**Caution:** environmental telemetry gives context, not local component temperature. It cannot by itself identify detector-mount, grating-substrate, or camera-cooling gradients.

---

## 2. Why V8.3 follows the thermal-impulse campaign

The two experiments answer complementary questions:

| Thermal-impulse campaign | V8.3 feedback run |
|---|---|
| Which accessible location creates image/OPL sensitivity? | Can the controller maintain image stability while the instrument evolves naturally? |
| Local pulse and passive relaxation | Long-duration closed-loop operation |
| Identifies disturbance pathways | Tests controller authority, model validity, and actuator response |

The V8.3 analysis therefore uses the impulse campaign to motivate **local-temperature sensing and model re-identification**, not to claim that a single global TEC setpoint can compensate every thermal-optical pathway.

---

## 3. V8.3 exact timeline

Times below are timestamps recorded by the control PC; the CSV did not retain an explicit timezone.

| Stage | Start | End | Duration |
|---|---|---|---:|
| Passive warm-up | 25 Jun 2026, 22:51:20 | 25 Jun 2026, 23:54:37 | 63.3 min |
| TEC identification, positive leg | 25 Jun 2026, 23:55:47 | 26 Jun 2026, 00:13:52 | 18.1 min |
| TEC identification, return leg | 26 Jun 2026, 00:15:03 | 26 Jun 2026, 00:21:30 | 6.5 min |
| Post-identification settling | 26 Jun 2026, 00:22:41 | 26 Jun 2026, 00:36:53 | 14.2 min |
| TEC-only control | 26 Jun 2026, 00:38:04 | 26 Jun 2026, 01:06:29 | 28.4 min |
| MIMO phase | 26 Jun 2026, 01:07:46 | 26 Jun 2026, 11:45:56 | 10.64 h |

![V8.3 phase-resolved telemetry](figures/v8_3_feedback_2026_06/v8_3_phase_resolved_context.png)

*Figure 1. Full V8.3 telemetry. The horizontal axis is elapsed experiment time. Warm-up is passive logging; TEC-only permits thermal setpoint correction only; MIMO enables the outer supervisory allocation logic. The later divergence must not be hidden by the early stable segment.*

---

## 4. What the run actually achieved

| Segment | Frames | Duration | Radial RMS | 95th percentile \(|e|\) | \(|e|\leq0.5\) px | TEC actions | AO actions |
|---|---:|---:|---:|---:|---:|---:|---:|
| TEC-only | 23 | 28.4 min | **0.092 px** | 0.149 px | 100.0% | 5 | 0 |
| MIMO, feedback clock \(\leq6\) h | 255 | 5.47 h | **0.225 px** | 0.298 px | **99.6%** | 29 | 6 |
| MIMO, feedback clock \(>6\) h | 240 | 5.15 h | 1.440 px | 2.286 px | 14.6% | 10 | 0 |
| Full MIMO | 495 | 10.64 h | 1.016 px | 1.977 px | 58.4% | 39 | 6 |

The early MIMO interval is a real bounded interval. It is **not**, by itself, causal proof that outer feedback produced the stability: V8.3 did not include a matched no-outer-control baseline under comparable conditions.

The hardware TEC loop itself continued to track its own target: median absolute measured-target gap was 2.79 mK in early MIMO and 3.52 mK in late MIMO. The late centroid excursion was therefore not evidence that the inner TEC temperature regulator had simply stopped tracking.

---

## 5. Forensic answer: why did long-duration stability fail?

### 5.1 The onset was a control-model mismatch, not a proven external environmental step

The first persistent loss of the 0.5 px containment band began at **26 Jun 2026, 07:05:38**. At **07:30:12**, the filtered image state changed from the preceding frame by:

| Quantity | Change over 78 s |
|---|---:|
| \(\Delta X\) | −0.174 px |
| \(\Delta Y\) | −0.333 px |
| Radial error | +0.372 px |
| OPL residual | −0.011 µm |
| ECU temperature | 0.000 °C |
| ECU pressure | −0.05 hPa |
| ECU water content | −0.147 g m\(^{-3}\) |
| BME temperature | −0.16 °C |

No logged temperature, pressure, humidity, or OPL discontinuity matches the centroid jump in magnitude or timing. An **unmeasured local thermal-mechanical or centroid-measurement disturbance remains possible**, but the logged data do not identify an environmental channel as the unique trigger.

![Late-drift control forensic](figures/v8_3_feedback_2026_06/v8_3_late_drift_forensic.png)

*Figure 2. Around the late-drift onset, the uncapped PI-D request became non-zero and large, but many proposed commands were vetoed by the predicted-cost gate. OPL and pressure evolved continuously; they do not show an equivalent abrupt event at the 07:30 centroid transition.*

### 5.2 The implemented model had insufficient verified authority

The active thermal column remained fixed throughout MIMO at approximately:

\[
B_T=[0,\ +7.073,\ 0]^\mathsf{T}\ \mathrm{per\ ^\circ C}.
\]

In practical terms, the controller model assumed that TEC could directly correct **Y only**, with no identified direct authority in X or OPL. A single TEC setpoint is therefore not able to independently drive \(\Delta X\), \(\Delta Y\), and \(\Delta\mathrm{OPL}\) to zero. The system was structurally rank-limited until a validated AO response was available.

At **07:30:12**, the outer PI-D terms requested approximately **+25.9 mK** before limits. The provisional-model policy limited a single action to **+4 mK**. The predicted MIMO cost would then improve only from 222.27 to 210.55: **5.3%**, below the required 10% reduction. The command was therefore vetoed as `no_predicted_mimo_gain`.

At **07:32:47**, radial error exceeded 1 px and the integral state entered `coarse_error_no_integrate`. This was intentional anti-windup, but it removed the mechanism that could accumulate a persistent correction. The result was a conservative recovery deadlock: the controller calculated a non-zero request but refused the bounded command because its one-step predicted improvement was too small.

### 5.3 The thermal model later failed its own response validation

At **08:42:34**, a +4 mK TEC step was followed by a measured +14.3 mK thermal movement. The centroid response was opposite to the fixed model prediction and was logged as `direction_mismatch`. The correct interpretation is not that the hardware necessarily failed; it is that the local thermal response used by the controller was no longer predictive at that operating point.

### 5.4 AO did not provide an independent recovery path

![Actuator-response audit](figures/v8_3_feedback_2026_06/v8_3_actuator_response_audit.png)

*Figure 3. All six AO moves were +X steps. The next-frame observed centroid changes were much smaller than, and often directionally inconsistent with, the stored AO calibration. Once cumulative X travel reached +6 steps, the software’s global soft-travel condition prevented further AO use on either axis.*

| AO finding | Evidence |
|---|---|
| Y was never selected | All six commanded moves were \((+1,0)\) in the software step convention |
| Stored AO calibration was not validated by the run | Observed next-frame responses were far below the predicted displacement and did not consistently align in direction |
| X travel disabled Y | The policy used a global maximum travel test; reaching +6 in X blocked both X and Y |
| AO could not rescue late drift | AO was restricted to fine residuals and was unavailable once error left that region |

---

## 6. Defensible conclusion from V8.3

> V8.3 showed an early bounded interval but did not provide robust long-duration centroid stabilisation. The late failure is best explained by a changed or unmodelled plant response combined with restrictive supervisory-control gates and an unverified AO calibration. The available telemetry does not identify a unique logged environmental trigger.

This is more precise than either of the following unsupported claims:

- “the feedback worked for the whole run”; or
- “the problem was only environmental.”

---

## 7. Version 9 requirements derived from the evidence

1. **Bidirectional thermal identification:** do not arm autonomous feedback from a one-leg or inadequately settled temperature response.
2. **Change-detection mode:** a `direction_mismatch` must freeze ordinary correction and trigger bounded re-identification, not normal planning against an invalid model.
3. **Reachability check:** explicitly test the rank and conditioning of the TEC–AO response matrix before claiming three-output MIMO regulation.
4. **AO recalibration in the current run:** identify X and Y separately; do not consume travel after a failed validation; use independent axis travel limits.
5. **Recovery logic without deadlock:** compare the predicted benefit of a step against an absolute noise-aware threshold, not only a fixed relative cost reduction when the residual is already large.
6. **Matched evidence run:** retain a fixed-reference passive segment before controlled operation and report the same metrics for both.
7. **True resume checkpoint:** save reference, model coefficients and covariance, filter buffers, integrator state, pending actuator validation, action ledger, and AO state; resume only after a passive continuity check.
8. **Local disturbance measurement:** prioritise temperature sensing at the Camera mount A/right-mount and Grating A sensitivity regions indicated by the thermal-impulse campaign.

---

## Public boundary

This public report contains derived metrics and figures only. It omits raw telemetry, detailed hardware geometry, optical alignment, operational communications, and live controller implementation details.