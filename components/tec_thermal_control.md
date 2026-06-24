# TEC thermal control and step-response characterisation

## 1. Role in EXOhSPEC

The thermo-electric controller (TEC) is the primary actuator for slow and persistent drift. Its task is to regulate the temperature of the controlled enclosure or component so that thermal expansion, air-index change and downstream image motion remain within an acceptable range.

The feedback error is:

$$
e_T(t)=T_{\mathrm{ref}}(t)-T_{\mathrm{meas}}(t).
$$

A generic PID controller forms a command:

$$
u(t)=K_Pe_T(t)+K_I\int_0^t e_T(\tau)\,d\tau+K_D\frac{de_T(t)}{dt}.
$$

The public equation describes the control principle only. It does not disclose the tuned gains, safety bounds, controller channels or operational setpoint schedule.

## 2. Characterisation experiment: thermal step response

The relevant experiment is a controlled setpoint perturbation. A small known thermal change is applied while recording:

- controlled temperature and independent thermal channels;
- OPL from the interferometer;
- image-plane error from centroid tracking;
- environmental telemetry;
- elapsed time from command to observable response.

The experiment answers practical questions that matter more than an ideal PID plot:

1. How long does the physical system take to react?
2. Does the response overshoot or remain monotonic?
3. Which measured quantity responds first: local temperature, OPL or centroid?
4. Does a temperature correction have the same sign and gain in the current run as it did during calibration?

A useful reduced model is a first-order plant with delay:

$$
G_T(s)=\frac{K_T\,e^{-\tau_d s}}{\tau_Ts+1},
$$

where $K_T$ is the effective thermal gain, $\tau_T$ is the thermal time constant and $\tau_d$ is the delay before the relevant optical response becomes visible.

## 3. What the experiments established

The thermal loop can achieve strong regulation of its controlled temperature, but the optical response is slower and more complicated than the controller setpoint alone. This is expected in a distributed enclosure: heat must propagate through air, mounts and optical components before its effect on OPL or the detector centroid becomes measurable.

The practical consequence is that an aggressive controller can react to a past state and produce overshoot. A very conservative controller can be stable but too slow to reject a new disturbance. This is why the architecture keeps the TEC as the coarse actuator and does not expect it to correct fast centroid excursions on its own.

## 4. Control implication

The TEC should be evaluated using both thermal and optical criteria:

- temperature standard deviation and peak-to-peak range;
- response delay, rise time and settling time after a defined step;
- OPL trend before and after correction;
- centroid recovery after the thermal response has propagated;
- command count and command-size distribution.

A model-derived or OPL-derived feed-forward term can improve response, but only when the run-specific gain and sign have passed a quality check. When the system is strongly disturbed, a command may need to be delayed or reduced rather than applied immediately.

## 5. Public boundary

The public repository includes a portable temperature-logging example in [`../code/tec_temperature_monitor.py`](../code/tec_temperature_monitor.py). It does not include the full operational control program, tuned PID values, thermal safety limits, channel numbering, device address, communications setup, hardware interlocks or experiment-specific control schedules.