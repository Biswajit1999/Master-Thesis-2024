"""Compact numerical summaries for reference-relative image drift."""

from math import sqrt
from statistics import fmean, pstdev


def rms(values):
    data = [float(v) for v in values]
    if not data:
        raise ValueError("values must not be empty")
    return sqrt(fmean(v * v for v in data))


def mean_absolute_error(values):
    data = [float(v) for v in values]
    if not data:
        raise ValueError("values must not be empty")
    return fmean(abs(v) for v in data)


def fraction_within(values, threshold):
    data = [float(v) for v in values]
    if not data:
        raise ValueError("values must not be empty")
    return sum(abs(v) <= threshold for v in data) / len(data)


def summarise_dy(dy_px):
    data = [float(v) for v in dy_px]
    if not data:
        raise ValueError("dy_px must not be empty")
    return {
        "n": len(data),
        "mean_px": fmean(data),
        "std_px": pstdev(data),
        "rms_px": rms(data),
        "mean_abs_px": mean_absolute_error(data),
        "within_0p10_px": fraction_within(data, 0.10),
        "within_0p20_px": fraction_within(data, 0.20),
        "within_0p50_px": fraction_within(data, 0.50),
    }


if __name__ == "__main__":
    print(summarise_dy([0.06, -0.09, 0.18, -0.14, 0.03]))
