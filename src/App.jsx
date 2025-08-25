import "./App.css";
import { useState } from "react";
import { UC, LC, SYM, NUM } from "./data/PassData";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const notify = () => toast("⚠️ Inavlid Choice.", { theme: "dark" });
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [passLength, setPassLength] = useState(10);
  let [password, setPassword] = useState("");
  let generatePass = () => {
    let charOptions = "";
    let generatedPass = "";

    if (uppercase || lowercase || number || symbol) {
      if (uppercase) charOptions += UC;
      if (lowercase) charOptions += LC;
      if (symbol) charOptions += SYM;
      if (number) charOptions += NUM;
      for (let i = 0; i < passLength; i++) {
        generatedPass += charOptions.charAt(
          Math.floor(Math.random() * charOptions.length)
        );
      }
      setPassword(generatedPass);
      console.log(generatedPass);
    } else {
      {
        notify();
      }
    }
  };
  let copyPassword = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <div>
      <div className="completePage">
        <div className="box">
          <h3>Password Generator</h3>
          <div className="outputarea">
            <input type="text" value={password} readOnly />
            <button onClick={copyPassword}>COPY</button>
          </div>
          <div className="lengtharea">
            <h4>Password Length:</h4>
            <input
              type="number"
              value={passLength}
              onChange={(event) => {
                setPassLength(event.target.value);
              }}
              min={10}
              max={20}
            />
          </div>
          <div className="UCarea" value={uppercase}>
            <h4>UpperCase Alphabets:</h4>
            <input
              type="checkbox"
              onChange={() => {
                setUppercase(!uppercase);
              }}
            />
          </div>
          <div className="LCarea" value={lowercase}>
            <h4>LowerCase Alphabets:</h4>
            <input
              type="checkbox"
              onChange={() => {
                setLowercase(!lowercase);
              }}
            />
          </div>
          <div className="NUMarea" value={number}>
            <h4>Numbers:</h4>
            <input
              type="checkbox"
              onChange={() => {
                setNumber(!number);
              }}
            />
          </div>
          <div className="SYMarea" value={symbol}>
            <h4>Symbols:</h4>
            <input
              type="checkbox"
              onChange={() => {
                setSymbol(!symbol);
              }}
            />
          </div>
          <div className="btn">
            <button onClick={generatePass}>Generate Password</button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
