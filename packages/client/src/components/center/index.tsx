import React, { FunctionComponent } from "react";
import "./centerer.scss";

interface IProps {
  style?: any
}

export const Center: FunctionComponent<IProps> = ({ children, style }) => {
  return <div style={style} className="centerer">{children}</div>;
};
