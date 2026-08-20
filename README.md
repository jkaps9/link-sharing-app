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
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Supabase](https://supabase.com/) - Database and Authentication
- [dnd-kit](https://dndkit.com/) - Drag and drop toolkit
- [React Router](https://reactrouter.com/) - Routing
- React Hot Toast - Notifications

### What I learned

A major focus of this project was engineering the dynamic platform icon mapping and ensuring strict form validation. I also spent a significant amount of time deepening my understanding of React Router for seamless navigation and integrating Supabase's auth logic to handle secure user sessions and database interactions. Building out the interface required careful attention to data structures, especially when managing state synchronization across various component handlers as users add, edit, or reorder their links using dnd-kit.

```javascript
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

Further refining the drag-and-drop accessibility and supporting drag and drop on mobile.

Expanding the backend database schema to support additional user profile features such as generating an actual link to share.

## Author

- Website - [Pearl River Web Design](https://www.pearlriverweb.com)
- Frontend Mentor - [@jkaps9](https://www.frontendmentor.io/profile/jkaps9)
