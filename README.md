# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS Modules & Custom Properties
- Advanced CSS (`:has()`, `clamp()`, fluid typography)
- Hand-coded custom components (no templates or bloated UI libraries)
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Supabase](https://supabase.com/) - Database and Authentication
- [dnd-kit](https://dndkit.com/) - Drag and drop toolkit
- [React Router](https://reactrouter.com/) - Routing

### What I learned

A major focus of this project was engineering the dynamic platform icon mapping and ensuring strict, performant form validation. Instead of relying on array iterations for validation checks, I implemented dictionary-based state objects for instant $O(1)$ error lookups.

Building out the interface required careful attention to accessibility and data structures. I opted to hand-code complex interactive elements—like a fully accessible custom dropdown menu with keyboard navigation—rather than reaching for off-the-shelf component libraries. I also deepened my understanding of React Router to ensure seamless navigation between authenticated and public routes while integrating Supabase's auth logic to handle secure user sessions.

One critical hurdle was ensuring dynamic asset loading didn't crash the React tree. I updated my Vite glob importer to guarantee a valid fallback component is always returned:

```typescript
import React from "react";

type SvgModule = {
  default: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const iconModules = import.meta.glob<SvgModule>("../assets/icons/*.svg", {
  query: "?react",
  eager: true,
});

export const getPlatformIcon = (filename: string) => {
  const exactPath = `../assets/icons/${filename}`;
  return iconModules[exactPath]?.default || null;
};
```

### Continued development

Further refining the drag-and-drop accessibility by properly exposing @dnd-kit keyboard listeners to screen readers, and supporting seamless drag-and-drop interactions on mobile touch screens.

I also plan to expand the backend database schema and edge functions to support more robust public profile sharing and analytics.

## Author

- Website - [Pearl River Web Design](https://www.pearlriverweb.com)
- Frontend Mentor - [@jkaps9](https://www.frontendmentor.io/profile/jkaps9)
