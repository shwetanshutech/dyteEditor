import React, { useState, useEffect } from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";
import useLocalStorage from "./components/useLocalStorage.js";
import "./components/File.css";
import Logo from "./components/Logo";

function App() {
  //Local Storage to get the value when refreshed
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  //string for srcDoc
  const [data, setData] = useState("");

  //Change activness of code editor based on selection from user
  const [active, setActive] = useState("html");
  //Putting up the HTML, CSS , JS together in the iframe as srcDoc for outputforming the structred document

  //Timeout , when any of the Js css/html changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  //Share Button activeness , flag value
  const [copied, setCopied] = useState(false);

  //Function for button
  function share() {
    const x = document.createElement("input");
    x.value = window.location.href;
    document.body.appendChild(x);
    x.select();
    document.execCommand("copy");
    document.body.removeChild(x);
    setCopied(true);
  }

  return (
    <div className="body">
      <div className="app">
        <div className="top-child">
          <div className="file">
            <div className="code-title">File Explorer</div>
            {/* 3 Files took as button to dynamically render the 3 types of components asked */}
            <button className="Btn" onClick={() => setActive("html")}>
              {"index.html"}
            </button>
            <button className="Btn" onClick={() => setActive("css")}>
              {"index.css"}
            </button>
            <button className="Btn" onClick={() => setActive("js")}>
              {"index.js"}
            </button>
          </div>
          {/* Based on Active state choicing which component to display */}
          <div className="main_editor">
            {active == "html" && (
              <CodeEditor
                language="xml"
                displayName="HTML"
                value={html}
                onChange={setHtml}
              />
            )}

            {active == "css" && (
              <CodeEditor
                language="css"
                displayName="CSS"
                value={css}
                onChange={setCss}
              />
            )}
            {active == "js" && (
              <CodeEditor
                language="javascript"
                displayName="JS"
                value={js}
                onChange={setJs}
              />
            )}
          </div>
          <div className="output">
            <iframe
              srcDoc={data}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        {/* Logo part */}
        <div className="bottom-child">
          <p> Problem Statement by</p>
          <Logo />
          <button onClick={share} className="share">
            {!copied ? "Share" : "Copied!"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
