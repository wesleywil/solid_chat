import { Component } from "solid-js";

import styles from "./Navbar.module.css";
import logo from "../../assets/logo.webp";

const Navbar: Component = () => {
  return (
    <header class={styles.container}>
      <a href="/" class={styles.navbar_logo}>
        <img src={logo} alt="logo" class={styles.logo} />
      </a>
      <div class={styles.navbar_links}>
        <a href="/chat" class={styles.navbar_link}>
          Chat
        </a>
      </div>
    </header>
  );
};

export default Navbar;
