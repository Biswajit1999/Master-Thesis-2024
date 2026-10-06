# EXOhSPEC thermal diagnostics — V19 through V24

## Why this sequence matters

After the long-run and phase-correlation work, the dominant research question shifted from “can the controller reduce image drift?” to “what physical thermal pathway produces the remaining structured motion?”

V19–V24 form one diagnostic chain. Each experiment removes or changes a different part of the thermal system. The correct conclusion is a coupled thermal/environmental pathway, not a single proven root cause.

## V19 — passive periodicity

V19 was a passive five-hour investigation with active correction disabled. It contained approximately **301 science frames** and **3,612 LK220 measurements**.

Reported full-run metrics included:

- dX RMS = 0.0759 px
- dY RMS = 0.5365 px
- dY σ = 0.3024 px
- dY peak-to-peak = 1.28 px
- OPL peak-to-peak = 0.335 µm

A common approximately **33.4 min** component appeared through the room/AC probe, LK220 behaviour, camera temperature, OPL and dY. With only a limited number of cycles in a five-hour run, this is best treated as a repeatable diagnostic signature rather than a uniquely identified transfer function.

## V20 and V21 — camera TEC ON/OFF comparison with the old LK220

The camera TEC state was changed while the old LK220 remained in operation. The OFF phase included a large thermal transition, so whole-phase statistics cannot be interpreted as a stationary comparison.

The experiment established an important physical point: when the detector TEC is switched OFF, the detector warms but the external camera body can cool because the Peltier/electrical heat load on the hot side is removed.

That is a heat-load observation, not a recommendation to operate the detector without cooling.

## V22 — replacement LK220

V22 repeated the two-hour ON / two-hour OFF intervention with the replacement LK220.

During the camera-TEC-ON phase:

| Metric | V22 ON |
|---|---:|
| dX RMS | 0.0399 px |
| dY RMS | 0.2125 px |
| dY σ | 0.2115 px |
| dY p-p | 0.78 px |
| within ±0.5 px | 100% |
| OPL p-p | 0.254 µm |
| logged LK220 temperature σ | 0.070 °C |

The replacement configuration was clearly stable during the ON phase, but it was not operated under the same target/flow conditions as the old unit. V22 used a 20 °C target and ~0.50 L/min whereas the earlier old-LK220 tests used approximately 22 °C and 0.75 L/min. It is therefore not a controlled hardware-only A/B test.

When the camera TEC was switched OFF:

- LK220 mean current changed **4.17 → 3.39 A**
- LK220 mean duty changed **35.08 → 30.27%**
- the detector image underwent a large thermal/optical transition

The external cooling system therefore works harder when the camera TEC is ON. The camera is a significant heat source, but the OFF transition is too disruptive to be a stability solution.

## V23 — controller tuning at a matched 22 °C thermal campaign

V23 removed optical/IDS measurements so that the thermal chain could be studied directly.

### Camera TEC intervention

| Condition | Left [°C] | Right [°C] | Rear [°C] | Outlet σ [°C] | Mean inlet−outlet [°C] | LK current [A] |
|---|---:|---:|---:|---:|---:|---:|
| TEC ON | 26.090 | 25.043 | 23.941 | 0.0610 | 0.3095 | 2.749 |
| TEC OFF | 23.598 | 23.392 | 22.639 | 0.0615 | 0.1143 | 2.065 |

The external camera surfaces and coolant heat pickup fell substantially when the camera TEC was removed, while outlet variability stayed almost unchanged. This separates **heat load** from the **repeating regulation/environmental variability**.

### Kp sweep

| Kp | Outlet σ [°C] | RMS [°C] | p-p [°C] |
|---:|---:|---:|---:|
| 1.0 | 0.1100 | 0.1122 | 0.37 |
| 1.5 | 0.0705 | 0.0723 | 0.29 |
| 2.0 | 0.0511 | 0.0521 | 0.27 |
| **2.5** | **0.0493** | **0.0495** | **0.22** |
| 2.0 repeat | 0.0515 | 0.0526 | 0.25 |

Kp = 2.5 was the strongest completed tested setting even though its block experienced substantial ambient variation. The experiment was sequential, so it should be called the best tested candidate rather than a universal optimum.

### PERIOD sweep

| PERIOD | Outlet σ [°C] | RMS [°C] | p-p [°C] | Status |
|---|---:|---:|---:|---|
| **2000 ms** | **0.0479** | **0.0489** | **0.24** | best completed |
| 3000 ms | 0.0635 | 0.0657 | 0.33 | worse |
| 5000 ms | — | — | — | incomplete, ~2 min |

## V23.2 — pump/flow trade-off

With Kp = 2.5, PERIOD = 2000 ms and camera TEC ON at −10 °C:

| Pump | Flow [L/min] | Left [°C] | Right [°C] | Rear [°C] | Mean coolant ΔT [°C] | Current [A] | Duty [%] |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 60% | 0.889 | 25.579 | 24.739 | 23.615 | 0.2524 | 3.332 | 29.5 |
| **75%** | **1.100** | **25.130** | **24.418** | **23.325** | **0.2018** | **3.833** | **32.8** |
| 80% | 1.200 | 25.027 | 24.375 | 23.247 | 0.1952 | 4.244 | 35.2 |

The 80% condition gave the lowest measured surface temperatures, but the improvement from 75% was small compared with the additional chiller burden. The current balanced operating choice is therefore **75%**, not because it minimises every metric, but because it is the compromise selected from the tested sequence.

The high-cadence flow readout is quantised, so small differences in reported L/min are not interpreted more precisely than the sensor allows.

V23/V23.2 intentionally omitted dX/dY and OPL. They are thermal optimisation experiments only.

## V24 — 180° camera rotation and return to optical monitoring

V24 restored detector/OPL monitoring while the camera was reoriented by 180°. The monitoring script retained raw detector coordinates and explicit orientation-mapped columns. AO was not commanded.

The early approximately 28-minute interval showed:

- dY reaching about **+0.64 px**
- OPL change of about **−0.32 µm**
- detector temperature remaining close to −10 °C
- cooling-loop temperature remaining close to the controlled state
- persistent differences between external camera regions

The observation motivates a camera-body thermal-gradient experiment, but it is not a causal proof. Mechanical rotation, settling, room forcing and thermal redistribution were not independently separated.

## Working configuration after V23/V23.2

The configuration carried into the next optical validation is:

- LK220 target 22 °C
- Kp 2.5
- TI / TD 1.0 / 1.0
- PERIOD 2000 ms
- pump 75%, measured readout ~1.10 L/min
- camera TEC ON at −10 °C

## Why V25 follows

V25 asks one direct question that V19–V24 could not answer:

> If the camera-body temperature field is made more spatially uniform with gentle side-vent airflow, do the thermal gradient, detector motion and OPL behaviour improve without introducing fan vibration?

The design and test plan are documented in [the V25 thermal-homogenisation report](../reports/thermal-management/EXOhSPEC_V25_camera_thermal_homogenisation.md).
