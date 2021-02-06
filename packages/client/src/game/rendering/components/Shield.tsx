import React, { useState } from "react";
import { useFrame } from "hooks/useFrame";
import * as PIXI from "pixi.js";

import { CustomPIXIComponent } from "react-pixi-fiber";

type TeamOrbProps = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

function propsEqual(oldProps: TeamOrbProps, newProps: TeamOrbProps) {
  return (
    oldProps.radius === newProps.radius &&
    oldProps.x === newProps.x &&
    oldProps.alpha === newProps.alpha &&
    oldProps.y === newProps.y
  );
}

const PixiShield = CustomPIXIComponent<PIXI.Graphics, TeamOrbProps>(
  {
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        instance.clear();
        instance.beginFill(0xffffff, newProps.alpha); // White
        instance.drawCircle(newProps.x, newProps.y, newProps.radius);
        instance.endFill();
      }
    },
  },
  "PixiShield"
);

interface ShieldProps {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

export const Shield = (props: ShieldProps) => {
  const [f, setF] = useState(0);
  const [off] = useState(() => Math.random());
  useFrame((dx) => setF((v) => v + dx / 10));

  return (
    <PixiShield
      alpha={
        // max 0.5
        ((Math.sin(f + off) + 1) / 2) *
        Math.min(1, 1 - Math.pow(0.7, props.strength/25))
      }
      {...props}
      radius={props.radius+1}
    />
  );
};
