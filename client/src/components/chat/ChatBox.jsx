import React, { useState } from "react";
import { chatList } from "../../data";
import styles from "./ChatBox.module.css";

const ChatBox = ({ selectedChatId }) => {
  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  const [inputValue, setInputValue] = useState("");

  if (!selectedChat) {
    return <div>Chọn một chat để hiển thị</div>;
  }

  const { send, reply, avatar, name, active, timeChat, timeSend, timeReply } =
    selectedChat;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    console.log("Đã gửi chat: ", inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.row}>
      <div className={styles.chatHeader}>
        <div className={styles.chatImg}>
          <img src={avatar} alt="" />
        </div>
        <div className={styles.chatText}>
          <h6>{name}</h6>
          <p>{active}</p>
        </div>
      </div>
      <div className={styles.messageSession}>
        <div className={styles.chatBox}>
          <div className={styles.chatContent}>
            <div className={styles.chatTime}>
              <h6>{timeChat}</h6>
            </div>
          </div>
          <div className={styles.chatSend}>
            <div className={styles.emptyBox}></div>
            <div className={styles.sendContent}>
              <p>{send}</p>
              <span>{timeSend}</span>
            </div>
          </div>
          <div className={styles.chatReply}>
            <div className={styles.replyContent}>
              <p>{reply}</p>
              <span>{timeReply}</span>
            </div>
            <div className={styles.emptyBox}></div>
          </div>
        </div>

        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSendClick}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
