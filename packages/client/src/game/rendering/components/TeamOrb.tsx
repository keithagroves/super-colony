import * as PIXI from "pixi.js";

import { CustomPIXIComponent } from "react-pixi-fiber";

type TeamOrbProps = {
  x: number;
  y: number;
  scale?: number;
  radius: number;
  zIndex?: number;
};

function propsEqual(oldProps: TeamOrbProps, newProps: TeamOrbProps) {
  return (
    oldProps.radius === newProps.radius &&
    oldProps.zIndex === newProps.zIndex &&
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.scale === newProps.scale
  );
}

export const TeamOrb = CustomPIXIComponent<PIXI.Graphics, TeamOrbProps>(
  {
    customDisplayObject: (props) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (newProps.zIndex) {
        instance.zIndex = newProps.zIndex;
      }
      if (!propsEqual(oldProps, newProps)) {
        instance.clear();
        instance.drawCircle(
          newProps.x,
          newProps.y,
          newProps.radius * (newProps.scale || 1)
        );
        instance.endFill();
      }
    },
  },
  "TeamOrb"
);
