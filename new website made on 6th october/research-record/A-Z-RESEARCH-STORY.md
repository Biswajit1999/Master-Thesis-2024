# EXOhSPEC: A–Z research storyline, 2023–2026

## A. Aim

The programme asks how environmental change propagates through a high-resolution laboratory spectrograph and whether thermal and active-optics feedback can reduce optical-path and detector-plane drift.

## B. Baseline and instrument context

The 2023 initial plan and 2024 MSc work established the optical, thermal and software context. The data path links detector images and MaxIm DL centroid positions with IDS3010 interferometric OPL, environmental telemetry, TEC state and active-optics commands.

## C. Characterisation before control

Individual reports characterised pressure, temperature and humidity response, local thermal sensors, TEC behaviour and AO displacement. Approximate empirical OPL responses of 0.4 µm/hPa and 6 µm/°C are configuration-specific indicators rather than universal material constants.

## D. Feedback development

The controller evolved from direct threshold correction toward a TEC-primary hybrid structure. Slow drift is assigned to the TEC loop; the AO unit provides bounded residual correction. The architecture monitors cumulative AO travel so that slow offsets can be unloaded thermally rather than consuming finite fine-actuator range.

## E. Long-run evidence

One 44.5 h thermal experiment reported σT = 2.47 mK and 17.4 mK peak-to-peak while external temperature changed by about 3.2 °C. A selected hybrid-control comparison reduced dY RMS from 2.72 px to 0.69 px. A separate 9.47 h plateau achieved dY RMS 0.380 px with 90.76% of samples within ±0.5 px.

These results show meaningful rejection over stated intervals. They do not demonstrate continuous zero-pixel regulation.

## F. Controller lineage and recalculation

Stage-2 reports V11–V17 progressively addressed data alignment, threshold behaviour, reference handling and metric calculation. V17 recomputed results from raw CSV data and documented known lineage corrections, including an earlier axis/direction interpretation issue.

## G. Calibration revision

The 2026 AO calibration found self-consistent 100- and 1000-step responses near 0.019–0.021 µm per step and corrected an initially swapped east/west command label. Because these values differ from the 2024 baseline, the hardware and configuration must be confirmed before describing the difference as a physical precision gain.

## H. Environmental and thermal diagnosis

Local thermal-impulse work showed that Grating A had the strongest centroid response while Camera mount A had the strongest OPL response in the tested dataset. These rank components for further experiment; they do not by themselves identify a unique root cause.

V19–V21 documented a repeating thermal behaviour consistent with a cooling-chain or room-HVAC pathway. The evidence motivates targeted isolation tests, but current public wording should not present component causality as proven.

## I. Camera-airflow proposal

After a camera-rotation observation showed approximately +0.64 px dY and −0.32 µm OPL change during the first ~28 min while detector/coolant telemetry remained relatively stable, V25 proposed dual 30 mm side-vent fans. This is a design/prototype hypothesis. Required validation includes fit, vibration, single-fan and push–pull tests.

## J. Alternative image registration

Phase correlation was compared with live centroid tracking on one dataset. Reported agreement was 0.983 for dX and 0.998 for dY, with RMSE 0.027–0.029 px. The method remains an evaluated diagnostic and has not yet been validated as the feedback signal in a closed loop.

## K. Present engineering conclusion

EXOhSPEC is a delayed, multi-disturbance, multi-sensor and multi-actuator system. Success is best assessed with RMS, bias, time-in-band, control effort and interval definition—not by a final point near zero. The next validation programme should combine adaptive warm-up, a verified reference, held-out environmental/OPL prediction, TEC-primary correction and AO fine trim with unloading.

## L. Provenance

The companion JSON inventories preserve dates, message identifiers, filenames, checksums, page counts and first-page previews. The searchable website presents the full record while distinguishing measurement, model, interpretation and proposed design.
