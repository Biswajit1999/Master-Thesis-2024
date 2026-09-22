# EXOhSPEC V25 camera fan mount

**Design:** Biswajit Jana  
**Status:** first-print prototype

This directory contains the public, editable source for the V25 dual side-vent fan-mount concept documented in [the thermal-management report](../../reports/thermal-management/EXOhSPEC_V25_camera_thermal_homogenisation.md).

## Current geometry

- camera reference: Ø90 mm / R45
- manually measured vent width: ~35 mm axial
- manually measured curved span: ~45-50 mm
- rigid mount central coverage: 40 x 40 mm
- fan: 30 x 30 x 10 mm
- fan hole pitch: 24 mm
- top airflow throat: Ø28 mm
- underside plenum: Ø34 mm
- rigid camera-side clearance: 3.0 mm
- separate camera-side gasket: 3.0 mm
- fan-side gasket: 1.5 mm
- recessed direction labels: L IN / R OUT
- recessed author mark: B. JANA

## Editing

The OpenSCAD file is the simplest parametric source. Change the dimensions near the top of the file and render/export a new STL. PrusaSlicer is intended for slicing and placement, not for editing engineering dimensions.

The first print should be treated as a fit-check part. Do not fit both powered fans until one side has been checked for camera curvature, vent centring, gasket compression and clearance from the existing camera support.
