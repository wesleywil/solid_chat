import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Socket } from "socket.io-client";
import { setHideFriendList, utilStore } from "../../redux/utils/utils";
import { chatStore } from "../../redux/chat/chat";
import useRedux from "../../redux/useRedux";

import styles from "./ChatFooter.module.css";
import burger_menu from "../../assets/burger_menu.svg";

const ChatFooter: Component<{ socket: Socket }> = (props) => {
  const navigate = useNavigate();
  const [state, actions] = useRedux(utilStore, { setHideFriendList });
  const [chatState, chatActions] = useRedux(chatStore, {});
  const [message, setMessage] = createSignal("");
  const [typingStatus, setTypingStatus] = createSignal("");

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  let typingTimeout: number;

  const handleTyping = () => {
    console.log("Typing");

    clearTimeout(typingTimeout);

    props.socket.emit(
      "typing",
      `${localStorage.getItem("username")} is typing...`
    );

    //Set a new timeout to clear the typing message after a certain delay
    typingTimeout = setTimeout(() => {
      props.socket.emit("typing", "");
    }, 1000);
  };

  const handleKeyDown = () => {
    handleTyping();
  };

  onCleanup(() => {
    clearTimeout(typingTimeout);
  });

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (message().trim() && localStorage.getItem("username")) {
      props.socket.emit("private_message", {
        text: message(),
        name: localStorage.getItem("username"),
        id: `${props.socket.id}${Math.random()}`,
        socketID: props.socket.id,
        toId: chatState.user.socketID,
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
    <div class={styles.container}>
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
          onClick={() => actions.setHideFriendList()}
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
          onKeyDown={handleKeyDown}
        />
        <button type="submit" class={styles.chat_button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
