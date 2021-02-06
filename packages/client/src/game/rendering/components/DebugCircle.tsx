import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

type DebugCircleProps = {
  radius: number;
  x: number;
  y: number;
};

function propsEqual(oldProps: DebugCircleProps, newProps: DebugCircleProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.radius === newProps.radius
  );
}

export const DebugCircle = CustomPIXIComponent<PIXI.Graphics, DebugCircleProps>(
  {
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      instance.zIndex = 999;
      if (!propsEqual(oldProps, newProps)) {
        instance.clear();
        instance.lineStyle(0.5, 0xff00ff);
        instance.drawCircle(newProps.x, newProps.y, newProps.radius);
      }
    },
  },
  "DebugCircle"
);
