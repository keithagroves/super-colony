import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Container } from 'react-pixi-fiber';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const Abdomen = (props: IProps) => {

    return (
    <>
    <Container x ={props.x} y = {props.y} rotation={Math.PI*.75}>
      <Ellipse x={0} y={0} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={0}/>
    </Container>
    </>
    )
  throw new Error('Unimplemented render of ant');
};
