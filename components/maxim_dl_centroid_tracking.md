# MaxIm DL centroid tracking: public workflow guide

## 1. Role in EXOhSPEC

MaxIm DL is used as the image-plane measurement layer. It turns a stable spectral feature or guide reference into a centroid position that can be compared with a run-specific reference coordinate.

For each accepted frame,

$$
dX_k=x_k-x_{\mathrm{ref}},
\qquad
dY_k=y_k-y_{\mathrm{ref}},
$$

and the radial image-plane error is:

$$
r_k=\sqrt{dX_k^2+dY_k^2}.
$$

The control system does not use a centroid value in isolation. The frame timestamp, image quality and reference state must be recorded with it.

## 2. Characterisation experiment: centroid validity and sign convention

A centroid workflow must first be validated before it is connected to an actuator. The characterisation procedure is:

1. acquire repeated frames under nominally stable conditions;
2. choose a reference feature with suitable signal-to-noise ratio and without saturation;
3. calculate the natural centroid scatter under those conditions;
4. introduce a small, known image motion or controlled actuator test;
5. confirm the sign convention: which measured $dX$ and $dY$ direction corresponds to each correction direction;
6. cross-check the reported centroid motion against the raw image sequence or independent centroid calculation.

This validation is essential because a stable-looking autoguiding output can still contain a sign, orientation or reference-selection mistake.

## 3. Practical MaxIm DL workflow

The following workflow is intentionally software-level rather than a laboratory automation recipe.

### A. Establish a valid reference

- allow the instrument to complete the declared warm-up period;
- acquire several fixed-exposure frames of the reference image;
- reject frames affected by saturation, loss of feature, poor contrast or obvious transient disturbance;
- form $x_{\mathrm{ref}}$ and $y_{\mathrm{ref}}$ from a stable late-warm-up interval rather than a cold-start image.

### B. Acquire a science/control frame

- use a consistent exposure and region of interest for a comparison window;
- run the centroid or guiding measurement;
- store the centroid, timestamp and relevant image-quality flags;
- calculate $dX$, $dY$ and $r$ relative to the current documented reference.

### C. Validate before feedback

- do not issue a correction from a frame that fails quality checks;
- require persistence across several accepted frames before a fine correction;
- log every reference update separately from a physical actuator action;
- review raw images around any large reported centroid jump.

## 4. Public-safe Python pattern

The public workflow can be represented without publishing the camera connection, COM automation or actuator command path:

```python
reference = estimate_reference(late_warmup_frames)

for frame in acquisition_stream:
    centroid = measure_centroid(frame)
    quality = assess_frame_quality(frame, centroid)

    if not quality.accepted:
        write_log(status="rejected", quality=quality.reason)
        continue

    dx = centroid.x - reference.x
    dy = centroid.y - reference.y
    radial_error = (dx * dx + dy * dy) ** 0.5

    write_log(status="accepted", dx=dx, dy=dy, radial_error=radial_error)
```

The actual EXOhSPEC controller adds time alignment, environmental telemetry, OPL data, model validation and actuator safety logic around this simple measurement loop.

## 5. Control implication

MaxIm DL provides the error signal that makes fine image-plane correction possible. Its limitations must remain visible in the analysis:

- centroid error is reference-relative, not an absolute spectrograph truth;
- a cold-start reference can create a persistent bias;
- exposure time and image quality influence measurement noise;
- the camera coordinate system must be calibrated against AO directions;
- a final point near zero is not enough: residence time within a threshold band is the stronger performance measure.

## 6. Public boundary

This guide does not disclose camera model configuration, image paths, guider target coordinates, frame settings, automation object names, COM calls, control thresholds or the full laboratory acquisition script. It is a reproducible **measurement concept**, not a copy-and-run instrument-control recipe.