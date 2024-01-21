import { Component, createEffect, createSignal, For } from "solid-js";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "@solidjs/router";

import styles from "./Chat.module.css";
import logo from "../assets/logo.webp";
import burger_menu from "../assets/burger_menu.svg";

// Components
import ChatMessage from "../components/chat_message/ChatMessage";
import ChatFriendList from "../components/chat_friend_list/ChatFriendList";

const socket: Socket = io("http://localhost:5000");

const Chat: Component = () => {
  const navigate = useNavigate();
  const [hideList, setHideList] = createSignal(true);
  const [message, setMessage] = createSignal("");
  const [messages, setMessages] = createSignal<
    { text: string; name: string; id: string }[]
  >([]);

  createEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages(), data]));
    console.log("MESSAGES FROM SERVER ====>  ", JSON.stringify(messages()));
  });

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (message().trim() && localStorage.getItem("username")) {
      socket.emit("message", {
        text: message(),
        name: localStorage.getItem("username"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div class={styles.container}>
      <img src={logo} alt="logo" class={styles.container_image} />
      <div class={styles.content}>
        <div class={styles.messages}>
          <For each={messages()}>
            {(item, i) =>
              item.name === localStorage.getItem("username") ? (
                <ChatMessage sender={true} message={item.text} />
              ) : (
                <ChatMessage sender={false} message={item.text} />
              )
            }
          </For>
        </div>
        <form onSubmit={handleSendMessage} class={styles.chat}>
          <button
            type="button"
            onClick={handleLeaveChat}
            class={styles.chat_btn_disconnect}
          >
            <span>X</span>
          </button>
          <button
            type="button"
            onClick={() => setHideList(!hideList())}
            class={styles.chat_btn_friend_list}
          >
            <img
              src={burger_menu}
              alt="burger_menu"
              class={styles.chat_burger_menu_img}
            />
          </button>

          <textarea
            rows="1"
            placeholder="Type here the message"
            class={styles.chat_input}
            value={message()}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" class={styles.chat_button}>
            Send
          </button>
        </form>
      </div>
      {hideList() ? "" : <ChatFriendList />}
    </div>
  );
};

export default Chat;
