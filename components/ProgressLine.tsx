import { Line } from "rc-progress";
import { Box } from "./layout/Box";

export const ProgressLine = ({strokeWidth, percent, colorFront, colorBack,...props}) => (
  <Box {...props}>
    <Line
      strokeWidth={strokeWidth ?? 1}
      percent={percent}
      strokeColor={colorFront}
      trailColor={colorBack}
      />
  </Box>
);