import React, { Component } from "react";
import { StateManager } from "game/state";
import { useDisableScroll } from "hooks";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { render } from "react-pixi-fiber";
import {GameInstance} from "../rendering/instance"
import { Controls } from "game/controls";

interface PlayViewProps {
  stateManager: StateManager;
}

interface PlayViewState  {
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

let scale = getScale();
function getScale() {
  return 2;
}

export class PlayView extends Component<PlayViewProps, PlayViewState> {
  app!: PIXI.Application;
  gameCanvas!: HTMLDivElement;
  viewport!: Viewport;
  state: PlayViewState = {
    fps: 60,
    ping: 50,
    menuShow: false,
  };
  playerPosition: {x: number, y: number} = {x: 0, y :0};

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
    this.viewport.scale = new PIXI.Point(scale, scale);
    this.app.stage.addChild(this.viewport);
    this.app.start();
    this.raf = requestAnimationFrame(this.tick);
  }

  tick = () => {
    this.props.stateManager.tick();
    this.renderGame();
    this.raf= requestAnimationFrame(this.tick)
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


    this.viewport.scale = new PIXI.Point(scale, scale);

    const width = this.app.view.width;
    const height = this.app.view.height;
    const me = stateManager.me;

    if (me !== null) {
      this.viewport.x = -me.x * scale + width / 2;
      this.viewport.y = -me.y * scale + height / 2;
      this.playerPosition = { x: me.x, y: me.y };
    }

    this.setState({
      
      fps: this.app.ticker.FPS,
     
    })

    render(<GameInstance
      key="game-instance"
      viewport={this.viewport}
      me = {me}
      />, this.viewport);
  }
  actionCallback(){
    console.log("actioncallback")
  }
  mouseMoveCallback(){
    console.log("mouseMoveCallback")

  }
  mouseClickCallback(){
    console.log("mouseClickCallback")

  }


  render() {
    let component = this;
    return (
      <>
        <ScrollDisable />
        <div
          className="game-display"
          ref={(thisDiv) => {
            component.gameCanvas = thisDiv!;
          }}
        />
        <Controls domElement={window} actionCallback={this.actionCallback} mouseMoveCallback={this.mouseMoveCallback} shootCallback={this.mouseClickCallback}/>
      </>
    );
  }
}
