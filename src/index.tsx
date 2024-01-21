/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import Chat from "./chat/Chat";
import SignIn from "./signIn/SignIn";

// Components
import Navbar from "./components/navbar/Navbar";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <>
      <Navbar />
      <Router>
        <Route path="/" component={App} />
        <Route path="/chat" component={Chat} />
        <Route path="/signIn" component={SignIn} />
      </Router>
    </>
  ),
  root!
);
