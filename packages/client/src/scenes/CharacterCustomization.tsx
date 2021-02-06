import React, { Component, ReactNode } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import {
  Space,
  Center,
} from "components";
import { ColyseusService } from "services/colyseus";
import './character-customization.scss';

interface IProps extends RouteComponentProps {
  colyseus: ColyseusService;
}

interface IState {
  chosenRoom: string;
}

export default class Customization extends Component<IProps, IState> {
  render(): ReactNode {
    return (
        <Center>
        <Center>
          <Center>
          <Link to="/spell-select">
            <button className="splash-button">info</button>
          </Link>
          <Space size='xs'/>
          <Link to="/">
            <button className="splash-button">Main Menu</button>
          </Link>
          </Center>
        </Center>
        </Center>
    );
  }
}
