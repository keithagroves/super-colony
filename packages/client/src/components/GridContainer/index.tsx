import React, { FunctionComponent } from "react";
import "./centerer.scss";

interface IProps {}

export const GridContainer: FunctionComponent<IProps> = ({ children }) => {
  return <div className="grid-container">{children}</div>;
};
