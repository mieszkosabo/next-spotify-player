import { Line } from "rc-progress";
import { Box } from "../layout/Box";

// export const ProgressLine = styled(Line)`
//     width: 70%;
//     height: calc(min(2vh, 2vw) / 2);
// `;

export const ProgressLine = ({percent, colorFront, colorBack,...props}) => (
  <Box {...props}>
    <Line
      strokeWidth={0.5}
      percent={percent}
      strokeColor={colorFront}
      trailColor={colorBack}
      />
  </Box>
);