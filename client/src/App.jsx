import React, { useState, useEffect } from 'react';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { useMessages } from './hooks/useMessages';

function App() {
  const {
    chats,
    messages,
    selectedChatId,
    selectedChatName,
    loading,
    chatsLoading,
    error,
    selectChat,
    handleSendMessage
  } = useMessages();

  const [isMobile, setIsMobile] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChatList(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChatSelect = (chatId, chatName) => {
    selectChat(chatId, chatName);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleMenuClick = () => {
    setShowChatList(true);
  };

  const handleCloseChatList = () => {
    setShowChatList(false);
  };

  if (chatsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
      
      {/* Mobile: Show chat list or chat window */}
      {isMobile ? (
        <>
          {showChatList ? (
            <ChatList
              chats={chats}
              selectedChatId={selectedChatId}
              onChatSelect={handleChatSelect}
              isMobile={true}
              onClose={handleCloseChatList}
            />
          ) : (
            <ChatWindow
              messages={messages}
              selectedChatName={selectedChatName}
              selectedChatId={selectedChatId}
              onSendMessage={handleSendMessage}
              loading={loading}
              onMenuClick={handleMenuClick}
              isMobile={true}
            />
          )}
        </>
      ) : (
        /* Desktop: Show both panels */
        <>
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onChatSelect={handleChatSelect}
          />
          <ChatWindow
            messages={messages}
            selectedChatName={selectedChatName}
            selectedChatId={selectedChatId}
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}

export default App;