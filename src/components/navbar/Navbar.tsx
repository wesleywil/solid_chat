import { Component, createEffect } from "solid-js";
import { Socket } from "socket.io-client";
import useRedux from "../../redux/useRedux";

import styles from "./Navbar.module.css";
import logo from "../../assets/logo.webp";
import { setShowDisconnect, utilStore } from "../../redux/utils/utils";

const Navbar: Component<{ socket: Socket }> = (props) => {
  const [state, actions] = useRedux(utilStore, { setShowDisconnect });
  const handleDisconnect = () => {
    localStorage.removeItem("username");
    actions.setShowDisconnect(false);
  };

  createEffect(() => {
    //Upade logic here when "username" is removed from local storage
    if (localStorage.getItem("username")) {
      actions.setShowDisconnect(true);
    }
  });
  return (
    <header class={styles.container}>
      <div class={styles.subcontainer}>
        <a href="/" class={styles.navbar_logo}>
          <img src={logo} alt="logo" class={styles.logo} />
        </a>
        <div class={styles.navbar_links}>
          <a href="/chat" class={styles.navbar_link}>
            Chat
          </a>
          {state.showDisconnect ? (
            <button
              onClick={handleDisconnect}
              class={styles.navbar_btn_disconnect}
            >
              Disconnect
            </button>
          ) : (
            <a href="/signIn" class={styles.navbar_link}>
              SignIn
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
