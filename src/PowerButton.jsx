import React from 'react';

const PowerButton = ({ clicked }) => {  // Destructure the 'clicked' prop
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`power-button ${clicked ? "glow" : ""}`} // Fixed className conditional logic
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="6" x2="12" y2="12" />
      <circle cx="12" cy="12" r="6" />
      <style>
        {`
          .power-button.glow {
            filter: drop-shadow(0 0 6px white);
            transition: all 0.3s ease;
          }
          .power-button {
            filter: drop-shadow(0 0 15px white);
          }
        `}
      </style>
    </svg>
  );
};

export default PowerButton;