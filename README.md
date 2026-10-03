# K Goutam: Portfolio

My personal portfolio website, built with **Next.js 16**, **Tailwind CSS** and **Framer Motion**.
It builds into a plain **static site** (HTML/CSS/JS files in `out/`, no server, no database),
so it can be hosted for free on **Render** (set up in this repo), Vercel, Netlify or GitHub Pages.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) (version 20.9 or newer) installed.

Open a terminal **inside this `portfolio` folder** and run:

```bash
npm install     # downloads the libraries the site needs (only needed once)
npm run dev     # starts the site in "development mode"
```

Then open **http://localhost:3000** in your browser.
While `npm run dev` is running, every time you save a file the browser updates by itself.
Press `Ctrl + C` in the terminal to stop it.

Other useful commands:

| Command          | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| `npm run build`  | Builds the final site into the `out/` folder and checks for errors. Run before deploying. |
| `npm run start`  | Serves the built `out/` folder at http://localhost:3000, exactly as visitors get it (run `npm run build` first). |
| `npm run lint`   | Checks the code for common mistakes.                                 |

---

## 2. Edit your content (no coding needed)

**All the text on the site lives in one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts).
Open it, change the text between the quotes `"…"`, save, and the site updates.

| Section in the file   | What it controls                                                   |
| --------------------- | ------------------------------------------------------------------ |
| `profile`             | Name, email, GitHub, LinkedIn, résumé file, photo, site URL        |
| `seo`                 | The description Google and link previews show                      |
| `hero`                | Big heading, subtitle and "Explore work" button at the top         |
| `about`, `quickFacts` | Bio paragraphs, the quick-facts table and the quote                |
| `idCard`              | The hanging ID card (front fields + "What I am" list on the back)  |
| `skills`              | The periodic table (symbol, name, category, one-line note)         |
| `projects`            | Project cards (title, tags, description, features, stack, link)    |
| `certifications`      | Certification list                                                 |
| `timeline`            | Education & experience timeline                                    |
| `stats`, `awards`     | Count-up numbers and the awards list                               |
| `contact`             | Contact blurb and footer text                                      |

### The `TODO:` placeholders

Anything still missing starts with `TODO:`, for example:

```ts
linkedin: "TODO: add my LinkedIn URL",
```

The site **hides** TODO values automatically (e.g. the LinkedIn button simply doesn't appear),
so nothing broken is ever shown. Replace them when you have the real value:

```ts
linkedin: "https://www.linkedin.com/in/your-profile",
```

Current TODOs (search the file for `TODO` to find them all):

- `profile.linkedin`: your LinkedIn URL
- `profile.siteUrl`: your site's address (only needed for a custom domain, see section 4)
- `projects` → GitHub links for **Review Intelligence** and **Skin Cancer Detector**
- `projects` → live URL for **Symbiot 2026**
- `timeline` → confirm the year of Class XII (currently 2023)

### Tips

- Keep the quotes and the comma at the end of each line, e.g. `name: "K Goutam",`.
- Skills are numbered automatically in the order you list them.
- To add a project, copy one whole `{ … },` block inside `projects` and edit it.
  `mockup` must be one of `"firewall"`, `"sentiment"`, `"scan"` or `"leaderboard"`.
- If something breaks after an edit, the terminal running `npm run dev` shows the line with the mistake.

---

## 3. Replace images, video and résumé

Files in the `public/` folder are served as-is (they are **not** resized automatically, so keep
photos under ~200 KB). Replace a file by dropping in a new one **with the same name**:

| File                        | Used for                                                       |
| --------------------------- | -------------------------------------------------------------- |
| `public/avatar/intro.mp4`   | Talking avatar video in the hero (plain off-white background)  |
| `public/avatar/poster.jpg`  | Still image shown instantly before the video loads (use the video's **first frame** so there's no jump) |
| `public/me/photo.jpg`       | Your photo on the ID card (portrait, about 4:5, face centred)  |
| `public/Resume.pdf`         | Résumé download (visitors get it as `K_Goutam_Resume.pdf`)     |

The link-preview image (what shows when you share your link on LinkedIn/WhatsApp) is generated
automatically at build time from your name, role and avatar by [`src/app/og.png/route.tsx`](src/app/og.png/route.tsx)
and published as `/og.png`.

---

## 4. Put it online with Render (free)

The code lives at **https://github.com/Goutam1607/My-Portfolio**, and the repo contains a
[`render.yaml`](render.yaml) "Blueprint" that tells Render exactly how to build and host the site
as a free **Static Site** (fast, served from a global CDN, never "sleeps").

### Deploy (first time)

1. Go to [dashboard.render.com](https://dashboard.render.com) and sign up / log in **with GitHub**.
2. Click **New + → Blueprint**.
3. Connect your GitHub account if asked, then pick the **My-Portfolio** repository.
4. Render reads `render.yaml` and shows one service, **my-portfolio** (Static Site). Click **Apply** / **Deploy Blueprint**.
5. Wait for the build to finish (2–3 minutes). Your site is live at the address shown at the top of the
   service page, e.g. `https://my-portfolio.onrender.com` (Render adds a few random characters if that name is taken).

<details>
<summary>Prefer to set it up by hand instead of the Blueprint?</summary>

**New + → Static Site** → pick **My-Portfolio**, then fill in:

| Setting            | Value                          |
| ------------------ | ------------------------------ |
| Branch             | `main`                         |
| Build Command      | `npm ci && npm run build`      |
| Publish Directory  | `out`                          |

Click **Create Static Site**. (The Node.js version comes from the `.node-version` file: 22.)
</details>

### Updating the live site

Every push to the `main` branch on GitHub makes Render rebuild and update the site automatically:

```bash
git add -A
git commit -m "Update content"
git push
```

### Link previews and custom domains

Link previews (the `og.png` card on LinkedIn/WhatsApp) need the site's full address. On Render this is
picked up automatically from Render's `RENDER_EXTERNAL_URL` during the build.

If you add a **custom domain** (service page → **Settings → Custom Domains**), set
`profile.siteUrl` in `src/data/portfolio.ts` to it (e.g. `"https://kgoutam.dev"`) and push, so previews
use your own domain. You can check a preview with [opengraph.xyz](https://www.opengraph.xyz).

### Other hosts

The same `out/` folder works anywhere static files can be hosted. On **Vercel**: *Add New → Project →*
import the repo → **Deploy** (no settings needed).

---

## 5. How the project is organised

```
src/
  data/portfolio.ts        ← ALL your content (edit this)
  app/
    layout.tsx             ← fonts, page title, SEO tags
    page.tsx               ← puts the sections in order
    globals.css            ← colours (CSS variables at the top) and global styles
    og.png/route.tsx       ← link-preview image (built into /og.png)
    favicon.ico, icon.svg, apple-icon.png  ← "KG" browser icons
  components/
    layout/                ← Header (logo + navbar + mobile menu), Footer
    sections/              ← Hero, About, Skills, Projects, Certifications, Experience, Achievements, Contact
    avatar/                ← talking avatar video + sound toggle
    about/LanyardCard.tsx  ← the swinging, flipping ID card
    projects/Mockups.tsx   ← the mini UI drawings on project cards
    skills/logos.tsx       ← which logo each skill shows
    ui/                    ← small shared pieces (section headings, buttons, scroll reveal, count-up)
  assets/                  ← fonts + avatar crop used only for the link-preview image
public/                    ← video, images, résumé
render.yaml                ← Render hosting setup (Static Site)
next.config.ts             ← `output: "export"` = build a static site into out/
```

**Changing colours:** all colours are defined once at the top of
[`src/app/globals.css`](src/app/globals.css) (`--canvas` = background, `--ink` = navy text, …).

---

## 6. Accessibility & performance notes

- Works from 360px phones to large desktops; no sideways scrolling.
- Everything is keyboard accessible (nav, filter chips, skill tiles, project cards, "Flip card" button)
  with visible focus rings.
- Visitors with **"reduce motion"** turned on in their device settings get no swinging, parallax or count-up.
- For speed, the avatar's still image appears instantly and the 1.7 MB video loads only after the page
  has finished loading (phones in data-saver mode skip it until the sound button is tapped).
- Lighthouse (measured locally on the production build):
  **desktop 98–99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO**;
  **mobile ~80 Performance (simulated slow phone), 100 Accessibility, 100 Best Practices, 100 SEO**.
