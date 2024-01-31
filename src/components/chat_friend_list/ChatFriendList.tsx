import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import { Socket } from "socket.io-client";
import useRedux from "../../redux/useRedux";
import { setHideFriendList, utilStore } from "../../redux/utils/utils";
import { filterOnlineUsers, userStore } from "../../redux/users/users";

import styles from "./ChatFriendList.module.css";

// Components
import ChatFriendListItem from "../chat_friend_list_item/ChatFriendListItem";

const ChatFriendList: Component<{ socket: Socket }> = (props) => {
  const [state, actions] = useRedux(utilStore, { setHideFriendList });
  const [userState, userActions] = useRedux(userStore, { filterOnlineUsers });
  const [containerClass, setContainerClass] = createSignal(styles.container);

  createEffect(() => {
    // set Hide Friend List
    if (state.hideFriendList) {
      setContainerClass(`${styles.container} ${styles.closed}`);
    } else {
      setContainerClass(styles.container);
    }
  });

  const handleFilter: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    console.log("FILTER ==> ", e.currentTarget.value);
    userActions.filterOnlineUsers(e.currentTarget.value);
  };
  return (
    <div class={containerClass()}>
      <h1 class={styles.title}>Friend List</h1>
      <input
        type="text"
        class={styles.search_input}
        placeholder="Search Contacts"
        onInput={(e) => handleFilter(e)}
      />
      <div class={styles.friend_list}>
        <For each={userState.onlineUsers}>
          {(item) => <ChatFriendListItem user={item} />}
        </For>
      </div>
    </div>
  );
};

export default ChatFriendList;
