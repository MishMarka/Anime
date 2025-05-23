# MishMarka: AI Manga Generator

MishMarka is an AI-powered platform that lets users create original anime-style manga with both images and storylines. The app supports multiple languages and runs on modern cloud infrastructure.

---

## 🚀 Features

- **AI-Generated Manga Structure**
  - 10 “Chapters” (Charts) per manga project
  - Each Chapter contains 30 Manga Pages
  - Each Page contains 7 Panels (AI-generated images + text)

- **Multilingual Support**
  - English, Spanish, Japanese, Chinese

- **AI/ML Stack**
  - Hugging Face models for text and image generation
  - Supabase for backend (users, data, history)
  - Netlify for frontend hosting

- **Core Capabilities**
  - Generate story ideas, outlines, and detailed manga pages
  - AI-generated panel images
  - Instant multilingual translation
  - User accounts, saving, exporting, and sharing manga works

---

## 🛠️ Tech Stack

| Component   | Technology                  |
|-------------|----------------------------|
| Frontend    | React + Tailwind / Next.js |
| Hosting     | Netlify                    |
| Backend     | Supabase (Postgres + Auth + Storage) |
| AI Models   | Hugging Face (text2image + text gen) |
| Languages   | EN, ES, JA, ZH             |
| Dev Env     | GitHub Codespaces          |

---

## 🧠 AI Models (Hugging Face)

- **Text Story Generator:** gpt2, mistral, phi, or similar
- **Image Generator:** stable-diffusion, sdxl, waifu-diffusion
- **Translation:** mbart50, nllb-200

---

## 🏄 User Flow

1. User enters an idea (or generates a random one)
2. App creates 10 chapter outlines (charts)
3. Each chart gets a 30-page manga story
4. Each page gets 7 image prompts and story text
5. Images are generated using Hugging Face models
6. Text is translated into 4 languages
7. Users can save, export, or share manga

---

## ✅ Project Checklist

- [ ] Define story generator prompts/templates
- [ ] Set up Supabase schema (users, charts, pages, panels)
- [ ] Build multilingual translation pipeline
- [ ] Integrate Hugging Face APIs
- [ ] Build React frontend with chart/page navigation
- [ ] Set up Netlify CI/CD
- [ ] Optimize image generation queue and performance

---

## 📂 Directory Structure (Suggested)

```
/frontend      # React or Next.js frontend app
/backend       # Supabase migrations, API scripts, utility functions
/.github       # GitHub workflows, issue templates
/README.md
```

---

## 📝 Contributing

Pull requests and issues are welcome! Please see CONTRIBUTING.md for guidelines (to be added).

---

## 📄 License

MIT License (c) MishMarka
