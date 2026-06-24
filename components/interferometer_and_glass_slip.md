# IDS3010 interferometer and the glass-slip perturbation study

## 1. Role in EXOhSPEC

The interferometer provides a high-sensitivity record of relative optical-path change. In EXOhSPEC, this makes it the primary diagnostic for separating an environmental or optical-path disturbance from a detector-only centroid change.

The measured quantity is treated as a reference-relative optical path length,

$$
\Delta \mathrm{OPL}(t) = \mathrm{OPL}(t) - \mathrm{OPL}_{\mathrm{ref}}.
$$

The instrument does not by itself identify the physical cause of a change. It must be interpreted with temperature, pressure, humidity, thermal-gradient and centroid telemetry.

## 2. Characterisation experiment: controlled glass-slip perturbation

A glass-slip test was used as a deliberate optical disturbance. A slip was introduced or repositioned in the relevant optical path, producing a sudden change in the interferometric signal. The experiment established two practical facts:

1. the interferometric channel is sensitive to small changes in optical path and reference-path condition;
2. a discontinuity caused by a manual optical perturbation should be handled as a measurement-quality or recalibration event, not silently absorbed into the feedback baseline.

The historical report describes the observed response as a change in the self-interference condition. In more general optical language, the inserted plane-parallel plate can change path delay and create or modify weak parasitic-reflection paths. The public conclusion is therefore a diagnostic one: a mechanically altered optical element can produce an abrupt interferometric offset even when the environmental sensors change only slowly.

## 3. Physics relation

For a plate of thickness $d$ inserted near normal incidence, a useful first-order path-change relation is

$$
\Delta \mathrm{OPL} \approx m\,(n_g-n_a)d,
$$

where $n_g$ is the refractive index of the glass, $n_a$ is the refractive index of air, and $m$ is the number of relevant traversals through the plate. The exact coefficient depends on the measurement geometry, incidence angle and whether the reflected beam makes one or more passes through the element.

The corresponding phase shift is

$$
\Delta \phi = \frac{2\pi}{\lambda}\,\Delta \mathrm{OPL}.
$$

This is why a small optical-path perturbation can cause a large change in an interferometric readout: phase is proportional to path difference in units of wavelength.

For environmental interpretation, the effective optical path can be written as

$$
\mathrm{OPL}=n(T,P,H)\,L_{\mathrm{geo}},
$$

so that, to first order,

$$
\Delta \mathrm{OPL} \approx L_{\mathrm{geo}}\,\Delta n + n\,\Delta L_{\mathrm{geo}}.
$$

The first term captures refractive-index change; the second captures geometric expansion, contraction or displacement.

## 4. What the experiment taught the control design

The glass-slip experiment is not used as an operational calibration of the final spectrograph. It is a **robustness and observability test**:

- abrupt OPL jumps need a quality flag;
- the feedback reference should not be updated through a discontinuity;
- optical alignment and reference-path condition must be checked before interpreting a large OPL jump as an environmental drift;
- a stable-control period should begin only after the interferometric signal has returned to a physically credible baseline.

This is why the later controller design separates warm-up, quality gating and feedback. The OPL channel is powerful, but it is sensitive enough that it must be validated before it drives a correction.

## 5. Public boundary

This overview omits the exact interferometer geometry, laser/retroreflector placement, optical alignment procedure, filtering settings, discontinuity thresholds and recalibration sequence. Those details are experiment-specific and remain in the private laboratory archive.