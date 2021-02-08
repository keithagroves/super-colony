import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Line } from '../../components/Line';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Head = (props: IProps) => {
    let antennaRadius = 8;
    return (
    <>
    <Ellipse x={props.x} y={props.y} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={10}/>
    <Line startX={props.x} endX={props.x+Math.cos(4.0)*antennaRadius} startY={props.y} endY={props.y+Math.sin(4.0)*antennaRadius} width={1} color={0x001100}/>
    <Line startX={props.x} endX={props.x+Math.cos(4.5)*antennaRadius} startY={props.y} endY={props.y+Math.sin(4.5)*antennaRadius} width={1} color={0x001100}/>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.4)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.4)*antennaRadius*.6} width={1} color={0x001100}/>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.6)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.6)*antennaRadius*.6} width={1} color={0x001100}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
