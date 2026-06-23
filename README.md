# Closed-Loop Feedback Control System for EXOhSPEC

**MSc Astrophysics Thesis · University of Hertfordshire · 2024**  
**Author:** Biswajit Jana  
**Supervisors:** Prof Hugh R. A. Jones and Prof Bill Martin

## Overview

EXOhSPEC is a high-resolution spectrograph development platform for precision radial-velocity applications. This thesis examined how environmental conditions influence optical path length and detector-plane stability, and developed a closed-loop approach for reducing image drift through environmental monitoring and thermal control.

## Thesis focus

The work combined measurements of temperature, pressure and humidity with optical-path-length and guider information to study spectrograph stability. The project investigated:

- environmental monitoring within and around the spectrograph enclosure;
- refractive-index and optical-path-length behaviour;
- thermal control using a Meerstetter TEC controller;
- detector-plane drift measured through MaxIm DL guider data;
- Python-based acquisition, logging and analysis;
- feedback strategies for stabilising the spectral image.

## Experimental instrumentation

| Component | Role |
|---|---|
| EXOhSPEC | High-resolution spectrograph platform |
| Meerstetter TEC controller | Thermal setpoint control |
| BME680 and environmental sensors | Temperature, pressure and humidity monitoring |
| IDS3010 interferometer | Optical-path-length measurement |
| MaxIm DL guider | Detector-plane drift measurement |
| Python and Jupyter notebooks | Data acquisition, control and analysis |

## Research context

Precision radial-velocity spectroscopy is sensitive to changes in optical alignment and optical path length. The thesis considered a practical control route based on measured environmental behaviour rather than relying solely on vacuum isolation. The resulting work established the measurement and analysis framework used in later EXOhSPEC stability experiments.

## Repository scope

This repository is a concise public record of the MSc project. It will contain selected thesis material and approved presentation outputs. Detailed laboratory configurations, raw experimental data, internal controller development, and working research records are maintained separately.

## Contact

**Biswajit Jana**  
MSc Astrophysics, University of Hertfordshire

## Seminar presentations

- [State of Art: Radial Velocity Spectrograph](Poster%20Presentation%20and%20Seminar/Seminar1-State%20of%20Art_%20Radial%20Velocity%20Spectrograph.pdf)
- [Advancements in Precision: LASER Interferometer Control System](Poster%20Presentation%20and%20Seminar/Seminar%202%20-%20Advancements%20in%20Precision_LASER%20Interferometer%20Control%20Systempdf.pdf)
- [Optimising Path Length Stability in Laser Interferometers using Air Refractive Index](Poster%20Presentation%20and%20Seminar/Seminar%203%20-%20Optimizing%20Path%20Length%20Stability%20in%20Laser%20Interferometers%20using%20Air%20Refractive%20Index.pdf)
- [High-Resolution RV Spectrographs: ANDES and PID Loop Implementation in EXOhSPEC](Poster%20Presentation%20and%20Seminar/Seminar%204%20-High-Resolution%20RV%20Spectrographs_ANDES%20and%20PID%20Loop%20Implementation%20in%20EXOhSPEC%20.pdf)
