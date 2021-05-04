import * as React from "react";

export const Palette = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M18.668 12A9.5 9.5 0 109.5 19c.865 0 2.5-.332 2.5-.332-2.558-7.46.521-6.783 3.305-6.17 1.57.345 3.045.67 3.363-.498zM2.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9.5 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6.5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM4.5 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#fff"
      />
    </svg>
  );
};
