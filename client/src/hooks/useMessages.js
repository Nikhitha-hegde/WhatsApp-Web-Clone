import { useState, useEffect } from 'react';
import { getChats, getMessagesByWaId, sendMessage } from '../api';

export const useMessages = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load chats on component mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        setChatsLoading(true);
        setError(null);
        const chatData = await getChats();
        setChats(chatData);
      } catch (error) {
        console.error('Error loading chats:', error);
        setError('Unable to connect to server. Please make sure the backend is running on http://localhost:5000');
      } finally {
        setChatsLoading(false);
      }
    };

    loadChats();
  }, []);

  // Load messages when chat is selected
  const selectChat = async (chatId, chatName) => {
    if (chatId === selectedChatId) return;

    try {
      setLoading(true);
      setError(null);
      setSelectedChatId(chatId);
      setSelectedChatName(chatName);
      
      const messageData = await getMessagesByWaId(chatId);
      setMessages(messageData);
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Unable to load messages. Please check your connection.');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const handleSendMessage = async (text) => {
    if (!selectedChatId || !selectedChatName) return;

    try {
      setError(null);
      const messageData = {
        wa_id: selectedChatId,
        name: selectedChatName,
        text
      };

      const newMessage = await sendMessage(messageData);
      setMessages(prev => [...prev, newMessage]);

      // Update the chat list to reflect the new last message
      setChats(prevChats => 
        prevChats.map(chat => 
          chat._id === selectedChatId
            ? { ...chat, lastMessage: text, lastTimestamp: newMessage.timestamp }
            : chat
        ).sort((a, b) => parseInt(b.lastTimestamp) - parseInt(a.lastTimestamp))
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Unable to send message. Please check your connection.');
    }
  };

  return {
    chats,
    messages,
    selectedChatId,
    selectedChatName,
    loading,
    chatsLoading,
    error,
    selectChat,
    handleSendMessage
  };
};