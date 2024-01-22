import { Component, createEffect, createSignal, For } from "solid-js";
import { io, Socket } from "socket.io-client";

import styles from "./Chat.module.css";
import logo from "../assets/logo.webp";

// Components
import ChatMessage from "../components/chat_message/ChatMessage";
import ChatFriendList from "../components/chat_friend_list/ChatFriendList";
import ChatFooter from "../components/chat_footer/ChatFooter";

const socket: Socket = io("http://localhost:5000");

const Chat: Component = () => {
  const [hideList, setHideList] = createSignal(true);
  const [messages, setMessages] = createSignal<
    { text: string; name: string; id: string }[]
  >([]);

  createEffect(() => {
    socket.on("messageResponse", (data) => {
      // setMessages([...prevMessages, data])
      console.log(data);
      setMessages((prev) => [...prev, data]);
      console.log("array message ===> ", JSON.stringify(messages()));
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
        <ChatFooter socket={socket} />
      </div>
      {hideList() ? "" : <ChatFriendList />}
    </div>
  );
};

export default Chat;
