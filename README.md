# Yash Thakkar — Portfolio

A personal portfolio site for Yash Thakkar, Senior Fashion Designer. Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and lucide-react.

## Install

```bash
npm install
```

## Scripts

| Command           | What it does                                      |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the local dev server with hot reload          |
| `npm run build`    | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview`  | Serve the production build locally, to sanity-check it |
| `npm run lint`     | Run ESLint                                          |

## Project structure

```
src/
  data/
    portfolio.json        <- all editable content lives here
  types/
    portfolio.ts           <- TypeScript types matching portfolio.json
  hooks/
    usePortfolio.ts         <- typed hook for reading portfolio.json
  components/
    Navbar.tsx
    SocialLinks.tsx
    HeroSection.tsx
    AboutSection.tsx        <- also renders the Skills grid (#skills)
    ExperienceSection.tsx   <- also renders the Education list
    ServicesSection.tsx     <- "What I Do" -- hardcoded rows, see note below
    ProjectsSection.tsx
    ProjectCard.tsx
    TestimonialsSection.tsx
    Footer.tsx
    icons/
      BrandIcons.tsx        <- GitHub/Instagram/LinkedIn icons (see note below)
  App.tsx
  index.css                 <- Tailwind + chrome-gradient, marquee, reduced-motion CSS
```

## Editing content

Everything shown on the page -- profile, bio, skills, experience, education, projects, testimonials, and social links -- comes from **`src/data/portfolio.json`**. Edit that file and the site updates automatically; you shouldn't need to touch any component to change text, add a job, or add a project.

A few notes on specific fields:

- **`profile.social`** -- leave a field as an empty string (`""`) to hide that icon/link entirely (used right now for `github`, `instagram`, `linkedin` and `website`, since Yash's CV doesn't list any). Fill them in and they'll appear automatically, in both the hero and the footer.
- **`profile.avatarSvg`** -- a raw SVG string rendered in the hero. Currently a simple "YT" monogram in the site's chrome-gradient colors, since there's no headshot on file. Swap in a different SVG string, or replace the hero avatar block in `HeroSection.tsx` with an `<img>` if you'd rather use a photo.
- **`projects[].link`** and **`projects[].image`** -- leave empty and the card will hide the "Live project" button and fall back to a dark placeholder with the project title overlaid. Fill in a link/image and both switch on automatically.
- **`projects[].highlight`** -- set to `true` to pin a project to the top of the list.
- **`testimonials`** -- the three entries shipped here are **placeholders** (clearly labelled as such in the copy). Replace `quote`, `name`, `role` and `avatarColor` with real testimonials before this goes live -- fabricated quotes attributed to real people is the one thing not to ship. If you have none yet, you can also pass an empty array (`[]`) and the section hides itself.

## A couple of implementation notes

- **Services section is hardcoded.** The brief asked for this section to mirror the Experience section's numbered-row design, with the actual content hardcoded for now (see the `TODO` comment at the top of `ServicesSection.tsx`). It currently lists four fashion-design service categories (Collection Design, Trend Forecasting & Research, Technical Design & Sourcing, Team Leadership & Mentorship) based on Yash's real experience. To make this editable like everything else, add a `services[]` array to `portfolio.json` following the same `{ title, description }` shape and swap the hardcoded array for `usePortfolio().services`.
- **Brand icons are custom, not from lucide-react.** `lucide-react` dropped its GitHub/Instagram/LinkedIn icons from the package some time ago. `src/components/icons/BrandIcons.tsx` has small hand-drawn replacements matching lucide's stroke style (24x24, `currentColor`, 1.75 stroke width), so they drop in anywhere a lucide icon would.
- **Education** doesn't have its own nav item or top-level section component -- it's rendered at the bottom of `ExperienceSection.tsx`, directly below the experience rows, since the original spec didn't call out a dedicated Education section but the data structure includes it.

## Quality checklist

- [x] Fully responsive (mobile nav, stacked footer grid, fluid type)
- [x] No broken links -- buttons/icons for empty URLs are hidden, not rendered disabled
- [x] About bio never breaks mid-word (`overflow-wrap: normal; word-break: normal`)
- [x] `npm run build` succeeds (TypeScript + Vite)
- [x] Visible keyboard focus on links and buttons
- [x] `prefers-reduced-motion` respected -- testimonials marquee swaps to a snap-scroll row, `scroll-behavior` drops to `auto`
