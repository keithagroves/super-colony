import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  zIndex?: number;
}

function propsEqual(oldProps: BarProps, newProps: BarProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.color === newProps.color &&
    oldProps.height === newProps.height
  );
}

export const Bar = CustomPIXIComponent<PIXI.Graphics, BarProps>(
  {
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        if (newProps.zIndex) {
          instance.zIndex = newProps.zIndex;
        }
        instance.clear();
        instance.beginFill(newProps.color);
        instance.drawRect(
          newProps.x,
          newProps.y,
          newProps.width,
          newProps.height
        );
        instance.endFill();
      }
    },
  },
  "Bar"
);
