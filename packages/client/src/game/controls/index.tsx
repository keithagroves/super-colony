import React, { useCallback, useMemo } from "react";
import {DesktopControls} from './desktop';
import {Types} from '@adventurers/common'
import { IInputs } from "@adventurers/common/build/types";

export let staffAngle = 0;
export const setStaffAngle = (v: number) => {
  staffAngle = v;
}

export const controlsDown: { [key: string]: object } = {
  w: { up: true },
  a: { left: true },
  s: { down: true },
  d: { right: true },
  arrowup: { up: true },
  arrowright: { right: true },
  arrowleft: { left: true },
  arrowdown: { down: true },
};

export const controlsUp: { [key: string]: object } = {
  w: { up: false },
  a: { left: false },
  s: { down: false },
  d: { right: false },
  arrowup: { up: false },
  arrowright: { right: false },
  arrowleft: { left: false },
  arrowdown: { down: false },
};

export let activeControls : IInputs= {
  left: false,
  up: false,
  right: false,
  down: false,
  shoot: false,
};

export type keyType = keyof typeof activeControls;

export interface ControlProps {
  actionCallback: (p: Types.IInputs) => void;
  mouseMoveCallback: (e: MouseEvent) => void;
  shootCallback: (v: boolean) => void;
  domElement: {addEventListener: any; removeEventListener: any;}
}

export const Controls = (props: ControlProps) => {
  const actionCallback = props.actionCallback;
  const domElement = props.domElement;

  // update controls state
  const updateAndSend = useCallback(
    (change: { [K in keyType]?: boolean | string }) => {
      const changeClone = Object.assign({}, change);
      for (let key in change) {
        if (change[key as keyType]! === "!") {
          changeClone[key as keyType]! = !activeControls[key as keyType];
        }
      }
      const updated = Object.assign({}, activeControls, changeClone);
      console.log("updated"+JSON.stringify(updated));
      actionCallback(updated);
      activeControls = updated;
    },
    [actionCallback]
  );




  return <DesktopControls
    updateAndSend={updateAndSend}
    {...props}
  />
};
