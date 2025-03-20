import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [collections, setCollections] = useState<PrismCurationObj[]>([]);

  const onButtonClick = () => {
    window.electron
      .getCollectionsHandler()
      .then((collections) => {
        setCollections(collections);
      })
      .catch((error) => console.error("Error fetching collections:", error));
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => onButtonClick()}>Fetch Collections</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
