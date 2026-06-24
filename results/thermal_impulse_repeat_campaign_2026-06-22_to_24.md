# Local thermal-impulse component-sensitivity campaign: 22-24 June 2026

> **Status:** updated analysis with independent FITS validation.  
> **Purpose:** compare four accessible thermal-perturbation locations, identify where the optical path and detector image are most sensitive, and translate the evidence into hardware and control-system implications.

## Executive summary

This campaign used four nominally identical local thermal pulses. It is not a claim that one component has been uniquely proven as the root cause of all instability.

- Every location received a nominal **2.20 W for 70 s** electrical pulse, equivalent to **154 J**.
- **Grating A** produced the largest logger-recorded detector response: peak baseline-detrended |ΔY| = **0.888 px**.
- **Camera mount A** produced the largest optical-path response: peak baseline-detrended |ΔOPL| = **2.273 µm**.
- Independent seed-centred FITS replay supports real image motion at all four locations, but the agreement is strongest for **Camera mount B** and **Grating B**.
- The later Camera mount A centroid excursion is not reproduced as a clean rigid translation. Its large OPL response remains important, but the late detector result must be treated with caution.

The combined interpretation is therefore more specific than a simple ranking: **the camera-side thermal boundary is the strongest OPL-sensitivity candidate, while the grating remains an important detector-motion candidate.** The feedback loop can reduce disturbance-driven drift, but it cannot fully remove spatial temperature gradients, changing plant sensitivities, or a persistent local thermal load that is not directly measured.

---

## 1. Question addressed by this campaign

The experiment asked:

> When the same short thermal input is applied at different accessible regions, which location produces the largest and cleanest optical-path-length (OPL) response and detector-image response?

The detector observables are referenced to a baseline centroid:

$$
\Delta X(t)=X(t)-X_{\mathrm{ref}},
\qquad
\Delta Y(t)=Y(t)-Y_{\mathrm{ref}},
$$

with radial image displacement

$$
r(t)=\sqrt{\Delta X(t)^2+\Delta Y(t)^2}.
$$

The OPL observable is measured relative to its baseline:

$$
\Delta\mathrm{OPL}(t)=\mathrm{OPL}(t)-\mathrm{OPL}_{\mathrm{baseline}}(t).
$$

For response amplitudes, the pre-heater linear trend was removed first. This prevents an existing baseline drift from being counted as a heater response.

---

## 2. Applied thermal pulse and data coverage

The electrical input was held constant between locations:

$$
P=8.80\ \mathrm{V}\times0.25\ \mathrm{A}=2.20\ \mathrm{W},
$$

$$
E=P\Delta t=(2.20\ \mathrm{W})(70\ \mathrm{s})=154\ \mathrm{J}.
$$

Each run contained three stages:

1. a pre-heater baseline;
2. a 70 s heater pulse;
3. a passive post-heater observation period while centroid, OPL, TEC, ECU and BME channels continued to log.

| Location | Trial identifier | Accepted baseline frames | Accepted post-heater relaxation frames | Accepted-record span (min) |
|---|---|---:|---:|---:|
| Grating A | `GRATING_A_R01_20260622_133547` | 23 | 16 | 26.35 |
| Grating B | `GRATING_B_R01_20260622_144720` | 23 | 47 | 46.30 |
| Camera mount A | `CAMERA_MOUNT_RIGHT_A_R01_20260623_123149` | 23 | 47 | 46.26 |
| Camera mount B | `CAMERA_MOUNT_B_LEFT_R01_20260623_140332` | 23 | 11 | 23.29 |

### Definitions for this table

- **Accepted baseline frames:** valid science frames recorded before heater-on and used to estimate the pre-heater trend.
- **Accepted post-heater relaxation frames:** valid science frames recorded after heater-off. The two frames acquired during the 70 s pulse are not included in this count.
- **Accepted-record span:** elapsed time from the first accepted baseline frame to the last accepted science frame. It includes the baseline, pulse and relaxation stages. It is **not** a settling time.

Only two science frames occurred during the 70 s pulse. The experiment therefore resolves delayed response over minutes more reliably than the sub-minute heating transient.

### Temperature interpretation

The experiment controlled **electrical energy**, not the surface temperature of the heated component. ECU and BME channels describe the environmental context. They are not direct measurements of the heated component, camera mount, grating substrate or local thermal gradient.

---

## 3. Baseline condition before heating

The heater response must be read alongside the pre-heater baseline. A large baseline slope or scatter means that later motion can contain both thermal response and pre-existing drift.

| Location | Baseline ΔY slope (px min⁻¹) | Baseline ΔY scatter, σ (px) | Reading |
|---|---:|---:|---|
| Grating A | -0.0499 | 0.1208 | Baseline was already drifting/noisy; response trend is useful, but amplitude needs caution. |
| Grating B | +0.0136 | 0.0103 | Cleanest pre-heater centroid baseline. |
| Camera mount A | +0.0185 | 0.0196 | Quiet baseline before later environmental evolution. |
| Camera mount B | -0.0166 | 0.0584 | Moderate baseline scatter; the record is short. |

**Slope** is the least-squares change in ΔY per minute during the accepted baseline. **Scatter** is the standard deviation of the accepted baseline ΔY values.

---

## 4. Response metrics and what each quantity means

The following quantities are measured from heater-on until the last accepted science frame, after removing the pre-heater linear trend:

- **Peak |ΔY|:** the largest absolute detector Y displacement observed in the response record. It may occur during the pulse or later during relaxation; it is not automatically an immediate heater response.
- **Time to peak:** elapsed time from heater-on to the corresponding peak |ΔY|.
- **Peak radial response:** the largest value of \(r=\sqrt{\Delta X^2+\Delta Y^2}\) in the same response record.
- **Peak |ΔOPL|:** the largest absolute baseline-detrended OPL deviation in the same response record.
- **Terminal ΔY / terminal ΔOPL:** the values at the final accepted science frame. They show where the recorded sequence ended; they do not demonstrate recovery or a settling time.

| Location | Peak |ΔY| (px) | Time to |ΔY| peak (min after heater-on) | Peak radial response (px) | Peak |ΔOPL| (µm) | Terminal ΔY (px) | Terminal ΔOPL (µm) |
|---|---:|---:|---:|---:|---:|---:|
| Grating A | **0.888** | 11.43 | **1.047** | 0.142 | +0.888 | +0.134 |
| Grating B | 0.200 | 31.39 | 0.283 | 0.054 | +0.200 | -0.041 |
| Camera mount A | 0.713 | 20.42 | 0.941 | **2.273** | +0.233 | +2.273 |
| Camera mount B | 0.634 | **8.38** | 0.652 | 0.116 | +0.634 | -0.116 |

### Immediate reading

Grating A has the largest logger-recorded detector response, whereas Camera mount A has the largest OPL response. These are different observables and should not be collapsed into a single claim that one location is uniquely responsible for all instability.

---

## 5. Independent FITS validation of image motion

The logger centroid record was independently checked against the saved FITS frames.

For each trial, the validation used:

- the exact MaxIm centroid seed for that run;
- a 160 × 160 px crop centred on the seed;
- a median image from the first five baseline FITS frames as the reference;
- seed-centred phase correlation for every available science FITS frame;
- a Fourier synthetic-shift test to verify the registration sign and sub-pixel scale.

All available science frames were processed and no FITS frame was missing.

| Location | FITS frames checked | Self-test | All-post discrepancy RMS (px) | Typical all-post discrepancy (px) | Early-window discrepancy (px) | Interpretation |
|---|---:|---|---:|---:|---:|---|
| Grating A | 41 | pass | 0.183 | 0.182 | 0.205 | FITS supports the drift trend; the measured amplitude differs from MaxIm. |
| Grating B | 72 | pass | 0.098 | 0.081 | 0.098 | Strong independent agreement. |
| Camera mount A | 72 | pass | 0.389 | 0.333 | 0.217 | Later feature shape/intensity change likely affects rigid-shift comparison. |
| Camera mount B | 36 | pass | 0.075 | 0.067 | 0.049 | Strongest independent agreement. |

### Definitions for the validation metrics

- **All-post discrepancy RMS:** the root-mean-square radial difference between the MaxIm shift and the independent FITS shift for every accepted frame from heater-on to the final recorded point. RMS gives extra weight to occasional large disagreements.
- **Typical all-post discrepancy:** the median radial MaxIm-FITS difference over that same interval. It is the more representative everyday mismatch.
- **Early-window discrepancy:** the median radial MaxIm-FITS difference during the pulse plus the first five minutes after heater-off. This window best isolates the immediate thermal response from later relaxation and environmental evolution.

The FITS check changes the interpretation of the four locations:

- **Camera mount B** and **Grating B** provide the cleanest evidence that the logger trace corresponds to genuine rigid image translation.
- **Grating A** shows a genuine image-motion trend, but its exact amplitude remains method-dependent.
- **Camera mount A** retains the strongest OPL result, but its late centroid excursion should not be described as a fully validated rigid shift.

---

## 6. Early response versus the full recorded response

The **early-response window** is defined as the 70 s pulse plus the first five minutes after heater-off. The full response record includes every accepted non-baseline frame through the last recorded point.

| Location | MaxIm early peak |ΔY| (px) | FITS early peak |ΔY| (px) | MaxIm full-record peak |ΔY| (px) | FITS full-record peak |ΔY| (px) | Reading |
|---|---:|---:|---:|---:|---|
| Grating A | 0.460 | 0.717 | 0.888 | 1.170 | Strong grating-region response; amplitude depends on measurement method. |
| Grating B | 0.097 | 0.180 | 0.200 | 0.531 | Smaller logger response but independently validated image motion. |
| Camera mount A | 0.073 | 0.106 | 0.713 | 0.596 | Small early response; later record contains non-rigid or environmental behaviour. |
| Camera mount B | 0.495 | 0.375 | 0.634 | 0.512 | Fast and clean independently validated response. |

This distinction is important: the largest number anywhere in the full record is not necessarily the most direct response to the 70 s local pulse.

---

## 7. Environmental context

The values below are **post-heater spans**, defined as the maximum minus minimum accepted value after heater-on. A span is a range across the measurement record; it is not an average and it is not one selected point.

| Location | TEC span (°C) | ECU temperature span (°C) | BME temperature span (°C) | ECU/BME pressure span (hPa) | ECU/BME humidity span (%) |
|---|---:|---:|---:|---:|---:|
| Grating A | 0.013 | 0.035 | 0.060 | 0.12 / 0.07 | 0.93 / 2.51 |
| Grating B | 0.011 | 0.121 | 0.460 | 0.66 / 0.55 | 3.91 / 7.00 |
| Camera mount A | 0.034 | 0.562 | 1.060 | 0.34 / 0.38 | 7.80 / 20.96 |
| Camera mount B | 0.011 | 0.009 | 0.340 | 0.10 / 0.07 | 4.21 / 8.01 |

These channels provide context only. They do not directly give the temperature of the heated component, the detector mount, the grating substrate or the camera cooling interface.

### Descriptive correlations

The following zero-lag Pearson correlations show co-evolution, not causation or calibrated sensitivity coefficients.

| Location | r(ΔY, ΔOPL) | r(ΔY, BME ΔT) | r(ΔY, BME ΔP) | r(ΔY, BME ΔRH) |
|---|---:|---:|---:|---:|
| Grating A | +0.980 | -0.888 | +0.897 | +0.187 |
| Grating B | -0.512 | +0.830 | -0.739 | +0.432 |
| Camera mount A | -0.288 | -0.364 | +0.264 | -0.488 |
| Camera mount B | -0.852 | -0.887 | -0.979 | -0.981 |

---

## 8. Why a textbook PID settling curve is not the correct benchmark

A textbook PID step-response plot assumes a relatively simple single-input, single-output plant: one actuator, one dominant disturbance, one measured output, fixed dynamics and a short, repeatable delay.

EXOhSPEC does not behave like that. For a detector output such as ΔY, the practical plant is better treated as a **spatially distributed, delayed multiple-input/single-output system**. Relevant inputs include:

- the TEC setpoint and the local temperature where it is measured;
- local thermal gradients near the camera and grating;
- camera cooling or heat-rejection load;
- pressure, humidity and refractive-index change along the air path;
- optical-path-length evolution;
- AO position and remaining travel;
- external HVAC or room disturbances.

The measured ΔY is one output, but it is observed at the detector after these coupled processes and delays. A stable reading at one temperature sensor does not mean every optical component is at the same temperature. It means the controlled location is held within a local equilibrium band.

The appropriate control objective is therefore not an ideal flat textbook trace. It is to maximise time inside a defined detector-error band while rejecting ongoing disturbances and avoiding actuator saturation. A residual deadband or stepped response can remain when the plant has multi-minute thermal lags and spatial gradients.

---

## 9. What the earlier feedback experiments already demonstrate

The control loop should not be described as ineffective. Earlier Stage-2 experiments showed that control performance depends strongly on the current plant state and on whether the model is allowed to adapt.

- A fixed-prior run initially reached a stable 9.47 h plateau with RMS ΔY = **0.380 px** and **90.76%** of samples within 0.5 px, but later failed when the plant moved away from the assumed model.
- In the improved 22-24 April attended run, the system accumulated **21.73 h** within 0.5 px over the full run and **18.42 h** within 0.5 px in the trimmed feedback zone.
- A later V4 analysis achieved RMS radial error of **0.497 px**, with **58.1%** of samples within 0.5 px while using fewer controller actions than earlier runs.

The appropriate conclusion is that the feedback approach can work when the current operating state is identified and actuator authority is managed. The remaining limitation is not simply controller logic; it is the changing, spatially distributed thermal plant that the controller is being asked to stabilise.

A numerical statement such as “80-90% accurate” should not be inserted without defining the metric: for example, prediction \(R^2\), sign correctness, within-band agreement or achieved error reduction. This report therefore uses directly measured stability and validation metrics instead.

---

## 10. Hardware interpretation and immediate engineering implications

### Camera-side thermal boundary

The camera is not described here as a “leak.” Its cooling system is designed to keep the detector chip cold and improve signal-to-noise ratio. However, a continuously cooled camera is also a persistent thermal boundary: heat is extracted at the detector and rejected elsewhere in the camera system. That process can maintain a local temperature gradient in the camera-side structure and nearby air.

The present campaign makes the camera side an engineering priority because Camera mount A produced the largest OPL excursion, **2.273 µm**. This does not prove that the camera cooling system alone causes the observed drift; no direct camera-mount temperature or heat-flux measurement was made. It does identify the camera-side thermal environment as the first hardware mechanism to characterise and mitigate.

### Grating-side sensitivity

Grating A produced the largest logger-recorded detector response and showed a FITS-supported trend. The grating and its mount therefore remain a second high-priority thermal-sensitivity region. Camera-side mitigation alone should not be assumed to remove all detector drift.

### Path-length proximity

The mean IDS-reported OPL should be calculated from the raw log before a numerical path length is added to this report. The reported OPL must also be kept distinct from a mechanical camera-to-component separation unless the optical geometry confirms they represent the same physical path and pass count.

### Practical mitigation direction

The immediate design question is not whether to abandon feedback, but how to reduce the disturbance that feedback must reject. Candidate hardware actions include:

1. characterising the camera-side thermal gradient under the intended detector/chiller operating point;
2. reducing thermal coupling between the camera cooling boundary and the nearby optical path, for example through local insulation, enclosure refinement or altered airflow management;
3. characterising grating-mount thermal sensitivity with the same seed-centred FITS method;
4. retaining adaptive model identification, TEC-primary correction and AO fine trim after the local thermal load has been reduced.

A controller can compensate a disturbance only after it is measured and after the delayed actuator has authority. Hardware mitigation should reduce the size and rate of the disturbance so that the existing control architecture can spend more time inside the desired detector-error band.

---

## 11. Conclusion

This campaign identifies two important hardware directions rather than one final culprit:

- **Camera mount A:** strongest OPL-sensitivity candidate, with a 2.273 µm full-record OPL response and evidence of substantial camera-side environmental evolution.
- **Grating A:** largest logger-recorded image-motion candidate, with a FITS-supported drift trend but method-dependent amplitude.

Camera mount B and Grating B provide the strongest independent agreement between MaxIm and FITS image translation. Their role is important because they validate the measurement pathway used to distinguish genuine detector motion from changes in feature brightness or shape.

The feedback loop remains useful and has demonstrated stable operation in previous runs. The central limitation is that EXOhSPEC is a distributed thermal-optical system with delayed, changing sensitivities. Reducing the camera-side and grating-side thermal disturbances at hardware level should allow the adaptive TEC-primary and AO-fine-trim control strategy to operate closer to its demonstrated capability.

## Public boundary

This public report contains derived response metrics, validation statistics and engineering interpretation. It intentionally omits raw telemetry, FITS files, component geometry, sensor positions, optical alignment, heater placement details, hardware communications and operational controller settings.
