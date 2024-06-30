import React from "react";
// import './chatsScreen.css'
import Avatar from "./Avatar";

const ChatListItems = ({ chatArray }) => {
  return (
    <div className="chat-list">
      {chatArray.map((user) => (
        <div key={user.id} className={`chat-list-item ${user.name === "John David" ? "big-bubble" : ""}`}>
          <Avatar image={user.image} isOnline={user.isOnline} />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            {/* <div className={`status ${user.active ? 'active' : 'inactive'}`}>
            {user.active ? 'Active' : 'Inactive'}
          </div> */}
            <div className={`status ${user.isOnline ? "offline" : "offline"}`}>
              {user.isOnline}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListItems;
