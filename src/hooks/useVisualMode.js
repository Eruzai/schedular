import { useState } from "react";

const useVisualMode = (initial) => {
  const [ history, setHistory ] = useState([ initial ]);
  const mode = history[history.length - 1];

  function transition(newMode, replace){
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    if(history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    };
  }

  return { mode, transition, back };
}

export default useVisualMode;