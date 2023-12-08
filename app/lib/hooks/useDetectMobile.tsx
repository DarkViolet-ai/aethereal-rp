import { useEffect, useState } from "react";

export const useDetectMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    // This regex checks for a wide range of mobile devices
    const mobileRegex =
      /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
};

export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState<string>("0px");

  useEffect(() => {
    // this function checks if CSS environment variables are supported
    const isEnvSupported =
      window.CSS &&
      window.CSS.supports &&
      window.CSS.supports("top: env(safe-area-inset-top)");

    if (isEnvSupported) {
      // we set the safe area bottom inset
      const safeAreaInsetBottom = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--safe-area-inset-bottom");
      setSafeArea(safeAreaInsetBottom);
    }
  }, []);

  return safeArea;
};
