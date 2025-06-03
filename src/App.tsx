import "./App.css";
import Home from "./pages/Home";
import { ErrorBoundary } from "react-error-boundary";

import { BrowserRouter, Route, Routes } from "react-router";
import Game from "./pages/Game";
import ErrorFallback from "./components/ErrorFallback";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game/:gameId"
          element={
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => window.location.reload()}
            >
              <Game />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
