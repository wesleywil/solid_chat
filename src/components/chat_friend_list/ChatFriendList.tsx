import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import { Socket } from "socket.io-client";

import styles from "./ChatFriendList.module.css";
import logo from "../../assets/logo.webp";

// Components
import ChatFriendListItem from "../chat_friend_list_item/ChatFriendListItem";
import { User } from "../../utils/interfaces";

const ChatFriendList: Component<{ socket: Socket }> = (props) => {
  const [allUsers, setAllUsers] = createSignal<User[]>([]);
  const [users, setUsers] = createSignal<User[]>([]);
  const [filter, setFilter] = createSignal("");

  createEffect(async () => {
    const response = await fetch("http://localhost:5000/api/users/");
    const data = await response.json();
    setAllUsers(data.users);
    setUsers(data.users);
  });

  const handleFilter: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const filteredUsers = allUsers().filter((item) =>
      item.username.toLowerCase().includes(e.currentTarget.value)
    );
    setUsers(filteredUsers);
  };

  return (
    <div class={styles.container}>
      <img src={logo} alt="logo" class={styles.container_image} />
      <h1 class={styles.title}>Friend List</h1>
      <input
        type="text"
        placeholder="Search Contacts"
        class={styles.search_input}
        value={filter()}
        onInput={(e) => handleFilter(e)}
      />
      <div class={styles.friend_list}>
        <For each={users()}>{(item) => <ChatFriendListItem user={item} />}</For>
      </div>
    </div>
  );
};

export default ChatFriendList;
