import React, { useMemo, useRef } from "react";

import { Container } from "react-pixi-fiber";
import { Viewport } from 'pixi-viewport';
import { Types } from '@adventurers/common';
import { Rectangle } from "./components/Rectangle";
import { Ant } from "./entities/ant";
import { Simple } from "pixi-cull";
import { PlayerViewManager } from "game/state/managers/PlayerViewManager";
import {Block} from './entities/block'
interface IProps {
  viewport: Viewport,
  me: PlayerViewManager,
  blockRects: JSX.Element[],
  cull: Simple
}
interface Xy {
  x: number,
  y: number
}
let testAnts: Xy[] = [];
export const GameInstance = (props: IProps) => {
  const state = props;
  if (testAnts.length < 1) {
    for (let i = 0; i < 1000; i++) {
      testAnts.push({ x: Math.random() * 2000 - 100, y: Math.random() * 2000 - 100 })
    }

  }
  const players = [];
  let me = props.me;
  let antsNotDrawn = 0;
  let bounds = props.viewport.getVisibleBounds();
  for (let i = 0; i < testAnts.length; i++) {
    let ant = testAnts[i];
    if (ant.x < bounds.width + bounds.x && ant.x > bounds.x && ant.y < bounds.height + bounds.y && ant.y > bounds.y) {
      players.push(<Ant playerId={"abc"+i} key={"abc"+i} dist={10} x={ant.x} y={ant.y} scale={1} />);
    } else {
      antsNotDrawn++;
    }
  }

  // TODO(keith): render ant legs at a constant rate.
  return (
    <>
      <Container sortableChildren={true}>
        {players}
        {props.blockRects}
        <Ant playerId={"abc"} key={"aasdf"} dist={19} x={me.x} y={me.y} scale={1} />
        <Rectangle x={100} y={100} width={50} height={100} fill={255} fillAlpha={1} outline={10}></Rectangle>
      </Container>
    </>
  );
};
