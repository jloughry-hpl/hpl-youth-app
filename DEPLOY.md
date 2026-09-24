# Deploying HPL Youth (app.hplyouth.com)

## How this app is wired

| | |
|---|---|
| Host | Netlify — project `silly-nasturtium-7a6810`, domain `app.hplyouth.com` |
| Source | **GitHub: `jloughry-hpl/hpl-youth-app`** (public) |
| Branch | `main` |
| Build command | none |
| Publish directory | repo root |
| Repo contents | `index.html`, `README.md` — that's it |

Because there is no build step and no publish subdirectory, Netlify serves
`index.html` from the repo root exactly as committed. Push to `main` and the
deploy runs automatically.

**This is the odd one out in the Netlify account.** Every other HPL project
(`hpllex.com`, `hplyouth-new`, `hplwky-new`, `ppl-hpl-ypda`) is a Netlify Drop
drag-and-drop site. Only app.hplyouth.com deploys from Git. Don't drag a folder
onto Netlify for this one — it would disconnect the repo.

## To deploy the current file

`index.html` in this folder is the file to ship. It must keep that exact name.

Via the GitHub web UI (matches how this repo has been updated before — the last
commit was "Add files via upload"):

1. Go to https://github.com/jloughry-hpl/hpl-youth-app
2. **Add file → Upload files**
3. Drag in `hpl-youth-deploy\index.html`
4. Commit message, e.g. `Add error safety net`
5. **Commit directly to the `main` branch** → Commit changes

Netlify picks up the push and redeploys in under a minute. Watch it at
https://app.netlify.com/projects/silly-nasturtium-7a6810/deploys

Or via git, if you have the repo cloned:

```
cp /path/to/hpl-youth-deploy/index.html index.html
git add index.html
git commit -m "Add error safety net"
git push origin main
```

## Verifying provenance

The base of this file was recovered from the live site on 2026-09-24 and came
back **117,078 bytes — byte-for-byte identical to `index.html` currently in the
repo**. So this file is the repo's own file plus the safety-net patch, nothing
else. Patched size: 118,991 bytes.

## After deploying

Confirm at https://app.hplyouth.com:

- Login screen renders ("Log in to your HPL Youth account")
- Browser console is clean
- View source and check the last line reads
  `/* build: v3 supabase + error safety net (2026-09-24) */`

## Source of truth going forward

Edit `Downloads\hpl-youth.html`, then copy it to `hpl-youth-deploy\index.html`
before uploading. Do not keep a bare `index.html` loose in Downloads — that is
what caused the 2026-09-24 mixup, where the Youth source was silently
overwritten by a copy of the Hitters app.
