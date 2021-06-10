import logo from "./logo.svg";
import Child from "./child";
import { Provider } from "./context";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider value={{ info: "传给child的数据啊" }}>
        <div>
          <Child />
        </div>
      </Provider>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
