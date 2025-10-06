import { useEffect } from "react";

export function useTrainCursor() {
  useEffect(() => {
    // Apply custom train cursor
    document.body.style.cursor = "url('/train.svg') 16 16, auto";

    // Cleanup: reset cursor when component unmounts
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);
}
