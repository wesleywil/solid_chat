import { Component } from "solid-js";

import styles from "./ChatMessage.module.css";

const ChatMessage: Component<{ sender: boolean; message: string }> = (
  props
) => {
  const containerClass = `${styles.container} ${
    props.sender ? styles.sender : styles.receiver
  }`;
  return (
    <div class={containerClass}>
      <p>{props.message}</p>
    </div>
  );
};

export default ChatMessage;
