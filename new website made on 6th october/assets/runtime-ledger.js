const runtimeSummaryRoots = document.querySelectorAll("[data-runtime-summary]");
const runtimeLedgerBody = document.querySelector("[data-runtime-ledger-body]");
const runtimePendingList = document.querySelector("[data-runtime-pending]");

if (runtimeSummaryRoots.length || runtimeLedgerBody || runtimePendingList) {
  const ledgerUrl = new URL("data/runtime-ledger.json", window.location.href);
  let runtimeRows = [];
  let activeRuntimeFilter = "all";

  const intervalCategory = (scope) => {
    const value = scope.toLowerCase();
    if (value.includes("settled")) return "settled";
    if (value.includes("passive") || value.includes("on + 2 h off")) {
      return "passive";
    }
    if (value.includes("feedback") || value.includes("mimo")) {
      return "feedback";
    }
    return "full";
  };

  const setText = (root, selector, value) => {
    const target = root.querySelector(selector);
    if (target) target.textContent = value;
  };

  const updateSummaries = (data) => {
    const hours = data.counted_intervals.reduce(
      (total, row) => total + Number(row.documented_hours),
      0,
    );
    const days = hours / 24;
    runtimeSummaryRoots.forEach((root) => {
      setText(root, "[data-runtime-hours]", hours.toFixed(2));
      setText(root, "[data-runtime-days]", days.toFixed(2));
      setText(
        root,
        "[data-runtime-count]",
        String(data.counted_intervals.length),
      );
      setText(root, "[data-runtime-snapshot]", data.snapshot_date);
      root.removeAttribute("aria-busy");
    });
  };

  const cell = (text, className = "") => {
    const td = document.createElement("td");
    td.textContent = text;
    if (className) td.className = className;
    return td;
  };

  const renderRuntimeRows = () => {
    if (!runtimeLedgerBody) return;
    const shown = runtimeRows.filter(
      (row) =>
        activeRuntimeFilter === "all" || row.category === activeRuntimeFilter,
    );
    runtimeLedgerBody.replaceChildren();
    shown.forEach((row) => {
      const tr = document.createElement("tr");
      const run = document.createElement("th");
      run.scope = "row";
      run.textContent = row.run_id;
      tr.append(
        run,
        cell(row.date_or_period),
        cell(Number(row.documented_hours).toFixed(2), "numeric"),
        cell(row.interval_scope),
        cell(row.audit_status),
      );
      const source = document.createElement("td");
      const link = document.createElement("a");
      link.href = row.source_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Open report";
      source.append(link);
      tr.append(source);
      runtimeLedgerBody.append(tr);
    });
    const count = document.querySelector("[data-runtime-visible-count]");
    if (count)
      count.textContent = `${shown.length} of ${runtimeRows.length} intervals`;
  };

  const renderPending = (records) => {
    if (!runtimePendingList) return;
    runtimePendingList.replaceChildren();
    records.forEach((record) => {
      const article = document.createElement("article");
      const label = document.createElement("span");
      label.className = "status";
      label.textContent = "Not counted";
      const title = document.createElement("h3");
      title.textContent = record.run_id;
      const metric = document.createElement("strong");
      metric.textContent = `~${Number(record.documented_hours).toFixed(2)} h reported`;
      const reason = document.createElement("p");
      reason.textContent = record.why_not_counted;
      const link = document.createElement("a");
      link.className = "text-link";
      link.href = record.source_url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Inspect source";
      article.append(label, title, metric, reason, link);
      runtimePendingList.append(article);
    });
  };

  fetch(ledgerUrl)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Ledger request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      runtimeRows = data.counted_intervals.map((row) => ({
        ...row,
        category: intervalCategory(row.interval_scope),
      }));
      updateSummaries(data);
      renderRuntimeRows();
      renderPending(data.not_yet_counted_candidates || []);
      const status = document.querySelector("[data-runtime-status]");
      if (status) status.textContent = data.status;
    })
    .catch(() => {
      runtimeSummaryRoots.forEach((root) => {
        root.removeAttribute("aria-busy");
        setText(root, "[data-runtime-hours]", "Unavailable");
        setText(root, "[data-runtime-days]", "Unavailable");
        setText(root, "[data-runtime-count]", "Unavailable");
      });
      if (runtimeLedgerBody) {
        const row = document.createElement("tr");
        const message = document.createElement("td");
        message.colSpan = 6;
        message.textContent =
          "The runtime ledger could not be loaded. Use the CSV download or reload the hosted page.";
        row.append(message);
        runtimeLedgerBody.replaceChildren(row);
      }
    });

  document.querySelectorAll("[data-runtime-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeRuntimeFilter = button.dataset.runtimeFilter;
      document.querySelectorAll("[data-runtime-filter]").forEach((item) => {
        item.setAttribute("aria-pressed", "false");
      });
      button.setAttribute("aria-pressed", "true");
      renderRuntimeRows();
    });
  });
}
