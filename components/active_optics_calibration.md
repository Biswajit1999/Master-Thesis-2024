# Active-optics calibration and fine-trim role

## 1. Role in EXOhSPEC

Active optics (AO) provides the fast, local image-plane correction in the hybrid architecture. It is not intended to correct every long-term disturbance. Its job is to reduce a small residual after the slower thermal loop has brought the spectrograph close enough to the desired state.

The centroid error is:

$$
\mathbf{e}_k =
\begin{bmatrix}
dX_k \\
dY_k
\end{bmatrix}.
$$

A local actuator calibration relates commanded AO steps to image-plane motion:

$$
\mathbf{e}_k \approx \mathbf{M}_{\mathrm{AO}}\mathbf{s}_k,
$$

where $\mathbf{s}_k$ is the two-axis AO command and $\mathbf{M}_{\mathrm{AO}}$ is measured experimentally. The ideal corrective command is:

$$
\mathbf{s}_k^{\ast}=-\mathbf{M}_{\mathrm{AO}}^{-1}\mathbf{e}_k.
$$

In practice, commands are rounded, bounded per update and bounded again by total available travel.

## 2. Characterisation experiment: step, direction and return tests

The AO unit was characterised by applying controlled movements in the cardinal directions and measuring the resulting detector centroid displacement. Repeated movements and return-to-centre tests were used to assess:

- response magnitude per command step;
- coupling between nominal axes;
- directional asymmetry;
- repeatability and return behaviour;
- whether cumulative movement approached a practical travel limit.

The study demonstrated that AO is capable of fine image-plane correction, but the response must be calibrated empirically rather than assumed to be perfectly symmetric or perfectly linear.

## 3. Why the calibration matters

A raw pixel error is not an AO command. The mapping depends on the optical path, orientation and actuator response. A direction error, sign error or unmodelled cross-axis term can push the image farther from the reference.

A basic quality check compares the predicted and observed residual after a move:

$$
\mathbf{e}_{\mathrm{pred},k+1}=
\mathbf{e}_k+\mathbf{M}_{\mathrm{AO}}\mathbf{s}_k.
$$

If the measured response differs substantially from the prediction, the controller should reduce its authority, flag the event and avoid blindly repeating the same correction.

## 4. Control implication

The component study established the correct division of labour:

- **TEC:** coarse and persistent drift, with a delayed but larger sustainable authority;
- **AO:** small residual error, fast local pull-back and recovery;
- **unloading:** sustained AO offset is handed back to the thermal loop before fine-control travel is exhausted.

This avoids a common hybrid-control failure mode: allowing the fast actuator to become a long-term drift integrator. That may look effective initially but it eventually consumes available travel and leaves no margin for genuine fine correction.

## 5. Public boundary

The public report does not include the measured calibration matrix, step table, firmware or serial protocol, actuator travel range, reversal procedure, target coordinates or per-run thresholds. The public scientific conclusion is that fine correction must be empirical, bounded and monitored for cumulative range usage.