# BoomerBall

BoomerBall is my Oklahoma Sooners College Football Analytics Fan website.

It's a single-page web app (Vite + React + TypeScript) that tracks Sooners game
results and computes live season analytics: win/loss record, win percentage,
average points for/against, and average scoring margin.

## Tech stack

- [Vite](https://vite.dev/) (dev server + build)
- React 19 + TypeScript
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

## Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR            |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run oxlint                                     |
