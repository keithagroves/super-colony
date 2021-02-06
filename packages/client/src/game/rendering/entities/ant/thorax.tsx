import { Ellipse } from '../../components/Ellipse';
import React from 'react';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Thorax = (props: IProps) => {
    return (
    <>
    <Ellipse x={props.x} y={props.y} width={props.width} height={props.height}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
