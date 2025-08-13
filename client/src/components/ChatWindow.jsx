import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Menu, Phone, Video, Search } from 'lucide-react';

export const ChatWindow = ({
  messages,
  selectedChatName,
  selectedChatId,
  onSendMessage,
  loading = false,
  onMenuClick,
  isMobile
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedChatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">💬</span>
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            Welcome to WhatsApp Web Clone
          </h2>
          <p className="text-gray-500">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isMobile && (
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">
                {selectedChatName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{selectedChatName}</h2>
              <p className="text-sm text-gray-500">{selectedChatId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble
              key={message.messageId}
              message={message}
              isOwnMessage={message.status !== undefined}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        disabled={loading}
      />
    </div>
  );
};