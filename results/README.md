# Selected experimental results

This page records a small set of representative outcomes from the EXOhSPEC measurement and feedback programme. It is a results summary, not a raw-data release.

![Selected experimental results](../figures/selected_experimental_results.svg)

| Area | Reported result | Interpretation |
|---|---:|---|
| Environmental optical-path response | approximately 0.4 micrometres per hPa; approximately 6 micrometres per degree C | Pressure and temperature both produced measurable optical-path-length variation. |
| Thermal control | standard deviation of temperature, sigma T = 2.47 mK over 44.5 h; 17.4 mK peak-to-peak | The TEC maintained millikelvin-level stability during a long closed-loop run despite an external temperature change of approximately 3.2 degrees C. |
| Active-optics calibration | approximately 0.15 px per step | The active-optics unit had sufficient authority for small centroid corrections, but its finite travel requires range management. |
| Fine correction test | mean residual 0.443 px to 0.153 px across 8 automated corrections | AO reduced small residual centroid offsets after calibration. |
| Hybrid control comparison | dY RMS 2.72 px to 0.69 px | The selected comparison interval showed a 74.5% reduction when thermal control was combined with AO fine trim. |

The associated raw telemetry, laboratory configuration and detailed controller versions are not published here. The public material provides the measured scale of the problem, the control architecture and a hardware-independent decision model.
