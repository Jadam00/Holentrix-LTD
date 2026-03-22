# HOLENTRIX LTD — Static Website

Production-ready static website for **[holentrix.com](https://holentrix.com)**.  
Built with pure HTML, CSS, and vanilla JavaScript — no build step, no frameworks.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page — About, Products, Contact sections |
| `privacy.html` | Privacy Policy (includes AdMob / analytics disclosure) |
| `support.html` | Support Centre / Contact page |

---

## File Structure

```
Holentrix-LTD/
├── index.html          # Home page
├── privacy.html        # Privacy Policy
├── support.html        # Support / Contact
├── CNAME               # Custom domain for GitHub Pages
├── css/
│   └── style.css       # Shared stylesheet (dark/neon theme)
├── js/
│   └── main.js         # Vanilla JS (nav, scroll, animations)
└── README.md
```

---

## Deploying with GitHub Pages

1. **Push** all files to the `main` (or `master`) branch of your repository.
2. Go to your repository on GitHub → **Settings** → **Pages**.
3. Under **Source**, select the branch you pushed to (e.g., `main`) and set the folder to `/ (root)`.
4. Click **Save**.
5. GitHub Pages will build and deploy the site. The URL will be shown in the Pages settings (e.g., `https://jadam00.github.io/Holentrix-LTD`).

---

## Setting a Custom Domain (holentrix.com)

### Step 1 — Add the CNAME file (already included)

The file `CNAME` at the root of this repository contains:
```
holentrix.com
```
This tells GitHub Pages to serve the site at `holentrix.com`.

### Step 2 — Configure your DNS

Log in to your domain registrar for **holentrix.com** and add the following DNS records:

**Option A — Apex domain (`holentrix.com`)**  
Add four `A` records pointing to GitHub Pages' IP addresses:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Option B — www subdomain (`www.holentrix.com`)**  
Add a `CNAME` record:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | jadam00.github.io |

> Tip: Configure both the apex and the `www` subdomain and enable a redirect from one to the other via your registrar.

### Step 3 — Enable HTTPS

Once your DNS records have propagated (can take up to 24 hours):

1. Go to **Settings → Pages** in your GitHub repository.
2. Under **Custom domain**, enter `holentrix.com` and click **Save**.
3. Tick **Enforce HTTPS** (available once GitHub issues your certificate).

---

## Contact

Support email: **support@holentrix.com**  
Website: **https://holentrix.com**
