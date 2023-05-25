import React, { useState } from "react";
import styles from "./Chat.module.css";
// import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import Footer from "../pages/Footer";
import Navbar from "../common/Navbar";
import { chatList } from "../../data";

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatItemClick = (chatId) => {
    setSelectedChatId(chatId);
  };
  return (
    <>
      <Navbar />
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.chat}>
            <div className={styles.chatBox}>
              <div className={styles.chatContent}>
                {chatList.map((item) => {
                  const { id, name, reply, avatar } = item;
                  return (
                    <div
                      className={`${styles.chatItem} ${
                        selectedChatId === id ? styles.active : ""
                      }`}
                      key={id}
                      onClick={() => handleChatItemClick(id)}
                    >
                      <div className={styles.chatImg}>
                        <img src={avatar} alt="" />
                      </div>
                      <div className={styles.chatText}>
                        <h6>{name}</h6>
                        <p>{reply}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.chatList}>
              <ChatBox selectedChatId={selectedChatId} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Chat;
