import React, { Component, ReactNode} from "react";
import { RouteComponentProps, Link } from "@reach/router";
import {
  Box,
  Space,
  Center,
  BackgroundImage,
  GridContainer
} from "components";

import './settings.scss';
export const reserved = ['w', 'a', 's', 'd', 'z', 'space', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']

interface IProps extends RouteComponentProps {}

interface IState {
  chosenRoom: string;
}

interface SetSpellButtonProps {
  boundKey: string;
}

interface SetSpellButtonModalProps extends SetSpellButtonProps {
  onComplete: () => void;
}



export default class Settings extends Component<IProps, IState> {
  render(): ReactNode {
    return (
      <GridContainer>
        <Box>
        <Space size="xs" />
        <Center>
            <div style={{display: 'flex'}}>
            <Link className='full-width' to="/">
              <button className="splash-button">Home</button>
            </Link>
            </div>
        </Center>
        </Box>
        <BackgroundImage/>
      </GridContainer>
    );
  }
}
