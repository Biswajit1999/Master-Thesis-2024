# EXOhSPEC V25 camera fan mount

**Design:** Biswajit Jana  
**Current print revision:** v1.1 sealed-side prototype  
**Status:** fans ordered; LEFT + RIGHT black TPU print submitted; physical fit and powered validation pending

This directory records the mechanical design basis for the V25 camera thermal-homogenisation experiment described in [the current thermal-management report](../../reports/thermal-management/EXOhSPEC_V25_camera_thermal_homogenisation.md).

## Current v1.1 geometry

- camera reference: **Ø90 mm / R45**
- manually measured vent: **~35 mm axial × ~45–50 mm curved span**
- mount central axial width: **40 mm**
- curved sealing span: **54 mm**
- internal airflow chamber: **36 × 49 mm**
- nominal centre plenum: **~3.2 mm**
- fan: **Sunon MF30100V3-1000U-A99, 30 × 30 × 10 mm**
- fan mounting-hole pitch: **24 mm**
- clear airflow throat: **Ø28 mm**
- fan/clamp pilot holes: **Ø2.85 mm**
- material: **black TPU ~95A**
- side-sealing skirt: **1.0 mm nominal**
- skirt inner clear opening: **38 × 52 mm**
- retention: **four angled M3 nylon camera-clamp screws per mount**
- airflow: **LEFT intake / RIGHT exhaust**

## What changed from the earlier public prototype

The original public CAD in this directory describes an earlier rigid/modular concept with separate gasket allowances.

The print submitted in October 2026 is different:

1. the mount is a one-piece compliant TPU part;
2. separate rigid camera/fan gasket pieces are no longer required;
3. the curved TPU perimeter provides the compliant camera interface;
4. visible side bypass openings were closed with a thin sealing skirt;
5. the central vent-facing plenum remains open;
6. M3 pilot holes are nominally 2.85 mm for light thread-forming in TPU;
7. left and right parts are dedicated intake/exhaust variants.

[DIMENSIONS.json](DIMENSIONS.json) is the current public dimensional record.

The older [EXOhSPEC_V25_mount_v0_6_parametric.scad](EXOhSPEC_V25_mount_v0_6_parametric.scad) is retained for design history and should **not** be sent to a printer as the final v1.1 part.

## Fit and assembly rules

- do not drill or tap the camera body;
- confirm the airflow throat is centred over the real vent;
- all camera-clamp screws must contact solid housing outside the grille;
- use nylon M3 screws and soft protection at camera-facing screw tips;
- tighten only until the mount stops sliding;
- do not force an undersized TPU pilot hole;
- keep the fan/cable clear of the optical path and moving hardware.

## Validation rule

The first print is a fit-check part. The side-vent dimensions were measured manually on the modified laboratory camera, so CAD checks cannot prove the real TPU compression, printer tolerance or local camera geometry.

No fan-powered experiment should begin until the LEFT mount passes the physical fit check.

The design is considered successful only if the later thermal + dX/dY + OPL experiment shows that reduced camera-body gradient is achieved without measurable optical degradation.
