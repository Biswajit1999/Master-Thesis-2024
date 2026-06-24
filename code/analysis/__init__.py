"""Public-safe analysis utilities for EXOhSPEC result reproduction.

The package contains no device ports, credentials, raw telemetry or operational
controller settings. It is intentionally limited to offline, hardware-independent
analysis utilities.
"""

from .thermal_response import (
    BaselineFit,
    ResponseSummary,
    detrend_against_baseline,
    fit_baseline_line,
    summarise_response,
)

from .fits_registration import (
    RegistrationResult,
    fourier_translation_self_test,
    register_seeded_translation,
)

__all__ = [
    "BaselineFit",
    "ResponseSummary",
    "RegistrationResult",
    "detrend_against_baseline",
    "fit_baseline_line",
    "summarise_response",
    "fourier_translation_self_test",
    "register_seeded_translation",
]
