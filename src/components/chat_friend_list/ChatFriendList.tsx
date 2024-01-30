import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
} from "solid-js";
import { Socket } from "socket.io-client";
import { User } from "../../utils/interfaces";
import useRedux from "../../redux/useRedux";
import { setHideFriendList, utilStore } from "../../redux/utils/utils";

import styles from "./ChatFriendList.module.css";

// Components
import ChatFriendListItem from "../chat_friend_list_item/ChatFriendListItem";

const ChatFriendList: Component<{ socket: Socket }> = (props) => {
  const [state, actions] = useRedux(utilStore, { setHideFriendList });
  const [allUsers, setAllUsers] = createSignal<User[]>([]);
  const [users, setUsers] = createSignal<User[]>([]);
  const [filter, setFilter] = createSignal("");
  const [containerClass, setContainerClass] = createSignal(styles.container);

  createEffect(async () => {
    const response = await fetch("http://localhost:5000/api/users/");
    const data = await response.json();
    setAllUsers(data.users);
    setUsers(data.users);
  });

  createEffect(() => {
    // set Hide Friend List
    if (state.hideFriendList) {
      setContainerClass(`${styles.container} ${styles.closed}`);
    } else {
      setContainerClass(styles.container);
    }
  });

  const handleFilter: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const filteredUsers = allUsers().filter((item) =>
      item.username.toLowerCase().includes(e.currentTarget.value)
    );
    setUsers(filteredUsers);
  };
  return (
    <div class={containerClass()}>
      <h1 class={styles.title}>Friend List</h1>
      <input
        type="text"
        class={styles.search_input}
        placeholder="Search Contacts"
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
