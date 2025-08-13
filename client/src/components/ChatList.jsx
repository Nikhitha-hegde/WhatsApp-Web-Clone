import React from 'react';
import { formatTimestamp } from '../utils/dateUtils';

export const ChatList = ({
  chats,
  selectedChatId,
  onChatSelect,
  isMobile,
  onClose
}) => {
  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col ${
      isMobile ? 'absolute inset-0 z-10' : 'w-80'
    }`}>
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onChatSelect(chat._id, chat.name)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedChatId === chat._id ? 'bg-green-50 border-l-4 border-green-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(chat.lastTimestamp)}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {chat.lastMessage || 'No messages yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};