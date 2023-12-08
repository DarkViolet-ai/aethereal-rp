import React from "react";

export const Spinner = () => (
  <div className="spinner" aria-label="Loading">
    <style>
      {`
        .spinner,
        .spinner:after {
          border-radius: 50%;
          width: 1em;
          height: 1em;
        }
        .spinner {
          margin: 0 auto;
          font-size: 16px;
          position: relative;
          text-indent: -9999em;
          border-top: 0.1em solid rgba(0,255,255, 0.4);
          border-right: 0.1em solid rgba(0,255,255, 0.4);
          border-bottom: 0.1em solid rgba(0,255,255, 0.4);
          border-left: 0.1em solid rgba(0,255,255, 1);
          transform: translateZ(0);
          animation: load8 1.1s infinite linear;
        }
        @keyframes load8 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);
