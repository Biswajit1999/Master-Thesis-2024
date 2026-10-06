# V24 — 180° camera-rotation passive monitor

**Experiment date:** 21 September 2026  
**Author:** Biswajit Jana  
**Role in the programme:** passive thermal + optical diagnostic after the V23/V23.2 thermal operating point was selected

## Purpose

V24 reintroduced the optical observables after the thermal-only V23/V23.2 campaign.

The ASI6200MM-Pro camera was physically rotated by 180° about its optical axis. The experiment then monitored the detector image, IDS optical-path length, camera-region PT104 temperatures, room/AC temperature, camera cooler state and LK220 telemetry without commanding active optics.

The objective was not to tune another controller. It was to observe how the remounted camera and its thermal field evolved while the previously selected cooling configuration was held fixed.

## Fixed thermal operating point

The run expected and verified:

- LK220 target: 22 °C
- Kp: 2.5
- TI / TD: 1.0 / 1.0
- PERIOD: 2000 ms
- pump: 75%
- camera TEC: ON at the existing approximately −10 °C setpoint
- bench TEC target: approximately 22 °C

The V24 acquisition code treated the LK220 configuration as **verify-only**. It did not rewrite target, PID or pump settings during the run.

The camera link, cooler state and detector-temperature setpoint were also treated as read-only. AO was not commanded.

## Measurement chain

Each science cadence combines:

1. a saved FITS detector exposure;
2. detector-plane shift from phase correlation relative to frame 0;
3. IDS3010 OPL and ECU telemetry;
4. four-channel PT104 temperatures;
5. BME environmental measurements;
6. bench-TEC object/target temperatures;
7. camera CMOS temperature, cooler setpoint and cooler power;
8. the most recent high-cadence LK220 state.

LK220 telemetry is logged independently at approximately 5 s cadence.

## Coordinate handling after the 180° remount

A critical design decision was to preserve the native detector coordinates.

The data record stores:

- **dX_detector_px / dY_detector_px:** native shift coordinates for the rotated-camera run;
- **dX_prev_axis_px / dY_prev_axis_px:** explicit comparison coordinates for the prior orientation.

The historical X convention was mapped with a sign reversal after the remount, while Y was retained unchanged unless later data justified another mapping. The native detector values were never overwritten.

The phase-correlation reference is frame 0 of the V24 run. The currently measured rotated-camera feature is used directly to locate the ROI rather than imposing an uncertain geometrical transform from the old orientation.

## PT104 physical mapping

For the V24 run the probe locations were:

- Ch1 → camera mount LEFT
- Ch2 → camera REAR between coolant pipes
- Ch3 → AC / room
- Ch4 → camera mount RIGHT

Calibration offsets remain associated with the physical probe/channel, not with the location label. This matters because Ch2 and Ch4 had been moved since the preceding configuration.

## Phase-correlation workflow

The monitor:

- crops a local detector ROI around the measured feature;
- subtracts the median background;
- applies a Tukey window;
- performs sub-pixel phase cross-correlation against the frame-0 ROI;
- records dX, dY, radial shift and registration error;
- retains the MaxIm centroid as an additional diagnostic.

The public method therefore separates the image-registration algorithm from the hardware-control layer.

## Safety and validity gates

The working script aborts or flags invalid operation when conditions such as the following occur:

- camera cooler no longer ON;
- detector temperature leaves the expected cold operating condition;
- LK220 target changes unexpectedly;
- LK220 flow falls below the run validity threshold;
- LK220 heat-sink temperature exceeds the configured safety bound;
- bench-TEC target changes;
- a camera-body PT104 channel reaches the configured high-temperature bound;
- the detector link or FITS geometry changes during acquisition.

Laboratory-specific serial ports, IP addresses and device connection details are intentionally not reproduced in this public method note.

## Quicklook products

The acquisition workflow automatically produces measured diagnostic plots for:

- PT104 camera-region + room/AC temperature;
- LK220 target/outlet/inlet/ambient temperature;
- native detector dX/dY;
- detector shift mapped to the previous orientation;
- OPL change from frame 0;
- CMOS temperature + cooler power;
- LK220 current + duty.

These products are intended for immediate run validation before the deeper cross-channel interpretation.

## What V24 showed

The important early observation after the 180° remount was that over approximately the first 28 min:

- dY reached roughly +0.64 px;
- OPL changed by roughly −0.32 µm;
- the detector remained close to its −10 °C controlled state;
- the liquid-cooling loop remained close to the selected operating point;
- the external camera regions still showed a spatial temperature difference.

This is an observation, not a causal proof. Camera rotation, mechanical settling, environmental forcing and thermal redistribution were not independently isolated.

## Why V25 follows

V24 therefore motivates a direct physical intervention rather than another immediate feedback retune:

> reduce the camera-body temperature gradient with gentle side-vent airflow, then check whether the thermal field, dX/dY and OPL improve together.

That experiment is documented in [the V25 camera thermal-homogenisation report](../reports/thermal-management/EXOhSPEC_V25_camera_thermal_homogenisation.md).

## Reproducibility boundary

The full laboratory script contains site-specific hardware interfaces and operational configuration. The public repository documents the scientific method, state vector, coordinate policy, safety logic and analysis products without publishing those deployment-specific details.
