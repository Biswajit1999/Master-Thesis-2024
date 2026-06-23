# Public code

The files in this folder are the portable decision and analysis layers of the project.

- [`hybrid_feedback_model.py`](hybrid_feedback_model.py) implements the TEC-primary / AO-fine-trim control hierarchy shown in the project flowchart.
- Calibration, actuator limits and sign conventions are explicit inputs rather than hidden constants.
- Hardware transport, laboratory port assignments, device addresses, raw telemetry, credentials and operational controller configurations are intentionally not included.

The model can be executed with standard Python and is intended for review of the control logic, not direct control of laboratory hardware.
