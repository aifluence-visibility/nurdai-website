#!/usr/bin/env python3
"""Generate Nurdai logo assets and favicons from source PNG."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "images" / "nurdai-logo-source.png"
if not SRC.exists():
    SRC = Path(
        "/Users/nc/.cursor/projects/Users-nc-Desktop-nurdai/assets/"
        "future-of-ai-search_nurdai-64035735-2a1f-4542-9c92-dd4be1039b8f.png"
    )
IMG_DIR = ROOT / "assets" / "images"
IMG_DIR.mkdir(parents=True, exist_ok=True)


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print(f"  {path.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})")


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    w, h = src.size

    full = src.copy()
    save_png(full, IMG_DIR / "nurdai-logo.png")

    # Nav: icon + wordmark, tagline excluded
    nav = src.crop((0, 0, w, int(h * 0.78)))
    save_png(nav, IMG_DIR / "nurdai-logo-nav.png")

    # Favicon: square crop around the N symbol only (no wordmark)
    icon = src.crop((int(w * 0.06), int(h * 0.02), int(w * 0.94), int(h * 0.52)))
    side = min(icon.size)
    left = (icon.size[0] - side) // 2
    top = (icon.size[1] - side) // 2
    icon = icon.crop((left, top, left + side, top + side))
    save_png(icon, IMG_DIR / "nurdai-icon.png")

    sizes = {
        ROOT / "favicon.png": 32,
        ROOT / "favicon-48.png": 48,
        ROOT / "favicon-192.png": 192,
        ROOT / "apple-touch-icon.png": 180,
        IMG_DIR / "nurdai-icon-512.png": 512,
    }
    for path, size in sizes.items():
        save_png(icon.resize((size, size), Image.Resampling.LANCZOS), path)

    # SVG favicon with embedded PNG for crisp scaling
    icon_256 = icon.resize((256, 256), Image.Resampling.LANCZOS)
    import base64
    from io import BytesIO

    buf = BytesIO()
    icon_256.save(buf, format="PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
        'viewBox="0 0 32 32"><image width="32" height="32" '
        f'xlink:href="data:image/png;base64,{b64}"/></svg>'
    )
    (ROOT / "favicon.svg").write_text(svg, encoding="utf-8")
    print("  favicon.svg (embedded 256px icon)")


if __name__ == "__main__":
    main()
