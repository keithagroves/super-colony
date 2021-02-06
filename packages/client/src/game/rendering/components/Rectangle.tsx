import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fillAlpha?: number;
  outline?: number;
  outlineWidth?: number;
  fill?: number;
  zIndex?: number;
}

function propsEqual(oldProps: RectangleProps, newProps: RectangleProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.outline === newProps.outline &&
    oldProps.fill === newProps.fill &&
    oldProps.height === newProps.height
  );
}

export const Rectangle = CustomPIXIComponent<PIXI.Graphics, RectangleProps>(
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
          instance.drawRect(
            newProps.x,
            newProps.y,
            newProps.width,
            newProps.height
          );
          instance.endFill();
        }
        if (newProps.outline) {
          instance.lineStyle(newProps.outlineWidth || 1, newProps.outline);
          instance.drawRect(
            newProps.x,
            newProps.y,
            newProps.width,
            newProps.height
          );
        }
      }
    },
  },
  "Rectangle"
);
