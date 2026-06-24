# PT104 four-region thermal mapping

## 1. Role in EXOhSPEC

A single temperature sensor can report a stable value while different regions of an enclosure follow different thermal histories. The four-channel PT104 workflow was introduced to observe this spatial structure rather than relying on one nominal enclosure temperature.

The four probes form a temperature-state vector:

$$
\mathbf{T}(t)=
\begin{bmatrix}
T_1(t) & T_2(t) & T_3(t) & T_4(t)
\end{bmatrix}^{\mathsf{T}}.
$$

The individual channels are not treated as interchangeable. Their main value is to reveal gradients, delayed thermal propagation and incomplete equilibration across regions that matter to the optics.

## 2. Characterisation experiment: four-region thermal map

Four probes were deployed across representative regions of the enclosure and its surrounding thermal environment. The experiment compared their long-duration trends during controlled operation and room-temperature variation.

The result was qualitative but important: different locations did not evolve identically. Some regions followed the imposed thermal control more closely, while other channels showed larger excursions or delayed response. This demonstrated that the enclosure must be understood as a distributed thermal plant rather than a single uniform temperature node.

The study informed later experimental practice:

- use a late warm-up period before declaring thermal equilibrium;
- watch spatial spread as well as the main controlled temperature;
- interpret pixel or OPL drift in the context of local gradients;
- use thermal mapping to assess insulation and airflow changes before retuning the controller.

## 3. Thermal-gradient metrics

A simple pairwise gradient is

$$
\Delta T_{ij}(t)=T_i(t)-T_j(t).
$$

The enclosure-wide spatial mean is

$$
\overline{T}(t)=\frac{1}{N}\sum_{i=1}^{N}T_i(t),
$$

and a useful gradient-health metric is the spatial spread:

$$
\sigma_{\mathrm{spatial}}(t)=
\sqrt{\frac{1}{N}\sum_{i=1}^{N}\left[T_i(t)-\overline{T}(t)\right]^2}.
$$

A small controlled-sensor error does not guarantee that $\sigma_{\mathrm{spatial}}$ is small. That distinction matters because optical elements can respond to a local temperature field rather than the controller's single feedback probe.

## 4. Control implication

The PT104 channels are best used as a **thermal-health and model-validation layer**:

- confirm that warm-up has reached a sufficiently uniform state;
- detect gradients that can explain unexpected OPL or centroid motion;
- compare enclosure redesigns, insulation changes or airflow conditions;
- identify when a fixed thermal model should not be trusted.

They are especially useful when an apparently stable TEC reading conflicts with continuing OPL drift. In that case, spatial gradients are one plausible explanation that should be investigated before increasing controller gain.

## 5. Public boundary

This overview intentionally does not publish probe positions, enclosure dimensions, cable routing, logger configuration, sampling schedule, sensor offsets or the detailed thermal-map datasets. The scientific conclusion is public: multi-region monitoring is necessary because the thermal state is spatially structured.