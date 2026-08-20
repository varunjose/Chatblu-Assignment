# ChatBlu — One Platform. The Entire Operation.

A focused redesign of ChatBlu’s landing page that explains how one AI platform supports both the guest experience and the hotel operation.

**Live site:** [varunjose.github.io/Chatblu-Assignment](https://varunjose.github.io/Chatblu-Assignment/)

## Key product and design decisions

- **Focused the story on five questions:** what ChatBlu does, who it serves, the value for guests and hotels, why it is different, and what the visitor should do next.
- **Made the product tangible:** the interactive Front of house / Back of house tour shows real hospitality scenarios instead of relying on abstract feature cards.
- **Designed around one connected operation:** guest conversations, property context, team coordination, and operational analysis are presented as two sides of the same platform.
- **Used ChatBlu’s visual language:** the official wordmark, cream and midnight palette, Mona Sans, Hubot Sans, restrained blue accents, and warm hospitality imagery keep the experience premium and recognizable.
- **Kept the page human:** concise copy, generous spacing, real service moments, and subtle motion support the story without making the interface feel over-engineered.
- **Created a clear conversion path:** the embedded product demo and repeated Book a demo actions give visitors an immediate next step.

## Intentionally omitted

I intentionally omitted unverified integrations, customer logos, testimonials, pricing, and performance statistics. I also avoided the previous long-form structure so the assignment’s core product message remains easy to understand.

## What I would improve with more time

- **Functional product widgets:** add small interactive tools and short animations that demonstrate working use cases such as preparing an arrival, booking dining or wellness, routing a guest request, generating a GM briefing, and asking a property-performance question.
- **A data-grounded AI product guide:** build an AI concierge trained only on approved ChatBlu product information that can explain services, answer visitor questions with source-backed responses, suggest relevant use cases, and hand qualified visitors to the demo flow.
- **Role-based product tours:** personalize the experience for general managers, guest-facing teams, and department leaders so each visitor immediately sees the workflows most relevant to their responsibilities.
- **A guided product sandbox:** let visitors safely complete a representative guest-to-hotel workflow using demo data, including the request, ChatBlu’s reasoning, team assignment, and final resolution.
- **Verified product depth:** validate every workflow with the ChatBlu team, replace illustrative UI states with production product captures, and show confirmed integrations only when supporting information is available.
- **Measurement and broader QA:** add privacy-conscious analytics and CTA tracking, optimize video loading, and run expanded cross-browser, performance, keyboard, screen-reader, and assistive-technology testing.

## Tools used

- **Development:** React, Vite, JavaScript, and responsive CSS
- **Interaction and motion:** Framer Motion and Lenis
- **Interface assets:** Lucide React, the official ChatBlu wordmark, Mona Sans, and Hubot Sans
- **Design and implementation support:** ChatGPT Work / Codex and AI-assisted original hospitality imagery
- **Quality and deployment:** ESLint, Vite production builds, GitHub, GitHub Actions, and GitHub Pages

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
