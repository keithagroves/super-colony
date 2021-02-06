import React from 'react';
import {BackgroundImage, GridContainer, Center} from 'components';

export const Loading = () => {
  return <>
    <GridContainer>
      <Center>
        <h1 className="fun-text">Loading</h1>
      </Center>
    </GridContainer>
    <BackgroundImage/>
  </>
}
