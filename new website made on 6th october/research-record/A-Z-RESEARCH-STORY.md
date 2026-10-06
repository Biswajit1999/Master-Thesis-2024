# EXOhSPEC: A–Z research storyline, 2023–2026

## A. Aim

The programme asks how environmental change propagates through a high-resolution laboratory spectrograph and whether thermal and active-optics feedback can reduce optical-path and detector-plane drift.

## B. Baseline and instrument context

The 2023 initial plan and 2024 MSc work established the optical, thermal and software context. The data path links detector images and MaxIm DL tracking with IDS3010 interferometric OPL, environmental telemetry, TEC state and active-optics commands.

## C. Characterisation before control

Individual experiments characterised pressure, temperature and humidity response, local thermal sensors, TEC behaviour and AO displacement. Approximate empirical OPL responses of 0.4 µm/hPa and 6 µm/°C are configuration-specific indicators rather than universal constants.

## D. Feedback architecture

The controller evolved from direct threshold correction toward a TEC-primary hybrid structure. Slow or persistent drift is assigned to the TEC loop; the AO unit provides bounded residual correction. Cumulative AO travel is monitored so that slow offsets can be unloaded thermally instead of consuming the fine actuator range.

## E. Long-run thermal evidence

A 44.5 h thermal-control experiment reported σT = 2.47 mK and 17.4 mK peak-to-peak while external temperature changed by about 3.2 °C. Early hybrid comparison windows later reduced dY RMS from 2.72 to 0.69 px.

These are stated experimental intervals, not a claim of continuous zero-pixel lock.

## F. V17 endurance

V17 moved the question from a short best window to sustained operation. The settled feedback population lasted **88.59 h** across **4,761 frames**, with dX RMS = **0.0594 px**, dY RMS = **0.1631 px**, and **100%** of settled measurements within ±0.5 px.

V14 remained tighter in dY over its shorter 28.11 h settled interval, while V17 improved dX and endurance. This axis-specific result persisted in matched sliding-window comparisons.

## G. Active-optics calibration revision

The 2026 AO calibration found self-consistent 100- and 1000-step responses near 0.019–0.021 µm per step and corrected an initially swapped east/west command label. Because these values differ from the earlier baseline, hardware/configuration context is retained instead of presenting the difference as a universal precision gain.

## H. V18.1 and V18.2 — phase correlation and multi-line tracking

V18.1 introduced tuned phase-correlation feedback and reported dX RMS 0.0564 px and dY RMS 0.1073 px over 3.98 h feedback.

V18.2 moved to a multi-line ThAr ROI, synchronised four-channel PT104 logging and no-rewind AO accumulation. Over 3.98 h it reported:

- dX RMS = 0.0373 px
- dY RMS = 0.0990 px
- radial RMS = 0.1058 px
- maximum AO cumulative offset = 274 / 1024 steps

These are detector-plane stability metrics, not a calibrated m/s stellar-RV precision claim.

## I. V19 — passive thermal diagnosis

V19 removed active correction and recorded 301 science frames plus 3,612 LK220 measurements over five hours. A common approximately 33.4 min component appeared through the room/AC probe, LK220 response, camera temperatures, OPL and dY.

The result motivated targeted isolation tests. It did not prove that the chiller alone caused the drift.

## J. V20–V21 — camera TEC as a heat source

The camera TEC ON/OFF sequence showed that switching the detector TEC OFF allows the detector to warm while reducing the external camera/coolant heat load. The OFF phase contains a large transition and cannot be treated as a quiet stationary operating state.

This established a heat-load pathway but not a practical solution.

## K. V22 — replacement LK220

With the replacement LK220 and camera TEC ON, V22 reported dX RMS 0.0399 px, dY RMS 0.2125 px, 100% of frames within ±0.5 px and OPL peak-to-peak 0.254 µm.

Turning the camera TEC OFF reduced LK220 current from 4.17 to 3.39 A and duty from 35.08 to 30.27%, while producing a large detector/OPL transition.

Because old- and replacement-LK220 tests used different target temperature and flow conditions, V22 supports improved operation in its configuration but is not a pure hardware A/B proof.

## L. V23 — separate heat load from regulator behaviour

V23 repeated the thermal intervention while deliberately omitting optical telemetry.

Turning the camera TEC OFF reduced mean coolant inlet−outlet temperature rise from 0.3095 to 0.1143 °C and cooled all three external camera probes, but outlet σ stayed almost unchanged at 0.0610 versus 0.0615 °C.

The camera is therefore a substantial steady heat load, but not the sole explanation for the repeating outlet variability.

The completed controller sweep selected **Kp = 2.5** as the strongest tested proportional setting and **PERIOD = 2000 ms** as preferable to 3000 ms. The 5000 ms block was incomplete.

## M. V23.2 — flow versus chiller burden

At Kp 2.5 and PERIOD 2000 ms, pump settings of 60%, 80% and a final 75% validation were compared.

Increasing pump drive cooled all three camera-surface probes and reduced coolant temperature rise. The 80% condition produced the lowest surface temperatures but higher LK220 current, duty and heat-sink temperature.

The current balanced choice is **75%**, with measured flow readout approximately **1.10 L/min**.

No dX/dY or OPL data were acquired in V23/V23.2, so the result is thermal only.

## N. V24 — 180° camera rotation

V24 returned to passive detector and OPL monitoring after a 180° camera reorientation.

During approximately the first 28 minutes, dY reached about +0.64 px and OPL changed by about −0.32 µm while the detector and cooling loop remained comparatively close to their controlled values. External camera regions remained at different absolute temperatures.

This observation is a motivation for the next experiment, not proof that the body gradient caused the optical motion.

## O. V25 — camera-airflow prototype

V25 directly tests the thermal-gradient hypothesis.

Two Sunon MF30100V3-1000U-A99 30 mm fans have been ordered. LEFT is intake and RIGHT is exhaust. The current v1.1 mounts are one-piece **black TPU ~95A** parts with:

- Ø90 / R45 camera reference;
- 40 mm axial width;
- 54 mm curved sealing span;
- 36 × 49 mm internal chamber;
- Ø28 mm fan throat;
- ~3.2 mm centre plenum;
- 24 mm fan-hole pitch;
- Ø2.85 mm M3 nylon pilot holes;
- 1 mm side-sealing skirt to reduce bypass flow.

The print job has been submitted. V25 has no powered performance result yet.

## P. Validation logic for V25

The sequence is:

1. mechanical fit with fan OFF;
2. mount-only thermal/optical baseline;
3. left intake only;
4. right exhaust only;
5. dual push–pull;
6. matched comparison of PT104 gradients, dX/dY and OPL.

A lower camera temperature is insufficient. The design is useful only if it reduces the spatial thermal gradient without adding measurable detector or OPL jitter.

## Q. Alternative image registration

Phase correlation was compared with live detector tracking and later became part of the V18 development path. Multi-line tracking improved robustness over a single local feature, but the measurement method remains distinct from an end-to-end RV calibration.

## R. Present engineering conclusion

EXOhSPEC is a delayed, multi-disturbance, multi-sensor and multi-actuator system. The research has progressed from feedback design to endurance validation, then to measurement refinement, and finally to physical thermal-path diagnosis.

The current evidence supports a coupled room/chiller/camera thermal interpretation. It does not support naming one component as the sole remaining cause.

## S. Software and reproducibility

Python is the dominant language for acquisition, synchronisation, feedback, analysis and plotting. The public repository also records OpenSCAD mechanical design, MaxIm DL detector integration, IDS3010 metrology, PT104/BME sensing, Meerstetter TEC control, LK220 telemetry and InfluxDB/Grafana monitoring.

## T. Provenance

The research-record archive preserves the original MSc thesis and historical PDFs. New synthesis pages in the repository connect those records to the later V22–V25 working reports while keeping measured results, interpretation and proposed hardware clearly separated.
