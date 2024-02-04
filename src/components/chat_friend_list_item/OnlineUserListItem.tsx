import { Component, createEffect, Show } from "solid-js";
import { chatStore, setUser, resetUser } from "../../redux/chat/chat";
import useRedux from "../../redux/useRedux";
import { User } from "../../utils/interfaces";

import styles from "./OnlineUserListItem.module.css";

const OnlineUserListItem: Component<{ user: User }> = (props) => {
  const [state, actions] = useRedux(chatStore, { setUser, resetUser });

  const setUserToChat = () => {
    actions.setUser(props.user);
  };

  const resetUserToChat = () => {
    actions.resetUser(props.user.id);
  };

  createEffect(() => {
    console.log("Effect Friend List Item");
  });
  return (
    <div class={styles.container}>
      <h2 class={styles.contact_name}>{props.user.username}</h2>
      <Show
        when={
          Object.keys(state.user).length > 0 && state.user.id === props.user.id
        }
        fallback={
          <button
            onClick={setUserToChat}
            class={`${styles.contact_button} ${styles.toChat}`}
          >
            Chat
          </button>
        }
      >
        <button
          onClick={resetUserToChat}
          class={`${styles.contact_button} ${styles.chatting}`}
        >
          Chatting
        </button>
      </Show>
    </div>
  );
};

export default OnlineUserListItem;
