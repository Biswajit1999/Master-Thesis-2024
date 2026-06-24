# Public reference: Stage-2 feedback metrics used in thermal-impulse discussion

This note records the derived feedback-performance numbers cited in the thermal-impulse component-sensitivity report. It is included so that the public report can reference a stable, public-safe source without exposing raw telemetry, hardware configuration or operational controller details.

## Reported derived metrics

| Analysis context | Public-safe metric retained for discussion | Interpretation |
|---|---:|---|
| Fixed-prior Stage-2 behaviour | 9.47 h stable plateau; RMS ΔY = 0.380 px; 90.76% of samples within 0.5 px during the plateau | Demonstrates that the feedback architecture can hold the detector image close to the reference under a favourable plant state. |
| Improved attended 22-24 April Stage-2 run | 21.73 h within 0.5 px over the full run; 18.42 h within 0.5 px in the trimmed feedback zone | Demonstrates longer-duration within-band residence when the plant and controller state remain manageable. |
| Later V4 analysis | RMS radial error = 0.497 px; 58.1% of samples within 0.5 px while using fewer controller actions | Demonstrates that reduced control activity can still maintain sub-pixel-scale stability for a substantial fraction of the run. |

## Use in the thermal-impulse report

These values are used only to support the qualitative conclusion that the feedback loop should not be described as ineffective. The residual limitation is better interpreted as a delayed, spatially distributed thermal-optical plant rather than a simple controller failure.

## Public boundary

This note intentionally excludes raw time series, FITS frames, optical geometry, hardware communications, port assignments, controller gains, safety settings and private experimental logs.
