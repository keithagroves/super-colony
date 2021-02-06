import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import {analytics} from 'services/analytics';
analytics.config()

ReactDOM.render(<App />, document.getElementById("root"));
