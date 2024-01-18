import { Component } from "solid-js";
import ChatFriendListItem from "../chat_friend_list_item/ChatFriendListItem";

import styles from "./ChatFriendList.module.css";

const ChatFriendList: Component = () => {
  return (
    <div class={styles.container}>
      <h1 class={styles.title}>Friend List</h1>
      <input
        type="text"
        placeholder="Search Contacts"
        class={styles.search_input}
      />
      <div class={styles.friend_list}>
        <ChatFriendListItem />
        <ChatFriendListItem />
        <ChatFriendListItem />
        <ChatFriendListItem />
      </div>
    </div>
  );
};

export default ChatFriendList;
