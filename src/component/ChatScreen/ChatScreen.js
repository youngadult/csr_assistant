import React, { useContext, useEffect, useState } from "react";
import "./ChatScreen.css";
import ChatsScreen from "../Chats_Screen/ChatsScreen";
import ChatContent from "../Chat_Content/ChatContent";
import ApiData from "../APIDATA/ApiData";
import ApiService from "../../Utilities/ApiService";
import { NextMessageProvider } from "../../providers/NextMessage";
import { NewMessageProvider } from "../../providers/NewMessage";
import { AutoReplyContext } from "../../providers/ReplyProvider";
const ChatScreen = ({ blur }) => {
  const [chatbotToken, setChatbotToken] = useState("");
  const [botMessages, setBotMessages] = useState([]);
  const { chatMessages, setChatMessages } = useContext(AutoReplyContext);

  const connectSocket = (streamUrl) => {
    console.log("socket connected", streamUrl);
    const socket = new WebSocket(streamUrl);

    socket.onopen = () => {};
    socket.onmessage = (event) => {
      if (!event?.data) {
        return;
      }
      onMessageData(event);
    };
  };

  const onMessageData = (e) => {
    try {
      const messageData = JSON.parse(e?.data);
      if (messageData.activities.length > 0) {
        let botText = messageData?.activities[0]?.text;
        let role = messageData?.activities[0]?.from?.role || "other";
        setBotMessages((prevMessages) => [...prevMessages, { botText, role }]);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const generateRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < 5; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomId;
  };

  const getTokenAsync = async () => {
    try {
      const response = await ApiService.getChatbotToken();
      setChatbotToken(response?.token);
    } catch (error) {
      console.log("error in getTokenAsync", error);
    }
  };

  const startConversation = async (message) => {
    try {
      const conversationData = await ApiService.chatbotConversation(
        chatbotToken
      );
      sendChatbotMessage(conversationData, message);
    } catch (error) {
      console.log("error in startConversation", error);
    }
  };

  const sendChatbotMessage = async (conversationData, message) => {
    try {
      const data = {
        locale: "en-EN",
        type: "message",
        from: {
          id: `${generateRandomId()}`,
        },
        text: message,
      };
      const messageData = await ApiService.sendMessage(
        conversationData?.conversationId,
        chatbotToken,
        data
      );
      if (messageData?.id) {
        connectSocket(conversationData?.streamUrl);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTokenAsync();
  }, []);

  useEffect(() => {
    if (chatbotToken) {
      startConversation(`Hi Sara, How can I help you today?`);
    }
  }, []);

  // const handleToken = () => {
  //   getTokenAsync();
  // }
  return (
    <NextMessageProvider>
      <NewMessageProvider>
        <div className={`main_chatscreen ${blur ? "blur" : ""}`}>
          <ChatsScreen />
          <ChatContent botMessages={botMessages} />
          <ApiData />
        </div>
      </NewMessageProvider>
    </NextMessageProvider>
  );
};

export default ChatScreen;
