import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (trans, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, trans]);
    }
    setMode(trans);
  };

  const back = () => {
    if (history.length !== 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => {
        const currHistory = [...prev];
        currHistory.pop();
        return currHistory;
      });
    }
  }

  return {mode, transition, back};
}