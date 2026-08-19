import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./routes/home.tsx";
import Profile from "./routes/profile.tsx";
import Links from "./routes/links.jsx";

import Preview from "./routes/preview.jsx";

import Auth from "./Auth.jsx";
import Login from "./routes/login.tsx";
import Register from "./routes/register.tsx";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "links", Component: Links },
      { path: "profile", Component: Profile },
    ],
  },
  { path: `${import.meta.env.BASE_URL}preview`, Component: Preview },
  {
    path: `${import.meta.env.BASE_URL}auth`,
    Component: Auth,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Register },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
