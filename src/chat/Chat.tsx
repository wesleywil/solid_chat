import { Component, createSignal } from "solid-js";

import styles from "./Chat.module.css";
import logo from "../assets/logo.webp";
import burger_menu from "../assets/burger_menu.svg";

// Components
import ChatMessage from "../components/chat_message/ChatMessage";
import ChatFriendList from "../components/chat_friend_list/ChatFriendList";

const Chat: Component = () => {
  const [hideList, setHideList] = createSignal(true);
  return (
    <div class={styles.container}>
      <img src={logo} alt="logo" class={styles.container_image} />
      <div class={styles.content}>
        <div class={styles.messages}>
          <ChatMessage
            sender={false}
            message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempore,"
          />
          <ChatMessage
            sender={false}
            message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione fugit repudiandae dolorum sequi, ab, blanditiis tempora saepe, odit libero dignissimos quisquam laboriosam ipsam suscipit error nulla alias excepturi autem iure!"
          />
          <ChatMessage sender={true} message="Hello There!" />
          <ChatMessage
            sender={true}
            message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempore,"
          />
          <ChatMessage sender={false} message="Hi" />
        </div>
        <div class={styles.chat}>
          <button
            onClick={() => setHideList(!hideList())}
            class={styles.chat_btn_friend_list}
          >
            <img
              src={burger_menu}
              alt="burger_menu"
              class={styles.chat_burger_menu_img}
            />
          </button>
          <input type="text" class={styles.chat_input} />
          <button class={styles.chat_button}>Send</button>
        </div>
      </div>
      {hideList() ? "" : <ChatFriendList />}
    </div>
  );
};

export default Chat;
