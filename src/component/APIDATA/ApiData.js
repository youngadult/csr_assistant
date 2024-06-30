import React, { Component, useContext, useEffect, useState } from "react";
import "./apiData.css";
import { AutoReplyContext } from "../../providers/ReplyProvider";
// import { useNextMessage } from "./NextMessageContext";
import { useNextMessage } from "../../providers/NextMessage";
import avatarImage from "../../assets/Avatar4.png";
import { useNewMessage } from "../../providers/NewMessage";
import { ChatProvider, useChat } from '../../providers/ChatContext';

// export default class UserProfile extends Component {
const UserProfile = () => {
  const { chatMessages, setChatMessages } = useContext(AutoReplyContext);
  const { nextMessage } = useNextMessage();
  const {newMessage, setNewMessage} = useNewMessage();
  const [contentToShow, setContentToShow] = useState(null);
  const [suggestedResponse, setSuggestedResponse] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { chatEnded, setChatEnded } = useChat();

  console.log(paymentCompleted);

  const handlePaymentProceed = () => {
    setProcessingPayment(true);
    // Assume payment processing here
    // After 3 seconds, set payment completed and change button color
    setTimeout(() => {
      setPaymentCompleted(true);
      setProcessingPayment(false);
    }, 3000);
  };

  const handleEndChat = () => {
    // Set chatEnded to true when clicking the End Chat button
    setChatEnded(true);
  };

  const functionSetMessage = (val) => {
    if (val === 'message1'){
      const message = `It seems your bill this month is $56 higher compared to the previous month. Here's why: <br><br> 1. <b>Weather</b>: Increased electricity usage due to weather changes: +$30. <br> 2. <b>Bill period</b>: Longer billing period: +$10. <br> 3. <b>Other</b>: Changes in usage patterns: +$14. <br><br> In total, these factors have resulted in a $120 increase.`
      setNewMessage(message);
    }
    else if (val === 'message2'){
      const message = `Certainly. We provide payment assistance plans allowing you to divide the bill into several months for easier management: <br><br><b>3 months</b>: $40 per month <br><b>6 months</b>: $20 per month <br><b>12 months</b>: $12 per month <br><br> Are you interested in selecting one of these options?`
      setNewMessage(message);
    }
    else if (val === 'message3'){
      const message = `Do you prefer to use the saved payment method linked to your account, specifically the credit card ending in 8889?`
      setNewMessage(message);
    }
    else if (val === 'message4'){
      const message = `Your monthly installment is paid and you'll receive a confirmation email shortly. <br><br>Also, we recommend considering the Amazon Smart Thermostat, which efficiently regulates temperature to help minimize unnecessary electricity usage. Additionally, there's a rebate available for $75. You can purchase it for $1. <br><br> <a href="https://www.amazon.com/Amazon-Smart-Thermostat/dp/B08J4C8871/ref=sr_1_3?crid=AH0VD86RDOB1&dib=eyJ2IjoiMSJ9.ztYw9oN2nAgsX1gc6uZXiA_jsB6zGQG72acUq1qreT0CPMnEV8RxccCgVbk4czvQSZDUQUNNvIQHPtQSzU5uK4oRpoGb6y_ZPph5093ycXb4R_p1hItTAXQR6cXPQrlkGnKfS6su3BQ5dg-9nnWYKVT4Fyb7HBongNwAPvLHyMlncLnXjYfGxbTuCht9_2g9Mfw-pArdnfGeBkHU3ydGf_4NhDOcIb62gRnGLND-EAM.p73bSR4Ei5e6copvFPevdoGuqQYUoyxcFq_LlfNKREE&dib_tag=se&keywords=amazon.thermostat&qid=1710729549&sprefix=amazon.thermostat,aps,105&sr=8-3" target="_blank">Amazon-Smart-Thermostat.</a>`
      setNewMessage(message);
    }
    else if (val === 'message5'){
      const message = `You're welcome! If you need any further assistance, feel free to reach out. Have a wonderful day!`
      setNewMessage(message);
    }
    
  }
  useEffect(() => {
    // Set a timeout to show content after 2 seconds
    const timeoutId = setTimeout(() => {
      setContentToShow(getContentBasedOnMessage());
    }, 2000);
    return () => clearTimeout(timeoutId); // Clear timeout on component unmount
  }, [nextMessage]);

  useEffect(() => {
    // Set a timeout to show content after 2 seconds
    const timeoutId = setTimeout(() => {
      setSuggestedResponse(getSuggestedResponse());
    }, 4000);
    return () => clearTimeout(timeoutId); // Clear timeout on component unmount
  }, [nextMessage]);

  const getContentBasedOnMessage = () => {
    if (
      nextMessage ===
      "Certainly, I'd appreciate understanding the reasons behind the increased bill."
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>User Information</h4>
          </div>
          <div className="card__content">
            {" "}
            <ul>
              <li>
                <b>Account #:</b> 5000 0465 141
              </li>
              <li>
                <b>Address: </b>44 Devalinder Dr Newark DE 19702
              </li>
              <li>
                <b>Bill Amount: </b>$120
              </li>
              <li>
                <b>Bill Due date:</b> April 19th, 2024
              </li>
              <li>
                <b>Previous Bill Amount:</b> $66
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="card__header">
            <h4>Possible Reasons for High Bill</h4>
          </div>
          <div className="card__content">
            {" "}
            <ul>
              <li>
                <b>Weather change</b>
              </li>
              <li>
                <b>Bill Period</b>
              </li>
              <li>
                <b>Appliance usage</b>
              </li>
            </ul>
          </div>
        </div>
      );
    } else if (
      nextMessage ===
      "What payment options are available? I could use some assistance."
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>User Information</h4>
          </div>
          <div className="card__content">
            {" "}
            <ul>
              <li>
                <b>Account #:</b> 5000 0465 141
              </li>
              <li>
                <b>Address: </b>44 Devalinder Dr Newark DE 19702
              </li>
              <li>
                <b>Bill Amount: </b>$120
              </li>
              <li>
                <b>Bill Due date:</b> April 19th, 2024
              </li>
              <li>
                <b>Previous Bill Amount:</b> $66
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="card__header">
            <h4>Payment Assistance</h4>
          </div>
          <div className="card__content">
            <ul>
              <li>3 Months Plan</li>
              <li>6 Months Plan</li>
              <li>12 Months Plan</li>
            </ul>
          </div>
        </div>
      );
    } else if (
      !paymentCompleted &&
      (
        nextMessage === "Yes, let's do that. Can we spread it over the next 6 months?" ||
        nextMessage === "Sounds good. Let's go ahead with that."
        )
        ) {
          console.log(paymentCompleted);
          console.log('came here');
          return (
            <div>
          <div className="card__header">
            <h4>User Information</h4>
          </div>
          <div className="card__content">
            {" "}
            <ul>
              <li>
                <b>Account #:</b> 5000 0465 141
              </li>
              <li>
                <b>Address: </b>44 Devalinder Dr Newark DE 19702
              </li>
              <li>
                <b>Bill Amount: </b>$120
              </li>
              <li>
                <b>Bill Due date:</b> April 19th, 2024
              </li>
              <li>
                <b>Previous Bill Amount:</b> $66
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="card__header">
            <h4>Saved Payment Method</h4>
          </div>
          <div className="card__content">
            <ul>
              <li>
                <b>Card No.: </b>xxxx xxxx xxxx 8889
              </li>
              <li>
                <b>Name: </b>JOHN DAVID
              </li>
            </ul>
          </div>
          <div className="proceed-button">
            <button onClick={handlePaymentProceed}>
              <b>Proceed</b>
            </button>
          </div>
        </div>
      );
    } else if (
      nextMessage === "Great, thank you. I'll look into that Amazon thermostat."
    ) {
      return null;
    } else {
      return (
        <div>
          <div className="card__header">
            <h4>User Information</h4>
          </div>
          <div className="card__content">
            {" "}
            <ul>
              <li>
                <b>Account #:</b> 5000 0465 141
              </li>
              <li>
                <b>Address: </b>44 Devalinder Dr Newark DE 19702
              </li>
              <li>
                <b>Bill Amount: </b>$120
              </li>
              <li>
                <b>Bill Due date:</b> April 19th, 2024
              </li>
              <li>
                <b>Previous Bill Amount:</b> $66
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const getSuggestedResponse = () => {
    setPaymentCompleted(false);
    if (
      nextMessage ===
      "Certainly, I'd appreciate understanding the reasons behind the increased bill."
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>Suggested Response</h4>
          </div>
          <div className="card__content">
            {" "}
            <p>
              It seems your bill this month is $54
              higher compared to the previous month. Here's why:
            </p>
            <ol>
              <li>
                <strong>Weather:</strong> Increased electricity usage due to weather changes: +$30.
              </li>
              <li>
                <strong>Bill period:</strong> Longer billing period: +$10.
              </li>
              <li>
                <strong>Other:</strong> Changes in usage patterns: +$14.
              </li>
            </ol>
            <p>In total, these factors have resulted in a $54 increase.</p>
            <button id="copyButton" onClick={()=>functionSetMessage('message1')}>Copy</button>
          </div>
        </div>
      );
    } else if (
      nextMessage ===
      "What payment options are available? I could use some assistance."
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>Suggested Response</h4>
          </div>
          <div className="card__content">
            {" "}
            <p>
              Certainly. We provide payment assistance plans allowing you to
              divide the bill into several months for easier management:
            </p>
            <ul>
              <li>
                <strong>3 months:</strong> $42 per month
              </li>
              <li>
                <strong>6 months:</strong> $21.76 per month
              </li>
              <li>
                <strong>10 months:</strong> $12.50 per month
              </li>
            </ul>
            <p>Are you interested in selecting one of these options?</p>
            <button id="copyButton" onClick={()=>functionSetMessage('message2')}>Copy</button>
          </div>
        </div>
      );
    } else if (
      nextMessage ===
      "Yes, let's do that. Can we spread it over the next 6 months?"
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>Suggested Response</h4>
          </div>
          <div className="card__content">
            {" "}
            <p>
              Do you prefer to use the saved payment method linked to
              your account, specifically the credit card ending in 8889?
            </p>
            <button id="copyButton" onClick={()=>functionSetMessage('message3')}>Copy</button>
          </div>
        </div>
      );
    } else if (
      nextMessage === "Great, thank you. I'll look into that Amazon thermostat."
    ) {
      return (
        <div>
          <div className="card__header">
            <h4>Suggested Response</h4>
          </div>
          <div className="card__content">
            {" "}
            <p>
              You're welcome! If you need any further assistance, feel free to
              reach out. Have a wonderful day!
            </p>
            <button id="copyButton" onClick={()=>functionSetMessage('message5')}>Copy</button>
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image user_data">
        <div className="profile__image">
          <img src={avatarImage} alt="#" />
        </div>
        <h4>John David </h4>
      </div>
      {contentToShow && (
        <div className="profile__card user__profile__image content_data">
          {contentToShow}
        </div>
      )}
      {(suggestedResponse && !chatMessages[chatMessages.length - 1].msg.includes(
        "If you need any further assistance,"
      )) && (
        <div className="profile__card user__profile__image content_data">
          {suggestedResponse}
        </div>
      )}
      {processingPayment && (
        <div className="loader">
          {/* Add your loader component here */}
          <span className="paymentText">Payment Processing...</span>
        </div>
      )}
      {paymentCompleted && (
        <div>
          <div className="profile__card user__profile__image content_data">
            <div className="card__header">
              <h4>Suggested Response</h4>
            </div>
            <div className="card__content">
              <p>
                Your monthly installment is paid and you'll receive a
                confirmation email shortly.
              </p>
              <p>
                Also, we recommend considering the Amazon Smart Thermostat,
                which efficiently regulates temperature to help minimize
                unnecessary electricity usage. Additionally, there's a rebate
                available for $75. You can purchase it for $1
              </p>
              <p>
                Amazon-Smart-Thermostat.
              </p>
              <button id="copyButton" onClick={()=>functionSetMessage('message4')}>Copy</button>
            </div>
          </div>
        </div>
      )}
      {nextMessage ===
        "Great, thank you. I'll look into that Amazon thermostat." && (
        <div className="end-button">
          <button onClick={handleEndChat}>
            <b>End Chat</b>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
