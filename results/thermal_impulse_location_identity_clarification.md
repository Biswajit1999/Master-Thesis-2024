# Thermal-impulse campaign: location identity clarification

## Primary locations identified in the campaign

The two primary locations highlighted by the thermal-impulse results are:

1. **Grating A (G2)** — the location with the largest logger-recorded detector-plane response in this campaign.
2. **Camera mount A** — the **right-side camera mount** (`CAMERA_MOUNT_RIGHT_A_R01_20260623_123149`), which produced the largest measured optical-path-length response.

`Grating B` and `Camera mount B` are comparison locations. Their stronger rigid-registration agreement in the prior FITS replay should not be read as a higher thermal-sensitivity ranking.

## Naming convention used throughout the report

| Report label | Physical location | Trial identifier | Main result |
|---|---|---|---|
| **Grating A** | **G2 grating assembly** | `GRATING_A_R01_20260622_133547` | Largest logger-recorded detector-plane response: peak baseline-detrended \(|\Delta Y|=0.888\) px; peak radial displacement 1.047 px. |
| **Camera mount A** | **Right-side camera mount** | `CAMERA_MOUNT_RIGHT_A_R01_20260623_123149` | Largest optical-path-length response: peak baseline-detrended \(|\Delta\mathrm{OPL}|=2.273\) µm. Its late centroid excursion requires cautious interpretation. |

## Photographic record

The accompanying images document the two highlighted physical locations:

- `figures/thermal_impulse_june_2026/location_photos/grating_A_G2.jpg`
- `figures/thermal_impulse_june_2026/location_photos/camera_mount_A_right.jpg`

## Interpretation

The report’s result hierarchy is therefore:

- **Detector-plane response candidate:** Grating A (G2).
- **Optical-path-length response candidate:** Camera mount A (right-side camera mount).
- **Priority components for subsequent thermal-characterisation work:** Grating A and Camera mount A.

This clarification does not claim either component is the sole source of spectrograph instability. It identifies where the present controlled local-heating experiment produced the largest responses in its two observables.
