import React, {useState, useEffect} from 'react';
import './background-image.scss';
import ProgressiveImage from 'react-progressive-image';
import worlds from './worlds.jpg';
import worldsCompressed from './worlds-30-quality.jpg';
import { singletonHook } from 'react-singleton-hook';

export const cachedBackgroundImage = singletonHook(<></>, () => {
  const [state] = useState(<ProgressiveImage src={worlds} placeholder={worldsCompressed}>
    {(src: string) => <div style={{backgroundImage: `url(${src})`}} className="homepage-background" />}
  </ProgressiveImage>);
  return state;
})

export const BackgroundImage = () => {
  const bg = cachedBackgroundImage();
  return bg
}
