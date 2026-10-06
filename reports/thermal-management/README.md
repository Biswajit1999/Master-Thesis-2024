# Thermal-management reports

This folder records the EXOhSPEC thermal-management studies that extend the original MSc feedback-control work.

| Report | Scope |
|---|---|
| [V25 camera thermal homogenisation and sealed side-vent fan prototype](EXOhSPEC_V25_camera_thermal_homogenisation.md) | V24 motivation, selected Sunon fan, final v1.1 black-TPU geometry, airflow sealing, clamp design, fabrication status and staged thermal + optical validation plan. |
| [V19–V24 thermal diagnostic synthesis](../../results/thermal_diagnostics_v19_to_v24.md) | Recurring thermal signature, camera TEC heat-load experiments, replacement LK220, V23 controller/pump optimisation and V24 rotation observation. |

## Current working point

The operating point selected after V23/V23.2 is:

- LK220 target 22 °C
- Kp 2.5
- TI / TD 1.0 / 1.0
- PERIOD 2000 ms
- pump 75%, measured readout ~1.10 L/min
- camera TEC ON at −10 °C

V23/V23.2 were thermal-only experiments. The next scientifically useful comparison reintroduces dX/dY and OPL while keeping the thermal state fixed.

## Evidence rule

These reports distinguish measured thermal behaviour from proposed engineering changes. The V25 fan system is not treated as an improvement until the printed mount passes fit/vibration checks and matched fan-OFF / fan-ON data show a thermal benefit without detector or OPL degradation.
