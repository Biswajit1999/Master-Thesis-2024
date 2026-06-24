# Python acquisition, synchronisation and analysis workflow

## 1. Role in EXOhSPEC

Python is the integration layer that turns separate sensor and imaging measurements into one time-indexed experimental record. It is responsible for three high-level functions:

1. **acquisition** - read environmental, interferometric, thermal and centroid measurements;
2. **synchronisation** - record a common time basis and preserve measurement quality information;
3. **interpretation** - calculate reference-relative drift, trends and control diagnostics.

The objective is not merely to collect a CSV file. It is to make each correction and each conclusion traceable to the measurements available at that time.

## 2. Public data model

A public-safe sample record can be written as:

$$
\mathbf{z}_k =
\begin{bmatrix}
t_k & dX_k & dY_k & \Delta \mathrm{OPL}_k & T_k & P_k & H_k & q_k & a_k
\end{bmatrix}^{\mathsf{T}},
$$

where $t_k$ is the timestamp, $q_k$ is a data-quality flag and $a_k$ is an action or phase label. The real private log contains additional instrumentation and diagnostic columns; those are not required to understand the public methodology.

## 3. Characterisation experiment: can independent streams be aligned?

A multi-sensor experiment is only useful when its channels can be compared on the same time basis. The characterisation procedure therefore checked whether OPL, environmental, thermal and centroid readings could be collected, timestamped and merged into a coherent sequence.

The resulting workflow makes it possible to ask questions such as:

- Did OPL move before the centroid changed?
- Was a thermal command issued before or after the disturbance?
- Did a centroid correction occur while AO travel was already high?
- Was the apparent drift associated with an environmental transient or a bad image frame?

## 4. Public-safe pseudocode

```python
def collect_sample():
    return {
        "timestamp": now_utc(),
        "environment": read_environment(),
        "thermal": read_thermal_state(),
        "opl": read_opl(),
        "centroid": read_centroid(),
    }

for _ in experiment_clock():
    sample = collect_sample()
    sample["quality"] = validate(sample)

    if sample["quality"].accepted:
        sample["drift"] = reference_relative_error(sample["centroid"])
        sample["trends"] = update_short_window_history(sample)

    append_csv_or_database(sample)
```

The key idea is that validation occurs before a sample is allowed to influence a model or correction. A missing OPL value, implausible centroid, unsettled warm-up state or inconsistent timestamp should be logged, not silently converted into a control action.

## 5. Analysis quantities

The public analysis utilities report quantities that are meaningful across runs:

$$
\mathrm{RMS}(dY)=\sqrt{\frac{1}{N}\sum_{k=1}^{N}dY_k^2},
$$

$$
\mathrm{MAE}(dY)=\frac{1}{N}\sum_{k=1}^{N}|dY_k|,
$$

and threshold residence fraction:

$$
f_{\epsilon}=\frac{1}{N}\sum_{k=1}^{N}\mathbb{I}(|dY_k|\leq\epsilon).
$$

These metrics are implemented in the public-safe [`../code/drift_metrics.py`](../code/drift_metrics.py) module. They should be reported alongside mean bias, command count, AO travel and explicitly defined experiment windows.

## 6. Public boundary

This report intentionally excludes port assignments, device drivers, credentials, control schedules, direct AO commands, thermal limits, exact model coefficients, database addresses and raw experimental logs. Those details are necessary to operate a particular laboratory system, but they are not necessary to understand or review the scientific workflow.