# Experimental characterisation programme

The feedback controller was not developed from a single long experiment. Each module was first studied through a focused experiment that answered one specific question. The table below is the public research map; it describes the purpose and evidence without releasing the full laboratory recipe.

| Experiment | Question | Measured outcome | Design consequence |
|---|---|---|---|
| Glass-slip optical perturbation | Does a local optical-path disturbance appear clearly in the interferometric channel? | Abrupt OPL response and altered interference condition | Treat discontinuities as quality/recalibration events, not ordinary environmental drift. |
| OPL-environment co-variation | Which environmental quantities track OPL change? | Temperature, pressure and humidity trends can co-vary with OPL | Use environmental telemetry as model predictors and diagnostic context. |
| Four-region PT104 mapping | Is enclosure temperature spatially uniform? | Different channels can follow different thermal histories | Warm-up and model validation must consider gradients, not one sensor only. |
| TEC setpoint/step response | How fast does the thermal plant affect measured optical state? | Delayed, distributed response rather than instantaneous centroid correction | TEC is the coarse actuator; cadence and settling time matter. |
| AO direction and return tests | How does AO command translate into detector motion? | Directional response, cross-coupling and finite travel must be calibrated | Use bounded matrix-based fine correction and unloading logic. |
| MaxIm DL centroid validation | Are image-plane errors repeatable and sign-correct? | Reference-relative $dX$, $dY$ and radial error can be measured frame by frame | Validate reference and sign before allowing centroid data to drive AO. |
| Long-run hybrid feedback | Can TEC and AO recover from disturbed operation together? | Recovery can occur, but residence near zero depends on disturbance history, reference quality and AO range | Evaluate threshold residence, bias, recovery time and range use rather than a single final point. |

## Why this programme matters

Each test reduces a different uncertainty:

$$
\text{disturbance} \rightarrow \text{measurement validity} \rightarrow \text{model validity} \rightarrow \text{safe correction}.
$$

For example, it would be unsafe to tune AO from a centroid signal before validating its direction, or to tune the TEC from a single sensor before checking whether the enclosure has a thermal gradient. The component studies establish the assumptions needed by the hybrid controller.

## What is deliberately not released

The project does not publish exact experimental geometry, physical component locations, calibration constants, control thresholds, hardware communications, long-duration raw data, or full automation scripts. The public record communicates the scientific reasoning and validation sequence while retaining the operational implementation as private research material.