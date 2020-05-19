import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import Router from "./route";

renderWithHotReload(Router);

function renderWithHotReload(Router) {
  ReactDOM.render(
          <BrowserRouter>
              <Router />
          </BrowserRouter>,
      document.getElementById("app")
  );
}