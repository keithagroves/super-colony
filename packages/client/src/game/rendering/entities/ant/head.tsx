import { Ellipse } from '../../components/Ellipse';
import React, { useRef } from 'react';
import { Line } from '../../components/Line';
import { Container } from 'react-pixi-fiber';
import { Antenna } from './antenna';
import { Mandibles } from './mandibles';

export interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
const antennaRadius = 8;
let targetLeft = Math.PI;
let targetRight = Math.PI;

export const Head = (props: IProps) => {
    let leftAntenna = useRef(Math.random()*Math.PI+Math.PI/2);
    let rightAntenna = useRef(Math.random()*Math.PI+Math.PI/2);

    if(leftAntenna.current < targetLeft){
      leftAntenna.current+=0.01;
    }
    return (
    <>

    <Antenna x={props.x} y={props.y} radius={antennaRadius} angle={leftAntenna.current}></Antenna>
    <Antenna x={props.x} y={props.y} radius={antennaRadius} angle={rightAntenna.current}></Antenna>
    <Mandibles x={props.x} y={props.y} ></Mandibles>
    <Container x ={props.x} y = {props.y} rotation={Math.PI*.75}>
    <Ellipse x={0} y={0} width={props.width} height={props.height} fill={0x000031} fillAlpha={1} outline={10} rotation={Math.PI}/>
    <Ellipse x={0} y={-1} width={props.width/2} height={props.height/2} fill={0x313131} fillAlpha={1} outline={0} rotation={Math.PI}/>
    </Container>
    
    
    </>
    )
  throw new Error('Unimplemented render of ant');
};
