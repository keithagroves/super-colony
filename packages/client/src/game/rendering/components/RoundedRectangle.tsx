import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface RoundedRectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fillAlpha?: number;
  outline?: number;
  outlineWidth?: number;
  fill?: number;
  zIndex?: number;
}

function propsEqual(oldProps: RoundedRectangleProps, newProps: RoundedRectangleProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.outline === newProps.outline &&
    oldProps.fill === newProps.fill &&
    oldProps.height === newProps.height
  );
}

export const RoundedRectangle = CustomPIXIComponent<PIXI.Graphics, RoundedRectangleProps>(
  {
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        if (newProps.zIndex) {
          instance.zIndex = newProps.zIndex;
        }
        instance.clear();
        if (newProps.fill) {
          instance.beginFill(newProps.fill, newProps.fillAlpha || 1);
          instance.drawRoundedRect(
            newProps.x,
            newProps.y,
            newProps.width,
            newProps.height,
            newProps.radius
          );
          instance.endFill();
        }
        if (newProps.outline) {
          instance.lineStyle(newProps.outlineWidth || 1, newProps.outline);
          instance.drawRoundedRect(
            newProps.x,
            newProps.y,
            newProps.width,
            newProps.height,
            newProps.radius
          );
        }
      }
    },
  },
  "Rectangle"
);
