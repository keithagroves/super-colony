import { Ellipse } from '../../components/Ellipse';
import React from 'react';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Abdomen = (props: IProps) => {
    return (
    <>
    <Ellipse x={props.x} y={props.y} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={0}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
