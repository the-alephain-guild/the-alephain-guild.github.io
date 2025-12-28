# The Alephain Guild Official Website

This is the official website for **The Alephain Guild**, built as a static site and deployed via GitHub Pages.

## Purpose
To clearly articulate "What is The Alephain Guild?" to the external world, presenting the brand's philosophy, first principles, and methodology in a minimalist, professional manner.

## Design Principles
- **Brand Consistency**: Strict adherence to [The Alephain Guild Brand Guide](../brand-guide/)
- **Minimalism**: Clean, geometric, data-centric visual language
- **Bilingual Support**: English (default) and Chinese content
- **Responsive Design**: Mobile-first approach with three breakpoints

## Technology Stack
- Pure HTML5 / CSS3 / JavaScript (no frameworks)
- GitHub Pages for hosting
- Google Fonts (Inter) for typography
- SVG/PNG for logos and graphics

## Project Structure
```
the-alephain-guild.github.io/
├── index.html          # Main page with bilingual content
├── style.css           # Styles (CSS variables, responsive layout)
├── script.js           # Interactivity (language toggle, navigation)
├── _config.yml         # GitHub Pages configuration
├── favicon.ico         # Website favicon (placeholder)
├── images/             # Brand logo assets
└── README.md           # This file
```

## Brand Compliance Checklist
- [x] Colors: Strict use of `#0A0F2C`, `#D4AF37`, `#5A5A5A`, `#3A6B8C`, `#FFFFFF`
- [x] Typography: Inter (Bold/Regular) + Source Han Sans fallback
- [x] Logo Usage: Correct permissions for main and sub-brand logos
- [x] Tone: Rational, clear, confident - no marketing jargon
- [x] Gold Usage: ≤10% total area (primarily for highest emphasis)

## Content Sources
- **Brand Identity**: [brand-guide/README.md](../brand-guide/README.md)
- **Philosophy**: [grimoire/manifesto/](../grimoire/manifesto/)
- **Methodology**: [grimoire/methodology/](../grimoire/methodology/)
- **Logo Design**: [brand-guide/logo.md](../brand-guide/logo.md)

## Development Notes

### Language System
The site uses a simple JavaScript-based language toggle:
- English content: `[data-lang="en"]`
- Chinese content: `[data-lang="zh"]`
- Default language: English
- Toggle button: "EN / 中文"

### Image Assets
- Source PNGs are 2048×2048, copied from `brand-guide/images/`
- Recommended optimization: Convert to SVG/WebP for production
- Favicon: Placeholder only - replace with proper favicon.ico

### Color Variables (CSS)
```css
:root {
    --color-black: #0A0F2C;      /* 本源黑 */
    --color-gold: #D4AF37;       /* 哲思金 (use ≤10% area) */
    --color-gray: #5A5A5A;       /* 无限灰 */
    --color-blue: #3A6B8C;       /* 星云蓝 */
    --color-white: #FFFFFF;      /* 纯粹白 */
}
```

## Deployment
The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: https://the-alephain-guild.github.io

## Maintenance

### Updating Content
1. Edit `index.html` (both English `[data-lang="en"]` and Chinese `[data-lang="zh"]` sections)
2. Ensure bilingual consistency
3. Test language toggle functionality

### Updating Images
1. Add new images to `images/` directory
2. Update references in `index.html` and `style.css`
3. Optimize for web (recommend SVG/WebP conversion)

### Brand Compliance Verification
Before any update, verify:
- [ ] Gold color usage remains ≤10% of visual area
- [ ] Fonts remain Inter + Source Han Sans fallback
- [ ] Logo usage follows brand guide permissions
- [ ] Tone remains rational, clear, confident

## License
© 2025 The Alephain Guild. All rights reserved.
This website and its contents are proprietary to The Alephain Guild.