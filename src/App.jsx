import "./App.css";

import { useEffect, useState } from "react";
import { UC, LC, SYM, NUM } from "./data/PassData";
import { ToastContainer, toast } from "react-toastify";
import useSound from "use-sound";
import successSound from "./assets/sounds/completed.mp3";
import copySound from "./assets/sounds/copy.mp3";

function App() {
  useEffect(() => {
    generatePass();
  }, []);
  const passcopy = () =>
    toast("Copied to clipboard", {
      theme: "dark",
      autoClose: 3000,
    });
  let [uppercase, setUppercase] = useState(true);
  let [lowercase, setLowercase] = useState(true);
  let [number, setNumber] = useState(true);
  let [symbol, setSymbol] = useState(true);
  const [playSuccess] = useSound(successSound);
  const [playCopy] = useSound(copySound);
  let [passLength, setPassLength] = useState(10);
  let [password, setPassword] = useState("");
  let generatePass = () => {
    let charOptions = "";
    let generatedPass = "";

    let mandatoryChars = [];

    if (uppercase || lowercase || number || symbol) {
      if (uppercase) {
        charOptions += UC;
        mandatoryChars.push(UC[Math.floor(Math.random() * UC.length)]);
      }
      if (lowercase) {
        charOptions += LC;
        mandatoryChars.push(LC[Math.floor(Math.random() * LC.length)]);
      }
      if (symbol) {
        charOptions += SYM;
        mandatoryChars.push(SYM[Math.floor(Math.random() * SYM.length)]);
      }
      if (number) {
        charOptions += NUM;
        mandatoryChars.push(NUM[Math.floor(Math.random() * NUM.length)]);
      }

      generatedPass = mandatoryChars.join("");

      // Fill remaining characters
      for (let i = generatedPass.length; i < passLength; i++) {
        generatedPass += charOptions.charAt(
          Math.floor(Math.random() * charOptions.length)
        );
      }
      generatedPass = generatedPass
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
      setPassword(generatedPass);
      playSuccess();
      console.log(generatedPass);
    }
  };
  let copyPassword = () => {
    navigator.clipboard.writeText(password);
    playCopy();
    passcopy();
  };
  const getTotalSelected = () =>
    (uppercase ? 1 : 0) +
    (lowercase ? 1 : 0) +
    (number ? 1 : 0) +
    (symbol ? 1 : 0);

  return (
    <div>
      <div className="completePage">
        <div className="box">
          <h3>PASSWORD GENERATOR</h3>
          <div className="outputarea">
            <input type="text" value={password} readOnly />
            <button onClick={copyPassword}>COPY</button>
          </div>
          <div className="lengthslider">
            <input
              type="range"
              step={1}
              value={passLength}
              onChange={(e) => {
                const value = Number(e.target.value);
                const minValue = getTotalSelected();
                const maxValue = 20;
                playCopy();
                setPassLength(Math.min(Math.max(value, minValue), maxValue));
              }}
              min={getTotalSelected()}
              max={20}
            />
          </div>
          <div className="lengtharea">
            <h4>Password Length:</h4>
            <input
              className="lengthinput"
              type="number"
              value={passLength}
              onChange={(e) => {
                const value = Number(e.target.value);
                const minValue = getTotalSelected();
                const maxValue = 20;
                setPassLength(Math.min(Math.max(value, minValue), maxValue));
              }}
              min={getTotalSelected()}
              max={20}
            />
          </div>
          <div className="UCarea">
            <h4>UpperCase Alphabets:</h4>
            <input
              className={
                uppercase && getTotalSelected() === 1
                  ? "checkbox-disabled"
                  : "checkbox-enabled"
              }
              type="checkbox"
              checked={uppercase}
              onChange={() => {
                if (uppercase && getTotalSelected() === 1) return;
                setUppercase(!uppercase);
              }}
            />
          </div>
          <div className="LCarea">
            <h4>LowerCase Alphabets:</h4>
            <input
              className={
                lowercase && getTotalSelected() === 1
                  ? "checkbox-disabled"
                  : "checkbox-enabled"
              }
              type="checkbox"
              checked={lowercase}
              onChange={() => {
                if (lowercase && getTotalSelected() === 1) return;
                setLowercase(!lowercase);
              }}
            />
          </div>
          <div className="NUMarea">
            <h4>Numbers:</h4>
            <input
              className={
                number && getTotalSelected() === 1
                  ? "checkbox-disabled"
                  : "checkbox-enabled"
              }
              type="checkbox"
              checked={number}
              onChange={() => {
                if (number && getTotalSelected() === 1) return;
                setNumber(!number);
              }}
            />
          </div>
          <div className="SYMarea">
            <h4>Symbols:</h4>
            <input
              className={
                symbol && getTotalSelected() === 1
                  ? "checkbox-disabled"
                  : "checkbox-enabled"
              }
              type="checkbox"
              checked={symbol}
              onChange={() => {
                if (symbol && getTotalSelected() === 1) return;
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
