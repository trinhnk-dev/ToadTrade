import React, { useEffect, useState } from "react";
import { chatList } from "../../data";
import styles from "./ChatBox.module.css";
import { setLatestMessage } from "../chat/Chat";

const ChatBox = ({ selectedChatId, onUpdateLatestMessage }) => {
  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!selectedChat) {
    return (
      <div className={styles.nothing}>
        Hãy chọn một đoạn chat để tiếp tục cuộc trò chuyện
      </div>
    );
  }

  const { avatar, name, active } = selectedChat;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        send: inputValue,
        timeSend: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timeChat: new Date().toLocaleString([], {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
      setLatestMessage(newMessage.send);
      onUpdateLatestMessage(newMessage.send);
    }
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
              {messages.length > 0 && <h6>{messages[0].timeChat}</h6>}
            </div>
          </div>
          {messages.map((message, index) => (
            <div key={index} className={styles.chatSend}>
              <div className={styles.emptyBox}></div>
              <div className={styles.sendContent}>
                <p>{message.send}</p>
                <div className={styles.sendTime}>
                  <span>{message.timeSend}</span>
                </div>
              </div>
            </div>
          ))}
          {/* <div className={styles.chatReply}>
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
          </div> */}
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
            onKeyDown={handleKeyPress}
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
