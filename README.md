# SafeTransit — GitHub Pages showcase

A three-page static showcase for the **SafeTransit** capstone:

- **`index.html`** — the visual story: the two safety problems, demo videos, the trip flow, driver profiles/identity, hardware, web dashboard, mobile app, analytics/reporting and operations.
- **`documentation.html`** — the evidence companion: 24 statements across the eight
  ISO/IEC 25010:2023 characteristics, with status, evidence and limits.
- **`media.html`** — the full CPS media library: all 28 clips and 16 screenshots, grouped by module and opened in a lightbox.

It is plain HTML, CSS and JavaScript. No build step, no framework, no package install.
GitHub Pages serves it directly.

> The project content is based on the capstone's actual stack and features:
> Django dashboard, Flutter Android app, MySQL/PostgreSQL, MediaPipe Face/Hand + EfficientDet-Lite0 + OpenCV,
> ESP32-CAMs, IR door beams, NEO-7M GPS and a buzzer. It deliberately leaves out
> the proposed ERD and other proposal-only material.

---

## 1. What you need

| You need | Why | Required? |
| --- | --- | --- |
| A [GitHub account](https://github.com/join) | Hosts the repository and the Pages site | Yes |
| A public repository | Free GitHub Pages requires a public repo | Yes |
| The files in this folder | They are already built | Yes |
| [Git](https://git-scm.com/downloads) | To push from your computer | Optional — you can upload in the browser |
| A code editor | To edit text or replace media | Optional — GitHub's web editor works |
| A domain name | Only if you want `safetransit.example` instead of `username.github.io` | Optional |

You do **not** need Node, npm, Django, a database or a server to publish the showcase.

---

## 2. Preview it locally

Open `index.html` directly, or serve the folder over HTTP for the most accurate preview:

```powershell
# from this folder
npx serve .
# or, if you have Python:
python -m http.server 8000
```

Then open <http://localhost:8000>.

The videos are MP4/H.264 and the images are JPEG, so a normal browser needs no plugins.

---

## 3. Publish to GitHub Pages

### Option A — the browser (no Git)

1. Create a new **public** repository, e.g. `safetransit-showcase`.
2. On the empty repository page choose **uploading an existing file**.
3. Upload `index.html`, `documentation.html`, `media.html`, `README.md`, `.nojekyll`
   and the whole `assets` folder. Keep the structure:
   ```
   index.html
   documentation.html
   media.html
   README.md
   .nojekyll
   assets/
     app.js
     favicon.svg
     styles.css
     img/
     video/
   ```
4. Commit the files.
5. Open **Settings → Pages**.
6. Under **Build and deployment → Source**, choose **Deploy from a branch**.
7. Set **Branch** to `main`, folder `/ (root)`, then **Save**.
8. Wait 1–2 minutes. The site appears at:
   ```
   https://YOUR-USERNAME.github.io/safetransit-showcase/
   ```

### Option B — the command line

```bash
cd path/to/this/folder

git init
git add .
git commit -m "Add SafeTransit showcase"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/safetransit-showcase.git
git push -u origin main
```

Then enable Pages in **Settings → Pages** as above.

### User site vs project site

| Repository name | URL |
| --- | --- |
| `safetransit-showcase` | `https://YOUR-USERNAME.github.io/safetransit-showcase/` |
| `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io/` |

All page links are relative, so the same files work at either URL.

### Updating the site

```bash
git add .
git commit -m "Update showcase"
git push
```

GitHub Pages redeploys in about a minute. Hard-refresh
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>) if the old CSS is cached.

---

## 4. Media map

The site uses every video from `CPS/Video`, compressed for the web, plus the usable
screenshots from `CPS/Images`. It does not upload the 800 MB source archive.

| Group | Clips |
| --- | --- |
| Driver safety | `driver-alert`, `driver-profile`, `alerts`, `buzzer`, `scan-face` |
| Trigger demos | `drowsiness-trigger`, `phone-call-trigger`, `phone-texting-trigger` |
| Passenger counting | `passenger-count`, `passenger-in-1`, `passenger-out`, `passenger-out-1` |
| GPS & devices | `gps-tracking`, `device-setup` |
| Accounts & identity | `login`, `login-mobile`, `account-activation`, `add-delete-user`, `add-driver-restore`, `add-driver-mobile`, `id-scan`, `bulk-upload`, `import-export`, `system-logs` |
| Reports & review | `live-safety-trends`, `violation-reports`, `trip-review`, `recordings-clips` |

Every clip has a `poster-*.jpg` in `assets/img`; the 16 screenshots used by the site
are also there. The ID clip is blurred because the source card contains a real licence.

Approximate payload: about **3.4 MB of images** and **10.9 MB of video**.

### Replacing or adding media

1. Put the new file in `assets/img` or `assets/video`. Keep names lowercase with hyphens.
2. Use JPEG/WebP for screenshots (roughly 1400–1600 px wide) and MP4/H.264 for video.
3. Update the matching `src` in `index.html`; keep the `poster` pointing at a still.
4. For a new video card, copy an existing `<figure class="video-frame">` block.

If the source is a phone video, trim to 10–25 seconds and scale to 720p (landscape)
or 540 px wide (portrait) before uploading. GitHub Pages has a 1 GB repository
soft limit and a 100 GB/month bandwidth soft limit; the current demo set is under 10 MB.

### Privacy

Some clips show the project team's faces, demo driver rosters, names and local IPs.
The ID clip is blurred because the source card contains a real licence. If you
publish this repository, review the remaining media for names, plates, email
addresses or locations you do not want public, and replace or blur them before
sharing the link.

---

## 5. Content map

### `index.html`

| Section | What to edit |
| --- | --- |
| Header / footer | Brand name, repository URL, contact email |
| Hero | Headline, lede, two original dashboard screenshots, four stats |
| `#overview` | The two-problem framing, four principles and five-page system-flow carousel with photos and clips |
| `#demo` | Main video, poster, four-step explanation, two smaller clips |
| `#trip` | Four trip stages: before, boarding, driving, after |
| `#people` | Four-page driver carousel: profile, registration, ID scan and auto-switching face scan |
| `#hardware` | Four-page hardware carousel with photos, explanations and tags |
| `#dashboard` | Dashboard screenshot, four features, device/GPS pair |
| `#mobile` | Two phone screenshots and the app features |
| `#record` | Live safety trends video, analytics/reports screenshots and six outcomes |
| `#violations` | Nine violation cards, the event-to-report flow and a three-page trigger carousel |
| `#features` | Twelve-module feature matrix |
| `#access` | Six-page operations carousel with screenshots (roles, OTP, setup, backup, email, log) |
| `#modules` | Twelve-page module carousel: one clip per page with an explanation, from bulk upload to device setup |
| `#email-proof` | Three-slide carousel: flagged email, driver report and Sent proof |
| CTA | Documentation link and source URL |

### `media.html`

The full library: 25 videos grouped as Driver safety, Passenger counting, GPS &
devices, Accounts & identity, and Reports & review, followed by 16 screenshots.
Each card opens a lightbox. To add a clip, add a `media-card` block with
`data-type="video"`, `data-src`, a poster image and a title.

### `documentation.html`

The page has **24 statements** across the eight ISO/IEC 25010:2023 characteristics:

| Characteristic | Statements |
| --- | --- |
| Functional suitability | 01–05 |
| Performance efficiency | 06–08 |
| Reliability | 09–11 |
| Usability | 12–14 |
| Security | 15–17 |
| Compatibility | 18–20 |
| Maintainability | 21–22 |
| Portability | 23–24 |

Each statement uses this shape:

```html
<article class="statement" id="s1" data-status="implemented">
  <div class="statement-num">01</div>
  <div>
    <div class="statement-head">
      <h3>Your claim, stated plainly</h3>
      <span class="pill pill-implemented">Implemented</span>
    </div>
    <p>What the system does, and where the boundary is.</p>
    <div class="evidence"><b>Evidence</b>What you inspected, tested or measured.</div>
  </div>
</article>
```

Statuses are `implemented`, `limited`, `planned` and `not in this version`.
The search box and status chips filter statements automatically; new statements are
picked up without extra JavaScript.

### Keeping the evidence honest

1. **One claim per statement.** Do not bundle “works, is fast and is secure” into one line.
2. **Pick the honest status.** If a test was not run, say so in the evidence box.
3. **Do not invent accuracy figures.** The TAM/UAT results belong in the evaluation
   instrument, not in this page.
4. **Keep the limits section current.** Camera/lighting, heuristic behaviour cues,
   barcode-only ID, LAN-only security and Android-only coverage are already named there.

---

## 6. Brand and theme

All design tokens live at the top of `assets/styles.css`:

```css
:root {
  --paper: #f5f1e6;   /* page background */
  --ink: #191a17;     /* main text */
  --accent: #b3471f;  /* italic headlines, links, rules */
  --green: #2e5b4c;   /* implemented / success */
  --panel: #1c211c;   /* dark instrument panels */
  --serif: "Fraunces", …;
  --sans: "Inter", …;
}
```

Dark mode is the `[data-theme="dark"]` block. The toggle stores `safetransit-theme`
in `localStorage` and respects the operating-system preference on first visit.

To use the project's blue branding instead of the warm palette, change `--accent` to
something like `#1d4ed8` and `--panel` to a deep navy. Keep the contrast of
`--muted` on `--paper` at 4.5:1 or better.

Fonts load from Google Fonts. To go fully offline, download Fraunces and Inter and
replace the `<link>` tags with local `@font-face` rules.

---

## 7. What is ignored

`.gitignore` excludes the large source folders and archives:

```
CPS/
Docu/
Capstone/
Eval tool/
CPS-*.zip
_toolsvenv/
```

The published site only needs `index.html`, `documentation.html`, `.nojekyll` and
`assets/`. Keeping the 800 MB archive out of the repository avoids a failed push.

---

## 8. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| 404 at the Pages URL | Pages not enabled, or wrong branch/folder | Settings → Pages → `main` + `/ (root)` |
| 404 on `documentation.html` | File name case mismatch | Use exactly `documentation.html`; Pages is case-sensitive |
| Page loads without CSS | `assets` not uploaded, or wrong path | Keep `assets/styles.css` beside `index.html` |
| Video shows a black box | Codec/range issue or poster missing | Re-encode as MP4/H.264 and check `poster="…"` |
| Styles look stale | Browser/CDN cache | Hard-refresh, or wait a minute |
| Site shows the README instead of the page | `index.html` missing from the root | Add it at the repo root |
| Jekyll build error | A file uses a Jekyll-reserved name | Keep the empty `.nojekyll` file at the root |
| Dark mode flashes light | Inline theme script removed from `<head>` | Keep the small script before the stylesheet |

---

## 9. Accessibility notes

- Semantic landmarks, a skip link and visible focus rings.
- Theme toggle exposes `aria-pressed`; the mobile menu exposes `aria-expanded`.
- Reduced-motion preference disables reveal animations and smooth scrolling.
- Print stylesheet hides navigation and prints the full evidence page.
- Videos have posters, captions in the surrounding figure and native controls.

Quick checks before publishing:

- Tab through the page; every control should be reachable.
- Resize to ~390 px; the nav becomes a menu and the grids stack.
- Toggle dark mode and reload; the choice should persist.
- Play each video; the poster should match the first frame.
- Print `documentation.html`; all 24 statements should appear.

---

## 10. Credits

The showcase is an original static implementation for the SafeTransit capstone.
The ISO/IEC 25010 structure follows the standard; the evidence text describes this
build only. Demo media belongs to the project team.
