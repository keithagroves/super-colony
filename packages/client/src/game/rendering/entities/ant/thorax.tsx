import { Line } from '../../components/Line';
import { Ellipse } from '../../components/Ellipse';
import React from 'react';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
let frameCount = 0;
const legRadius = 4;
export const Thorax = (props: IProps) => {
    frameCount+=0.04;
    let legY = props.y+2;
    let legset2 = frameCount+ Math.PI*0.7;
    let legset3 = frameCount+ Math.PI*1.5;
    return (
    <>
    <Ellipse x={props.x} y={props.y} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={0}/>
    <Line startX={props.x+3} endX={props.x+3+Math.sin(frameCount+Math.PI)*legRadius} startY={legY} endY={legY+Math.cos(frameCount+Math.PI)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x-2} endX={props.x-2+Math.sin(frameCount)*legRadius} startY={legY} endY={legY+Math.cos(frameCount)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x+7} endX={props.x+7+Math.sin(frameCount)*legRadius} startY={legY} endY={legY+Math.cos(frameCount)*legRadius} width={1} color={0x001100}/>
    
    <Line startX={props.x+3} endX={props.x+3+Math.sin(legset2+Math.PI)*legRadius} startY={legY} endY={legY+Math.cos(legset2+Math.PI)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x-2} endX={props.x-2+Math.sin(legset2)*legRadius} startY={legY} endY={legY+Math.cos(legset2)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x+7} endX={props.x+7+Math.sin(legset2)*legRadius} startY={legY} endY={legY+Math.cos(legset2)*legRadius} width={1} color={0x001100}/>

    <Line startX={props.x+3} endX={props.x+3+Math.sin(legset3+Math.PI)*legRadius} startY={legY} endY={legY+Math.cos(legset3+Math.PI)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x-2} endX={props.x-2+Math.sin(legset3)*legRadius} startY={legY} endY={legY+Math.cos(legset3)*legRadius} width={1} color={0x001100}/>
    <Line startX={props.x+7} endX={props.x+7+Math.sin(legset3)*legRadius} startY={legY} endY={legY+Math.cos(legset3)*legRadius} width={1} color={0x001100}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
