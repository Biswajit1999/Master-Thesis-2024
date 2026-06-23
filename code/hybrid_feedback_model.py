"""Hardware-independent decision layer for EXOhSPEC stability control.

This module represents the feedback hierarchy used in the research workflow:
1. TEC is the primary actuator for coarse or persistent drift.
2. Active optics corrects only small residual image-plane error.
3. AO travel is monitored so accumulated correction is handed back to the
   thermal loop before the actuator approaches its range limit.

It deliberately contains no device ports, credentials, IP addresses or hardware
transport commands. The calibration values are supplied by the user because they
are experiment- and instrument-specific.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from math import copysign


class ActionKind(str, Enum):
    HOLD = "hold"
    TEC_PRIMARY = "tec_primary"
    AO_FINE_TRIM = "ao_fine_trim"
    TEC_UNLOAD = "tec_unload"
    REJECT = "reject"


@dataclass(frozen=True)
class Telemetry:
    """One synchronised measurement sample.

    ``dy_px`` is the primary image-plane error in the calibrated dispersion or
    stability direction. ``ao_y_steps`` is the cumulative AO travel along the
    same control axis.
    """

    dy_px: float
    d_opl_um: float
    valid: bool = True
    ao_y_steps: int = 0


@dataclass(frozen=True)
class Calibration:
    """Experiment-specific parameters measured before a control run.

    ``tec_c_per_px`` is signed: its sign must match the measured temperature to
    image-motion response for the active instrument configuration.
    """

    tec_c_per_px: float
    tec_step_limit_c: float
    ao_px_per_step: float
    coarse_band_px: float = 0.50
    fine_deadband_px: float = 0.10
    ao_max_steps_per_action: int = 3
    ao_unload_trigger_steps: int = 18


@dataclass(frozen=True)
class Decision:
    kind: ActionKind
    reason: str
    tec_delta_c: float = 0.0
    ao_y_steps: int = 0


def _clamp(value: float, limit: float) -> float:
    return max(-limit, min(limit, value))


def _bounded_steps(value: int, limit: int) -> int:
    return max(-limit, min(limit, value))


class HybridController:
    """Apply a TEC-primary / AO-fine-trim control policy to one sample."""

    def __init__(self, calibration: Calibration) -> None:
        if calibration.ao_px_per_step <= 0:
            raise ValueError("ao_px_per_step must be positive")
        if calibration.fine_deadband_px >= calibration.coarse_band_px:
            raise ValueError("fine_deadband_px must be smaller than coarse_band_px")
        self.calibration = calibration

    def decide(self, sample: Telemetry) -> Decision:
        c = self.calibration

        if not sample.valid:
            return Decision(ActionKind.REJECT, "telemetry failed a quality check")

        error = sample.dy_px
        near_ao_limit = abs(sample.ao_y_steps) >= c.ao_unload_trigger_steps

        # Coarse or persistent error: thermal correction remains the main action.
        if abs(error) >= c.coarse_band_px:
            delta = _clamp(-error * c.tec_c_per_px, c.tec_step_limit_c)
            return Decision(
                ActionKind.TEC_PRIMARY,
                "centroid error is outside the coarse-control band",
                tec_delta_c=delta,
            )

        # Do not allow AO to accumulate indefinitely. Ask the TEC loop to absorb
        # the offset before the fine actuator reaches its travel boundary.
        if near_ao_limit:
            direction = copysign(1.0, sample.ao_y_steps)
            delta = _clamp(-direction * c.tec_step_limit_c, c.tec_step_limit_c)
            return Decision(
                ActionKind.TEC_UNLOAD,
                "AO cumulative travel is near the configured unload threshold",
                tec_delta_c=delta,
            )

        # Fine trim is allowed only after the TEC loop has brought the residual
        # into the sub-coarse regime.
        if abs(error) > c.fine_deadband_px:
            requested_steps = round(-error / c.ao_px_per_step)
            steps = _bounded_steps(requested_steps, c.ao_max_steps_per_action)
            return Decision(
                ActionKind.AO_FINE_TRIM,
                "residual is within the AO fine-trim region",
                ao_y_steps=steps,
            )

        return Decision(ActionKind.HOLD, "residual is inside the fine deadband")


if __name__ == "__main__":
    # Example values only. Replace with a measured calibration for a specific run.
    model = HybridController(
        Calibration(
            tec_c_per_px=0.02,
            tec_step_limit_c=0.05,
            ao_px_per_step=0.15,
        )
    )
    print(model.decide(Telemetry(dy_px=0.28, d_opl_um=0.31, ao_y_steps=4)))
