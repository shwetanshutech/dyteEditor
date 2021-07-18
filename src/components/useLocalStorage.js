// on refersh to save data - this useLocalStorage custom hook
import React from "react";
import { useEffect, useState } from "react";

//using prefix for distinguishing the local Storage varaibles for exact application
const PREFIX = "dyte-codeEditor-";
//takes key and intial value
function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  //get value from local storage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    //return the value from local stoage if u have one
    if (jsonValue != null) return JSON.parse(jsonValue);
    //if it is not present
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //Happens when everytime the value is change
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
