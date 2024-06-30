import React, { Component, useContext } from "react";
import avatarJohn from "../../assets/Avatar4.png";
import avatarBenja from "../../assets/Avatar6.png";
import avatarCharl from "../../assets/Avatar2.png";
import logo from '../../assets/Screenshot 2024-03-17 at 9.47.48 PM.png'
// import './ChatsScreen.css';
import "./chatsScreen.css";
import ChatListItems from "./ChatListItems";
import { AutoReplyContext } from "../../providers/ReplyProvider";

const ChatsScreen = () => {
  const { chatMessages, setChatMessages } = useContext(AutoReplyContext);
  const chatArray = [
    {
      image: avatarJohn,
      id: 1,
      name: "John David",
      active: true,
      isOnline: chatMessages.length > 0 ? (chatMessages[chatMessages.length - 1]?.msg.substring(0, 15) + (chatMessages[chatMessages.length - 1]?.msg.length > 10 ? '...' : '')) : '',
    },
    {
      image: avatarBenja,
      id: 2,
      name: "Benjamin Smith",
      active: false,
      isOnline: "Glad, I could help..",
    },
    {
      image: avatarCharl,
      id: 3,
      name: "Jessica Moore",
      active: false,
      isOnline: "Reach out to us fo..",
    },
  ];
  return (
    <div className="main__chatlist">
      <div className="acme-logo-container">
        {/* <div className="acme-logo">ACME</div> */}
        <img src={logo} className="logoStyle" alt="#"></img>
      </div>
      <div className="chatlist__heading">
        <h3>My Chats</h3>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input
            type="text"
            placeholder="Search Here"
            className="inputFont"
            required
          />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        <ChatListItems chatArray={chatArray} />
      </div>
    </div>
  );
};
export default ChatsScreen;
