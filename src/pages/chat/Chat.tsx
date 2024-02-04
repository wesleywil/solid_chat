import { Component, createEffect, createSignal, For } from "solid-js";
import { Socket } from "socket.io-client";
import useRedux from "../../redux/useRedux";
import { utilStore } from "../../redux/utils/utils";

import styles from "./Chat.module.css";
import logo from "../../assets/logo.webp";

// Components
import ChatMessage from "../../components/chat_message/ChatMessage";
import OnlineUserList from "../../components/chat_friend_list/OnlineUserList";
import ChatFooter from "../../components/chat_footer/ChatFooter";

const Chat: Component<{ socket: Socket }> = (props) => {
  const [state] = useRedux(utilStore, []);
  const [messages, setMessages] = createSignal<
    { text: string; name: string; id: string; socketID: string }[]
  >([]);

  createEffect(() => {
    console.log("SOCKET ID ==> ", props.socket.id);
    props.socket.on("messageResponse", (data) => {
      setMessages((prev) => [data, ...prev]);
    });
  });

  return (
    <div class={styles.container}>
      {/* Friend List */}
      <OnlineUserList socket={props.socket} />
      {/* Content */}
      <div class={styles.sub_container}>
        <img src={logo} alt="logo" class={styles.sub_container_image} />
        <div class={styles.content}>
          <div class={styles.messages}>
            <For each={messages()}>
              {(item) =>
                item.socketID === props.socket.id ? (
                  <ChatMessage
                    sender={false}
                    username={item.name}
                    message={item.text}
                  />
                ) : (
                  <ChatMessage
                    sender={true}
                    username={item.name}
                    message={item.text}
                  />
                )
              }
            </For>
          </div>
          <ChatFooter socket={props.socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
