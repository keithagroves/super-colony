import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Line } from '../../components/Line';
import { Container } from 'react-pixi-fiber';
import { Antenna } from './antenna';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
let rot = 0;
export const Head = (props: IProps) => {
    let antennaRadius = 8;
    rot+=0.01;
    return (
    <>
    <Container x ={props.x} y = {props.y} rotation={Math.PI*.75}>
    <Ellipse x={0} y={0} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={10} rotation={rot}/>
    </Container>
    <Antenna x={props.x} y={props.y} radius={antennaRadius}></Antenna>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.4)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.4)*antennaRadius*.6} width={1} color={0x001100}/>
    <Line startX={props.x} endX={props.x+Math.cos(Math.PI-.6)*antennaRadius*.6} startY={props.y} endY={props.y+Math.sin(Math.PI-.6)*antennaRadius*.6} width={1} color={0x001100}/>
    
    
    </>
    )
  throw new Error('Unimplemented render of ant');
};
