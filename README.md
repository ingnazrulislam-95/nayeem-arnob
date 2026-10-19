# Nayeem Al-Tamzid Bhuiyan: personal website

A static site: no build step, no server. GitHub Pages serves `index.html` directly.

## Put it online (GitHub Pages)
1. Create a repository on GitHub. For the address `https://<username>.github.io`, name it exactly `<username>.github.io`. Any other name gives `https://<username>.github.io/<repo>/`.
2. Upload everything in this folder to the repository root (Add file → Upload files), or:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. Repository Settings → Pages → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` → Save.
4. Wait 1 to 2 minutes, then open the address shown on that page.

## Add the photo
Save the portrait as `photo.jpg` (4:5 portrait, under 300 KB) next to `index.html` and commit it. Until then the NB monogram shows.

## Make the contact form work
GitHub Pages has no backend, so use a free form service:
1. Sign up at formspree.io, create a form, copy its URL (looks like `https://formspree.io/f/xxxxxxx`).
2. In `index.html`, find `data-endpoint=""` and put the URL between the quotes.
Until then the form honestly says "Message not sent".

## Edit content
Open `index.html` and edit the text. Search for `[` to find the remaining placeholders (intro sentence, expertise text, education dates, sample projects).
