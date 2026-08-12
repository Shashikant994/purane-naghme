# 🚀 Purane Naghme — GitHub + Vercel Deploy Guide (Beginner Friendly)

> Yeh guide bilkul step-by-step hai. Koi command samajh na aaye toh chhod dena — doosra tarika bhi diya hai. 😊

---

## PHASE 1 — GitHub Repository Banana (Web Browser se, ~2 minute)

1. **github.com** kholo aur login karo.
2. Upar right side me **`+`** ka sign hai → **"New repository"** par click karo.
   *(Ya phir green **"New"** button dabao)*
3. Ab ye fields bharein:
   - **Repository name:** `purane-naghme`
   - **Description:** (optional) `Bollywood music player — 100 evergreen songs`
   - **Public** select karo (free hai, isi se Vercel easy connect hoga). Private bhi chalega par thoda extra step lagega.
   - ⚠️ **"Add a README file" check MAT karo** (khaali repo chahiye, humara apna README already hai).
4. Green **"Create repository"** button dabao.
5. Ab repo khaali ban gayi hai. Agla phase dekho — files upload karna.

---

## PHASE 2 — Files Upload Karna

Do tarike hain. **TARIKA A (GitHub Desktop)** sabse safe hai beginners ke liye. **TARIKA B (Browser drag-drop)** command-free hai par thoda dhyan chahiye.

### 🅰️ Tarika A — GitHub Desktop (RECOMMENDED, free app)

1. **desktop.github.com** se "GitHub Desktop" download karo aur install karo.
2. App kholo → **Sign in** → GitHub account se login karo.
3. **File → Add Local Repository** par click karo.
4. Folder select karo jisme project hai: `purane-naghme` wala folder.
   - ⚠️ Galat folder mat chunna: andar wala folder jisme `package.json` hai wo chuno.
5. **"Create a repository"** prompt aaye toh "Continue" dabao.
6. Ab app me dikhega: *"1 commit to push"* ya aisa kuch. Left side me files ki list dikhegi — aur **`node_modules` wala folder wahan NAHI dikhega** (kyunki `.gitignore` ne usse roka hai — yehi iska magic hai ✨).
7. Neeche left me **"Commit to main"** button dabao.
8. Upar **"Publish repository"** button dabao (pehli baar me) — phir repo select karo jo Phase 1 me banayi thi.
9. Bas! Files GitHub par aa gayi. ✅

### 🅱️ Tarika B — Browser me drag & drop (bina koi app install kiye)

1. GitHub par apni nayi repo kholo.
2. **"uploading an existing file"** link par click karo (ya "Add file" → "Upload files").
3. Ab apne computer se project ke saare files/folders drag karke drop karo.
   - ⚠️ **Ye folders kabhi mat daalna: `node_modules` aur `.next`** — ye bade hote hain aur galat hain. Baaki sab (app, public, package.json, etc.) daal do.
4. Neeche **"Commit changes"** green button dabao.
5. Ho gaya! ✅

---

## PHASE 3 — Vercel par Deploy (~3 minute, FREE)

1. **vercel.com** kholo.
2. **"Sign Up"** par click karo → **"Continue with GitHub"** choose karo → GitHub account se authorize karo (Vercel ko GitHub tak access dena padta hai — ye safe hai, official integration hai).
3. Login ke baad dashboard khulega → **"Add New Project"** par click karo.
4. Import page par aapki `purane-naghme` repo dikhegi → uske saamne **"Import"** button dabao.
5. Ab settings page aayega — **KUCH BHI MAT BADALO**:
   - Framework Preset: `Next.js` (auto-detect ho jayega)
   - Build Command: `npm run build` (auto)
   - Install Command: `npm install` (auto)
   - Output Directory: (khaali chhodo)
6. Green **"Deploy"** button dabao.
7. ~1-2 minute ruko — Vercel build karega. Success hone par **confetti 🎉** aayega aur ek URL milega:
   - `https://purane-naghme-xxxx.vercel.app`
   - (URL me kuch random letters aayenge — Vercel automatically deta hai)
8. **Us URL par click karo → app kholo → ek gaana play karo.** 🎵 Ho gaya! App ab internet par LIVE hai!

---

## PHASE 4 — Future Updates (naye changes deploy karna)

Jab kabhi app me kuch badlo:

1. **GitHub Desktop** kholo → badle hue files list me dikhengi.
2. Neeche left me **"Commit to main"** dabao.
3. **"Push origin"** dabao.
4. Vercel **automatically detect karke naya version deploy** kar dega (~1 min). Kuch karne ki zaroorat nahi! ✅

*(Tarika B use kar rahe ho toh files dobara upload karo repo me, same result.)*

---

## ❓ Common Problems & Solutions

| Problem | Solution |
|---|---|
| `node_modules` accidentally push ho gaya | Repo me jao → us folder me → "Delete" (web UI se delete kar sakte ho) → commit |
| Vercel import page me repo nahi dikh rahi | Vercel → Settings → Git → "Adjust GitHub App permissions" me repo ko permission do |
| Deploy fail — "npm ERR" | Repo me `package-lock.json` hai? Confirm karo. Phir Vercel → Deployments → Redeploy |
| Private repo banayi thi | Vercel par repo import karte waqt permission dene par wo dikh jayegi |
| Sound nahi aa raha | Mobile/desktop dono me check karo; YouTube block ho toh audio nahi chalta (company VPN/network restriction) |
| Apna domain chahiye | Vercel → Project → Settings → Domains → apna domain (jaise `puranenaghme.in`) add karo → DNS me Vercel ka record daalo → SSL auto milta hai |

---

## 📌 Yaad Rakho

- **Koi API key / secret nahi hai** is project me — isliye deploy karte hi sab kaam karta hai.
- **Free hai**: GitHub (unlimited public repos) + Vercel free tier (100GB bandwidth/month — is app ke liye bahut zyada hai).
- App kholne wale har visitor ke paas internet hona chahiye (audio YouTube se stream hota hai).
- India me best speed ke liye: Vercel → Project → **Settings → Deployment → Region** me `Bangalore (bom1)` select karke Redeploy karo.

---

*Koi bhi step par atak jao toh mujhse pooch lo — screenshot ke saath bata dunga!* 😊
