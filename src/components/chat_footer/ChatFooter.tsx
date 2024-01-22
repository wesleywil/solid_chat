import { Component, createEffect, createSignal } from "solid-js";

import styles from "./ChatFooter.module.css";
import burger_menu from "../../assets/burger_menu.svg";
import { useNavigate } from "@solidjs/router";
import { Socket } from "socket.io-client";

const ChatFooter: Component<{ socket: Socket }> = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = createSignal("");
  const [typingStatus, setTypingStatus] = createSignal("");

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const handleTyping = () => {
    console.log("Typing");
    props.socket.emit(
      "typing",
      `${localStorage.getItem("username")} is typing...`
    );
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (message().trim() && localStorage.getItem("username")) {
      props.socket.emit("message", {
        text: message(),
        name: localStorage.getItem("username"),
        id: `${props.socket.id}${Math.random()}`,
        socketID: props.socket.id,
      });
    }
    setMessage("");
  };

  createEffect(
    () => {
      console.log("Effect from chatFooter");
      const typingResponseHandler = (data: any) => {
        console.log("Typing response from backend: ", data);
        setTypingStatus(data);
      };

      props.socket.on("typingResponse", typingResponseHandler);
      return () => {
        props.socket.off("typingResponse", typingResponseHandler);
      };
    },
    { defer: true, props: { socket: props.socket } }
  );

  return (
    <>
      <h1 class={styles.typing}>{typingStatus()}</h1>
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
          // onClick={() => setHideList(!hideList())}
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
          onKeyDown={handleTyping}
        />
        <button type="submit" class={styles.chat_button}>
          Send
        </button>
      </form>
    </>
  );
};

export default ChatFooter;
