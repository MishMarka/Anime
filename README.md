📝 Project Overview: MishMarka
Description:
MishMarka is an AI manga generator that creates original anime-style manga with both images and storylines. The app is multilingual and designed to run on modern cloud infrastructure.

🔧 Features
AI-Generated Manga Structure:

10 “Chapters” (Charts) per anime idea

Each Chart contains 30 Manga Pages

Each Page contains 7 Panels (Images)

Multilingual Support:

Spanish 🇪🇸

English 🇬🇧

Japanese 🇯🇵

Chinese 🇨🇳

AI/ML Stack:

Hugging Face Models for text and image generation

Codespaces for development (optional)

Supabase for storing users, manga data, and history

Netlify for hosting frontend

Core Capabilities:

Manga story idea generation

Story writing by chart/page

Image generation for each panel using AI

Multilingual translation of text

User accounts, saving, and retrieval

🛠️ Tech Stack
Component	Technology
Frontend	React + Tailwind (or Next.js)
Hosting	Netlify
Backend	Supabase (Postgres + Auth + Storage)
AI Models	Hugging Face (text2image + text generation)
Languages	English, Spanish, Japanese, Chinese
Dev Env	GitHub Codespaces

🧠 AI Models (Hugging Face)
Text Story Generator: GPT-style model (e.g., gpt2, mistral, or phi)

Image Generator: stable-diffusion, sdxl, or anime-specific models like waifu-diffusion

Translation: mbart50 or nllb-200

🚀 User Flow
User enters idea (or generates random idea)

App creates 10 chapter outlines (charts)

Each chart gets a 30-page manga story

Each page gets 7 image prompts and story text

Images are generated using Hugging Face models

Text is translated into 4 languages

Users can save, export, or share manga

✅ TODO Checklist
 Define story generator prompts/templates

 Set up Supabase schema (users, charts, pages, panels)

 Build multilingual translation pipeline

 Integrate Hugging Face APIs

 Build React frontend with chart/page navigation

 Set up Netlify CI/CD

 Optimize image generation queue and performance
