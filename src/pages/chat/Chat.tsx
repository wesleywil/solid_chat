import { Component, createEffect, createSignal, For } from "solid-js";
import { Socket } from "socket.io-client";
import useRedux from "../../redux/useRedux";

import styles from "./Chat.module.css";
import logo from "../../assets/logo.webp";

// Components
import ChatMessage from "../../components/chat_message/ChatMessage";
import ChatFriendList from "../../components/chat_friend_list/ChatFriendList";
import ChatFooter from "../../components/chat_footer/ChatFooter";
import { utilStore } from "../../redux/utils/utils";

const Chat: Component<{ socket: Socket }> = (props) => {
  const [state] = useRedux(utilStore, []);
  const [messages, setMessages] = createSignal<
    { text: string; name: string; id: string }[]
  >([]);

  createEffect(() => {
    props.socket.on("messageResponse", (data) => {
      setMessages((prev) => [data, ...prev]);
    });
  });

  return (
    <div class={styles.container}>
      <img src={logo} alt="logo" class={styles.container_image} />
      <div class={styles.content}>
        <div class={styles.messages}>
          <For each={messages()}>
            {(item) =>
              item.name === localStorage.getItem("username") ? (
                <ChatMessage sender={false} message={item.text} />
              ) : (
                <ChatMessage sender={true} message={item.text} />
              )
            }
          </For>
        </div>
        <ChatFooter socket={props.socket} />
      </div>
      {state.hideFriendList ? "" : <ChatFriendList socket={props.socket} />}
    </div>
  );
};

export default Chat;
