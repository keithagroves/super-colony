import { Rectangle } from '../../components/Rectangle';
import React, { useMemo } from 'react';
import { Container } from 'react-pixi-fiber';
import { RoundedRectangle } from '../../components/RoundedRectangle';
import { StateManager } from 'game/state';
import {Block} from '../block/index';
import { getDistance } from '@adventurers/common/build/maths';
export interface IProps {
  stateManager: StateManager;
  x: number;
  y: number;
}
let drawBlocks = [];
export const World = (props: IProps) => {
    const blocks = props.stateManager.room.state.blocks;
    
    drawBlocks = useMemo(() => {
        const blocksRects: any = [];
        console.log("updating blocks")
        blocks.forEach((value: any, key: string) => {
            if(getDistance(value.x, value.y, props.x, props.y)< 100){
                blocksRects.push(<Block key={key} x={value.x} y={value.y} width={30} height={30} />)
            }
        });    
            return blocksRects;
          }, [blocks,props.x,props.y]);   
    return (
    <>
        {drawBlocks}
    </>
    )
  throw new Error('Unimplemented render of ant');
};