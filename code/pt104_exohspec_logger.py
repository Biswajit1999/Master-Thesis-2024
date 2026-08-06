"""
pt104_exohspec_logger.py

Real-time 4-channel PT-104 RTD data logger for the EXOhSPEC Stage-2 environmental
monitoring pipeline (University of Hertfordshire, Centre for Astrophysics Research).

Wraps Pico Technology's official `picosdk` Python bindings for the USB PT-104,
using the same open/configure/read pattern as their reference example
(`pt104Examples/pt104Example.py` in picotech/picosdk-python-wrappers), adapted here
for continuous logging with per-channel physical labels, retry-on-not-ready
handling, and CSV output.

Attribution
-----------
The PT-104 open/configure/read sequence (UsbPt104OpenUnit -> UsbPt104SetMains ->
UsbPt104SetChannel -> UsbPt104GetValue) follows Pico Technology's own example code:
    https://github.com/picotech/picosdk-python-wrappers/blob/master/pt104Examples/pt104Example.py
    Copyright (C) 2022 Pico Technology Ltd.

The `picosdk` package itself is:
    Copyright (c) 2019 Pico Technology Ltd.
    Licensed under the ISC-style license in picosdk-python-wrappers/LICENSE.md
    ("Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.")

This file is an original derivative work built on top of that public API — it does
not copy Pico's example code verbatim, but follows the same driver call sequence
they document and require. If contributing this back upstream (e.g. as an
additional pt104Examples/ script), keep the copyright/permission notice above
intact per the license terms, and add your own authorship line below.

Author
------
Biswajit Jana, EXOhSPEC Stage-2 (V18.2), University of Hertfordshire
Date: 2026-08-06

Requirements
------------
- PicoSDK C driver (usbpt104.dll / libusbpt104), installed separately from
  https://www.picotech.com/downloads -- `pip install picosdk` only installs the
  Python bindings, not the driver itself.
- `pip install picosdk`
- Windows note: an already-running Python/Jupyter process keeps a stale copy of
  PATH in memory, so if the driver was installed after your interpreter started,
  you must either restart the interpreter or manually prepend the driver's lib
  directory to `os.environ["PATH"]` (done automatically below).
- Only one process can hold the PT-104 open at a time -- close/pause PicoLog's
  own software before running this script.
"""

import os

# Prepend the PicoSDK driver directory so `picosdk` can find usbpt104.dll even in
# an interpreter session that started before the driver was installed.
_PICOSDK_LIB_DIR = r"C:\Program Files\Pico Technology\SDK\lib"
if _PICOSDK_LIB_DIR not in os.environ.get("PATH", ""):
    os.environ["PATH"] = _PICOSDK_LIB_DIR + os.pathsep + os.environ.get("PATH", "")

import ctypes
import csv
import time
from datetime import datetime

from picosdk.usbPT104 import usbPt104 as pt104
from picosdk.functions import assert_pico_ok

# --- Device configuration -----------------------------------------------------
WIRES = 4            # 4-wire RTD connection (most accurate; matches Pico's own example)
MAINS_REJECTION = 0  # 0 = 50 Hz mains rejection filter (UK); 1 = 60 Hz

# Physical channel -> probe location, as wired on the EXOhSPEC bench (confirmed
# against the live PicoLog software's own channel labels, 2026-08-06):
PT104_LABELS = {
    "USBPT104_CHANNEL_1": "CAMERA_MOUNT",
    "USBPT104_CHANNEL_2": "Near_cooling_TEC",
    "USBPT104_CHANNEL_3": "Towards_AC",     # co-located with the old BME sensor position
    "USBPT104_CHANNEL_4": "grating_mount",
}


def open_pt104():
    """Open the PT-104 unit and configure all 4 channels as 4-wire PT100 RTDs.

    Returns the ctypes device handle. The device needs a few seconds after this
    call before its first round-robin conversion cycle completes -- callers
    should not call read_PT104() immediately afterwards.
    """
    chandle = ctypes.c_int16()
    assert_pico_ok(pt104.UsbPt104OpenUnit(ctypes.byref(chandle), 0))
    assert_pico_ok(pt104.UsbPt104SetMains(chandle, MAINS_REJECTION))
    for ch_name in PT104_LABELS:
        channel = pt104.PT104_CHANNELS[ch_name]
        data_type = pt104.PT104_DATA_TYPE["USBPT104_PT100"]
        assert_pico_ok(pt104.UsbPt104SetChannel(chandle, channel, data_type, WIRES))
    print("OK PT104 opened, 4 channels configured")
    time.sleep(3)  # let the first round-robin conversion cycle complete
    return chandle


def read_PT104(chandle, filtered=1, retries=3, retry_delay_s=1.0):
    """Read all 4 channels, in degrees C, keyed by physical location label.

    A channel that hasn't finished its internal conversion yet returns
    PICO_NO_SAMPLES_AVAILABLE rather than a value -- this is retried a few times
    (not an error) before giving up and returning NaN for that channel.
    """
    out = {}
    for ch_name, label in PT104_LABELS.items():
        channel = pt104.PT104_CHANNELS[ch_name]
        value = float("nan")
        for _ in range(retries):
            measurement = ctypes.c_int32()
            status = pt104.UsbPt104GetValue(chandle, channel, ctypes.byref(measurement), filtered)
            if status == 0:  # PICO_OK
                value = measurement.value / 1000.0  # driver returns millidegrees C
                break
            time.sleep(retry_delay_s)
        out[label] = value
    return out


def close_pt104(chandle):
    """Release the PT-104 so other software (e.g. PicoLog) can reconnect to it."""
    pt104.UsbPt104CloseUnit(chandle)


def run_continuous_logger(interval_s=60, out_path=None):
    """Standalone continuous logger: one row per interval, all 4 channels + timestamp.

    interval_s=60 matches the cadence previously used with PicoLog's own software
    for this unit -- comfortably longer than the ~4s it takes to read all 4
    channels, so there is no risk of falling behind.
    """
    if out_path is None:
        out_path = f"pt104_log_{datetime.now():%Y%m%d_%H%M%S}.csv"

    handle = open_pt104()
    try:
        with open(out_path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["timestamp"] + list(PT104_LABELS.values()))
            while True:
                temps = read_PT104(handle)
                row = [datetime.now().isoformat()] + [temps[label] for label in PT104_LABELS.values()]
                writer.writerow(row)
                f.flush()
                print(row)
                time.sleep(interval_s)
    except KeyboardInterrupt:
        print("Stopped by user.")
    finally:
        close_pt104(handle)


if __name__ == "__main__":
    run_continuous_logger()
