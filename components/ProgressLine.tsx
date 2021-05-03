import { Line } from "rc-progress";
import { useEffect, useState } from "react";
import { interval } from "rxjs";
import { map, mapTo, scan } from "rxjs/operators";
import { Box } from "./layout/Box";

const PROGRESS_INTERVAL_MS = 100;

export const ProgressLine = ({strokeWidth, progress, duration, paused, colorFront, colorBack,...props}) => {
  const [percent, setPercent] = useState(progress / duration * 100);
  useEffect(() => {
    if (paused) {
      return;
    }
    const sub = interval(PROGRESS_INTERVAL_MS).pipe(
      mapTo(PROGRESS_INTERVAL_MS),
      scan((acc, curr) => acc + curr, progress),
      map((newProgress) => newProgress / duration * 100)
    ).subscribe(setPercent);

    return () => {
      sub.unsubscribe();
    };
  }, [progress, duration, paused]);
  return (
  <Box {...props}>
    <Line
      strokeWidth={strokeWidth ?? 1}
      percent={percent}
      strokeColor={colorFront}
      trailColor={colorBack}
      />
  </Box>
  );
};