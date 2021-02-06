import * as PIXI from "pixi.js";

import { CustomPIXIComponent } from "react-pixi-fiber";

type LineProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  color: number;
  zIndex?: number;
};

const propKeys: (keyof LineProps)[] = [
  "startX",
  "startY",
  "endX",
  "endY",
  "color",
  "width",
  "zIndex",
];
function propsEqual(oldProps: LineProps, newProps: LineProps) {
  for (let prop of propKeys) {
    if (oldProps[prop] !== newProps[prop]) {
      return false;
    }
  }
  return true;
}

export const Line = CustomPIXIComponent<PIXI.Graphics, LineProps>(
  {
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (newProps.zIndex) {
        instance.zIndex = newProps.zIndex;
      }
      if (!propsEqual(oldProps, newProps)) {
        instance.clear();
        instance.lineStyle(newProps.width, newProps.color);
        instance.moveTo(newProps.startX, newProps.startY);
        instance.lineTo(newProps.endX, newProps.endY);
      }
    },
  },
  "Line"
);
