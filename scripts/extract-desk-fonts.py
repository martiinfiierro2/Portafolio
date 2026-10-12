"""Optional maintenance utility; Node's SVG generator uses the checked-in result.

Run only when changing the source fonts: python scripts/extract-desk-fonts.py
Requires fonttools[woff] (the normal SVG generation does not require Python).
"""

import json
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen


ROOT = Path(__file__).resolve().parent.parent
SOURCES = {
    "sketch": ("caveat", [500, 550, 600]),
    "sans": ("dm-sans", [500, 600, 750]),
}


def number(value):
    return f"{value:.2f}".rstrip("0").rstrip(".") if value else "0"


def kerning(font, cmap):
    """Read horizontal pair kerning so outlined text retains its spacing."""
    pairs = {}
    if "GPOS" not in font:
        return pairs
    for lookup in font["GPOS"].table.LookupList.Lookup:
        subtables = []
        for subtable in lookup.SubTable:
            if lookup.LookupType == 2:
                subtables.append(subtable)
            elif lookup.LookupType == 9 and subtable.ExtensionLookupType == 2:
                subtables.append(subtable.ExtSubTable)
        for subtable in subtables:
            coverage = subtable.Coverage.glyphs
            if subtable.Format == 1:
                for index, first in enumerate(coverage):
                    for pair in subtable.PairSet[index].PairValueRecord:
                        delta = getattr(pair.Value1, "XAdvance", 0) or 0
                        for char1, glyph1 in cmap.items():
                            if glyph1 == first and delta:
                                for char2, glyph2 in cmap.items():
                                    if glyph2 == pair.SecondGlyph:
                                        pairs[char1 + char2] = round(delta, 2)
            elif subtable.Format == 2:
                for char1, glyph1 in cmap.items():
                    if glyph1 not in coverage:
                        continue
                    class1 = subtable.ClassDef1.classDefs.get(glyph1, 0)
                    for char2, glyph2 in cmap.items():
                        class2 = subtable.ClassDef2.classDefs.get(glyph2, 0)
                        value = subtable.Class1Record[class1].Class2Record[class2].Value1
                        delta = getattr(value, "XAdvance", 0) or 0
                        if delta:
                            pairs[char1 + char2] = round(delta, 2)
    return pairs


result = {}
for family, (package, weights) in SOURCES.items():
    source = ROOT / f"node_modules/@fontsource-variable/{package}/files/{package}-latin-wght-normal.woff2"
    variable = TTFont(source)
    variants = {}
    for weight in weights:
        font = instantiateVariableFont(variable, {"wght": weight}, inplace=False)
        glyph_set = font.getGlyphSet()
        cmap = {
            chr(code): glyph
            for code, glyph in font.getBestCmap().items()
            if 32 <= code <= 255 or chr(code) in "→↗…"
        }
        glyphs = {}
        for char, glyph_name in cmap.items():
            pen = SVGPathPen(glyph_set, ntos=number)
            glyph = glyph_set[glyph_name]
            glyph.draw(pen)
            glyphs[char] = {"advance": round(glyph.width, 2), "path": pen.getCommands()}
        variants[weight] = {
            "units": font["head"].unitsPerEm,
            "glyphs": glyphs,
            "kerning": kerning(font, cmap),
        }
    result[family] = variants

(ROOT / "scripts/desk-vector-fonts.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print("Stored Caveat and DM Sans outlines in scripts/desk-vector-fonts.json")
