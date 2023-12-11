import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

// Remember to place a div in the root <div id="modal-root"></div> inside the body tag
// preferably just under all the main content

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container] = useState(document.createElement("div"));

  useEffect(() => {
    const portalRoot = document.getElementById("modal-root") || document.body;
    portalRoot.appendChild(container);

    return () => {
      portalRoot.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
