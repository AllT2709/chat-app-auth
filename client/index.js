import React from "react";
import ReactDOM from "react-dom";

import App from "./src/App";
import { UserContextProvider } from "./src/context/UserContext";

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById("root")
);
