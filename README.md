# Siva Prasad Kuppala — DevOps / CloudOps / SRE Portfolio

A modern, responsive, single-page portfolio website built for a Senior DevOps / CloudOps / SRE Engineer profile. Static HTML/CSS/JS — no build step, no backend, no database.

## Project Overview

This site is generated entirely from the content of the uploaded resume (`resume.pdf`). It presents:

- A hero section with a typewriter-animated terminal panel
- An About section with career highlights and certifications
- A categorized Technical Skills grid
- A vertical timeline of Professional Experience (company → client → role → responsibilities → tech)
- Three Project case studies derived from real work engagements (no invented projects)
- Education
- A Contact section with working `mailto:` / `tel:` links and disabled placeholders for LinkedIn/GitHub

Dark theme, glassmorphism cards, and dashboard-inspired layout (GitHub, Azure Portal, Kubernetes Dashboard, AWS Console, Vercel, Cloudflare).

## Features

- Sticky, blurred console-style navbar with active scroll state
- Terminal-style animated hero (`kubectl`/shell flavored, respects `prefers-reduced-motion`)
- Fully responsive (mobile → desktop)
- Scroll-reveal fade-up animations via `IntersectionObserver`
- Hover states on cards, buttons, and nav links
- Skill cards with `key: value` style tags (Kubernetes-label inspired)
- Vertical experience timeline with commit-style nodes
- Semantic HTML5, ARIA-friendly focus states, keyboard-navigable
- SEO meta tags, Open Graph tags, and favicon
- Resume download button (`resume.pdf`)
- Back-to-top button

## Folder Structure

```
portfolio/
├── index.html        # All page markup and content
├── style.css          # All styling (CSS variables, components, responsive rules)
├── script.js           # Terminal typewriter, scroll-reveal, nav + back-to-top behavior
├── resume.pdf          # Downloadable resume (copy of the uploaded PDF)
├── images/
│   └── favicon.svg     # Site favicon
└── README.md
```

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox/Grid, Bootstrap 5 grid utilities)
- Vanilla JavaScript (no frameworks)
- Bootstrap 5 (grid + a few utility classes, via CDN)
- Font Awesome 6 (icons, via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono (via CDN)

## How to Run

No build tools required. Just open the file directly:

```bash
# Option 1 — double-click index.html in your file explorer

# Option 2 — from a terminal
open portfolio/index.html        # macOS
xdg-open portfolio/index.html    # Linux
start portfolio/index.html       # Windows
```

For live-reload during editing, you can optionally serve it locally:

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `siva-portfolio`).
2. Push this `portfolio/` folder's contents to the repository root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/siva-portfolio.git
   git push -u origin main
   ```
3. In the GitHub repo, go to **Settings → Pages**.
4. Under **Source**, select the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be published at:
   `https://<your-username>.github.io/siva-portfolio/`

## Customization Guide

| What to change              | Where |
|---|---|
| Colors / theme tokens        | `:root` block at the top of `style.css` |
| Fonts                        | `<link>` tags in `index.html` `<head>` + `--font-*` variables in `style.css` |
| Hero terminal script content | `lines` array in `script.js` |
| Resume file                  | Replace `resume.pdf` with an updated file of the same name |
| LinkedIn / GitHub links      | Search `TODO` in `index.html` (hero socials + Contact section) and replace the disabled `<span>` with an `<a href="...">` |
| Profile photo                | Not included in the current design (none was available in the source resume) — add an `<img>` in the hero if desired |
| Social preview image         | Add `images/og-cover.png` (1200×630) and it will be picked up by the existing Open Graph tag |
| Section copy                 | Edit directly inside the relevant `<section>` in `index.html` |

## Notes on Content Accuracy

Every fact on this site — companies, clients, roles, dates, responsibilities, skills, certifications, and education — is drawn directly from the uploaded resume. Nothing has been invented. Where information was not present in the resume (GitHub, LinkedIn, profile photo), a disabled placeholder marked `TODO` is shown instead of a guess.
