import React from 'react';
import { Line } from '../../components/Line';
import { Container } from 'react-pixi-fiber';

export interface IProps {
  x: number;
  y: number;
  radius: number;
}
let rot = Math.PI / 2;
let rotl = Math.PI;
let feelersRight = 0.01;
let feelersLeft = 0.01;

export const Antenna = (props: IProps) => {
  rot += feelersRight;
  rotl +=feelersLeft;
  if (rot < Math.PI / 2 || rot > Math.PI + Math.PI / 4) {
    feelersRight = -feelersRight;
  }
  if (rotl < Math.PI / 2 || rotl > Math.PI + Math.PI / 4) {
    feelersLeft = -feelersLeft;
  }
  let antennaRadius = 8;
  let leftAntennaJointX = Math.cos(4.0) * antennaRadius;
  let rightAntennaJointX = Math.cos(4.5) * antennaRadius;
  let leftAntennaJointY = Math.sin(4.0) * antennaRadius;
  let rightAntennaJointY = Math.sin(4.5) * antennaRadius;
  let leftAntennaEndX = Math.cos(rotl) * antennaRadius;
  let rightAntennaEndX = Math.cos(rot) * antennaRadius;
  let leftAntennaEndY = Math.sin(rotl) * antennaRadius;
  let rightAntennaEndY = Math.sin(rot) * antennaRadius;
  return (
    <>
      <Container x={props.x} y={props.y}>
        <Line startX={0} endX={leftAntennaJointX} startY={0} endY={leftAntennaJointY} width={1} color={0x001100} />
        <Line startX={0} endX={rightAntennaJointX} startY={0} endY={rightAntennaJointY} width={1} color={0x001100} />
        <Line startX={leftAntennaJointX} endX={leftAntennaJointX + leftAntennaEndX} startY={leftAntennaJointY} endY={leftAntennaJointY + leftAntennaEndY} width={1} color={0x001100} />
        <Line startX={rightAntennaJointX} endX={rightAntennaJointX + rightAntennaEndX} startY={rightAntennaJointY} endY={rightAntennaJointY + rightAntennaEndY} width={1} color={0x001100} />
      </Container>
    </>
  )
  throw new Error('Unimplemented render of ant');
};