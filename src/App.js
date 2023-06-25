import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
//import { useParams } from 'react-router-dom';
import ConversationList from './components/ConversationList';
import Conversation from './components/Conversation';
import Popup from './components/Popup';
import Alert from './components/Alert';
import dummyData from './data/dummyData.json';
import './App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    // Simulate loading data from dummyData.json
    setConversations(dummyData.conversations);
  }, []);

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
// Function to open the popup for creating a conversation
  const handleCreateConversation = () => {
    setShowPopup(true);
  };
// Function to handle contact selection
  const handleContactSelection = (contact) => {
    const existingConversation = conversations.find(
      (conversation) => conversation.id === contact.id
    );
    //console.log(existingConversation);
    if (existingConversation) {
      // Open existing conversation
      setSelectedContact(existingConversation.id);
  
    } else {
      // Start new conversation
      const newConversation = {
        id: Date.now().toString(),
        contactId: contact.id,
        contactName: contact.name,
        lastMessage: '',
        messages: []
      };
      setConversations([...conversations, newConversation]);
      setSelectedContact(newConversation.contactId);
    }

    setShowPopup(false);
    
  };
// Function to handle sending a message
  const handleSendMessage = (message,id) => {
    if (message.trim() !== '') {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.contactId === selectedContact || conversation.contactId ===id) {
          return {
            ...conversation,
            lastMessage: message,
            messages: [
              ...conversation.messages,
              { sender: 'You', text: message }
            ]
          };
        }
        
        return conversation;
      });
  
      setConversations(updatedConversations);
      
    } else {
      Alert('Please enter a message.');
    }
  };
  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
// Function to dismiss the alert message
  const handleAlertDismiss = () => {
    setAlert(null);
  };

  return (
    <Router>
      <div className="container">
        <Sidebar onCreateConversation={handleCreateConversation} />

        <ConversationList
                conversations={conversations}
                searchQuery={searchQuery}
                onSearch={handleSearch}
              />
              
        <Routes>
        <Route
            path="/"
            element={
              <ConversationList
                conversations={conversations}
                searchQuery={searchQuery}
                onSearch={handleSearch}
              />
            }
          />  {/* Render ConversationList component */}
          
        <Route
            path="/conversation/:id"
            element={
              <Conversation
                conversations={conversations}
                selectedContact={selectedContact}
                onSendMessage={handleSendMessage}
                onAlert={setAlert}
              />
            }
          />{/* Render Conversation component */}
          
        </Routes>
        {showPopup && (
          <Popup
          contacts={conversations.map(conversation => ({
            id: conversation.id,
            name: conversation.contactName
          }))}
          onContactSelect={handleContactSelection}
          onClose={handleClosePopup}
        />
        )} {/* Render Popup component */}
        {alert && <Alert message={alert} onDismiss={handleAlertDismiss} />}
      </div>
    </Router>
  );

}

export default App;
