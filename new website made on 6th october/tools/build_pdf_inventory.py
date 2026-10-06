from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
REPORT_ROOT = ROOT / "research-record" / "pdf-reports"
OUTPUT = ROOT / "research-record" / "pdf-inventory.json"


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    value = value.replace("\u2011", "-")
    value = re.sub(r"[\w.+-]+@[\w.-]+", "[email redacted]", value)
    return re.sub(r"\s+", " ", value).strip()


def classify(name: str, preview: str) -> str:
    text = f"{name} {preview}".lower()
    if any(term in text for term in ("editorial", "readiness", "gptzero", "critique", "peer-review")):
        return "review-and-quality-assurance"
    if any(term in text for term in ("v25", "fan", "thermal homogen")):
        return "camera-thermal-management"
    if any(term in text for term in ("v19", "v20", "v21", "v18", "v17")):
        return "controller-lineage-v17-v21"
    if any(term in text for term in ("stage2", "stage 2", "story_time", "24 hour", "new24h", "bubble", "hybrid control")):
        return "stage-2-hybrid-control"
    if any(term in text for term in ("opl_model", "opl model", "equations_models", "sim_v4", "replay")):
        return "environmental-opl-modelling"
    if any(term in text for term in ("active optic", "ao step", "two ao", "pixel per step", "phase correlation")):
        return "active-optics-and-centroiding"
    if any(term in text for term in ("master", "thesis", "initial plan", "sample chapter", "temperature data")):
        return "thesis-foundations"
    if "interferometer" in text:
        return "interferometer-infrastructure"
    return "experimental-record"


records = []
for path in sorted(REPORT_ROOT.rglob("*.pdf")):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    try:
        reader = PdfReader(str(path))
        pages = len(reader.pages)
        preview = clean_text(reader.pages[0].extract_text() if pages else "")[:1400]
        title = clean_text((reader.metadata or {}).get("/Title"))
        error = None
    except Exception as exc:  # preserve the file in the inventory even when parsing fails
        pages = None
        preview = ""
        title = ""
        error = f"{type(exc).__name__}: {exc}"

    relative = path.relative_to(ROOT).as_posix()
    date_match = re.match(r"(\d{4}-\d{2}-\d{2})_", path.name)
    record = {
        "date": date_match.group(1) if date_match else None,
        "filename": path.name,
        "relative_path": relative,
        "collection": path.parent.name,
        "bytes": path.stat().st_size,
        "sha256": digest,
        "pages": pages,
        "pdf_title": title or None,
        "classification": classify(path.name, preview),
        "first_page_preview": preview,
        "parse_error": error,
    }
    records.append(record)

hash_counts = {}
for record in records:
    hash_counts[record["sha256"]] = hash_counts.get(record["sha256"], 0) + 1
for record in records:
    record["duplicate_count"] = hash_counts[record["sha256"]]

summary = {
    "generated_for": "EXOhSPEC A-Z research record",
    "author": "Biswajit Jana",
    "generated_date": "2026-10-06",
    "report_count": len(records),
    "unique_content_count": len(hash_counts),
    "parse_error_count": sum(bool(record["parse_error"]) for record in records),
    "records": records,
}

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps({key: value for key, value in summary.items() if key != "records"}, indent=2))
