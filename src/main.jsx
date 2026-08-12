import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/register.jsx";
import Profile from "./routes/profile.jsx";
import Preview from "./routes/preview.jsx";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    element: <App />,
  },
  {
    path: `${import.meta.env.BASE_URL}login`,
    element: <Login />,
  },
  {
    path: `${import.meta.env.BASE_URL}register`,
    element: <Register />,
  },
  {
    path: `${import.meta.env.BASE_URL}profile`,
    element: <Profile />,
  },
  {
    path: `${import.meta.env.BASE_URL}preview`,
    element: <Preview />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
