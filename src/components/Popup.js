import React from 'react';
import '../styles/Popup.css';

function Popup({ contacts, onContactSelect, onClose }) {
  
  const handleContactSelect = (contact) => {
    onContactSelect(contact);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Create Conversation</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id} onClick={() => handleContactSelect(contact)}>
              {contact.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose} >Close</button>
      </div>
    </div>
  );
}

export default Popup;