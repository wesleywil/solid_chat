import { Component, createEffect, createSignal, For } from "solid-js";
import { Socket } from "socket.io-client";

import styles from "./ChatFriendList.module.css";
import logo from "../../assets/logo.webp";

// Components
import ChatFriendListItem from "../chat_friend_list_item/ChatFriendListItem";

const ChatFriendList: Component<{ socket: Socket }> = (props) => {
  const [users, setUsers] = createSignal<{ username: string }[]>([]);

  createEffect(
    () => {
      props.socket.on("newUserResponse", (data) => {
        setUsers(data);
      });
    },
    {
      defer: true,
      props: { socket: props.socket },
    }
  );
  return (
    <div class={styles.container}>
      <img src={logo} alt="logo" class={styles.container_image} />
      <h1 class={styles.title}>Friend List</h1>
      <input
        type="text"
        placeholder="Search Contacts"
        class={styles.search_input}
      />
      <div class={styles.friend_list}>
        <For each={users()}>
          {(item) => <ChatFriendListItem name={item.username} />}
        </For>
      </div>
    </div>
  );
};

export default ChatFriendList;
