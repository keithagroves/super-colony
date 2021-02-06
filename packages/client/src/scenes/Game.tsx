import React, { Component, ReactNode } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { Subscription } from "rxjs";

import {StateManager} from "../game/state/StateManger"
import { PlayView } from "../game/views";
import { ColyseusService } from "services/colyseus";
import { show_error_banner } from "util/banner";

interface IProps extends RouteComponentProps {
  colyseus: ColyseusService;
  roomId?: string;
}

interface IState {
  loading: boolean;
}

export default class Game extends Component<IProps, IState> {
  stateManager: StateManager;
  historySubscription?: Subscription;
  state: IState = {
    loading: false
  }

  constructor(props: IProps) {
    super(props);
    this.stateManager = new StateManager(
      this.props.colyseus,
      this.props.roomId || "random"
    );
  }

  componentDidMount() {
    this.stateManager.setup()
      .then(() => {
        window.history.replaceState({}, "/random", "/random/" + this.stateManager.roomId);
        this.setState(() => {return {loading: false}});
      })
      .catch((e: Error) => {
        navigate("/");
        show_error_banner(`Error joining lobby ${this.props.roomId}`);
        console.error(e);
      });
  }

  componentWillUnmount() {
    this.stateManager.room?.leave(true);
  }

  render(): ReactNode {
    if (this.state.loading) {
      return <div>Loading...</div>
    }

    return <PlayView stateManager={this.stateManager} />;
  }
}
