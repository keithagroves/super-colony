import React, { useMemo, useRef } from "react";
import { Subject } from 'rxjs';

import { Container } from "react-pixi-fiber";
import { Container as PIXIContainer } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Types } from '@adventurers/common';
import { DebugCircle } from './components/DebugCircle';
import { Rectangle } from "./components";
import { Ant } from "./entities/ant";
import { Simple } from "pixi-cull";

interface IProps {
  viewport: Viewport,
  me: Types.Player,
  cull: Simple
}
interface Xy {
  x: number,
  y: number
}
let objs: Xy[] = [];
export const GameInstance = (props: IProps) => {
  const state = props;
  if (objs.length < 1) {
    for (let i = 0; i < 1000; i++) {
      objs.push({ x: Math.random() * 2000 - 100, y: Math.random() * 2000 - 100 })
    }

  }
  const players = [];
  let me = props.me;
  let antsNotDrawn = 0;
  for (let i = 0; i < objs.length; i++) {
    let ant = objs[i];
    let bounds = props.viewport.getVisibleBounds();
    if (ant.x < bounds.width + bounds.x && ant.x > bounds.x && ant.y < bounds.height + bounds.y && ant.y > bounds.y) {
      players.push(<Ant playerId={"abc"+i} key={"abc"+i} x={ant.x} y={ant.y} scale={1} />);
    } else {
      antsNotDrawn++;
    }
  }
  console.log("ants not drawn"+antsNotDrawn);

  // TODO(lukewood): trim cachedMap to be able to render tiles based on culling
  return (
    <>
      <Container sortableChildren={true}>
        {players}
        <Ant playerId={"abc"} key={""} x={me.x} y={me.y} scale={1} />
        <Rectangle x={100} y={100} width={50} height={100} fill={255} fillAlpha={1} outline={10}></Rectangle>
      </Container>
    </>
  );
};
