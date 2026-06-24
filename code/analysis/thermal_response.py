"""Small, reusable functions for thermal-impulse response analysis.

The functions in this module implement the public analysis convention used in
``results/thermal_impulse_repeat_campaign_2026-06-22_to_24.md``:

1. fit a straight line only to accepted pre-heater samples;
2. subtract that line from the complete series;
3. report extrema from heater-on to the final accepted sample.

They intentionally do not assume a particular instrument, CSV layout or hardware
configuration.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Sequence

import numpy as np


@dataclass(frozen=True)
class BaselineFit:
    """Linear baseline model ``value = slope * time + intercept``."""

    slope_per_min: float
    intercept: float
    sample_count: int


@dataclass(frozen=True)
class ResponseSummary:
    """Baseline-detrended response quantities for one time series."""

    peak_absolute_value: float
    time_to_peak_min: float
    terminal_value: float
    minimum_value: float
    maximum_value: float
    baseline_fit: BaselineFit


def _as_finite_vector(values: Sequence[float], name: str) -> np.ndarray:
    array = np.asarray(values, dtype=float)
    if array.ndim != 1:
        raise ValueError(f"{name} must be one-dimensional")
    return array


def fit_baseline_line(
    time_min: Sequence[float],
    values: Sequence[float],
    baseline_mask: Sequence[bool],
) -> BaselineFit:
    """Fit a least-squares line to valid accepted baseline samples.

    Parameters
    ----------
    time_min
        Time in minutes on a common experiment clock.
    values
        Measured series to be detrended.
    baseline_mask
        True only for accepted pre-heater samples.
    """

    time = _as_finite_vector(time_min, "time_min")
    data = _as_finite_vector(values, "values")
    mask = np.asarray(baseline_mask, dtype=bool)

    if not (time.size == data.size == mask.size):
        raise ValueError("time_min, values and baseline_mask must have equal length")

    valid = mask & np.isfinite(time) & np.isfinite(data)
    if valid.sum() < 2:
        raise ValueError("at least two finite baseline samples are required")

    slope, intercept = np.polyfit(time[valid], data[valid], deg=1)
    return BaselineFit(
        slope_per_min=float(slope),
        intercept=float(intercept),
        sample_count=int(valid.sum()),
    )


def detrend_against_baseline(
    time_min: Sequence[float],
    values: Sequence[float],
    baseline_mask: Sequence[bool],
) -> tuple[np.ndarray, BaselineFit]:
    """Return baseline-detrended values and the fitted pre-heater model."""

    time = _as_finite_vector(time_min, "time_min")
    data = _as_finite_vector(values, "values")
    fit = fit_baseline_line(time, data, baseline_mask)
    return data - (fit.slope_per_min * time + fit.intercept), fit


def summarise_response(
    time_min: Sequence[float],
    values: Sequence[float],
    baseline_mask: Sequence[bool],
    heater_on_min: float = 0.0,
) -> ResponseSummary:
    """Summarise the baseline-detrended response from heater-on onwards.

    ``peak_absolute_value`` is the largest absolute detrended value in the
    accepted heater-on/post-heater record. It is not necessarily an immediate
    response to the thermal pulse.
    """

    time = _as_finite_vector(time_min, "time_min")
    detrended, fit = detrend_against_baseline(time, values, baseline_mask)

    response_mask = (time >= float(heater_on_min)) & np.isfinite(time) & np.isfinite(detrended)
    if not response_mask.any():
        raise ValueError("no finite samples were found at or after heater_on_min")

    response_time = time[response_mask]
    response_values = detrended[response_mask]
    peak_index = int(np.argmax(np.abs(response_values)))

    return ResponseSummary(
        peak_absolute_value=float(abs(response_values[peak_index])),
        time_to_peak_min=float(response_time[peak_index] - heater_on_min),
        terminal_value=float(response_values[-1]),
        minimum_value=float(np.min(response_values)),
        maximum_value=float(np.max(response_values)),
        baseline_fit=fit,
    )


def radial_error(dx_px: Sequence[float], dy_px: Sequence[float]) -> np.ndarray:
    """Return ``sqrt(dx**2 + dy**2)`` for paired image displacements."""

    dx = _as_finite_vector(dx_px, "dx_px")
    dy = _as_finite_vector(dy_px, "dy_px")
    if dx.size != dy.size:
        raise ValueError("dx_px and dy_px must have equal length")
    return np.hypot(dx, dy)
