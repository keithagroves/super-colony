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
  width: number;
  height: number;
}

export const Ant = (props: IProps) => {
    return (
    <>
    <Head x={props.x} y = {props.y} width={props.width} height={props.height}/>
    <Thorax x={props.x} y = {props.y} width={props.width} height={props.height}/> 
    <Abdomen x={props.x} y = {props.y} width={props.width} height={props.height}/> 
    </>
    )
  throw new Error('Unimplemented render of ant');
};
