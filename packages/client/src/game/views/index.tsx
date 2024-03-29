import React, { Component, useMemo } from "react";
import { StateManager } from "game/state";
import { useDisableScroll, useWindowSize } from "hooks";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { render } from "react-pixi-fiber";
import { GameInstance } from "../rendering/instance"
import { Controls } from "game/controls";
import { Types } from "@adventurers/common";
import { SpatialHash } from "pixi-cull";
import { World } from "game/rendering/entities/world";

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
  cull!: SpatialHash;
  state: PlayViewState = {
    fps: 60,
    ping: 50,
    menuShow: false,
  };
  world:any;
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
    this.cull = new SpatialHash();
    this.viewport.scale = new PIXI.Point(scale, scale);
    this.app.stage.addChild(this.viewport);
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

   
  

    const width = this.app.view.width;
    const height = this.app.view.height;
    const me = stateManager.playerView;
    if (this.props.stateManager.room) {
      this.world = <World stateManager={stateManager} x={me.x} y={me.y}></World>
         
      
    }

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
        world={this.world}
        me={me}
      />
      , this.culledViewport());

  }

  culledViewport(): Viewport {
    if (this.viewport.dirty) {
      this.cull.addContainer(this.viewport.children[0] as PIXI.Container);
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
