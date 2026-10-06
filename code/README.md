# Public code

Python is the dominant programming language used across the EXOhSPEC acquisition, feedback, synchronisation, diagnostics and analysis workflow.

This folder exposes portable method and analysis layers without publishing laboratory-specific device addresses, credentials or operational safety configuration.

| Path | Purpose |
|---|---|
| [tec_temperature_monitor.py](tec_temperature_monitor.py) | Command-line Meerstetter TEC temperature logger adapted from the thesis development notebooks. |
| [hybrid_feedback_model.py](hybrid_feedback_model.py) | Hardware-independent TEC-primary / AO-fine-trim decision model with actuator limits and AO-unload logic. |
| [drift_metrics.py](drift_metrics.py) | RMS, mean-absolute-error and threshold-residence summaries for reference-relative detector motion. |
| [pt104_exohspec_logger.py](pt104_exohspec_logger.py) | Four-channel PT104 acquisition/logging layer used for camera-region and room/AC thermal mapping. |
| [analysis/thermal_response.py](analysis/thermal_response.py) | Reusable thermal-response analysis helpers for aligned time-series experiments. |

## Software context

The wider laboratory workflow also interfaces with:

- MaxIm DL for detector acquisition/tracking;
- IDS3010 interferometric OPL metrology;
- BME680 and PT104 environmental/thermal sensing;
- Meerstetter TEC hardware;
- LK220 liquid-cooling telemetry;
- InfluxDB/Grafana for time-series monitoring;
- OpenSCAD for the V25 mechanical prototype.

The public scripts are intended for method review, reproducible analysis and offline testing. They are not an end-to-end laboratory-control release.
