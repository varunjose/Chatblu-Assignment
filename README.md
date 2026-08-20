# ChatBlu — Hospitality in Motion

A complete product-first reimagining of the ChatBlu landing page. The experience follows one central idea: a guest asks, ChatBlu understands, and the hotel moves.

## Live site

[View the deployed ChatBlu experience](https://varunjose.github.io/Chatblu-Assignment/)

## Experience highlights

- Live hero conversation that separates, interprets, and routes multiple guest intents
- The Blu Flow visual language across guest, intelligence, team, and resolution states
- Scroll-led product story, interactive guest journey, routing network, and operations dashboard
- Answer / Act / Hand Off capability demonstrations
- Interactive use-case explorer and accessible FAQ accordion
- Responsive navigation and layouts from 320px mobile through large desktop
- Smooth Lenis scrolling, Framer Motion transitions, and reduced-motion support
- Automated GitHub Pages deployment

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the Vite application and deploys `dist` to GitHub Pages.
