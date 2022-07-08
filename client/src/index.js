import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "./translation/i18n";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>
);
