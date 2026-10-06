# EXOhSPEC research-record archive

**Author and curator:** Biswajit Jana  
**Supervisors:** Prof Hugh R. A. Jones and Prof Bill Martin  
**Archive assembled:** 6 October 2026

This directory provides the evidence base for the redesigned EXOhSPEC scientific website. It combines relevant PDF reports located in the researcher's Downloads folder with PDF attachments from sent Gmail messages addressed to Bill Martin and/or Hugh Jones.

## Contents

- `pdf-reports/email-sent/` — 41 original PDF attachments recovered from relevant sent messages.
- `pdf-reports/downloads-reviewed/` — 20 relevant local PDFs, deduplicated within the Downloads source by SHA-256.
- `pdf-inventory.json` — page count, byte size, SHA-256, research classification, first-page text preview and duplicate count for all 61 archived copies.
- `email-sent-index.json` — minimal message provenance: date, subject, recipients, attachment name and Gmail message ID. Email body text and signed download URLs are deliberately excluded.
- `A-Z-RESEARCH-STORY.md` — concise chronological interpretation of the research programme.

## Reading rule

This is a historical record, not a flat collection of equally current conclusions. Later calibration or diagnostic work can supersede an earlier interpretation. Website claims should therefore identify whether evidence is **measured**, **modelled**, **interpreted**, or **proposed**, and should specify the evaluated interval.

## Integrity

The inventory currently records 61 PDFs, 54 unique contents by SHA-256 and zero PDF parse failures. Rebuild it with `../tools/build_pdf_inventory.py` after adding or removing reports.
