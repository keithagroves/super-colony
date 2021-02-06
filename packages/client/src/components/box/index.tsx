import React, { CSSProperties, ReactNode } from "react";

import "./box.scss";

export function Box(props: {
  style?: CSSProperties;
  children: ReactNode;
  className?: string
}): React.ReactElement {
  const { style, children } = props;
  return (
    <div style={style} className={"container-box " + (props.className || '')}>
      {children}
    </div>
  );
}
