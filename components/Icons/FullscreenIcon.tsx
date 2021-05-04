import * as React from "react";

interface Props {
  fill?: string;
}
export const FullscreenIcon = ({ fill, ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 25 25"
      fill={fill ?? "white"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 3a.5.5 0 00-.5-.5H17a.5.5 0 000 1h4v4a.5.5 0 001 0V3zm-6.646 6.854l6.5-6.5-.708-.708-6.5 6.5.708.708zM21.5 22a.5.5 0 00.5-.5V17a.5.5 0 00-1 0v4h-4a.5.5 0 000 1h4.5zm-6.854-6.646l6.5 6.5.708-.708-6.5-6.5-.708.708zM2.5 21.5a.5.5 0 00.5.5h4.5a.5.5 0 000-1h-4v-4a.5.5 0 00-1 0v4.5zm6.646-6.854l-6.5 6.5.708.708 6.5-6.5-.708-.708zM3 2.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0v-4h4a.5.5 0 000-1H3zm6.854 6.646l-6.5-6.5-.708.708 6.5 6.5.708-.708z"
      />
    </svg>
  );
};
