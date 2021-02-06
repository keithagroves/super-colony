import React, { useMemo, useRef } from "react";
import {Subject} from 'rxjs';

import { Container } from "react-pixi-fiber";
import {Container as PIXIContainer} from 'pixi.js';
import {Viewport} from 'pixi-viewport';
import {Types} from '@adventurers/common';
import {DebugCircle} from './components/DebugCircle';
import { Rectangle } from "./components";
import { Ant } from "./entities/ant";

interface IProps {
  viewport: Viewport,
  me: Types.Player
}

export const GameInstance = (props: IProps) => {
  const state = props;
  const players = [];
  let me = props.me;

  // TODO(lukewood): trim cachedMap to be able to render tiles based on culling
  return (
    <>
      <Container sortableChildren={true}>
      <Ant playerId={"abc"} key={""} x={me.x} y={me.y} width={300} height={100}/>
      <DebugCircle x={me.x} y={me.y} radius={50}></DebugCircle>
      <DebugCircle x={100} y={100} radius={50}></DebugCircle>
      <Rectangle x={100} y={100} width={50} height={100} fill={255} fillAlpha={1} outline={10}></Rectangle>
      </Container>
    </>
  );
};
