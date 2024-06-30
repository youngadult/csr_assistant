import React, { useContext, useEffect, useRef, useState } from "react";
import "./chatContent.css";
import Avatar from "../Chats_Screen/Avatar";
import ChatItem from "./ChatItem";
import { useNextMessage } from "../../providers/NextMessage";
import { useNewMessage } from "../../providers/NewMessage";
import { AutoReplyContext } from "../../providers/ReplyProvider";
import TypingIndicator from "./TypingIndicator";
import avatarImage from "../../assets/Avatar4.png";
import avatarImage2 from "../../assets/Avatar3.png";
import { ChatProvider, useChat } from "../../providers/ChatContext";

const ChatContent = () => {
  const chatContainerRef = useRef(null);
  const { setNextMessage } = useNextMessage();
  const { newMessage, setNewMessage } = useNewMessage();
  const [isTyping, setIsTyping] = useState(false);
  const { chatEnded, setChatEnded } = useChat();
  const [showRatingMessage, setShowRatingMessage] = useState(false)

  const handleInput = (event) => {
    setNewMessage(event.target.textContent);
  };

  const handleClick = () => {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder) {
      placeholder.remove();
    }
  };

  const [autoReplyIndex, setAutoReplyIndex] = useState(0);
  const { chatMessages, setChatMessages } = useContext(AutoReplyContext);
  const autoReplies = [
    "Certainly, I'd appreciate understanding the reasons behind the increased bill.",
    "What payment options are available? I could use some assistance.",
    "Yes, let's do that. Can we spread it over the next 6 months?",
    "Sounds good. Let's go ahead with that.",
    "Great, thank you. I'll look into that Amazon thermostat.",
  ];

  // Function to scroll chat container to the bottom
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Scroll to bottom when chat messages change
  useEffect(() => {
    scrollToBottom();
    if (
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].msg.includes(
        "Hi, I'm Alice. I will be assisting you today."
      )
    ) {
      setIsTyping(true);
      setTimeout(() => {
        const autoReplyMessage = getNextAutoReply();
        const autoReply = {
          key: chatMessages.length + 2,
          image: avatarImage,
          type: "",
          msg: autoReplyMessage,
        };
        setChatMessages((prevMessages) => [...prevMessages, autoReply]);
        setIsTyping(false);
      }, 5000);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (chatEnded) {
      setTimeout(() => {
        setShowRatingMessage(true);
      }, 2000); 
    }
  }, [chatEnded]);

  // const handleMessageChange = (e) => {
  //   setNewMessage(e.target.value);
  // };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        key: chatMessages.length + 1,
        image: avatarImage2,
        type: "other",
        msg: newMessage,
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
    if (
      newMessage !==
      `You're welcome! If you need any further assistance, feel free to reach out. Have a wonderful day!`
    ) {
      setIsTyping(true);
      setTimeout(() => {
        const autoReplyMessage = getNextAutoReply();
        const autoReply = {
          key: chatMessages.length + 2,
          image: avatarImage,
          type: "",
          msg: autoReplyMessage,
        };
        setChatMessages((prevMessages) => [...prevMessages, autoReply]);
        setIsTyping(false);
      }, 5000);
    }
  };

  const getNextAutoReply = () => {
    const nextMessagee = autoReplies[autoReplyIndex];
    setAutoReplyIndex((prevIndex) => (prevIndex + 1) % autoReplies.length);
    setNextMessage(nextMessagee);
    return nextMessagee;
  };
  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar isOnline="active" image={avatarImage} />
            <p>John David</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      {!chatEnded && <div className="connected-user-text">Connected with John David</div>}
        
        {showRatingMessage && (
        <div className="connected-user-text-rating">
          John David has given a 5-star rating! 🌟
        </div>
      )}


      <div className="content__body" ref={chatContainerRef}>
        <div className="chat__items">
          <ChatItem botMessages={chatMessages} isTyping={isTyping} />
        </div>
      </div>
      <div className="content__footer">
        {isTyping && <TypingIndicator />}
        <div className="sendNewMessage">
          {/* <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button> */}
          {/* <textarea
            type="text"
            placeholder="Type a message here"
            className="inputFont"
            value={newMessage}
            onChange={handleMessageChange}
          ></textarea> */}
          <div
            className="inputFont"
            contentEditable="true"
            dangerouslySetInnerHTML={{
              __html:
                newMessage ||
                '<span class="placeholder">Type a message here...</span>',
            }}
            onInput={handleInput}
            onClick={handleClick}
            style={{ minHeight: "100px", position: "relative" }}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={handleSendMessage}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
