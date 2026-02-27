# Full Stack Developer Portfolio

A premium, modern portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
my-portfolio/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── data/         # Portfolio content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Live Chat (ChatGPT-like)

The floating chat bot answers any question when a free API key is configured.

### Free setup (no credit card)

1. Copy `.env.example` to `.env`
2. Get a **free** API key from either:
   - **Google Gemini**: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — no credit card
   - **Groq**: [console.groq.com/keys](https://console.groq.com/keys) — no credit card
3. Add to `.env`: `VITE_GEMINI_API_KEY=your-key` or `VITE_GROQ_API_KEY=your-key`
4. Restart the dev server

Without a key, the chat still works: portfolio questions, simple math, date/time, and jokes. With a key, it works like ChatGPT for any question.

## Customization

Edit `src/data/portfolio.js` to update your content. Replace placeholder links in `Footer.jsx` with your actual GitHub, LinkedIn, and Twitter URLs.
