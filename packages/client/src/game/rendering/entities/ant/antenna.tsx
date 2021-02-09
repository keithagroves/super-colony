import React, { useMemo, useRef, useState } from 'react';
import { Line } from '../../components/Line';
import { Container } from 'react-pixi-fiber';
import { stat } from 'fs';

export interface IProps {
  x: number;
  y: number;
  radius: number;
  angle: number;
}
const antennaRadius = 8;
export class Antenna extends React.Component{
  feelersMove=0.01;
  jointMove=0.01;
  antennaJointX:number; 
  antennaJointY:number;
  antennaEndX:number;
  antennaEndY:number;
  target:number = Math.PI;
  angle;
  jointAngle;
  jointTarget = Math.PI;
      constructor(readonly props: IProps){
        super(props);
        this.antennaJointX = Math.cos(4.0) * antennaRadius;
        this.antennaJointY = Math.sin(4.0) * antennaRadius;
        this.antennaEndX = Math.cos(props.angle) * antennaRadius;
        this.antennaEndY = Math.sin(props.angle) * antennaRadius;
        this.angle = Math.random()*Math.PI+Math.PI/2;
        this.jointAngle =Math.random()*Math.PI+Math.PI/2; 
        
      }
      componentDidMount() {
        
          
        
      }
    
      componentWillUnmount() {
      }
   
      render() {
        this.angle+=this.feelersMove;
        this.angle%=(2*Math.PI);
        if(Math.abs(this.angle - this.target) < 0.01){
          this.target = Math.random()*Math.PI+Math.PI/2;
          if(this.target > this.angle){
            this.feelersMove = 0.001;
          } else {
            this.feelersMove = -0.001;
          }
        }
        this.jointAngle+=this.jointMove;
        this.jointAngle%=(2*Math.PI);
        if(Math.abs(this.jointAngle - this.jointTarget) < 0.01){
          this.jointTarget = Math.random()*Math.PI/2+Math.PI;
          if(this.jointTarget > this.jointAngle){
            this.jointMove = Math.random()*0.01;
          } else {
            this.jointMove = -Math.random()*0.01;
          }
        }
        this.antennaJointX = Math.cos(this.jointAngle) * antennaRadius;
        this.antennaJointY = Math.sin(this.jointAngle) * antennaRadius;
        this.antennaEndX = Math.cos(this.angle) * antennaRadius;
        this.antennaEndY = Math.sin(this.angle) * antennaRadius;
        return (
          <>
            <Container x={this.props.x} y={this.props.y}>
              <Line startX={0} endX={this.antennaJointX} startY={0} endY={this.antennaJointY} width={1} color={0x001100} />
              <Line startX={this.antennaJointX} endX={this.antennaJointX + this.antennaEndX} startY={this.antennaJointY} endY={this.antennaJointY + this.antennaEndY} width={1} color={0x001100} />
            </Container>
          </>
        )
        throw new Error('Unimplemented render of ant');
      }
}
