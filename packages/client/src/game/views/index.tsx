import React, { Component } from "react";
import { StateManager } from "game/state";
import { useDisableScroll, useWindowSize } from "hooks";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { render } from "react-pixi-fiber";
import { GameInstance } from "../rendering/instance"
import { Controls } from "game/controls";
import { Types } from "@adventurers/common";
import { Simple } from "pixi-cull";
import { Rectangle } from "game/rendering/components/Rectangle";
import { Block } from "game/rendering/entities/block";

interface PlayViewProps {
  stateManager: StateManager;
}

interface PlayViewState {
  fps: number;
  ping: number;
  menuShow: boolean;
  roundStartTime?: number;
  roundDuration?: number;
}

const ScrollDisable = () => {
  useDisableScroll();
  return <></>;
};

const HandleResize = () => {
  useWindowSize();
  return <></>;
}

let scale = getScale();
function getScale() {
  return 2;
}

export class PlayView extends Component<PlayViewProps, PlayViewState> {
  app!: PIXI.Application;
  gameCanvas!: HTMLDivElement;
  viewport!: Viewport;
  cull!: Simple;
  state: PlayViewState = {
    fps: 60,
    ping: 50,
    menuShow: false,
  };
  playerPosition: { x: number, y: number } = { x: 0, y: 0 };

  raf?: ReturnType<typeof requestAnimationFrame>;

  /**
   * After mounting, add the Pixi Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.app = new PIXI.Application({
      resizeTo: window,
      antialias: false,
      autoDensity: true,
      backgroundColor: 0x787372
    });
    this.gameCanvas!.appendChild(this.app.view);
    this.viewport = new Viewport();
    this.cull = new Simple();
    this.viewport.scale = new PIXI.Point(scale, scale);
    this.app.stage.addChild(this.viewport);
    this.cull.addList(this.viewport.children);
    this.app.start();
    this.raf = requestAnimationFrame(this.tick);
  }

  tick = () => {
    this.props.stateManager.tick();
    this.renderGame();
    this.raf = requestAnimationFrame(this.tick)
  }

  componentWillUnmount() {
    this.app.stop();
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = undefined;
    }
  }

  renderGame() {
    const stateManager = this.props.stateManager;
    if (!stateManager.firstState) {
      // not ready to render yet
      return;
    }
    //this.cull.addList(this.viewport.children);
    //this.cull.cull(this.viewport)
    this.viewport.scale = new PIXI.Point(scale, scale);
    let blocksRects: any = [];
    
    if(this.props.stateManager.room){
    const blocks = this.props.stateManager.room.state.blocks;
    if(blocks){
      blocks.forEach((value: any, key: string)=>{
        blocksRects.push(<Block key={key} x={value.x} y={value.y} width={100} height = {100}   />)
  }
      );
  }
  }
  
  console.log(blocksRects.length);
    const width = this.app.view.width;
    const height = this.app.view.height;
    const me = stateManager.playerView;
    
    if (me !== null) {
      this.viewport.x = -me.x * scale + width / 2;
      this.viewport.y = -me.y * scale + height / 2;
      this.playerPosition = { x: me.x, y: me.y };
    }

    this.setState({

      fps: this.app.ticker.FPS,

    })

    render(
      <GameInstance
        key="game-instance"
        viewport={this.viewport}
        me={me}
        blockRects={blocksRects}
        cull={this.cull}
      />
      , this.culledViewport());

  }

  culledViewport(): Viewport {
    if (this.viewport.dirty) {
      this.cull.addList(this.viewport.children);
      this.cull.cull(this.viewport.getVisibleBounds());
      this.viewport.dirty = false;
    }
    return this.viewport;
  }
  actionCallback(inputs: Types.IInputs) {
    console.log("actioncallback");
    this.props.stateManager.playerView.inputs(inputs);
//   this.props.stateManager.room?.send("input", inputs);
  //  }
  }
  mouseMoveCallback() {
    console.log("mouseMoveCallback")

  }
  mouseClickCallback() {
    console.log("mouseClickCallback")

  }


  render() {
    let component = this;
    return (
      <>
        <HandleResize />
        <ScrollDisable />
        <div
          className="game-display"
          ref={(thisDiv) => {
            component.gameCanvas = thisDiv!;
          }}
        />
        <Controls domElement={window} actionCallback={(v: Types.IInputs) => this.actionCallback(v)} mouseMoveCallback={this.mouseMoveCallback} shootCallback={this.mouseClickCallback} />
      </>
    );
  }
}
