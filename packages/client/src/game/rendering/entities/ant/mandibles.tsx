import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Line } from '../../components/Line';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Mandibles = (props: IProps) => {
    let antennaRadius = 8;
    return (
    <>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.4)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.4)*antennaRadius*.6} width={1} color={0x001100}/>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.6)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.6)*antennaRadius*.6} width={1} color={0x001100}/>
    
    
    </>
    )
  throw new Error('Unimplemented render of ant');
};
