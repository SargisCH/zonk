import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ImageLoader from "./LmageLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImageLoader>
      <App />
    </ImageLoader>
  </StrictMode>,
);
