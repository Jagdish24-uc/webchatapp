import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Conversation.css';

function Conversation({ conversations, selectedContact, onSendMessage, onAlert }) {
 const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    
    // Find the conversation based on the selected contact
    const selectedConversation = conversations.find(
      (conversation) => conversation.id === id  || conversation.id ===selectedContact
    );
    
    ///console.log(selectedConversation);
    setConversation(selectedConversation);
  }, [conversations, selectedContact, id]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      console.log(message);
      onSendMessage(message,id);
      setMessage('');
    } else {
      onAlert('Please enter a message.');
    }
  };

  if (!conversation) {
    // Handle case when conversation is not found
    return <div>Loading conversation...</div>;
  }

  return (
    <div className="conversation">
      <navbar className="navbar">
      <div className="avatar">
          <img src={conversation.avatarSource} alt={conversation.contactName} />
        </div>
        <div className="contact-name">{conversation.contactName}</div>
        </navbar> 
      <div className="messages">
        {conversation.messages.map((message, index) => (
          <div key={index} className="message">
            <span className="sender">{message.sender}:</span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Conversation;
