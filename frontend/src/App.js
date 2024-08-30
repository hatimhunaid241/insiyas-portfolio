import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { serverStatus } from "./services/api/serverStatus";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await serverStatus();
        setStatus(response.data);
      } catch (error) {
        console.error("Error fetching server status:", error);
      }
    };
    fetchServerStatus();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{status ? `Server Status: ${status}` : "Loading server status..."}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
