import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Socket } from "socket.io-client";

import styles from "./SignIn.module.css";

const SignIn: Component<{ socket: Socket }> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    localStorage.setItem("username", username());
    // sends the username and socket ID to the Nodejs server
    props.socket.emit("newUser", {
      username: username(),
      socketID: props.socket.id,
    });
    navigate("/chat");
  };
  return (
    <div class={styles.container}>
      <div class={styles.sub_container}>
        <h1>SIGN UP</h1>
        <form class={styles.form} onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            minLength={6}
            name="username"
            id="username"
            value={username()}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex: micheal3250"
          />
          <button>Sign Up</button>
        </form>
        <span>
          Generate a temporary username to connect and chat with other users
        </span>
      </div>
    </div>
  );
};

export default SignIn;
