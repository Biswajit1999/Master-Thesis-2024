# Methods

This folder documents the public, reviewable measurement and control methods behind the EXOhSPEC stability programme.

| Method | Scope |
|---|---|
| [V6B hybrid controller](V6B_HYBRID_CONTROLLER.md) | TEC-primary / AO-fine-trim architecture, measurement vector, phase logic, actuator limits, AO unloading and validation requirements. |
| [V24 180° camera-rotation passive monitor](V24_ROTATION_MONITOR.md) | Read-only thermal + detector + OPL monitoring, coordinate handling after camera rotation, phase-correlation workflow, PT104 mapping and safety/validity gates. |

## Public-method boundary

The repository exposes scientific logic and reproducible analysis structure while keeping laboratory deployment details out of the public method documents.

Python is the dominant language across acquisition, synchronisation, analysis, plotting and the controller prototypes. Hardware-specific ports, local network addresses, credentials and operational device configuration are deliberately not reproduced here.
