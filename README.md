# K Goutam: Portfolio

My personal portfolio website, built with **Next.js 16**, **Tailwind CSS** and **Framer Motion**.
It's a static site (no server, no database), so it can be hosted for free on **Vercel**.

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
| `npm run build`  | Builds the final, optimised site and checks for errors. Run before deploying. |
| `npm run start`  | Runs the built site locally (after `npm run build`), exactly as visitors get it. |
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
- `profile.siteUrl`: your site's address after deploying (optional, see section 4)
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

Files in the `public/` folder are served as-is. Replace a file by dropping in a new one **with the same name**:

| File                        | Used for                                                       |
| --------------------------- | -------------------------------------------------------------- |
| `public/avatar/intro.mp4`   | Talking avatar video in the hero (plain off-white background)  |
| `public/avatar/poster.jpg`  | Still image shown instantly before the video loads (use the video's **first frame** so there's no jump) |
| `public/me/photo.jpg`       | Your photo on the ID card (portrait, about 4:5, face centred)  |
| `public/Resume.pdf`         | Résumé download (visitors get it as `K_Goutam_Resume.pdf`)     |

The link-preview image (what shows when you share your link on LinkedIn/WhatsApp) is generated
automatically from your name, role and avatar by [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx).

---

## 4. Put it online with Vercel (free)

### Step 1: Put the code on GitHub

1. Go to [github.com/new](https://github.com/new) and create a new **empty** repository,
   e.g. `portfolio` (don't add a README, .gitignore or license, since the project already has them).
2. In a terminal **inside this `portfolio` folder**, run these one at a time:

   ```bash
   git add -A
   git commit -m "My portfolio"
   git branch -M main
   git remote add origin https://github.com/Goutam1607/portfolio.git
   git push -u origin main
   ```

   (Use your real repository URL in the `git remote add` line. GitHub shows it on the empty repo page.)
   If Git asks who you are, run `git config --global user.name "K Goutam"` and
   `git config --global user.email "kgoutam12504@gmail.com"` once, then commit again.

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and **Sign up with GitHub**.
2. Click **Add New… → Project**, find your `portfolio` repository and click **Import**.
3. Leave all settings as they are (Vercel detects Next.js automatically) and click **Deploy**.
4. After about a minute you get a live link like `https://portfolio-xxxx.vercel.app`. 🎉

### Step 3: Updating the live site

Every time you push to GitHub, Vercel rebuilds and updates the site automatically:

```bash
git add -A
git commit -m "Update content"
git push
```

### Optional: custom domain

In your Vercel project go to **Settings → Domains** to add a domain you own.
Then set `profile.siteUrl` in `src/data/portfolio.ts` to that address (e.g. `"https://kgoutam.dev"`),
so link previews always use your own domain. (On a plain `*.vercel.app` address this isn't needed;
Vercel's address is detected automatically.)

---

## 5. How the project is organised

```
src/
  data/portfolio.ts        ← ALL your content (edit this)
  app/
    layout.tsx             ← fonts, page title, SEO tags
    page.tsx               ← puts the sections in order
    globals.css            ← colours (CSS variables at the top) and global styles
    opengraph-image.tsx    ← link-preview image
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
