import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./index.css";
import App from "./App.js";
import Home from "./routes/home.js";
import Profile from "./routes/profile.js";
import Links from "./routes/links.js";
import Dashboard from "./Dashboard.js";
import Preview from "./routes/preview.js";

import Auth from "./Auth.js";
import Login from "./routes/login.js";
import Register from "./routes/register.js";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    Component: App,
    children: [
      { index: true, element: <Navigate to="dashboard/links" replace /> },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { path: "links", Component: Links },
          { path: "profile", Component: Profile },
        ],
      },
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
