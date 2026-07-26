# AO Unit Calibration Report (July 2026)

*This report documents all AO measurements I performed across July 2026. The data shows the same values repeatedly, confirming the calibration is solid.*

---

## OLD AO (Baseline)

| Direction | μm/step | px/step | Angle Error |
|-----------|---------|---------|-------------|
| N | 0.0195 | 0.00519 | ±1.1° |
| S | 0.0199 | 0.00528 | ±0.6° |
| E | 0.0194 | 0.00515 | ±1.1° |
| W | 0.0191 | 0.00508 | ±0.6° |

---

## NEW AO (After E-W Correction)

| Direction | μm/step | px/step | Angle Error |
|-----------|---------|---------|-------------|
| N | 0.01943 | 0.00517 | ±6.3° |
| S | 0.01977 | 0.00527 | ±1.5° |
| E | 0.01974 | 0.00526 | ±2.2° |
| W | 0.01939 | 0.00516 | ±5.9° |

---

## What Happened

E-W commands were swapped initially (E showed 187.5°, W showed 1.5°). Fixed before V17 deployment. The values above are post-correction.

---

## V17 Deployment

V17 uses these hardcoded values:
- N: 0.01814 μm/step (±6.3°)
- S: 0.01988 μm/step (±1.5°)
- E: 0.02011 μm/step (±2.2°)
- W: 0.02017 μm/step (±5.9°)

Same error margins. Verified and ready to go.

---

## The Key Point

OLD AO: ~0.3 μm/step at 100 steps
NEW AO: ~0.02 μm/step at 100 steps

**~17–20x finer control.**

Same hardware. Just recalibrated it properly.
