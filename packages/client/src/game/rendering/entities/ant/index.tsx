import React, { useMemo } from 'react';
import { Head } from './head';
import { Abdomen } from './abdomen';
import { Thorax } from './thorax';
import { Container } from 'react-pixi-fiber';
import { Point } from 'pixi.js';

export interface IProps {
  key: string;
  playerId: string;
  x: number;
  y: number;
  dist: number;
  scale: number;
}
let direction = "left";
export const Ant = (props: IProps) => {
  
  const scale = useMemo(() => {
    if (direction === "right") {
      return new Point(-1, 1);
    } else {
      return new Point(1, 1);
    }
  }, [direction]);

  let color = 0x787372;
  let headOffset = { x: -6, y: -3 };
  let thoraxOffset = { x: 1, y: -1 };
  let abdomenOffset = { x: 9, y: -2 };
  return (
    <>
      <Container x={props.x} y={props.y} scale={scale}>
        <Head x={headOffset.x} y={headOffset.y} width={6} height={5} />
        <Thorax x={thoraxOffset.x} y={thoraxOffset.y} dist={5} width={9} height={7} />
        <Abdomen x={abdomenOffset.x} y={abdomenOffset.y} width={10} height={8} />
      </Container>
    </>
  )
  throw new Error('Unimplemented render of ant');
};
