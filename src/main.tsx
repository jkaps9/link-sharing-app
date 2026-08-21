import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./styles/index.css";
import App from "./App.js";

import Profile from "./routes/dashboard/profile.js";
import Links from "./routes/dashboard/links.js";
import Dashboard from "./routes/dashboard/dashboard.js";
import Preview from "./routes/dashboard/preview.js";

import Auth from "./routes/auth/auth.js";
import Login from "./routes/auth/login.js";
import Register from "./routes/auth/register.js";
import ResetPassword from "./routes/auth/reset-password.js";
import UpdatePassword from "./routes/dashboard/update-password.js";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    Component: App,
    children: [
      { index: true, element: <Navigate to="dashboard/links" replace /> },
      { path: "update-password", Component: UpdatePassword },
      { path: `preview`, Component: Preview },
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
  {
    path: `${import.meta.env.BASE_URL}/auth`,
    Component: Auth,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Register },
      { path: "reset-password", Component: ResetPassword },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
