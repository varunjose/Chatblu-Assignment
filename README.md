# ChatBlu — One Platform. The Entire Operation.

A focused landing page for ChatBlu, presenting one AI platform across the guest experience and hotel operations.

## Live site

[View the deployed ChatBlu experience](https://varunjose.github.io/Chatblu-Assignment/)

## Experience highlights

- Interactive front-of-house and back-of-house product tour
- Clear audience, guest value, hotel value, and differentiation sections
- Embedded 1:28 ChatBlu product demo with a direct YouTube fallback
- Official ChatBlu wordmark and self-hosted Mona Sans / Hubot Sans typography
- Editorial cream-and-midnight visual direction with focused product UI moments
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
