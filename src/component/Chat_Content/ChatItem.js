import React from "react";
import Avatar from "../Chats_Screen/Avatar";

const ChatItem = ({ botMessages, isTyping }) => {
  return (
    <div>
      {botMessages.map((user) => (
        <div
          key={user.id}
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${user.type ? user.type : ""}`}
        >
          <Avatar image={user.image} isOnline="active" />
          <div className="chat__item__content">
            {/* <div className="chat__msg">{user.botText}</div> */}
            {/* <div className="chat__msg">{user.msg}</div>
             */}
             <div
              className="chat__msg"
              dangerouslySetInnerHTML={{ __html: user.msg }} // Render HTML content
            ></div>
            <div className="chat__meta">
              {/* <span>16 mins ago</span>
              <span>Seen 1.03PM</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatItem;
