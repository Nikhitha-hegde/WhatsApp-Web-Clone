import React from 'react';
import { formatMessageDateTime } from '../utils/dateUtils';
import { Check, CheckCheck } from 'lucide-react';

export const MessageBubble = ({
  message,
  isOwnMessage = false
}) => {
  const renderStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check size={16} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={16} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwnMessage
          ? 'bg-green-500 text-white rounded-br-sm'
          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
      }`}>
        <p className="text-sm break-words">{message.text}</p>
        <div className={`flex items-center justify-end space-x-1 mt-1 ${
          isOwnMessage ? 'text-green-100' : 'text-gray-500'
        }`}>
          {/* Show Date + Time */}
          <span className="text-xs">{formatMessageDateTime(message.timestamp)}</span>
          {isOwnMessage && (
            <div className="ml-1">
              {renderStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
