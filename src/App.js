import React, { useState } from "react";
import "./App.css";
import ChatScreen from "./component/ChatScreen/ChatScreen";
import { AutoReplyProvider } from "./providers/ReplyProvider";
import { ChatProvider } from "./providers/ChatContext";

function App() {
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <AutoReplyProvider>
      <ChatProvider>
      <div className="main_app">
      {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>Upcoming Chat</h2>
              <h4>John David</h4>
              <p>(Customer coming from SafeLink)</p>
              <button onClick={closeModal}>Proceed</button>
            </div>
          </div>
        )}
        {/* <NavBar blur={modalVisible}/> */}
        <ChatScreen blur={modalVisible}/>
      </div>
      </ChatProvider>
    </AutoReplyProvider>
  );
}

export default App;
