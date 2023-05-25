import React from "react";
import styles from "./Chat.module.css";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatBox}>
        <ChatList />
      </div>
      <div className={styles.chatList}>
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
