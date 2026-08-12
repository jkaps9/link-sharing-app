import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/register.jsx";
import Profile from "./routes/profile.jsx";
import Preview from "./routes/preview.jsx";
import Links from "./routes/links.jsx";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "links", Component: Links },
      { path: "profile", Component: Profile },
      { path: "preview", Component: Preview },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
