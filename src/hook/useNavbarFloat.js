import { useEffect, useState } from "react";

export default function useNavbarFloat() {
  const [float, setFloat] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setFloat(window.scrollY > 106);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return float;
}
