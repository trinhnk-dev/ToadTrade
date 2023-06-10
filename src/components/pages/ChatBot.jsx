import React from "react";
import styles from "./ChatBot.module.css";
import ChatBot from "react-simple-chatbot";
import { Segment } from "sematic-ui-react";

const ChatBot = () => {
  const [APIData, setAPIData] = useState([]);
  const baseURL = "https://6476f6b89233e82dd53a99bf.mockapi.io/user";
  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }

  const steps = [
    {
      id: "Greet",
      message: "Xin chào, chào bạn",
      trigger: "Ask Name",
    },
    {
      id: "AskName",
      message: "Xin chào, chào bạn",
      trigger: "Ask Name",
    },
  ];
  return (
    <>
      <Segment floated="right">
        <ChatBot steps={steps} />
      </Segment>
    </>
  );
};

export default ChatBot;
