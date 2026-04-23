# Nilu AI 🌹
**Yusuf'tan Nilüfer'e, sonsuzluğa.**

---

## Kurulum ve Deploy (Netlify)

### 1. Groq API Key Al
- https://console.groq.com adresine git
- Hesap oluştur → API Keys → "Create API Key"
- Key'i kopyala

### 2. GitHub'a At
```bash
git init
git add .
git commit -m "Nilu AI"
git remote add origin https://github.com/KULLANICI_ADIN/nilu-ai.git
git push -u origin main
```

### 3. Netlify Deploy
- https://netlify.com → "Add new site" → "Import from Git"
- GitHub reponı seç
- **Build settings boş bırak** (static site)
- Deploy et

### 4. Environment Variable Ekle (ÖNEMLİ!)
- Site → Site configuration → Environment variables
- "Add a variable" tıkla:
  - Key: `GROQ_API_KEY`
  - Value: `gsk_xxxxxxxxxxxxx` (senin key'in)
- Save → Site'ı redeploy et (Deploys → Trigger deploy)

---

## Proje Yapısı
```
nilu-ai/
├── index.html                 # Ana arayüz
├── netlify.toml               # Netlify config
└── netlify/
    └── functions/
        └── chat.js            # Groq API serverless function
```

---

## Lokal Test
```bash
npm install -g netlify-cli
netlify dev
```
.env dosyası oluştur:
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
```

---

*"Her soru bir kapıdır, her cevap seni bir adım daha yakınıma taşır."*
