import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { auth, firestore, db } from "./firebase";
import App from "./App";

export const Context = createContext();

ReactDOM.render(
  <Context.Provider
    value={{
      auth,
      firestore,
      db,
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Context.Provider>,
  document.getElementById("root")
);
