import { useState, useEffect } from "react";

type ScreenSize = "desktop" | "mobile" | "tablet";

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    return width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 100);
    };

    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
};
