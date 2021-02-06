import React, { CSSProperties, ChangeEvent } from "react";

const INPUT: CSSProperties = {
  fontSize: 16,
  borderRadius: 8,
  height: 48,
  paddingLeft: 8,
  paddingRight: 8,
  outline: "none",
  border: "2px solid #efefef",
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%",
};

const FOCUSED: CSSProperties = {
  border: "solid #375a7f 2px",
};

export function Input(props: {
  ariaLabel: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  style?: CSSProperties;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  const {
    value,
    placeholder,
    style,
    maxLength,
    onChange,
    ariaLabel,
    onKeyDown,
  } = props;
  const [{ hovered, focused }, setState] = React.useState({
    hovered: false,
    focused: false,
  });

  return (
    <input
      id={props.id}
      aria-label={ariaLabel}
      type="text"
      value={value}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      style={{
        ...INPUT,
        ...style,
        ...(focused && FOCUSED),
      }}
      onMouseEnter={() => setState({ hovered: true, focused })}
      onMouseLeave={() => setState({ hovered: false, focused })}
      onFocus={() => setState({ focused: true, hovered })}
      onBlur={() => setState({ focused: false, hovered })}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
