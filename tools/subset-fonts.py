"""Shrinks every chunk in assets/fonts to the glyphs the site actually uses.
Run after build-fonts.mjs:  python3 tools/subset-fonts.py"""
import pathlib, re
from fontTools import subset
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
text = set(chr(c) for c in range(0x20, 0x7f))
for p in list(root.glob('*.html')) + list((root / 'assets').glob('*.js')):
    text |= set(p.read_text(encoding='utf-8'))
text = ''.join(sorted(text))

before = after = 0
for f in sorted((root / 'assets' / 'fonts').glob('*.woff2')):
    before += f.stat().st_size
    font = TTFont(f)
    opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['*']; opts.name_IDs = ['*']
    s = subset.Subsetter(opts); s.populate(text=text); s.subset(font)
    font.flavor = 'woff2'; font.save(f)
    after += f.stat().st_size
print(f'subset: {before//1024} KB -> {after//1024} KB')
