import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Rectangle } from 'game/rendering/components';

export interface IProps {
  key: string;
  playerId: string;
  x: number;
  y: number;
  scale: number;
}

export const Trail = (props: IProps) => {
    return (
    <>
<Rectangle x={props.x} y={props.y} width={100} height={100}></Rectangle> 
    </>
    )
  throw new Error('Unimplemented render of ant');
};
