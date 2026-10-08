const $ = (s, p = document) => p.querySelector(s),
  $$ = (s, p = document) => [...p.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = $("[data-header]"),
  progress = $(".scroll-progress span"),
  menu = $(".menu-button"),
  nav = $(".primary-nav");
function onScroll() {
  header?.classList.toggle("scrolled", scrollY > 24);
  if (progress) {
    const m = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${m > 0 ? Math.min(1, scrollY / m) : 0})`;
  }
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav?.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
});
$$('[role="tablist"]').forEach((list) => {
  const tabs = $$('[role="tab"]', list);
  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", () =>
      tabs.forEach((item) => (item.tabIndex = item === tab ? 0 : -1)),
    );
    tab.addEventListener("keydown", (event) => {
      if (
        ![
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "ArrowUp",
          "Home",
          "End",
        ].includes(event.key)
      )
        return;
      event.preventDefault();
      let next = index;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === "ArrowRight" || event.key === "ArrowDown")
        next = (index + 1) % tabs.length;
      else next = (index - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });
});
const reveals = $$(".reveal");
if (reduced) reveals.forEach((x) => x.classList.add("in-view"));
else {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -5%" },
  );
  reveals.forEach((x) => io.observe(x));
}
const dialog = $(".lightbox");
if (dialog) {
  const image = $("img", dialog),
    caption = $("figcaption", dialog);
  $$("[data-lightbox]").forEach((b) =>
    b.addEventListener("click", () => {
      image.src = b.dataset.lightbox;
      image.alt = $("img", b)?.alt || "";
      caption.textContent = b.dataset.caption || "";
      dialog.showModal();
    }),
  );
  $(".lightbox-close", dialog)?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

const canvas = $(".spectrum-canvas");
if (canvas && !reduced) {
  const ctx = canvas.getContext("2d");
  let w,
    h,
    dpr,
    raf,
    visible = true,
    started = performance.now();
  const thoriumLines = [0.08, 0.16, 0.255, 0.36, 0.485, 0.61, 0.73, 0.84, 0.93];
  const orderLevels = [0.2, 0.39, 0.58, 0.77];

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function gaussian(x, centre, width) {
    const z = (x - centre) / width;
    return Math.exp(-0.5 * z * z);
  }

  function spectralOrder(level, order, shift, color, alpha, lineWidth) {
    ctx.beginPath();
    for (let x = -8; x <= w + 8; x += 4) {
      const nx = x / w;
      const curvature = (nx - 0.5) ** 2 * (18 + order * 3);
      const blaze = 0.72 + 0.28 * Math.cos((nx - 0.5) * Math.PI);
      let emission = 0;
      thoriumLines.forEach((line, index) => {
        const strength = 13 + ((index * 11 + order * 7) % 25);
        emission +=
          gaussian(nx, line + shift / w + order * 0.002, 0.0026) *
          strength *
          blaze;
      });
      const y = h * level + curvature - emission;
      x === -8 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${color},${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function draw(now) {
    if (!visible) return;
    const t = (now - started) / 1000;
    const measuredShift = Math.sin(t * 0.52) * 3.2;
    const scanX = ((t * 0.055) % 1) * w;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";

    ctx.setLineDash([3, 9]);
    ctx.strokeStyle = "rgba(31,121,168,.09)";
    ctx.lineWidth = 1;
    thoriumLines.forEach((line) => {
      const x = line * w;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.1);
      ctx.lineTo(x, h * 0.88);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    orderLevels.forEach((level, order) => {
      spectralOrder(level, order, 0, "31,121,168", 0.18, 2.2);
      spectralOrder(
        level + 0.018,
        order,
        measuredShift,
        "181,111,19",
        0.12,
        1.4,
      );
    });

    const scan = ctx.createLinearGradient(scanX - 55, 0, scanX + 55, 0);
    scan.addColorStop(0, "rgba(81,171,200,0)");
    scan.addColorStop(0.5, "rgba(81,171,200,.08)");
    scan.addColorStop(1, "rgba(81,171,200,0)");
    ctx.fillStyle = scan;
    ctx.fillRect(scanX - 55, h * 0.1, 110, h * 0.78);

    raf = requestAnimationFrame(draw);
  }
  size();
  new ResizeObserver(size).observe(canvas);
  new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    },
    { rootMargin: "100px" },
  ).observe(canvas);
  raf = requestAnimationFrame(draw);
}

const systemData = {
  source: {
    kicker: "01 / Calibration input",
    title: "ThAr light enters the bench",
    text: "The annotated thesis image identifies the calibration-lamp input at the upper-left of the modified bench. It supplies the line-rich spectrum used to monitor detector-plane motion.",
    metric: "MSc thesis Fig. 2.1",
    role: "Calibration source",
  },
  detector: {
    kicker: "02 / Detector",
    title: "The spectrum is recorded here",
    text: "The red detector assembly is identified directly in the thesis figure. Its measured image displacement provides one observable for the later closed-loop development.",
    metric: "Annotated bench record",
    role: "Image measurement",
  },
  collimator: {
    kicker: "03 / Collimator",
    title: "The shared optical path is folded",
    text: "The central collimator participates in the compact double-pass layout. The physical bench view and the Zemax design should be read together: one locates hardware, the other traces rays.",
    metric: "Thesis Fig. 2.1 + Zemax",
    role: "Beam collimation",
  },
  disperser: {
    kicker: "04 / Prisms and grating",
    title: "Cross-dispersion and echelle dispersion",
    text: "The two prisms and grating occupy the right-hand optical train in the annotated bench record. They separate the calibration spectrum into the detector format.",
    metric: "Annotated bench record",
    role: "Spectral dispersion",
  },
  metrology: {
    kicker: "05 / IDS metrology",
    title: "A separate optical-path measurement",
    text: "The IDS3010 path is marked across the lower part of the thesis image. It measures optical-path change for environmental analysis and control research; it is not the detector or reduction pipeline.",
    metric: "MSc thesis Fig. 2.1",
    role: "Displacement metrology",
  },
};
$$("[data-system]").forEach((b) =>
  b.addEventListener("click", () => {
    const d = systemData[b.dataset.system],
      p = $("[data-system-panel]");
    $$("[data-system]").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true");
    if (p && d) {
      p.animate?.(
        [
          { opacity: 0.25, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 260, easing: "ease-out" },
      );
      $("[data-map-kicker]", p).textContent = d.kicker;
      $("[data-map-title]", p).textContent = d.title;
      $("[data-map-text]", p).textContent = d.text;
      $("[data-map-metric]", p).textContent = d.metric;
      $("[data-map-role]", p).textContent = d.role;
    }
  }),
);

const timelineData = {
  2019: {
    title: "Compact architecture documented",
    text: "SPIE papers described the folded optical design, mechanical collimator development and a replicable off-the-shelf approach.",
    image: "assets/optical_design.png",
    alt: "EXOhSPEC Zemax optical design",
  },
  2021: {
    title: "Actively controlled prototype",
    text: "The PASP instrument paper set out the small, fibre-fed, actively controlled spectrograph concept and its measured prototype performance.",
    image: "assets/current.png",
    alt: "EXOhSPEC optical bench",
  },
  2022: {
    title: "Fibre behaviour quantified",
    text: "Tapered graded-index fibre research extended the programme’s work on transmission and modal noise.",
    image: "assets/comsol.png",
    alt: "COMSOL tapered fibre model",
  },
  2024: {
    title: "Telescope, modal-noise and stability work",
    text: "The programme connected fibre agitation studies, Thai National Telescope deployment, and environmental-control experiments on the UH prototype.",
    image: "assets/wrapped_narit.png",
    alt: "EXOhSPEC at the Thai National Telescope",
  },
  2025: {
    title: "Broad-band calibration development",
    text: "A low-cost fused-silica metalon study expanded the calibration strand of the programme.",
    image: "assets/thar-exposure-study.png",
    alt: "EXOhSPEC calibration study",
  },
  2026: {
    title: "Control evidence leads to V25 hardware",
    text: "The CLFCD track now connects V17 endurance and V18 detector tracking to the V19–V24 thermal-diagnostic chain and the V25 sealed TPU camera-airflow prototype.",
    image: "assets/v25_problem_to_design.svg",
    alt: "EXOhSPEC V25 camera thermal-homogenisation concept",
  },
};
$$("[data-timeline-year]").forEach((b) =>
  b.addEventListener("click", () => {
    const d = timelineData[b.dataset.timelineYear],
      p = $("[data-timeline-detail]");
    $$("[data-timeline-year]").forEach((x) =>
      x.setAttribute("aria-selected", "false"),
    );
    b.setAttribute("aria-selected", "true");
    if (p && d) {
      $("[data-year]", p).textContent = b.dataset.timelineYear;
      $("[data-title]", p).textContent = d.title;
      $("[data-text]", p).textContent = d.text;
      const im = $("img", p);
      im.src = d.image;
      im.alt = d.alt;
    }
  }),
);

const researchTimeline = {
  start: {
    date: "October 2023",
    title: "Frame the measurement problem",
    text: "The initial brief connected IDS displacement sensing, the spectrograph output and environmental variables. Before closing a loop, the work had to establish what the inherited instrument measured and which quantities could legitimately be compared.",
    image: "../assets/research/exohspec-internal-annotated.jpg",
  },
  msc: {
    date: "2024",
    title: "Build the measurement chain",
    text: "The MSc phase linked ThAr illumination and detector acquisition to IDS3010 optical-path measurements, environmental sensing and TEC actuation. It established the disturbance-rejection architecture without claiming that every later subsystem had already been validated.",
    image: "../assets/research/thar-orders.jpg",
  },
  debug: {
    date: "2025",
    title: "Characterise, integrate and debug",
    text: "Passive baselines, MaxIm DL/Python acquisition, COM-interface failures, AO direction and hysteresis tests, adaptive and fixed PID trials, 2 mK steps and cooldown logic exposed the delay and configuration dependence of the plant.",
    image: "../../figures/04_environment_temp_pressure.png",
  },
  failures: {
    date: "March–June 2026",
    title: "Treat failure as evidence",
    text: "Stage-2 runs A–E and June V4 revealed fixed-model failure, breakaway, biased references and bounded-actuator limits. A lower RMS could coexist with a displaced mean, so reference selection and actuator history became first-class parts of the result.",
    image: "../../figures/stage2_rms_dy_comparison.svg",
  },
  endurance: {
    date: "V11–V17 · 2026",
    title: "Test sustained, interval-specific control",
    text: "V11 maintained 31.44 h of feedback across 1,604 frames: 100% containment in controller coordinates and 98.63% against the fixed initial reference. V17 later extended the settled interval to 88.59 h across 4,761 frames, with its own stated reference and evaluation window.",
    image: "../../figures/06_nine_panel_stacked.png",
  },
  measurement: {
    date: "Aug 2026",
    title: "Improve the detector measurement",
    text: "Phase correlation progressed to a multi-line ThAr ROI with synchronous PT104 telemetry. V18.2 reached dX RMS 0.0373 px and dY RMS 0.0990 px over 3.98 h feedback.",
    image: "../../figures/01_dXdY_far_combined.png",
  },
  diagnose: {
    date: "Aug–Sep 2026",
    title: "V19–V23 thermal diagnosis",
    text: "A repeating ~33.4 min thermal component motivated camera-TEC, replacement-LK220, controller-gain and coolant-flow experiments. Kp 2.5, PERIOD 2000 ms and pump 75% became the working thermal configuration.",
    image: "../../figures/v8_3_late_drift_forensic.png",
  },
  current: {
    date: "Sep–Oct 2026",
    title: "Turn the hypothesis into a falsifiable test",
    text: "The V24 camera-rotation monitor motivated V25: a proposed low-power push–pull airflow experiment. The mounts are in fabrication, so fit, vibration, powered thermal behaviour and any optical improvement remain unvalidated.",
    image:
      "../../figures/v25_camera_thermal_homogenisation/v25_problem_to_design.svg",
  },
};
$$("[data-research-stage]").forEach((b) =>
  b.addEventListener("click", () => {
    const d = researchTimeline[b.dataset.researchStage],
      p = $("[data-research-detail]");
    $$("[data-research-stage]").forEach((x) =>
      x.setAttribute("aria-selected", "false"),
    );
    b.setAttribute("aria-selected", "true");
    if (p && d) {
      $("[data-date]", p).textContent = d.date;
      $("[data-title]", p).textContent = d.title;
      $("[data-text]", p).textContent = d.text;
      const im = $("img", p);
      im.src = d.image;
      im.alt = d.title;
    }
  }),
);

const diagnosticData = {
  v19: {
    status: "Passive monitor",
    question: "Where does the repeating structure appear?",
    title: "A common ~33.4 min component",
    text: "Across a five-hour passive run, a repeating component appeared in room/AC, LK220, camera, OPL and dY channels. With few cycles, it is a diagnostic signature rather than a unique transfer function.",
    metric: "dY RMS 0.5365 px · OPL p-p 0.335 µm",
    next: "Test the camera TEC as a heat-load intervention.",
    image: "../assets/research/v19-full-run-diagnostic.png",
    alt: "V19 five-hour full-run diagnostic plot showing PT104, LK220, camera, OPL and detector-shift channels",
    caption:
      "V19 Fig. V19.1 · full-run diagnostic from the archived V19–V21 report.",
  },
  v20: {
    status: "TEC intervention",
    question: "Is the detector TEC a substantial thermal load?",
    title: "External body cooling during TEC OFF",
    text: "With the old LK220, switching the camera TEC off allowed the detector to warm while the external body cooled. The phase included a large thermal transition, so it is not a stationary performance comparison.",
    metric: "Direction of heat-load response established",
    next: "Repeat the intervention with the replacement LK220.",
    image: "../assets/research/v20-cooling-chain.png",
    alt: "V20 cooling-chain plot with camera TEC on and oscillating LK220 current and coolant temperature",
    imageSecondary: "../assets/research/v21-cooling-chain.png",
    altSecondary:
      "V21 cooling-chain plot with camera TEC off while LK220 current and coolant temperature continue oscillating",
    caption:
      "V20 Fig. V20.2 and V21 Fig. V21.2 · matched cooling-chain evidence from the archived merged report.",
  },
  v22: {
    status: "Replacement LK220",
    question:
      "Does the replacement cooling configuration remain optically stable?",
    title: "Stable TEC-ON interval, disruptive OFF transition",
    text: "The TEC-ON phase retained every dY sample inside ±0.5 px. Turning the camera TEC off reduced LK220 load but drove a large thermo-optical transition. Operating conditions differed from the old-LK220 run.",
    metric: "dY RMS 0.2125 px · OPL p-p 0.254 µm",
    next: "Separate heat load from controller regulation under one 22 °C campaign.",
    image: "../assets/research/v22-detector-shift.png",
    alt: "V22 detector dX and dY plot across the camera TEC-off transition",
    caption:
      "V22 report §4A · detector shift; dashed line marks camera TEC OFF.",
  },
  v23: {
    status: "Thermal-only campaign",
    question: "Which completed LK220 settings regulate most tightly?",
    title: "Kp 2.5 and PERIOD 2000 ms selected",
    text: "V23 removed detector and IDS telemetry to study the thermal plant directly. Camera TEC OFF reduced coolant heat pickup, but outlet variability remained almost unchanged.",
    metric: "Best completed outlet σ: 0.0493 °C at Kp 2.5",
    next: "Test the coolant-flow trade-off while holding the selected control settings.",
    image: "../assets/research/v23-full-campaign.png",
    alt: "V23 full 18-hour thermal optimisation timeline showing experimental phases and LK220 and camera telemetry",
    caption:
      "V23 full 18 h thermal campaign · source plot 04b from the experiment record.",
  },
  v232: {
    status: "Flow trade-off",
    question: "How much flow is useful before chiller burden dominates?",
    title: "75% pump selected as the balanced default",
    text: "The 80% condition cooled the camera surfaces slightly more, but increased current, duty and heat-sink temperature. The 75% setting captured most of the cooling benefit with less burden.",
    metric: "~1.10 L min⁻¹ at 75% pump",
    next: "Reintroduce detector and OPL monitoring at the fixed operating point.",
    image: "../assets/research/v23-2-flow-75.png",
    alt: "V23.2 75 percent pump-flow experiment showing LK220 and camera thermal channels",
    caption:
      "V23.2 FLOW C · the selected 75% pump condition, not an unrelated metrology photograph.",
  },
  v24: {
    status: "Passive optical monitor",
    question: "What changes after the 180° camera reorientation?",
    title: "Spatial gradients remained while dY and OPL moved",
    text: "During the early ~28 min interval, dY reached about +0.64 px and OPL changed by about −0.32 µm. The detector and coolant stayed near their controlled values, but external camera regions were not isothermal.",
    metric: "~+0.64 px dY · ~−0.32 µm OPL",
    next: "Test camera-body homogenisation with removable side-vent airflow.",
    image: "../assets/research/v24-camera-rotation.jpg",
    alt: "EXOhSPEC camera and probe arrangement photographed for the V24 180-degree rotation setup",
    caption:
      "V24 setup record · camera region after the 180° reorientation, 21 September 2026.",
  },
};
$$("[data-diagnostic-stage]").forEach((button) =>
  button.addEventListener("click", () => {
    const d = diagnosticData[button.dataset.diagnosticStage],
      panel = $("[data-diagnostic-panel]");
    if (!d || !panel) return;
    $$("[data-diagnostic-stage]").forEach((item) =>
      item.setAttribute("aria-selected", "false"),
    );
    button.setAttribute("aria-selected", "true");
    $("[data-diagnostic-status]", panel).textContent = d.status;
    $("[data-diagnostic-question]", panel).textContent = d.question;
    $("[data-diagnostic-title]", panel).textContent = d.title;
    $("[data-diagnostic-text]", panel).textContent = d.text;
    $("[data-diagnostic-metric]", panel).textContent = d.metric;
    $("[data-diagnostic-next]", panel).textContent = d.next;
    $("[data-diagnostic-caption]", panel).textContent = d.caption;
    const image = $("[data-diagnostic-image]", panel),
      secondary = $("[data-diagnostic-image-secondary]", panel),
      media = $(".diagnostic-media", panel);
    image.src = d.image;
    image.alt = d.alt;
    if (secondary) {
      if (d.imageSecondary) {
        secondary.src = d.imageSecondary;
        secondary.alt = d.altSecondary || "";
        secondary.hidden = false;
        media?.classList.add("has-secondary");
      } else {
        secondary.hidden = true;
        secondary.removeAttribute("src");
        secondary.alt = "";
        media?.classList.remove("has-secondary");
      }
    }
  }),
);

const pubSearch = $("[data-publication-search]");
pubSearch?.addEventListener("input", () => {
  const q = pubSearch.value.toLowerCase().trim();
  $$(".publication-list li").forEach(
    (li) => (li.hidden = !li.textContent.toLowerCase().includes(q)),
  );
});

const recordList = $("[data-record-list]");
if (recordList) {
  const base = recordList.dataset.base || "";
  let records = [],
    active = "all";
  const render = () => {
    const q = ($("[data-record-search]")?.value || "").toLowerCase().trim();
    const shown = records.filter(
      (r) =>
        (active === "all" || r.classification === active) &&
        (!q ||
          `${r.date} ${r.filename} ${r.classification} ${r.first_page_preview || ""}`
            .toLowerCase()
            .includes(q)),
    );
    $("[data-record-count]").textContent =
      `${shown.length} of ${records.length} records`;
    recordList.innerHTML =
      shown
        .map(
          (r) =>
            `<article class="record"><time>${r.date || "undated"}</time><div><h3>${r.filename}</h3><p>${r.classification.replaceAll("-", " ")} · ${r.pages} page${r.pages === 1 ? "" : "s"}${r.duplicate_count > 1 ? ` · ${r.duplicate_count} identical copies` : ""}</p></div><a href="${base}${encodeURI(r.relative_path)}" target="_blank" rel="noopener">Open PDF</a></article>`,
        )
        .join("") || "<p>No matching records.</p>";
  };
  fetch(`${base}research-record/pdf-inventory.json`)
    .then((r) => r.json())
    .then((d) => {
      records = d.records.sort((a, b) =>
        (b.date || "").localeCompare(a.date || ""),
      );
      render();
    })
    .catch(() => {
      recordList.innerHTML =
        "<p>The PDF index could not be loaded. Open this page through the website server rather than directly from disk.</p>";
    });
  $("[data-record-search]")?.addEventListener("input", render);
  $$("[data-record-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      active = b.dataset.recordFilter;
      $$("[data-record-filter]").forEach((x) =>
        x.setAttribute("aria-pressed", "false"),
      );
      b.setAttribute("aria-pressed", "true");
      render();
    }),
  );
}
