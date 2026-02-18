#!/usr/bin/env python3
# Auto-translate selected site content EN -> ES using Argos Translate.
# Designed for GitHub Actions (no API keys, offline translation).

from __future__ import annotations

import json
import re
from pathlib import Path

FROM_CODE = "en"
TO_CODE = "es"

# --- Argos Translate import (installed in the workflow)
import argostranslate.package
import argostranslate.translate


PROTECT_PATTERNS = [
    # fenced code blocks
    re.compile(r"```[\s\S]*?```", re.MULTILINE),
    # liquid tags
    re.compile(r"{%[\s\S]*?%}", re.MULTILINE),
    re.compile(r"{{[\s\S]*?}}", re.MULTILINE),
    # HTML tags (keeps attributes untouched)
    re.compile(r"<[^>]+>", re.MULTILINE),
    # math (KaTeX / LaTeX)
    re.compile(r"\$\$[\s\S]*?\$\$", re.MULTILINE),
    re.compile(r"\$[^\$\n]+\$", re.MULTILINE),
    # inline code
    re.compile(r"`[^`\n]+`"),
]

PH_PREFIX = "<<<PH_"
PH_SUFFIX = ">>>"

def ensure_argos_language(from_code: str = FROM_CODE, to_code: str = TO_CODE) -> None:
    argostranslate.package.update_package_index()
    available = argostranslate.package.get_available_packages()
    pkg = None
    for p in available:
        if p.from_code == from_code and p.to_code == to_code:
            pkg = p
            break
    if pkg is None:
        raise RuntimeError(f"No Argos package found for {from_code}->{to_code}")
    # Install only if not already installed
    installed = argostranslate.translate.get_installed_languages()
    installed_pairs = {(l.code, t.code) for l in installed for t in l.translations}
    if (from_code, to_code) not in installed_pairs:
        path = pkg.download()
        argostranslate.package.install_from_path(path)

def protect(text: str):
    # Replace protected substrings with placeholders and return (protected_text, table).
    table = []
    protected = text

    def _sub(match):
        idx = len(table)
        table.append(match.group(0))
        return f"{PH_PREFIX}{idx}{PH_SUFFIX}"

    # Apply patterns iteratively
    for pat in PROTECT_PATTERNS:
        protected = pat.sub(_sub, protected)

    return protected, table

def unprotect(text: str, table):
    out = text
    for idx, val in enumerate(table):
        out = out.replace(f"{PH_PREFIX}{idx}{PH_SUFFIX}", val)
    return out

def translate_text(text: str) -> str:
    return argostranslate.translate.translate(text, FROM_CODE, TO_CODE)

def split_front_matter(md: str):
    lines = md.splitlines(True)
    if not lines or lines[0].strip() != "---":
        return "", md
    # find closing ---
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            front = "".join(lines[:i+1])
            body = "".join(lines[i+1:])
            return front, body
    return "", md  # fallback

def translate_markdown(md: str) -> str:
    front, body = split_front_matter(md)
    body_protected, table = protect(body)
    body_es = translate_text(body_protected)
    body_es = unprotect(body_es, table)
    return front + body_es

def translate_json(obj):
    if isinstance(obj, str):
        protected, table = protect(obj)
        out = translate_text(protected)
        return unprotect(out, table)
    if isinstance(obj, list):
        return [translate_json(x) for x in obj]
    if isinstance(obj, dict):
        return {k: translate_json(v) for k, v in obj.items()}
    return obj

def main():
    ensure_argos_language()

    root = Path(".")
    en_md = root / "models" / "darwin-vs-kropotkin" / "index.md"
    es_md = root / "es" / "models" / "darwin-vs-kropotkin" / "index.md"

    en_json = root / "models" / "darwin-vs-kropotkin" / "lab" / "i18n" / "en.json"
    es_json = root / "models" / "darwin-vs-kropotkin" / "lab" / "i18n" / "es.json"

    if en_md.exists():
        es_md.parent.mkdir(parents=True, exist_ok=True)
        md = en_md.read_text(encoding="utf-8")
        es_md.write_text(translate_markdown(md), encoding="utf-8")

    if en_json.exists():
        data = json.loads(en_json.read_text(encoding="utf-8"))
        data_es = translate_json(data)
        es_json.parent.mkdir(parents=True, exist_ok=True)
        es_json.write_text(json.dumps(data_es, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
