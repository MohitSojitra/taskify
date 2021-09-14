import * as React from "react";

function HelpIcon(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 22c-5.52-.006-9.994-4.48-10-10v-.2C2.11 6.305 6.635 1.928 12.13 2c5.497.074 9.904 4.569 9.868 10.065C21.962 17.562 17.497 22 12 22zm-.016-2H12a8 8 0 10-.016 0zM13 18h-2v-2h2v2zm0-3h-2a3.583 3.583 0 011.77-3.178C13.43 11.316 14 10.88 14 10a2 2 0 10-4 0H8v-.09a4 4 0 018 .09 3.413 3.413 0 01-1.56 2.645A3.1 3.1 0 0013 15z"
        fill="#2E3143"
      />
    </svg>
  );
}

export default HelpIcon;
