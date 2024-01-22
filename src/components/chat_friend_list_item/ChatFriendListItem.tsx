import { Component } from "solid-js";

import styles from "./ChatFriendListItem.module.css";

const ChatFriendListItem: Component<{ name: string }> = (props) => {
  return (
    <div class={styles.container}>
      <h2 class={styles.contact_name}>{props.name}</h2>
      <button class={styles.contact_button}>Chat</button>
    </div>
  );
};

export default ChatFriendListItem;
