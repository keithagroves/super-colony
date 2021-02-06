import React from "react";
import { Bar } from "./Bar";

interface HealthBarProps {
  x: number;
  y: number;
  health: number;
  width: number;
  height: number;
}

export const HealthBar = (props: HealthBarProps) => {
  return (
    <>
      <Bar
        color={0x000000}
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
      />
      <Bar
        color={0xff3300}
        x={props.x}
        y={props.y}
        width={(props.width * props.health) / 100}
        height={props.height}
      />
    </>
  );
};
