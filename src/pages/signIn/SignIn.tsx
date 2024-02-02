import { Component, createSignal } from "solid-js";
import { Socket } from "socket.io-client";
import { useNavigate } from "@solidjs/router";
import useRedux from "../../redux/useRedux";
import { setOnlineUsers, userStore } from "../../redux/users/users";

import styles from "./SignIn.module.css";

const SignIn: Component<{ socket: Socket }> = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");
  const [error, setError] = createSignal("");
  const [states, action] = useRedux(userStore, { setOnlineUsers });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // First delete the actual logged In user
    props.socket.emit("deleteUser");
    localStorage.setItem("username", username());
    // sends the username to the Nodejs server
    props.socket.emit("newUser", {
      username: username(),
    });
    props.socket.on("newUserError", (data) => {
      console.log("Error: ", data);
      setError(data);
    });
    props.socket.on("newUserResponse", (data) => {
      action.setOnlineUsers(data);
      navigate("/chat");
    });
    props.socket.on("userDeleteResponse", (data) => {
      action.setOnlineUsers(data);
    });
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
          <span>{error()}</span>
        </form>
        <span>
          Generate a temporary username to connect and chat with other users
        </span>
      </div>
    </div>
  );
};

export default SignIn;
