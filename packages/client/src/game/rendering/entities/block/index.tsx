import { Rectangle } from '../../components/Rectangle';
import React from 'react';
import { Container } from 'react-pixi-fiber';
import { RoundedRectangle } from '../../components/RoundedRectangle';

export interface IProps {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
export const Block = (props: IProps) => {

    return (
    <>
      <RoundedRectangle key={props.key} x={props.x} y={props.y} width={props.width} height={props.height} radius={12} fill={0x635231} fillAlpha={1} outline={1}/>
    </>
    )
  throw new Error('Unimplemented render of ant');
};