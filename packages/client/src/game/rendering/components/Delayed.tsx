import React from "react";

export class Delayed extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hidden: true };
  }
  tref?: ReturnType<typeof setTimeout>;
  componentDidMount() {
    this.tref = setTimeout(() => {
      this.setState({ hidden: false });
    }, this.props.waitBeforeShow);
  }

  componentWillUnmount() {
    this.tref && clearTimeout(this.tref);
  }

  render() {
    return this.state.hidden ? <></> : this.props.children;
  }
}

export default Delayed;
