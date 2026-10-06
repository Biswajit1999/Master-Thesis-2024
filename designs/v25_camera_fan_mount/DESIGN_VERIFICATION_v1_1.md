# V25 v1.1 sealed mount — design verification

**Design:** Biswajit Jana  
**Revision:** v1.1 sealed-side TPU prototype  
**Status:** print submitted; physical fit still required

## Geometry checks

| Item | Verified design value |
|---|---:|
| camera reference | Ø90 mm / R45 |
| measured vent, axial | ~35 mm total |
| measured vent, curved | ~45–50 mm total |
| mount axial width | 40 mm |
| curved sealing span | 54 mm |
| internal chamber | 36 × 49 mm |
| clear fan throat | Ø28 mm |
| nominal centre plenum | ~3.2 mm |
| fan envelope | 30 × 30 × 10 mm |
| fan-hole pitch | 24 mm |
| M3 pilot diameter | Ø2.85 mm |
| side-sealing skirt | 1.0 mm nominal |
| skirt inner clear region | 38 × 52 mm |

The side skirt closes the visible lateral bypass openings while retaining clearance around the manually measured ventilation grille. The camera-facing central chamber remains open.

## Fan-boss check

The fan boss outside diameter is 7.2 mm around a 2.85 mm pilot.

Nominal radial material around the pilot is therefore approximately:

`(7.2 - 2.85) / 2 = 2.18 mm`

This is a prototype TPU thread-forming interface, not a rigid precision-machined M3 thread.

## Camera-clamp boss check

The camera-clamp boss outside diameter is 8.8 mm around a 2.85 mm pilot.

Nominal radial material around the pilot is approximately:

`(8.8 - 2.85) / 2 = 2.98 mm`

The clamp screw paths are re-cut after the complete CAD union so overlapping saddle geometry does not obstruct the pilot path.

## Clamp location relative to vent

Each mount uses four angled camera-retention screws.

- screw axial coordinate: approximately ±22 mm;
- measured vent half-width: approximately ±17.5 mm;
- nominal axial clearance beyond the vent edge: approximately 4.5 mm;
- clamp angle: approximately 40° around the R45 camera body;
- corresponding contact arc from vent centre: approximately 31.4 mm;
- maximum estimated vent half-span along the curved surface: approximately 25 mm;
- nominal curved-direction clearance beyond the vent: approximately 6.4 mm.

The contact points are therefore designed to land on solid camera housing outside the measured grille.

## Curvature and compliant interface

The nominal mount inner radius is 45.25 mm around the R45 camera reference. Local compliant TPU sealing ribs provide light preload at the interface.

This geometry is intended to:

- accommodate small printer and manual-measurement tolerances;
- reduce hard contact with the anodised camera housing;
- provide a local airflow perimeter;
- add some vibration isolation.

The mount must not be tightened enough to deform the camera housing.

## Airflow check

The Ø28 mm central bore is applied as a final global subtraction after the mount geometry is united. The airflow path is therefore intentionally unobstructed through the fan deck.

The intended flow is:

**LEFT:** enclosure air → fan → Ø28 throat → plenum → camera grille

**RIGHT:** camera grille → plenum → Ø28 throat → fan → enclosure air

The v1.1 side skirt reduces obvious bypass around the plenum. It is not described as airtight until the printed TPU part is physically fitted to the real camera.

## Fastener rule

Use M3 nylon hardware. Printed TPU holes may be undersized depending on the printer/profile. Do not force a nylon screw into an undersized pilot; clean or ream the hole slightly after printing if required.

Use a soft silicone/TPU cap or pad at camera-facing screw tips.

## Physical-fit limitation

CAD verification cannot establish:

- actual TPU compression;
- printer dimensional tolerance;
- exact local geometry of the modified laboratory camera;
- mechanical vibration under a powered fan.

The first LEFT print must therefore be fitted with the fan unpowered. Powered optical testing begins only after vent clearance, clamp contact, mechanical retention and blade/cable clearance are confirmed.
