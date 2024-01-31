import { Component } from "solid-js";

import styles from "./ChatMessage.module.css";

const ChatMessage: Component<{
  sender: boolean;
  username: string;
  message: string;
}> = (props) => {
  const containerClass = `${styles.container} ${
    props.sender ? styles.sender : styles.receiver
  }`;
  return (
    <div class={containerClass}>
      <span class={styles.container_username}>{props.username}</span>
      <p class={styles.container_message}>{props.message}</p>
    </div>
  );
};

export default ChatMessage;
