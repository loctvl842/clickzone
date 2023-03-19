import { useCallback, useEffect } from "react";

export default function useClickOutside(ref, handler) {
  const listener = useCallback(
    (e) => {
      const el = ref?.current;
      if (el && el.contains(e.target)) {
        return;
      }
      handler(e);
    },
    [ref, handler]
  );
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [listener]);
  return ref;
}
