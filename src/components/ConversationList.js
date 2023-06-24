import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ConversationList.css';

function ConversationList({ conversations, searchQuery, onSearch }) {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="conversation-list">
     <span className="navbar">
      <div className="avatar">
          <img src="https://i.pravatar.cc/150?img=8" alt="Avatar" />
        </div>
      <button>logout</button>  
     </span> 
      <input
        type="text"
        placeholder="Search conversations"
        value={searchQuery}
        onChange={onSearch}
      />
      <ul>
  {filteredConversations.map((conversation) => (
    <li key={conversation.id}>
      <Link to={`/conversation/${conversation.id}`}>
        <span className="avatar">
          <img src={conversation.avatarSource} alt="Avatar" />
        </span>
        <span className="contact-name">{conversation.contactName}</span>
        <span className="last-message">{conversation.lastMessage}</span>
        {conversation.onlineStatus ? (
          <span className="online-status online"></span>
        ) : (
          <span className="online-status offline"></span>
        )}
      </Link>
    </li>
  ))}
</ul>


    </div>
  );
}

export default ConversationList;
