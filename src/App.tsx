import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Shaker from "./services/shaker";
import Home from "./pages/Home";

const shaker = new Shaker();
function App() {
  const [dices, setDices] = useState<number[]>([]);
  const [combinations, setCombinations] = useState({});
  const shake = () => {
    const dicesThrown = shaker.shake();
    setDices(dicesThrown);
    setCombinations(shaker.getAllCombinations());
  };
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => shake()}>dices is {dices.join(", ")}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">{JSON.stringify(combinations)}</p> */}
      <Home />
    </>
  );
}

export default App;
