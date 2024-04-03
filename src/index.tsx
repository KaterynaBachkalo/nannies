import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="/nanny-services">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);
