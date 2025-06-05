import "./App.css";
import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router";
import Game from "./pages/Game";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
