import { Component } from "solid-js";
import { Socket } from "socket.io-client";

import styles from "./Navbar.module.css";
import logo from "../../assets/logo.webp";

const Navbar: Component<{ socket: Socket }> = (props) => {
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
          <a href="/signIn" class={styles.navbar_link}>
            New Account
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
