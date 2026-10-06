# Experimental results — current research record

This folder contains compact result records with the evaluated interval, measurement method and interpretation stated explicitly. It is not a raw-data release.

The current storyline runs from the original environmental/thermal characterisation through hybrid feedback, V17/V18 precision work, and the V19–V24 thermal-diagnostic campaign. V25 is a prototype/validation phase and is therefore documented under reports rather than listed as a measured performance result.

## Current experiment records

| Record | What it contributes |
|---|---|
| [Exp-H long-run OPL + pixel benchmark](exp_h_long_run_benchmark.md) | Temperature-only feedback under strong pressure disturbance; establishes the residual limit that motivated a fine correction layer. |
| [March hybrid TEC-AO recovery experiment](march_hybrid_recovery.md) | 44.36 h disturbed run; documents sub-pixel final recovery together with the full-run limitation. |
| [Why perfect zero-pixel regulation was not yet achieved](why_zero_pixel_regulation_not_yet_achieved.md) | Why EXOhSPEC differs from a textbook step-response problem; separates RMS stability, bias, disturbance and actuator-range limitations. |
| [June 2026 local thermal-impulse repeat campaign](thermal_impulse_repeat_campaign_2026-06-22_to_24.md) | Four-location component-sensitivity study comparing grating and camera-mount thermal impulses with OPL, centroid and environmental context. |
| **[V17–V18 precision progression](stage2_v17_v18_precision_progression.md)** | V17 endurance, V18.1 phase-correlation feedback and V18.2 multi-line ThAr + PT104 validation. |
| **[V19–V24 thermal diagnostics](thermal_diagnostics_v19_to_v24.md)** | Passive periodicity, camera-TEC intervention, replacement LK220, controller/pump optimisation and the V24 rotation observation that motivates V25. |

## Cross-experiment indicators

| Area | Reported result | Interpretation |
|---|---:|---|
| Environmental optical-path response | ~0.4 µm/hPa; ~6 µm/°C | Pressure and temperature both produced measurable OPL variation in the tested configuration. |
| Thermal control | σT = 2.47 mK over 44.5 h; 17.4 mK p-p | Millikelvin-scale TEC stability is possible even while the wider laboratory environment moves. |
| Early hybrid comparison | dY RMS 2.72 → 0.69 px | A selected interval showed 74.5% RMS reduction with TEC + AO; this is not a universal run-to-run factor. |
| V17 endurance | 88.59 h, 4,761 settled frames; dX 0.0594 px, dY 0.1631 px RMS | Long-duration stability with 100% of settled measurements inside ±0.5 px. |
| V18.2 | dX 0.0373 px, dY 0.0990 px, radial 0.1058 px RMS over 3.98 h feedback | Strongest short-run detector-plane result in the V18 sequence using multi-line phase correlation. |
| V19 | ~33.4 min common thermal component | Motivated cooling-chain diagnosis; does not uniquely identify a component as the root cause. |
| V22 camera TEC ON | dY RMS 0.2125 px; 100% inside ±0.5 px | Replacement-LK220 configuration was stable, but conditions differ from old-LK220 runs. |
| V23 | Kp 2.5; PERIOD 2000 ms best completed tested settings | Thermal-controller optimisation only; no optical telemetry in V23. |
| V23.2 | 75% pump, ~1.10 L/min selected balanced default | Most of the 80% cooling benefit with less chiller burden. |
| V24 | early ~28 min: dY ~+0.64 px; OPL ~−0.32 µm | Post-rotation observation motivated direct camera-gradient testing; not a causal proof. |

## How to read the numbers

Runs differ in duration, disturbance history, reference definition, tracking method and thermal configuration. A lower RMS value in one experiment is therefore not automatically a better controller in every respect.

For each comparison, prefer:

- stated feedback/settled windows rather than whole-file averages;
- RMS together with mean bias and time-in-band;
- environmental and OPL context;
- actuator usage and calibration state;
- explicit notes about changed hardware or changed thermal settings.

Pixel stability is reported as detector-plane motion. It is not described as calibrated stellar radial-velocity precision without a wavelength solution and end-to-end RV calibration.

## Next phase

The next hardware experiment is [V25 camera thermal homogenisation](../reports/thermal-management/EXOhSPEC_V25_camera_thermal_homogenisation.md). The fan hardware has been ordered and the black TPU mount is in the 3D-print stage. V25 remains an unvalidated design until fit, vibration and thermal + dX/dY + OPL tests are complete.
