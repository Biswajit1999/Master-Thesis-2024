"""Minimal Meerstetter TEC temperature monitor.

Adapted from the thesis development notebooks into a portable command-line
script. It records the controller setpoint and measured object temperature to a
CSV file. The serial port, target setpoint and timing are supplied at runtime;
nothing laboratory-specific is committed to the repository.

Example
-------
python tec_temperature_monitor.py --port COM3 --setpoint-c 22.0 \
    --duration-min 30 --interval-s 60 --csv tec_log.csv
"""

from __future__ import annotations

import argparse
import csv
import time
from datetime import datetime, timezone
from pathlib import Path

from mecom import MeComSerial

TARGET_PARAMETER = "Target Object Temperature"
MEASURED_PARAMETER = "Object Temperature"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Log a Meerstetter TEC temperature channel.")
    parser.add_argument("--port", required=True, help="Serial port, for example COM3 or /dev/ttyUSB0")
    parser.add_argument("--setpoint-c", type=float, required=True, help="Target object temperature in degrees C")
    parser.add_argument("--duration-min", type=float, default=10.0, help="Monitoring duration in minutes")
    parser.add_argument("--interval-s", type=float, default=60.0, help="Sampling interval in seconds")
    parser.add_argument("--csv", type=Path, default=Path("tec_temperature_log.csv"), help="Output CSV path")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.duration_min <= 0 or args.interval_s <= 0:
        raise ValueError("duration and interval must be positive")

    end_time = time.monotonic() + args.duration_min * 60.0
    args.csv.parent.mkdir(parents=True, exist_ok=True)

    with MeComSerial(serialport=args.port) as tec, args.csv.open("w", newline="", encoding="utf-8") as handle:
        address = tec.identify()
        success = tec.set_parameter(value=args.setpoint_c, parameter_name=TARGET_PARAMETER, address=address)
        if not success:
            raise RuntimeError("TEC controller did not accept the requested setpoint")

        writer = csv.DictWriter(
            handle,
            fieldnames=["timestamp_utc", "setpoint_c", "measured_c", "controller_address"],
        )
        writer.writeheader()

        while time.monotonic() < end_time:
            measured_c = tec.get_parameter(parameter_name=MEASURED_PARAMETER, address=address)
            row = {
                "timestamp_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                "setpoint_c": args.setpoint_c,
                "measured_c": measured_c,
                "controller_address": address,
            }
            writer.writerow(row)
            handle.flush()
            print(f"{row['timestamp_utc']} | set={args.setpoint_c:.3f} C | measured={measured_c:.3f} C")
            time.sleep(args.interval_s)


if __name__ == "__main__":
    main()
