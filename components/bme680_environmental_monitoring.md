# BME680 environmental monitoring

## 1. Role in EXOhSPEC

The BME680 module provides local environmental telemetry:

$$
\mathbf{q}(t)=\begin{bmatrix}T(t) & P(t) & H(t)\end{bmatrix}^{\mathsf{T}},
$$

where $T$ is temperature, $P$ is pressure and $H$ is relative humidity. Its purpose is not simply to display room conditions. It records the local air state that can change the refractive index along an optical path and therefore contribute to OPL and image-plane motion.

In the control workflow, BME telemetry is treated as a **disturbance measurement**. It helps explain why an interferometric or centroid change occurred and supports model identification, quality gating and environmental diagnostics.

## 2. Characterisation experiment: environmental co-variation

The initial environmental experiment recorded BME temperature, pressure and humidity alongside interferometric OPL. It showed that OPL did not remain constant while the enclosure was in ambient air: pressure changes gave a strong co-varying signal, temperature also contributed, and humidity evolved with the wider environmental state.

A later cross-check compared the BME channel with the Environmental Compensation Unit (ECU). The channels did not produce identical values because they sampled different physical locations and can have different thermal response histories. This is useful rather than a failure: the difference between two sensors can reveal a thermal or environmental gradient that a single reading would hide.

## 3. Physics relation

The refractive index of air is a function of temperature, pressure and water-vapour content:

$$
n=n(T,P,H;\lambda).
$$

The effective optical path follows

$$
\mathrm{OPL}=n(T,P,H;\lambda)\,L_{\mathrm{geo}}.
$$

For small changes around a reference state, a local linear model is useful:

$$
\Delta \mathrm{OPL} \approx
\frac{\partial \mathrm{OPL}}{\partial T}\Delta T+
\frac{\partial \mathrm{OPL}}{\partial P}\Delta P+
\frac{\partial \mathrm{OPL}}{\partial H}\Delta H.
$$

The coefficients are empirical, run-specific sensitivities. They should be estimated from the current experiment rather than assumed to transfer perfectly between days.

## 4. Control implication

The BME680 channel is most useful when combined with OPL and centroid data:

- a pressure-driven trend can explain OPL motion not removed by temperature control;
- temperature and humidity trends help identify HVAC or enclosure-transient periods;
- disagreement between local and external sensors can indicate a gradient or incomplete equilibration;
- a rolling model can use environmental changes as predictors, but it should be quality-gated and validated during each run.

The BME680 is therefore not a direct actuator feedback replacement. It is part of the evidence used to decide whether a measured drift is likely thermal, refractive-index driven, transient, or potentially an invalid measurement.

## 5. Public boundary

The public record does not provide exact mounting positions, communications settings, calibration offsets, raw sensor histories, smoothing windows or the numerical environmental-model coefficients used in individual runs. Those details depend on the enclosure state and remain private.