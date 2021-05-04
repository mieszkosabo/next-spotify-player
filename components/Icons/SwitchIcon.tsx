import * as React from "react";

export const SwitchDisplay = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 1h15a1 1 0 011 1v15a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zM0 2a2 2 0 012-2h15a2 2 0 012 2v15a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm3 10a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H3zm12 2H7v-1h8v1zm-8 2h4.5v-1H7v1z"
        fill="#fff"
      />
    </svg>
  );
};