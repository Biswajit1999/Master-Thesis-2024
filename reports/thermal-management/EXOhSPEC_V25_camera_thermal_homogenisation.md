# EXOhSPEC V25 — camera thermal homogenisation and sealed dual side-vent fan prototype

**Author:** Biswajit Jana  
**Project:** EXOhSPEC Stage-2 instrumentation development  
**Updated:** 6 October 2026  
**Status:** fan hardware ordered; black TPU v1.1 mount submitted for 3D printing; no powered V25 performance data yet

## 1. Research question

V25 is a physical follow-up to the V19–V24 thermal diagnostic sequence.

The post-rotation V24 observation showed that the detector TEC and liquid-cooling loop could remain close to their controlled states while different external camera regions remained at different temperatures. During approximately the first 28 minutes after the 180° camera reorientation, dY reached about +0.64 px and OPL changed by about −0.32 µm.

That observation does **not** prove that a camera-body temperature gradient caused the optical drift. Mechanical rotation, settling, room forcing and thermal redistribution were not independently isolated.

V25 therefore asks a narrower experimental question:

> Can gentle forced airflow through the two opposing camera side vents reduce the spatial camera-body temperature difference without introducing measurable detector or OPL jitter?

## 2. Why airflow is being tested now

The thermal chain has been narrowed progressively.

- V19 identified a recurring ~33.4 min signature across room/chiller/camera/OPL/dY telemetry.
- V22 showed that the camera TEC is a substantial heat load: with the camera TEC switched OFF, LK220 current and duty fell while the external camera body cooled, but the detector underwent a large thermal/optical transition.
- V23 repeated the heat-load intervention and showed that outlet-temperature variability remained nearly unchanged even though coolant heat pickup fell strongly.
- V23/V23.2 established a practical LK220 operating point.
- V24 reintroduced optical monitoring and motivated a direct camera-body homogenisation test.

The remaining hypothesis is not “more cooling is always better”. It is whether **spatially more uniform local heat removal** improves the optical state.

## 3. Fixed fan selection

The first physical test uses:

| Parameter | Selected fan |
|---|---|
| manufacturer / model | Sunon MF30100V3-1000U-A99 |
| quantity | 2 |
| dimensions | 30 × 30 × 10 mm |
| supply | 5 V DC |
| nominal current | 45 mA |
| nominal power | 0.23 W |
| nominal speed | 6000 rpm |
| airflow | 2.5 CFM |
| static pressure | 0.07 in H2O |
| acoustic rating | 10.2 dBA |
| bearing | Vapo / MagLev |
| mounting-hole pitch | 24 mm |

The V3 variant was selected because the experiment prioritises low motor power and low disturbance over maximum airflow.

The intended arrangement is:

- **LEFT = intake**
- **RIGHT = exhaust**

The first V25 validation uses fixed fan operation. No Arduino/PID/automatic fan-control layer is part of the present experiment. The aim is to characterise the mechanical and thermal plant before introducing another feedback loop.

## 4. Final v1.1 sealed mount

The print design moved through several concepts before the final submission. The current part is a one-piece compliant black TPU mount rather than the earlier rigid modular/gasket concept.

### Print specification

- material: **black TPU, approximately Shore 95A**
- units: mm
- scale: 100%
- application: functional prototype
- one LEFT intake part
- one RIGHT exhaust part

### Geometry

| Parameter | v1.1 value |
|---|---:|
| camera reference diameter | 90 mm |
| camera reference radius | 45 mm |
| measured vent width, camera axis | ~35 mm |
| measured vent span, curved direction | ~45–50 mm |
| central mount axial width | 40 mm |
| curved sealing span | 54 mm |
| internal chamber | 36 × 49 mm |
| nominal centre plenum | ~3.2 mm |
| clear fan throat | Ø28 mm |
| fan envelope | 30 × 30 × 10 mm |
| fan-hole pitch | 24 mm |
| fan / clamp pilot diameter | Ø2.85 mm |
| side-sealing skirt | 1.0 mm nominal |
| skirt inner clear opening | 38 × 52 mm |

The large curved underside remains open because it is the camera interface. The camera body closes that interface once the mount is fitted. The central plenum remains open over the actual ventilation grille.

### Why the side skirt was added

An earlier side view left visible bypass openings between the fan deck and curved saddle. Those openings could allow part of the fan flow to short-circuit around the outside of the ventilation grille.

The v1.1 revision closes those side openings with a thin continuous TPU skirt while preserving the vent-facing chamber.

The 38 × 52 mm clear region remains outside the manually measured ~35 × 45–50 mm ventilation opening, giving nominal margin rather than intentionally covering the grille.

This is an airflow-routing feature, not an assertion of an airtight seal. The real printed TPU fit still has to be checked on the modified camera.

## 5. Retention and screw design

The fan is held on the upper bosses with M3 nylon hardware. The mount itself is retained by four angled M3 nylon clamp screws per side.

The camera-retention screws:

- point approximately radially toward the Ø90 mm camera body;
- contact solid camera housing outside the measured ventilation grille;
- do not enter the camera;
- do not require drilling or permanent camera modification.

Nominal pilot diameter is Ø2.85 mm for light thread-forming in TPU. Printed TPU holes can be undersized, so the pilot should be inspected and lightly cleaned/reamed if required rather than forcing a screw.

Soft silicone/TPU protection should be used on camera-facing screw tips. The screws should be tightened only enough to prevent movement. The mount is not intended to structurally preload or distort the detector housing.

## 6. Airflow path

### Left / intake

room or enclosure air → 30 mm fan → Ø28 throat → local plenum → camera ventilation grille

### Right / exhaust

camera ventilation grille → local plenum → Ø28 throat → 30 mm fan → enclosure air

The intent is a repeatable push–pull path through the existing camera ventilation system.

The new side skirt reduces obvious lateral bypass, but the mount is deliberately not described as airtight until the physical fit is inspected.

## 7. Why the prototype is TPU

TPU ~95A is used because the mount has to combine several functions:

- conform to the curved camera surface;
- avoid hard plastic-to-anodised-aluminium contact;
- tolerate small manual-measurement and printer tolerances;
- provide some mechanical damping between the fan and camera;
- form a local airflow perimeter without a separate rigid gasket stack.

The TPU is not itself the thermal sink. Heat removal is provided by the camera ventilation path and forced airflow.

## 8. Test sequence after printing

### Stage A — fit only

1. Keep both fans unpowered.
2. Fit the LEFT mount first.
3. Check that the Ø28 throat is centred over the side vent.
4. Confirm the skirt/ribs contact solid camera body rather than covering the grille.
5. Confirm every clamp-screw tip lands on solid housing.
6. Confirm the mount cannot slide under gentle finger pressure.
7. Check cable, coolant-line, optical and support clearances.

If the mount is loose, blocks the grille or requires excessive screw preload, stop and revise the print.

### Stage B — mount-only baseline

Install the mount and fan mechanically but leave the fan OFF. Record the normal thermal + detector + OPL observables. This separates mount preload from fan rotation.

### Stage C — one fan at a time

Test left intake only and right exhaust only. A single fan may be preferable if it reduces the spatial gradient without adding the vibration of a second rotor.

### Stage D — push–pull

Operate LEFT intake + RIGHT exhaust together. Keep the thermal and optical configuration otherwise fixed.

Record:

- PT104 Left / Right / Rear camera-surface temperatures;
- PT104 room/AC channel;
- camera detector temperature and cooler power;
- LK220 temperature, flow, current, duty and heat-sink telemetry;
- dX and dY;
- interferometric OPL.

## 9. Success criteria

V25 is useful only if airflow improves the **spatial camera thermal state** while preserving or improving the optical measurements.

Relevant comparison metrics are:

- camera max–min surface-temperature spread;
- per-probe standard deviation and drift;
- dX RMS and dY RMS;
- mean detector bias;
- time within ±0.1 / ±0.2 / ±0.5 px where applicable;
- OPL RMS / peak-to-peak / drift;
- appearance of new fan-frequency or beat-frequency structure;
- fan configuration and test window.

A lower mean camera temperature by itself is not sufficient.

## 10. Stop conditions

Stop the powered test if:

- the mount moves or creeps;
- the TPU deforms into the fan blades;
- the skirt blocks the camera grille;
- nylon screw tips contact the grille or hard metal contacts the housing;
- the camera housing is visibly loaded or distorted;
- dX/dY or OPL develops obvious new periodic jitter;
- cables or fan leads can snag the optical train;
- detector/cooler behaviour becomes abnormal.

## 11. Current status

As of 6 October 2026:

- two Sunon MF30100V3-1000U-A99 fans have been ordered;
- the v1.1 LEFT and RIGHT sealed mounts have been submitted to the University 3D-print service;
- requested material is solid black TPU ~95A;
- physical fit is pending;
- no powered fan experiment has yet been performed.

Therefore V25 remains **proposed / in fabrication**, not a demonstrated improvement.

## 12. Relationship to the thermal operating point

The V25 optical test should initially preserve the V23/V23.2 working configuration:

- LK220 target 22 °C
- Kp 2.5
- TI / TD 1.0 / 1.0
- PERIOD 2000 ms
- pump 75%, flow readout ~1.10 L/min
- camera TEC ON at −10 °C

That allows airflow to be introduced as the new variable rather than simultaneously retuning the cooling controller.

## 13. Public design files

The design directory records the current geometry and print requirements:

- [design README](../../designs/v25_camera_fan_mount/README.md)
- [DIMENSIONS.json](../../designs/v25_camera_fan_mount/DIMENSIONS.json)

The earlier v0.6 parametric OpenSCAD source is retained as design history. It should not be mistaken for the final v1.1 print geometry.

---

**Engineering interpretation:** V25 is a direct test of a thermal-gradient hypothesis generated by the V19–V24 evidence chain. The hypothesis remains falsifiable: if airflow does not reduce the spatial gradient, or if fan-induced vibration worsens detector/OPL stability, the fan approach should be rejected or redesigned.
