import React, { Component, lazy, Suspense } from "react";
import { Router, globalHistory } from "@reach/router";
import { ColyseusService } from "services/colyseus";
import {analytics} from 'services/analytics';
import {settings, SCALE_MODES} from 'pixi.js';
import {Loading} from './scenes/Loading';

const Game = lazy(() => import("./scenes/Game"));
const ErrorRoute = lazy(() => import("./scenes/ErrorRoute"));
const CharacterCustomization = lazy(
  () => import("./scenes/CharacterCustomization")
);
const SplashMenu = lazy(() => import('./scenes/menu/SplashMenu'));
const Settings = lazy(() => import("./scenes/settings/Settings"));

settings.ROUND_PIXELS = true;
settings.SCALE_MODE = SCALE_MODES.NEAREST;

interface IProps {}

class App extends Component {
  colyseus: ColyseusService;

  constructor(props: IProps) {
    super(props);
    this.colyseus = new ColyseusService(
      process.env.NODE_ENV !== "production"
        ? "ws"
        : window.location.protocol !== "https:"
        ? "ws"
        : "wss",
      window.location.hostname,
      String(
        process.env.NODE_ENV !== "production" ? 8001 : window.location.port
      )
    );
  }

  historyUnsubscribe?: ReturnType<typeof globalHistory.listen>;
  componentDidMount() {
    analytics.pageView(window.location.pathname);
    this.historyUnsubscribe = globalHistory.listen(v => {
      analytics.pageView(v.location.pathname);
    })
  }

  componentWillUnmount(){
    if (this.historyUnsubscribe) {
      this.historyUnsubscribe();
    }
  }

  render() {
    return (
      <Suspense fallback={<Loading/>}>
        <Router className="router-root">
          <Game colyseus={this.colyseus} roomId="random" path="/random/:roomId" />
          <Game colyseus={this.colyseus} path="/custom/:roomId" />
          <CharacterCustomization colyseus={this.colyseus} path="/character-create" />
          <Settings path="/settings"/>
          <SplashMenu path="/" />
          <ErrorRoute default />
        </Router>
      </Suspense>
    );
  }
}

export default App;
