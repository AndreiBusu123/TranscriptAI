import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import type { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  modelType: string;
  onModelChange: (model: string) => void;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  isLoading,
  modelType,
  onModelChange,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-medium border border-secondary-200">
      <div className="flex items-center justify-between p-6 border-b border-secondary-200">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-primary-900" />
          <h2 className="text-lg font-semibold text-secondary-900">AI Assistant</h2>
        </div>
        <select
          value={modelType}
          onChange={(e) => onModelChange(e.target.value)}
          className="p-2 text-sm border border-secondary-200 rounded-lg bg-white text-secondary-900 focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
        >
          <option value="lm-studio">LM Studio - Mixtral</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 shadow-light ${
                message.role === 'user'
                  ? 'bg-blue-50 text-secondary-900'
                  : 'bg-white text-secondary-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-secondary-700 mt-2 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-secondary-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-3 border border-secondary-200 rounded-lg bg-white text-secondary-900 placeholder-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};