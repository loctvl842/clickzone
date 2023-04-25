import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    if (typeof title === "string") document.title = title;
    else document.title = "ClickZone";
  }, [title]);
}
