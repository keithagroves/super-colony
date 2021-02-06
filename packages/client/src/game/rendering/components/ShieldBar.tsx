import React from "react";
import { Bar } from "./Bar";
import { HEALTH_BAR_HEIGHT } from "../constants";

interface ShieldBarProps {
  x: number;
  y: number;
  health: number;
  width: number;
  height: number;
}

export const ShieldBar = (props: ShieldBarProps) => {
  if (props.health === 0) {
    return <></>;
  }

  const bars = [];
  let shield = props.health;

  let ydx = 0;
  while (shield > 0) {
    bars.push(
      <Bar
        key={"sb-" + ydx}
        color={0x000000}
        x={props.x}
        y={props.y - ydx}
        width={props.width}
        height={props.height}
      />
    );
    bars.push(
      <Bar
        key={"bg-" + ydx}
        color={0xff9999}
        x={props.x}
        y={props.y - ydx}
        width={(props.width * Math.min(100, shield)) / 100}
        height={props.height}
      />
    );
    ydx += HEALTH_BAR_HEIGHT + 1;
    shield -= 100;
  }

  return <>{bars}</>;
};
