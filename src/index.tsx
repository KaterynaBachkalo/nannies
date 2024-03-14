import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "./redux/store";
// import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    {/* <Provider store={store}> */}
    {/* <PersistGate persistor={persistor}> */}
    <BrowserRouter basename="/nanny-services">
      <App />
      <ToastContainer />
    </BrowserRouter>
    {/* </PersistGate> */}
    {/* </Provider> */}
  </StrictMode>
);
