import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Set the portal root only when in a browser environment
    const rootElem = document.getElementById("portal-root");
    if (rootElem) setPortalRoot(rootElem);
  }, []);

  // Render children only if portalRoot is set
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
}
