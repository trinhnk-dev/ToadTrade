import React, { useState } from "react";
import { chatList } from "../../data";
import styles from "./ChatBox.module.css";

const ChatBox = ({ selectedChatId }) => {
  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  const [inputValue, setInputValue] = useState("");

  if (!selectedChat) {
    return (
      <div className={styles.nothing}>
        Hãy chọn một đoạn chat để tiếp tục cuộc trò chuyện
      </div>
    );
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
          <div className={styles.imgHeader}>
            <img src={avatar} alt="" />
          </div>
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
            <div className={styles.replyItem}>
              <div className={styles.replyImg}>
                <div className={styles.img}>
                  <img src={avatar} alt="" />
                </div>
              </div>
              <div className={styles.replyContent}>
                <p>{reply}</p>
                <span>{timeReply}</span>
              </div>
            </div>

            <div className={styles.emptyBox}></div>
          </div>
        </div>

        <div className={styles.chatInput}>
          <div className={styles.addInput}>
            <i class="fa-sharp fa-solid fa-circle-plus"></i>
          </div>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <div onClick={handleSendClick} className={styles.sendChat}>
            <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
