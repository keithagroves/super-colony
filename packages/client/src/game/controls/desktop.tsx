import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import {setStaffAngle, keyType, controlsDown, ControlProps, controlsUp} from './index';

interface DesktopControlProps extends ControlProps {
  updateAndSend: (change: { [K in keyType]?: boolean | string }) => void;
}

export const DesktopControls = (props: DesktopControlProps) => {
  const { domElement, updateAndSend, actionCallback, mouseMoveCallback, shootCallback} = props;

  // movement
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }
    };
    domElement.addEventListener("keydown", keydown);
    return () => {
      domElement.removeEventListener("keydown", keydown);
    };
  }, [ domElement]);

  // movement
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }
      const change = controlsDown[e.key.toLowerCase()] || {};
      updateAndSend(change);
    };
    const keyup = (e: KeyboardEvent) => {
      const change = controlsUp[e.key.toLowerCase()] || {};
      updateAndSend(change);
    };
    domElement.addEventListener("keydown", keydown);
    domElement.addEventListener("keyup", keyup);
    return () => {
      domElement.removeEventListener("keydown", keydown);
      domElement.removeEventListener("keyup", keyup);
    };
  }, [actionCallback, updateAndSend, domElement]);

  // Aiming
  useEffect(() => {
    const cb = (e: MouseEvent) => {
      mouseMoveCallback(e);
    };

    const mousemove = fromEvent<MouseEvent>(domElement, "mousemove");

    const s1 = mousemove.subscribe((e) => {
    });

    const subscription = mousemove
      .pipe(throttleTime(50))
      .subscribe((e: MouseEvent) => cb(e));

    return () => {
      subscription.unsubscribe();
      s1.unsubscribe();
    };
  }, [mouseMoveCallback, domElement]);

  useEffect(() => {
    const cbDown = () => {
      shootCallback(true);
    };
    const cbUp = () => {
      shootCallback(false);
    };
    domElement.addEventListener("mousedown", cbDown);
    domElement.addEventListener("mouseup", cbUp);

    return () => {
      domElement.removeEventListener("mousedown", cbDown);
      domElement.removeEventListener("mouseup", cbUp);
    };
  }, [shootCallback, domElement]);

  return <></>;
}
