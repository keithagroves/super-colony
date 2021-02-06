import React, {FunctionComponent} from 'react';
import './aligner.scss';

interface IProps{};
export const Aligner: FunctionComponent<IProps> = (props) => {
  return <div className="aligner">{props.children}</div>
}
