import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ onCreateConversation }) {
  return (
    <div className="sidebar">
      {/* <h1>Chat Application</h1> */}
      <Link to="/">Conversations</Link>
      <button onClick={onCreateConversation}>Create Conversation</button>
    </div>
  );
}

export default Sidebar;
