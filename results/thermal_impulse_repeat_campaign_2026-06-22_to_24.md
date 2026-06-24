# Local thermal-impulse repeat campaign: 22-24 June 2026

> **Status:** preliminary component-sensitivity study.  
> **Campaign window:** 22-24 June 2026. The four trials analysed here were acquired on 22-23 June; 24 June was used for repeat-campaign consolidation and analysis.  
> **Purpose:** identify which accessible instrument regions show the most reproducible local thermal sensitivity before using them to inform a more targeted environmental-stability model.

![Thermal-impulse repeat scorecard](../figures/thermal_impulse_june_2026/thermal_impulse_repeat_scorecard.svg)

## Abstract

A repeat local-heating campaign was performed at two grating locations and two camera-mount locations. Every trial used the same nominal thermal impulse, $P = 2.20\ \mathrm{W}$ for $70\ \mathrm{s}$, equivalent to $154\ \mathrm{J}$, after a nominal 15-minute baseline. Detector-centroid motion, interferometric optical path length (OPL), TEC/ECU/BME temperature, pressure and humidity were recorded concurrently.

All four locations produced a measurable detector-plane response. The strongest observed centroid response occurred at **Grating A** ($|\Delta Y|_{\max}=0.888\ \mathrm{px}$), whereas **Camera mount A** produced the largest OPL excursion ($|\Delta\mathrm{OPL}|_{\max}=2.273\ \mu\mathrm{m}$). **Camera mount B** produced the fastest observed centroid response ($|\Delta Y|_{\max}=0.634\ \mathrm{px}$ at 8.38 min after heater-on), but its relaxation interval was incomplete. **Grating B** was the weakest response location ($|\Delta Y|_{\max}=0.200\ \mathrm{px}$) and is retained as a useful lower-sensitivity comparator.

The experiment identifies the grating-A and camera-mount-A regions as priority candidates for controlled repetition. It does **not** yet establish that the camera is the unique dominant instability source: camera-mount trials were more strongly confounded by environmental evolution, while Grating A produced the largest measured image-plane response under comparatively quiet recorded temperature and pressure conditions.

## 1. Experimental objective

The experiment was designed as a local impulse-response test rather than an end-to-end feedback run. The question was:

> When the same short thermal input is applied at different accessible regions, which location produces the largest and cleanest change in OPL and detector centroid?

The primary observables were the reference-relative centroid motion,

$$
\Delta X(t)=X(t)-X_{\mathrm{ref}},
\qquad
\Delta Y(t)=Y(t)-Y_{\mathrm{ref}},
$$

and radial image-plane response,

$$
r(t)=\sqrt{\Delta X(t)^2+\Delta Y(t)^2}.
$$

The interferometric observable was the baseline-relative optical-path response,

$$
\Delta\mathrm{OPL}(t)=\mathrm{OPL}(t)-\mathrm{OPL}_{\mathrm{baseline}}(t).
$$

A linear trend fitted to the pre-pulse baseline was removed before calculating response amplitudes. This avoids mistaking a pre-existing drift for a heating response.

## 2. Protocol

Each run used the same nominal pulse:

$$
E_{\mathrm{pulse}} = P\Delta t = (2.20\ \mathrm{W})(70\ \mathrm{s}) = 154\ \mathrm{J}.
$$

The common sequence was:

1. nominal 15-minute baseline;
2. 70-second local heating pulse;
3. passive relaxation while continuing centroid, OPL and environmental logging.

Four locations were tested:

| Location | Trial identifier | Acquisition date | Usable duration |
|---|---|---|---:|
| Grating A | `GRATING_A_R01_20260622_133547` | 22 June 2026 | 26.35 min |
| Grating B | `GRATING_B_R01_20260622_144720` | 22 June 2026 | 46.30 min |
| Camera mount A | `CAMERA_MOUNT_RIGHT_A_R01_20260623_123149` | 23 June 2026 | 46.26 min |
| Camera mount B | `CAMERA_MOUNT_B_LEFT_R01_20260623_140332` | 23 June 2026 | 23.29 min |

The analysis uses only the logger CSV channels. FITS-frame centroid remeasurement is a required second validation stage and is not claimed here.

## 3. Results

### 3.1 Four-location comparison

| Location | Peak $|\Delta Y|$ (px) | Time to $|\Delta Y|$ peak (min) | Peak radial response (px) | Peak $|\Delta\mathrm{OPL}|$ ($\mu$m) | Interpretation |
|---|---:|---:|---:|---:|---|
| Grating A | 0.888 | 11.43 | 1.047 | 0.142 | Largest observed image-plane response; response still rising at run end. |
| Grating B | 0.200 | 31.39 | 0.283 | 0.054 | Weakest response; useful low-sensitivity comparator. |
| Camera mount A | 0.713 | 20.42 | 0.941 | **2.273** | Largest OPL response; environmental evolution was also substantial. |
| Camera mount B | 0.634 | 8.38 | 0.652 | 0.116 | Fast centroid response; run ended before recovery could be measured. |

The two dashed protocol markers in the analysis figures identify heater-on and the nominal end of the 70-second pulse. The short pulse was sampled by only two science frames, so these data constrain the delayed thermal response rather than the sub-minute onset dynamics.

### 3.2 Environmental context

| Location | TEC span (C) | ECU temperature span (C) | BME temperature span (C) | ECU/BME pressure span (hPa) | ECU/BME RH span (%) |
|---|---:|---:|---:|---:|---:|
| Grating A | 0.013 | 0.035 | 0.060 | 0.12 / 0.07 | 0.93 / 2.51 |
| Grating B | 0.011 | 0.121 | 0.460 | 0.66 / 0.55 | 3.91 / 7.00 |
| Camera mount A | 0.034 | 0.562 | 1.060 | 0.34 / 0.38 | 7.80 / 20.96 |
| Camera mount B | 0.011 | 0.009 | 0.340 | 0.10 / 0.07 | 4.21 / 8.01 |

The environmental context is essential. A local-heating result cannot be attributed entirely to a component when pressure, humidity or local sensor temperature evolve strongly over the same interval.

### 3.3 Location-specific reading

#### Grating A - high-priority centroid-sensitivity candidate

Grating A produced the largest observed $\Delta Y$ response and a coherent rise in OPL after the heating interval. Its recorded post-pulse TEC, ECU temperature, BME temperature and pressure spans were comparatively small. The centroid-OPL diagnostic was strongly positive across the analysed trace, but this should be treated as co-evolution over time rather than a causal transfer coefficient.

This is the strongest current candidate for a **repeat under a longer relaxation window**, because its image-plane response is large while the recorded environmental background was less variable than in the camera-mount-A trial. The run cannot yet provide a thermal time constant because its response was still increasing when logging stopped.

#### Grating B - low-sensitivity comparator

Grating B showed the smallest centroid and OPL response. However, its later relaxation interval coincided with appreciable pressure, humidity and BME-temperature evolution. It should therefore be retained as a **comparison location**, not declared thermally insensitive on the basis of one run.

#### Camera mount A - high-priority OPL-sensitivity candidate

Camera mount A generated the largest observed OPL response, rising to $2.273\ \mu\mathrm{m}$, with a substantial detector-plane response. This makes the camera-mount region a high-priority candidate for further study.

However, this trial also had the largest environmental spans: BME temperature changed by $1.06\ ^\circ\mathrm{C}$, BME relative humidity by $20.96\%$, and pressure changed by several tenths of a hPa. The response cannot therefore be assigned uniquely to the local heater or to the camera mount itself. The correct conclusion is that this region is **strongly sensitive during the tested thermal/environmental state**, not that it has been proven to be the unique cause of drift.

#### Camera mount B - rapid but incomplete candidate

Camera mount B produced a rapid positive $\Delta Y$ rise, reaching $0.634\ \mathrm{px}$ 8.38 min after heater-on, while OPL moved negatively by approximately $0.116\ \mu\mathrm{m}$. This opposite-sign behaviour is informative but not yet interpretable as a stable local transfer function because the run ended after only 23.29 min and the environmental humidity trajectory was substantial.

Camera mount B should be repeated with a longer relaxation period and a locally meaningful temperature measurement before assigning a mechanism.

## 4. What the experiment establishes

The repeat campaign establishes a **component-sensitivity map**, not a final root-cause diagnosis.

1. A common 154 J pulse produces measurably different OPL and centroid behaviour at different locations.
2. The grating-A location is a strong image-plane sensitivity candidate.
3. The camera-mount-A location is a strong OPL sensitivity candidate.
4. Camera-mount-B shows a faster centroid response but requires a complete relaxation observation.
5. Grating B provides a useful lower-amplitude comparison case.

The data therefore support prioritising **Grating A and Camera mount A** for controlled repeats. They do not yet support the statement that the camera is the sole or dominant culprit.

## 5. Data-quality and interpretation limits

### 5.1 Incomplete recovery windows

No trial demonstrated a complete return to the strict post-pulse stability criterion in the available record. The reported peaks are therefore lower bounds for trials that ended while still evolving, and no robust settling-time estimate is available.

### 5.2 Environmental confounding

The environmental channels evolved differently across trials. Camera mount A and B were especially affected by temperature and humidity changes. Zero-lag correlations between $\Delta Y$, OPL and environmental variables are descriptive diagnostics only; they do not establish causality because the variables can have different lags and common time trends.

### 5.3 Independent image-registration validation

The logged phase-correlation channel did not consistently agree with the centroid response. The median centroid-to-phase-correlation discrepancy was approximately $0.96\ \mathrm{px}$ for Camera mount A, $0.40\ \mathrm{px}$ for Grating B and $0.24\ \mathrm{px}$ for Camera mount B. Grating-A phase-correlation statistics were unavailable in the export. This requires raw FITS-frame validation before interpreting each centroid excursion as rigid spectrum translation.

### 5.4 Camera-temperature trace

The camera-temperature channel contained a large pre-trial settling signature in at least one trial. The camera-temperature trace should be treated as a health/context channel until its timing, source and calibration relative to the local mount temperature are independently verified.

## 6. Recommended repeat design

The next experiment should aim to separate local thermal sensitivity from ambient environmental drift:

1. repeat Grating A and Camera mount A at least two more times each, ideally in alternating order;
2. extend relaxation until the centroid response remains inside a pre-defined band for at least three consecutive accepted frames;
3. retain the same pulse energy initially, so the response comparison stays interpretable;
4. record a local temperature channel physically representative of the heated region, in addition to enclosure/environment sensors;
5. keep a matched unheated control interval or reference sequence under the same ambient conditions;
6. use the saved FITS frames to compare the MaxIm DL centroid trace with an independent phase-correlation or centroid measurement;
7. report response amplitude, time-to-peak, recovery time, OPL change, environmental span and uncertainty for every replicate.

## 7. Engineering conclusion

The 22-24 June repeat campaign provides evidence that local thermal perturbations can map into both interferometric OPL change and detector-plane motion. The present data identify two distinct priorities:

$$
\text{Grating A} \rightarrow \text{strongest centroid sensitivity},
$$

$$
\text{Camera mount A} \rightarrow \text{strongest OPL sensitivity}.
$$

The next scientific step is a controlled replicate campaign designed around these two locations, with complete relaxation, local temperature verification and raw-image validation. That is the level required before using a component-specific sensitivity coefficient in the hybrid feedback model.

## Figure availability

The embedded scorecard is a public data-derived summary. The detailed time-series figures were generated directly from the campaign CSV analysis and are retained with the private experiment archive while the raw-FITS validation and controlled repeats are completed.