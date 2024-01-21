import type { Component } from "solid-js";

import styles from "./App.module.css";
import logo from "./assets/logo.webp";

const App: Component = () => {
  return (
    <div class={styles.container}>
      <div class={styles.subcontainer}>
        <div class={styles.tick}></div>
        <img src={logo} alt="logo" class={styles.logo} />
        <h1>SOLID CHAT</h1>
        <h2>Chat with Confidence in the Solid Zone</h2>
        <button>Try Now</button>
        <div class={styles.tick}></div>
      </div>
    </div>
  );
};

export default App;
