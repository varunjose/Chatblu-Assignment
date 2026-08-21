# ChatBlu Landing Page Redesign

[View the live website](https://varunjose.github.io/Chatblu-Assignment/)

## About this project

I redesigned ChatBlu's landing page to make the product easier to understand in the first few seconds. The main idea is simple: ChatBlu supports the guest experience while also giving hotel teams the context, coordination, and operational visibility they need behind the scenes.

I kept the page focused on the five questions from the assignment:

- What does ChatBlu do?
- Who is it for?
- What value does it provide to hotels and their guests?
- Why is it different?
- What should the visitor do next?

## Product and design decisions

### I made the product visible early

The hero uses a familiar iMessage-style conversation to show a real guest request instead of opening with only marketing copy. The Front of house and Back of house product tour then shows how ChatBlu can support guest service and hotel operations through practical examples.

### I treated ChatBlu as one connected platform

The page presents guest conversations, property knowledge, team coordination, and operational analysis as parts of the same system. This helped me explain the broader product without turning the landing page into a long list of features.

### I kept the visual direction close to the brand

I used ChatBlu's supplied logo, blue accents, Mona Sans, Hubot Sans, warm hospitality imagery, and a mostly white paper-like background. I intentionally avoided glassmorphism and heavy dashboard styling. The solid surfaces, thin blue details, and generous spacing feel more appropriate for a premium hospitality product.

### I kept the content specific and believable

The examples are based on recognizable hotel situations such as early arrival, dining, wellness, service requests, occupancy, and a GM briefing. I did not add invented customer results, testimonials, hotel counts, pricing, or unverified integration claims.

### I added clear proof and next steps

The page includes the press logos and destinations shown on ChatBlu's website, an embedded product demo, and clear Book a demo actions. The goal is to give visitors enough context to understand the product and then make the next step obvious.

### I designed for different screen sizes

The site includes a fixed responsive header, mobile navigation, flexible product layouts, touch-friendly controls, and reduced-motion support. The large footer wordmark and content grid also rearrange for tablet and mobile screens.

## What I intentionally left out

- I did not build real hotel workflows or connect the interface examples to a production backend.
- I did not show integrations that were not confirmed by the supplied ChatBlu information.
- I avoided fake performance numbers, customer stories, and testimonials.
- I kept the page focused instead of adding pricing, a blog, detailed documentation, or separate product pages.
- I used illustrative product states where verified production screenshots were not available.

## What I would improve with more time

- Add small functional product widgets with short animations for use cases such as preparing an arrival, booking dining or wellness, routing a service request, generating a GM briefing, and asking a property performance question.
- Build a data-grounded AI product guide that can explain ChatBlu's services, answer visitor questions using approved product information, recommend relevant use cases, and guide qualified visitors toward booking a demo.
- Create role-based tours for general managers, guest experience teams, and department leaders so each visitor can quickly see the workflows most relevant to them.
- Replace illustrative states with verified product captures and connect the tour to real product data where appropriate.
- Run broader usability, accessibility, browser, and device testing with hotel operators and use their feedback to refine the content hierarchy.
- Improve image delivery further with responsive image sizes and more detailed performance monitoring on real devices.

## Tools used

- React, Vite, and JavaScript
- Responsive CSS
- Framer Motion and Lenis
- Lucide React icons
- Mona Sans and Hubot Sans
- ChatBlu's supplied logo and official press assets
- ChatGPT Work and Codex for design exploration, implementation support, and testing
- ESLint and Vite production builds for code quality checks
- GitHub, GitHub Actions, and GitHub Pages for source control and deployment

## Run locally

```bash
npm install
npm run dev
```

To run the quality checks and create a production build:

```bash
npm run lint
npm run build
```

## Deployment

The site is deployed through GitHub Pages. Updates merged into `main` trigger the deployment workflow.
