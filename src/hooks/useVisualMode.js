import { useState } from "react";

const useVisualMode = (initial) => {
  const [ history, setHistory ] = useState([ initial ]);
  const mode = history[history.length - 1];

  function transition(newMode){
    setHistory(prev => [...prev, newMode]);
  }

  function back() {
    setHistory(prev => [...prev.slice(0, prev.length - 1)]);
  }

  return { mode, transition, back };
}

export default useVisualMode;