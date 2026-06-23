# Public code

This folder contains the portable decision and analysis layers of the project.

| File | Purpose |
|---|---|
| [`hybrid_feedback_model.py`](hybrid_feedback_model.py) | TEC-primary / AO-fine-trim control policy with explicit calibration, actuator limits and AO-unload logic. |
| [`drift_metrics.py`](drift_metrics.py) | RMS, mean-absolute-error and within-threshold summaries for reference-relative centroid drift. |

Both scripts use only the Python standard library. They are designed for method review and offline analysis, not direct laboratory control.

Hardware transport, laboratory port assignments, device addresses, raw telemetry, credentials and operational controller configuration are intentionally not included.
