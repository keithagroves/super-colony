import React, { Component, ReactNode, useState, ChangeEvent, SyntheticEvent } from "react";
import { RouteComponentProps, navigate, Link } from "@reach/router";
import { Center, Space, FlexAligner, FlexHog, BackgroundImage } from "components";

import './splash-menu.scss';

interface IProps extends RouteComponentProps {}

interface IState {
  chosenRoom: string;
}

interface SplashButtonProps {
  onClick: (e: SyntheticEvent) => void;
  text: string;
}

const SplashButton = (props: SplashButtonProps) => {
  return <button className="splash-button single-shadow" onClick={props.onClick}>{props.text}</button>
}

export default class SplashMenu extends Component<IProps, IState> {
  render(): ReactNode {
    return (
      <>
        <Center style={{height: '100%'}}>
        <FlexAligner>
          <FlexHog/>
          <div>
          <Space size="l" />
          <h1 className="fun-text title">Supercolony</h1>
          <SplashButton
            onClick={() => navigate("/random/random")}
            text="Join"
          />
          <Space size='xs'/>
          <SplashButton
            onClick={() => navigate("/spell-select")}
            text="Info"
          />
          <Space size='xs'/>
          <SplashButton
            onClick={() => navigate("/character-create")}
            text="Settings"
          />
          <Space size="xs" />
          </div>
          <FlexHog/>
        </FlexAligner>
        <BackgroundImage/>
        </Center>
      </>
    );
  }
}
