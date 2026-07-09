# Phase Correlation for EXOhSPEC Frame-Shift Measurement

**Validation Against Live Centroid Tracking and ROI-Size Optimisation**  
**Author:** Biswajit Jana  
**Affiliation:** University of Hertfordshire  
**Date:** 2026-07-09  
**Dataset:** `GRATING_B_R01_20260622_144720`  
**Run type:** thermal impulse, 8.80 V, 0.25 A, 70 s pulse, 15 min baseline  
**Frames:** 72 total: BASELINE = 23, PULSE = 2, RELAX = 47

---

## Abstract

This report tests whether Fourier-domain phase correlation can independently reproduce the frame-to-frame pixel drift measured by the live EXOhSPEC centroid tracker. The initial phase-only implementation failed on the real stellar-field data: it recovered only a small fraction of the live centroid drift on large ROIs and became noise-dominated on the small local ROI. The failure was traced to phase-only normalisation and contrast-flattening preprocessing, which removed the useful amplitude weighting from a smooth, low-contrast stellar target.

The corrected method uses `normalization=None`, median-background subtraction only, and a Tukey taper on the ROI. With a fixed seed frame and a 1000 x 1000 px ROI centred on the live reference star at approximately `(X_ref, Y_ref) = (3959, 2984)`, the corrected method reaches:

| Metric | dX | dY |
|---|---:|---:|
| Correlation with live centroid | 0.983 | 0.998 |
| RMSE [px] | 0.027 | 0.029 |

A follow-up ROI-size sweep shows that correlation alone is not sufficient: even full-frame registration can remain highly correlated while the recovered drift amplitude collapses. The best operating point is a **50-200 px ROI centred on the tracked star**, with `normalization=None`, median subtraction only, and Tukey windowing.

---

## 1. Objective

The live EXOhSPEC pipeline tracks one centroided stellar reference feature and reports:

```text
Delta X_centroid(t)
Delta Y_centroid(t)
```

This is fast and useful for live monitoring, but it does not prove whether the motion is a rigid detector-frame translation or a local feature/profile displacement. The objective of this analysis was therefore to:

1. Build an independent phase-correlation / cross-correlation validation pipeline.
2. Compare it against the live centroid tracker.
3. Diagnose the failure of the first phase-only implementation.
4. Optimise ROI size and preprocessing.
5. Decide whether the method is suitable for closed-loop stabilisation on real stellar targets.

---

## 2. Background theory

For a reference image `f(x, y)` and a shifted image:

```text
g(x, y) = f(x - Delta x, y - Delta y)
```

the Fourier shift theorem gives:

```text
G(u, v) = F(u, v) exp[-i 2 pi (u Delta x + v Delta y)]
```

The cross-power spectrum can be normalised in two main ways.

### 2.1 Phase-only normalisation

```text
R_phase(u, v) = F(u, v) G*(u, v) / |F(u, v) G*(u, v)|
```

This is the standard phase-correlation recipe. It gives every Fourier frequency equal magnitude and estimates the displacement from the peak of the inverse transform.

### 2.2 Unnormalised / amplitude-weighted form

```text
R_none(u, v) = F(u, v) G*(u, v)
```

This retains natural amplitude weighting. For smooth, low-contrast stellar fields, this was much better because the real signal is concentrated in a few strong low-frequency components. Phase-only normalisation flattened these components and allowed noise to dominate.

---

## 3. First implementation and failure

The first implementation used:

```python
phase_cross_correlation(..., normalization="phase")
```

with:

- percentile clipping,
- z-score normalisation,
- a large ROI,
- a five-ROI median test,
- and a small local ROI at the tracked star.

The result was poor:

| Variant | corr(dX) | corr(dY) |
|---|---:|---:|
| Multi-ROI median, phase-normalised | 0.186 | 0.529 |
| Small local ROI, phase-normalised | 0.006 | 0.015 |

The phase estimate stayed near zero while the live centroid drift reached approximately 0.8 px in dY. The built-in `phase_error` was also unhelpful because it stayed near 1.0 for all frames.

### Diagnosis

The target field is not a sharp high-contrast edge pattern. It is a smooth, low-contrast stellar field. Phase-only normalisation whitened the frequency spectrum and destroyed the amplitude advantage of the real signal. Percentile clipping and z-score normalisation made the problem worse by flattening contrast further.

---

## 4. Corrected method

The corrected method applies three changes together:

1. Use `normalization=None` instead of `normalization="phase"`.
2. Use background subtraction only: subtract the median; do not clip or z-score.
3. Apply a Tukey window with `alpha = 0.2` to suppress FFT edge artefacts without strongly down-weighting the ROI centre.

The corrected algorithm was run on all 72 frames against frame 0 as a fixed seed reference.

### Corrected result

| Metric | dX | dY |
|---|---:|---:|
| Correlation | 0.983 | 0.998 |
| RMSE [px] | 0.027 | 0.029 |

The corrected method tracks the live centroid closely through BASELINE, PULSE, and RELAX. The dY agreement is especially strong. A small systematic damping remains in dX at the largest excursions, likely due to mild PSF/flux changes or the Tukey taper.

---

## 5. ROI-size optimisation

A sweep over ROI side length was performed using ten sampled frames.

| ROI side [px] | corr(dX) | corr(dY) | measured dY range [px] | true dY range [px] |
|---:|---:|---:|---:|---:|
| 10 | 0.896 | 0.997 | 0.57 | 0.778 |
| 50 | 0.995 | 0.999 | 0.80 | 0.778 |
| 200 | 0.997 | 0.999 | 0.80 | 0.778 |
| 1000 | 0.986 | 0.996 | 0.73 | 0.778 |
| 3000 | 0.986 | 0.997 | 0.71 | 0.778 |
| 9576 / full frame | 0.808 | 0.998 | 0.35 | 0.778 |

### Key result

Correlation alone is misleading. The full-frame result still shows high dY correlation, but the measured amplitude collapses from approximately 0.78 px to about 0.35 px. This means full-frame registration averages the moving stellar signal with mostly static or irrelevant background structure.

### Recommended ROI

The best operating point is:

```text
ROI side length: 50-200 px
Recommended half-size: 100 px
Centre: live centroid reference star
```

This gives high correlation and near-exact amplitude recovery.

---

## 6. Before vs maximum-drift frame

A visual comparison was made between the first baseline frame and a RELAX frame near maximum drift. At native display scale, the two frames look almost identical, even though the measured drift is approximately 0.74 px. This is expected: the displacement is subpixel and cannot be reliably judged by eye.

This supports the need for quantitative centroiding and Fourier-domain registration rather than visual blink comparison alone.

---

## 7. Runtime

The first large-ROI implementation on a roughly 2000 x 5000 px crop took approximately:

```text
0.7-0.9 s per frame
```

The corrected 50-200 px ROI should be much faster, but this needs to be re-benchmarked on the live system before use in real-time feedback.

---

## 8. Closed-loop implications

The final goal is a closed-loop stabilisation system for real stellar spectra, not only ThAr-lamp frames. This distinction matters:

- ThAr lines are sharp and high-contrast.
- Real stars are smoother and lower-contrast.
- The initial phase-only method would probably work on ThAr but failed on real stellar data.

The corrected method is therefore more relevant to the real EXOhSPEC use case.

Before using it for feedback control, the remaining validation steps are:

1. Re-benchmark runtime at the recommended small ROI.
2. Test robustness on lower-SNR stellar frames.
3. Check for lag between live centroid and phase-correlation estimates.
4. Confirm behaviour across multiple thermal impulse locations.

---

## 9. Interpretation summary

| Result | Interpretation |
|---|---|
| Phase-normalised large/multi-ROI | Poor agreement; preprocessing and normalisation killed the signal. |
| Phase-normalised small ROI | Noise-dominated and unusable. |
| Corrected `normalization=None`, 1000 px ROI | Strong agreement; live centroid validated as a local-motion proxy. |
| ROI-size sweep | Correlation alone is insufficient; amplitude recovery must also be checked. |
| 50-200 px ROI | Best simultaneous correlation and amplitude recovery. |

---

## 10. Limitations

- The method assumes translational image motion only.
- It does not model rotation, scale, shear, focus changes, or non-rigid deformation.
- It remains sensitive to saturated pixels, repeated structures, and edge artefacts.
- The ROI sweep used ten sampled frames, not the full 72-frame sequence.
- Stellar-SNR dependence is not yet tested.

---

## 11. Final recommended production cell

```python
from pathlib import Path
import time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from astropy.io import fits
from skimage.registration import phase_cross_correlation
from scipy.signal.windows import tukey

FRAME_DIR = Path(
    r"C:\Users\labrat\Biswajit"
    r"\thermal_impulse_8p80V_0p25A_70s_15minbaseline_v6_3"
    r"\GRATING_B_R01_20260622_144720"
    r"\fits"
)

LIVE_CSV = FRAME_DIR.parent / "GRATING_B_R01_20260622_144720.csv"
OUTPUT_DIR = FRAME_DIR.parent / "phase_correlation_outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

fits_files = sorted(list(FRAME_DIR.glob("*.fit")) + list(FRAME_DIR.glob("*.fits")))

REF_X, REF_Y = 3959, 2984
HALF = 100
CROP = (REF_Y - HALF, REF_Y + HALF, REF_X - HALF, REF_X + HALF)

_window_cache = {}

def load_fits_image(path, crop=None):
    path = Path(path)
    with fits.open(path, memmap=True, do_not_scale_image_data=True) as hdul:
        hdu = next(h for h in hdul if getattr(h, "data", None) is not None)
        data = hdu.data
        if crop is not None:
            y0, y1, x0, x1 = crop
            data = data[y0:y1, x0:x1]
        return np.asarray(data, dtype=np.float32)

def preprocess_image(img):
    """Background-subtract only; keep amplitude information for cross-correlation."""
    img = np.asarray(img, dtype=np.float32)
    bad = ~np.isfinite(img)
    if bad.any():
        img[bad] = np.nanmedian(img)
    img = img - np.median(img)

    h, w = img.shape
    key = (h, w)
    if key not in _window_cache:
        wy = tukey(h, alpha=0.2)
        wx = tukey(w, alpha=0.2)
        _window_cache[key] = np.outer(wy, wx).astype(np.float32)
    return img * _window_cache[key]

def cross_correlate_pair(reference_img, moving_img, upsample_factor=100):
    t0 = time.perf_counter()
    shift_yx, error, phasediff = phase_cross_correlation(
        reference_img,
        moving_img,
        upsample_factor=upsample_factor,
        normalization=None,
    )
    runtime = time.perf_counter() - t0
    return {
        "dX_phase": -float(shift_yx[1]),
        "dY_phase": -float(shift_yx[0]),
        "phase_error": float(error),
        "phase_diff": float(phasediff),
        "runtime_sec": runtime,
    }

rows = []
seed = preprocess_image(load_fits_image(fits_files[0], CROP))

for i, path in enumerate(fits_files):
    moving = preprocess_image(load_fits_image(path, CROP))
    result = cross_correlate_pair(seed, moving, upsample_factor=100)

    name_upper = path.name.upper()
    stage = (
        "BASELINE" if "BASELINE" in name_upper else
        "PULSE" if ("PULSE" in name_upper or "HEAT" in name_upper) else
        "RELAX" if ("RELAX" in name_upper or "RECOVERY" in name_upper) else
        "UNKNOWN"
    )

    rows.append({"frame_index": i, "file_name": path.name, "stage": stage, **result})

cc_df = pd.DataFrame(rows)
cc_df.to_csv(OUTPUT_DIR / "cross_correlation_FINAL.csv", index=False)

live_df = pd.read_csv(LIVE_CSV)
live_df["file_name"] = live_df["fits_filename"].astype(str).apply(lambda p: Path(p).name)
merged = cc_df.merge(live_df[["file_name", "dX", "dY"]], on="file_name", how="inner")

print("corr dX:", merged["dX"].corr(merged["dX_phase"]))
print("corr dY:", merged["dY"].corr(merged["dY_phase"]))
```

---

## 12. Summary

Correctly configured Fourier-domain image registration agrees strongly with the EXOhSPEC live centroid tracker on this real stellar-field thermal-impulse run. The critical configuration is:

```text
normalization=None
median-background subtraction only
Tukey window, alpha=0.2
50-200 px ROI centred on tracked star
upsample_factor=100
```

The remaining work before live closed-loop use is to test lower-SNR stellar frames, re-benchmark runtime at the recommended ROI size, and repeat the validation across other thermal impulse locations.