import { Ellipse } from '../../components/Ellipse';
import React from 'react';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Head = (props: IProps) => {
    return (
    <>
    <Ellipse x={props.x} y={props.y} width={props.width} height={props.height} fill={255} fillAlpha={1} outline={10}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
