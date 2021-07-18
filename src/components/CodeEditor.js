//CODE editor part that is repeated for HTML,CSS,JS
import React, { useState } from "react";

//Css related to code Editor related to
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
//import languages that will be used in the text editor ,xml-> html here
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
//this is the text editor
import { Controlled as Editor } from "react-codemirror2";
import "../App.css";
function CodeEditor(props) {
  const { language, displayName, value, onChange } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }
  return (
    <div className="code-container">
      <div className="code-title">{displayName}</div>
      {/* options are added from codemirror librabry */}
      <Editor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
