# Stage-2 V17–V18 precision progression

## Purpose

This note links the long-duration V17 validation to the shorter V18.1/V18.2 measurement-and-control refinements. The runs are not a matched-condition ranking: duration, environmental history and tracking method differ.

## V17 endurance

V17 evaluated the settled hybrid TEC+AO state over **88.59 h** and **4,761 frames**.

| Metric | Settled V17 |
|---|---:|
| dX RMS | 0.0594 px |
| dY RMS | 0.1631 px |
| within ±0.5 px | 100% |
| duration | 88.59 h |

For context, V14 had dX RMS 0.0710 px and dY RMS 0.1272 px over 28.11 h. V17 therefore improved dX and endurance while V14 remained tighter in dY. Matched sliding-window checks retained that axis-specific difference.

The V17 dY tail was not produced by a handful of removable outliers: 3σ clipping changed dY RMS only from 0.1631 to 0.1625 px and removed four of 4,761 settled frames.

## V18.1 — phase-correlation feedback

V18.1 used a tuned approximately 150 px phase-correlation ROI, moved model convergence into warm-up, accelerated AO cadence and relaxed the TEC settle gate.

Over 3.98 h of feedback:

| Metric | V18.1 |
|---|---:|
| dX RMS | 0.0564 px |
| dY RMS | 0.1073 px |
| radial RMS | 0.1212 px |
| time to AO active | 9.7 min |
| TEC moves | 3 |
| AO moves | 56 |

The main result was a 46% reduction in dY RMS relative to the preceding V18 run reported in the same analysis.

## V18.2 — multi-line ThAr + PT104 integration

V18.2 changed three elements:

1. phase correlation moved from one local anchor box to a manually positioned wide ROI containing multiple individually detected ThAr lines, combined by median;
2. AO no longer proactively rewound toward centre;
3. the four-channel PT104 logger was sampled synchronously each frame.

Over 3.98 h of feedback:

| Metric | V18.2 |
|---|---:|
| dX RMS | **0.0373 px** |
| dY RMS | **0.0990 px** |
| radial RMS | **0.1058 px** |
| TEC moves | 12 |
| AO moves | 55 |
| max cumulative AO offset | 274 / 1024 steps |

The cumulative AO position never reached the region where the planned thermal absorb/unload mechanism would engage, so that feature remained unverified in practice.

## Interpretation

The V17 and V18 sequence shows two different kinds of progress:

- **V17:** endurance and broad stability over almost four days;
- **V18.1/V18.2:** stronger short-run measurement precision and detector-plane RMS after phase-correlation and multi-line refinement.

A lower V18.2 RMS should not be read as proof that a four-hour run would automatically retain the same statistics for 88 h.

The detector displacement is also not a calibrated stellar radial-velocity precision measurement. The public analysis does not convert the pixel RMS into an m/s performance claim without an explicit wavelength solution and end-to-end RV calibration.

## Source record

Primary working reports:

- EXOhSPEC V17 Final Report, 27 July 2026;
- EXOhSPEC Stage-2 V18.1 / V18.2 Run Report, 7 August 2026.

The V17 PDF is retained in the public research-record archive; the V18 material is reflected in the August research reports and current synthesis.
