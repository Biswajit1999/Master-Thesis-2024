# EXOhSPEC Master-Thesis Research Continuation — 2026

**Author:** Biswajit Jana  
**Original MSc project:** Closed-Loop Feedback Control System for the Exoplanet High-Resolution Radial-Velocity Spectrograph (EXOhSPEC) Development  
**University of Hertfordshire**  
**Supervisors:** Prof Hugh R. A. Jones and Prof William E. Martin  
**Research-continuation status:** updated through V24; V25 hardware in fabrication, 6 October 2026

## 1. Purpose of this document

This document is a continuation of the 2024 MSc thesis, not a replacement for the submitted and examined dissertation. The original thesis established the environmental-stability problem, the sensor/actuator architecture and the first closed-loop experiments. The work continued afterwards through increasingly long feedback runs, active-optics recalibration, phase-correlation tracking, thermal diagnosis of the camera/chiller chain and, most recently, a removable airflow prototype.

The purpose here is to keep one technically defensible story from the original thesis to the present experiment.

## 2. Starting point from the MSc thesis

The central physical problem is that a high-resolution spectrograph does not see environmental change through one channel. Temperature, pressure and humidity influence refractive index, optical-path length, mechanics and the detector image. The control task is therefore disturbance rejection rather than a textbook single-step PID response.

The thesis work established:

- synchronised environmental monitoring;
- IDS3010 optical-path-length measurement;
- detector centroid tracking through MaxIm DL;
- TEC actuation for slow thermal correction;
- active-optics actuation for image-plane correction;
- Python-based logging, synchronisation, analysis and feedback logic.

Configuration-specific measurements gave approximate OPL responses near 0.4 µm/hPa and 6 µm/°C. An early long thermal-control experiment achieved temperature standard deviation of about 2.47 mK over 44.5 h, with 17.4 mK peak-to-peak variation while the external temperature moved by about 3.2 °C. These values characterise the tested configuration; they are not universal material constants.

## 3. From threshold correction to hybrid control

The control architecture evolved toward a hierarchy with two actuator time-scales.

The TEC is the coarse, slow actuator. It is intended to absorb persistent drift and keep the system near the operating point. The active-optics stage is the faster fine actuator. It is intended to correct small residual detector motion without being used as an unlimited drift integrator.

The later V6b method also introduced:

- warm-up and run-specific identification;
- rolling environmental/OPL prediction;
- bounded TEC commands;
- phase-dependent AO triggers;
- persistence gates;
- cumulative AO travel monitoring;
- thermal unloading before the fine actuator reaches its travel limit;
- explicit reference management.

The portable decision model is documented in [methods/V6B_HYBRID_CONTROLLER.md](../methods/V6B_HYBRID_CONTROLLER.md).

## 4. V17 — long-duration endurance rather than a short best window

V17 was the major endurance validation of the Stage-2 hybrid architecture.

After warm-up, the settled feedback population contained **4,761 frames over 88.59 h**. The reported settled metrics were:

| Metric | V17 |
|---|---:|
| dX RMS | 0.0594 px |
| dY RMS | 0.1631 px |
| frames inside ±0.5 px | 100% |
| settled duration | 88.59 h |

The result is important because it demonstrates duration, not because it is numerically best in every axis. V14 had lower dY RMS (0.1272 px) over a much shorter 28.11 h settled interval, while V17 had lower dX RMS and maintained the broad stability band for about 3.2 times longer. Matched sliding windows showed that the axis-specific difference persisted rather than being explained only by run length.

The V17 report also showed that 3σ clipping barely changed dY RMS, so the broader dY tail was a recurring feature of the signal rather than a few removable outliers.

## 5. V18.1 and V18.2 — improve the measurement as well as the controller

V18.1 moved detector tracking to a tuned phase-correlation workflow and accelerated the transition to active AO correction. Over 3.98 h of feedback it reported:

- dX RMS = **0.0564 px**
- dY RMS = **0.1073 px**
- radial RMS = **0.1212 px**

V18.2 then changed three things: a wider multi-line ThAr ROI combined multiple detected lines, AO no longer proactively rewound toward its centre, and the four-channel PT104 logger was read synchronously with each frame.

Over another 3.98 h feedback interval V18.2 reported:

- dX RMS = **0.0373 px**
- dY RMS = **0.0990 px**
- radial RMS = **0.1058 px**
- maximum cumulative AO offset = **274 / 1024 steps**

The AO absorb/unload mechanism was not exercised in that run because the cumulative offset never crossed the intended engagement region. It therefore remained a design feature awaiting a more demanding sustained drift.

These detector-plane values are not converted into a claim of calibrated stellar radial-velocity precision. The repository treats pixel stability, wavelength calibration and end-to-end RV precision as different measurements.

## 6. V19–V21 — the limiting question becomes thermal diagnosis

V19 was deliberately passive: active correction was disabled so that the natural instrument response could be examined. The five-hour run contained 301 science frames and 3,612 LK220 measurements. A common approximately **33.4 min** component appeared through the room/AC probe, LK220 behaviour, camera temperatures, OPL and dY.

That observation changed the next research question. Instead of asking only which feedback gain produces the smallest detector error, the programme began testing where the repeating thermal forcing enters the physical camera/cooling chain.

The evidence did not justify naming the LK220 as a unique root cause. HVAC forcing, chiller response, the camera TEC heat load, coolant transport and the camera-body gradient remained coupled.

## 7. V22 — replacement LK220 and a direct camera-TEC intervention

V22 used the replacement LK220 in a four-hour monitor-only experiment: two hours with the camera TEC ON at −10 °C followed by two hours with the camera TEC OFF.

During the TEC-ON phase:

- dX RMS = **0.0399 px**
- dY RMS = **0.2125 px**
- 100% of frames were inside ±0.5 px in dY
- OPL peak-to-peak = **0.254 µm**
- logged LK220 temperature sigma = **0.070 °C**

These values were better than the earlier V20 TEC-ON run, but V22 used a 20 °C target and ~0.50 L/min flow whereas V20 used 22 °C and ~0.75 L/min. The result therefore supports improved operation in the V22 configuration; it is not a clean old-versus-new chiller A/B measurement.

Switching the camera TEC OFF produced the more important physical result. The detector warmed toward room temperature, while the external camera body cooled and the LK220 load fell:

- LK220 current: **4.17 → 3.39 A**
- LK220 duty: **35.08 → 30.27%**

At the same time the detector image underwent a large thermal/optical transition. This establishes the camera TEC as a substantial heat load, but also shows why simply turning it off is not a viable stability solution.

## 8. V23 — separate heat load from controller regulation

V23 deliberately removed optical/IDS telemetry and focused on the thermal plant.

The camera-TEC intervention was repeated under the same 22 °C thermal campaign. With the camera TEC ON, the PT104 Left/Right/Rear surface means were approximately 26.090 / 25.043 / 23.941 °C. With it OFF they fell to 23.598 / 23.392 / 22.639 °C.

The coolant temperature rise through the camera reduced from about **0.3095 °C** to **0.1143 °C**, and LK220 current fell from 2.749 A to 2.065 A. However, outlet-temperature sigma was almost unchanged, **0.0610 → 0.0615 °C**.

The interpretation is therefore narrower than “the camera caused the oscillation”: the camera TEC is clearly a major steady heat load, but removing that heat load did not remove the repeating outlet variability.

### Controller sweep

The completed proportional-gain sweep gave:

| Kp | Outlet σ [°C] | RMS error [°C] | p-p [°C] |
|---:|---:|---:|---:|
| 1.0 | 0.1100 | 0.1122 | 0.37 |
| 1.5 | 0.0705 | 0.0723 | 0.29 |
| 2.0 | 0.0511 | 0.0521 | 0.27 |
| **2.5** | **0.0493** | **0.0495** | **0.22** |
| 2.0 repeat | 0.0515 | 0.0526 | 0.25 |

Kp = 2.5 is the strongest completed setting in this sequence, not a universal optimum.

For PERIOD, 2000 ms remained preferable to 3000 ms:

| PERIOD | Outlet σ [°C] | RMS [°C] | p-p [°C] |
|---|---:|---:|---:|
| **2000 ms** | **0.0479** | **0.0489** | **0.24** |
| 3000 ms | 0.0635 | 0.0657 | 0.33 |
| 5000 ms | incomplete | incomplete | incomplete |

The 5000 ms block lasted only about two minutes after a serial readback interruption and is not used as a performance result.

## 9. V23.2 — coolant-flow trade-off

V23.2 held Kp = 2.5, PERIOD = 2000 ms and camera TEC ON at −10 °C while comparing pump settings.

| Pump | Flow readout [L/min] | Left [°C] | Right [°C] | Rear [°C] | LK current [A] | Duty [%] |
|---:|---:|---:|---:|---:|---:|---:|
| 60% | 0.889 | 25.579 | 24.739 | 23.615 | 3.332 | 29.5 |
| **75%** | **1.100** | **25.130** | **24.418** | **23.325** | **3.833** | **32.8** |
| 80% | 1.200 | 25.027 | 24.375 | 23.247 | 4.244 | 35.2 |

Higher pump drive cooled all three camera surfaces and reduced the coolant temperature rise, but increased LK220 current, duty and heat-sink temperature. The 75% condition captures most of the 80% cooling benefit with less chiller burden and is therefore the current balanced default.

The flow readout is quantised at roughly 0.1 L/min at the higher settings, so small differences should not be over-interpreted.

No dX/dY or OPL data were acquired in V23/V23.2. These runs establish a thermal operating point only.

## 10. V24 — reintroducing the optical observables

V24 returned to passive optical monitoring while the camera was mechanically reoriented by 180°. The acquisition script retained raw detector coordinates and added explicit sign-mapped columns for comparison with the prior orientation; AO was not used as a corrective actuator.

The early post-rotation observation is the key motivation for the next phase. Over approximately the first 28 minutes:

- dY reached about **+0.64 px**
- OPL changed by about **−0.32 µm**
- the detector remained close to its −10 °C operating point
- the cooling loop remained close to the controlled temperature

At the same time the external camera regions did not behave as one isothermal body.

This does not prove that the camera-body gradient caused the optical drift. Camera rotation, mechanical settling, environmental forcing and thermal redistribution were not independently isolated. It does justify testing the gradient directly.

## 11. V25 — a physical airflow hypothesis

V25 is the bridge from diagnosis back to intervention.

The experiment asks whether a small amount of low-vibration forced airflow through the two opposing camera side vents can reduce the spatial camera-body temperature difference without adding measurable detector or OPL jitter.

The selected fan is the Sunon MF30100V3-1000U-A99:

- 30 × 30 × 10 mm
- 5 V
- 45 mA nominal
- 0.23 W
- 6000 rpm
- 2.5 CFM
- 10.2 dBA
- Vapo / MagLev bearing

Two fans have been ordered. The left side is intake and the right side is exhaust.

The current v1.1 mount is a removable, one-piece **black TPU ~95A** part with a sealed-side plenum concept. It uses the nominal Ø90 mm / R45 camera body, a 40 mm axial mount width, 54 mm curved span, 36 × 49 mm internal chamber, Ø28 mm fan throat, ~3.2 mm centre plenum and 24 mm fan-hole pitch. M3 nylon pilot holes are nominally Ø2.85 mm. A 1 mm side skirt reduces bypass around the plenum while keeping the camera-facing chamber open over the measured vent.

The fan mount has been submitted for 3D printing. This is still a prototype. No thermal or optical improvement is claimed until the physical fit and powered tests are complete.

## 12. Current operating point and next experiment

The current thermal operating point carried forward from V23/V23.2 is:

- LK220 target: 22 °C
- Kp: 2.5
- TI / TD: 1.0 / 1.0
- PERIOD: 2000 ms
- pump: 75%
- measured flow readout: ~1.10 L/min
- camera TEC: ON at −10 °C

The V25 validation sequence should be:

1. fit one printed mount with fans OFF;
2. verify vent centring, clamp contact and no interference;
3. record mount-only thermal + detector + OPL baseline;
4. test one fan at a time;
5. test left-intake + right-exhaust together;
6. compare camera-surface spread, dX, dY and OPL using matched windows;
7. reject the configuration if fan vibration or a new periodic optical signature appears.

The success criterion is not a lower camera temperature by itself. Success requires a smaller spatial thermal gradient with equal or better detector and OPL stability.

## 13. Engineering conclusion

The research has moved through three distinct questions:

**Can EXOhSPEC be stabilised?**  
The long feedback experiments show meaningful sub-pixel disturbance rejection over stated intervals.

**Why is the residual not a perfect zero-centred lock?**  
The later work identified reference bias, finite AO range, run-dependent response, environmental forcing and structured thermal behaviour as separate limitations.

**What physical intervention should be tested next?**  
The V19–V24 chain now justifies a direct camera-body thermal-homogenisation test. V25 is that test.

The present evidence supports a coupled thermal/environmental interpretation. It does not yet support a single-component root-cause claim.

## 14. Reproducibility and provenance

The public repository preserves selected code, methods, figures, reports and a searchable research-record archive. The archive should be read chronologically: later calibration and diagnostic work can supersede earlier interpretation.

Python is the dominant language for acquisition, synchronisation, feedback, analysis and plotting. OpenSCAD is used for the current mechanical prototype. Instrument/vendor interfaces include MaxIm DL, IDS3010, PT104/BME sensing, Meerstetter TEC control, LK220 telemetry and InfluxDB/Grafana monitoring.

Operational device details, credentials, raw telemetry and unpublished laboratory configuration remain outside the public repository.
