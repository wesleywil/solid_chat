/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { io, Socket } from "socket.io-client";

import "./index.css";
import App from "./App";
import Chat from "./pages/chat/Chat";
import SignIn from "./pages/signIn/SignIn";

// Components
import Navbar from "./components/navbar/Navbar";

const root = document.getElementById("root");
const socket: Socket = io("http://localhost:5000");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <>
      <Navbar socket={socket} />
      <Router>
        <Route path="/" component={App} />
        <Route path="/chat" component={() => <Chat socket={socket} />} />
        <Route path="/signIn" component={() => <SignIn socket={socket} />} />
      </Router>
    </>
  ),
  root!
);
