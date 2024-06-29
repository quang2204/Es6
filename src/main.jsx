import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/nprogress/nprogress.css";
import "./index.css";
import "./App.css";
import Router from "./Componer/Router/Router";
import { CreateContext } from "./Context/CreateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <CreateContext> */}
      <Router></Router>
      {/* </CreateContext> */}
    </BrowserRouter>
  </React.StrictMode>
);
