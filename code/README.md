# Public code

This folder contains the portable decision and analysis layers of the project.

| File | Purpose |
|---|---|
| [`tec_temperature_monitor.py`](tec_temperature_monitor.py) | Command-line Meerstetter TEC temperature logger, adapted from the thesis development notebooks with port and setpoint supplied at runtime. |
| [`hybrid_feedback_model.py`](hybrid_feedback_model.py) | TEC-primary / AO-fine-trim control policy with explicit calibration, actuator limits and AO-unload logic. |
| [`drift_metrics.py`](drift_metrics.py) | RMS, mean-absolute-error and within-threshold summaries for reference-relative centroid drift. |

`tec_temperature_monitor.py` requires the external `pyMeCom` / `mecom` package. The other scripts use only the Python standard library.

The files are designed for method review and offline analysis, not direct laboratory control. Hardware transport beyond the TEC example, laboratory port assignments, device addresses, raw telemetry, credentials and operational controller configuration are intentionally not included.
