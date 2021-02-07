import { Ellipse } from '../../components/Ellipse';
import React from 'react';
import { Head } from './head';
import { Abdomen } from './abdomen';
import { Thorax } from './thorax';

export interface IProps {
  key: string;
  playerId: string;
  x: number;
  y: number;
  scale: number;
}

export const Ant = (props: IProps) => {
    let color = 0x787372;
    let headOffset = {x:-6, y:-3};
    let thoraxOffset = {x:0, y:-1};
    let abdomenOffset = {x:7, y:-2};
    return (
    <>
    <Head x={props.x+headOffset.x} y = {props.y+headOffset.y} width={6} height={5}/>
    <Thorax x={props.x+thoraxOffset.x} y = {props.y+thoraxOffset.y} width={7} height={7}/> 
    <Abdomen x={props.x+abdomenOffset.x} y = {props.y+abdomenOffset.y} width={10} height={8}/> 
    </>
    )
  throw new Error('Unimplemented render of ant');
};
