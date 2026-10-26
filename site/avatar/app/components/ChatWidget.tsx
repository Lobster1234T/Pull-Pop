'use client';

import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!mounted) {
      setMessages([
        {
          id: 1,
          text: 'Привет! 👋 Как я могу вам помочь?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Спасибо за ваше сообщение! Наша команда поддержки ответит вам в течение 5 минут.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Chat Widget */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-4 w-96 max-w-full glass border border-orange-500/30 rounded-xl shadow-2xl shadow-orange-500/20 flex flex-col z-40 h-96 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-orange-500/20 bg-orange-500/10">
            <div>
              <h3 className="font-bold text-white">Поддержка Avatar</h3>
              <p className="text-xs text-slate-400">Мы здесь, чтобы помочь</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-orange-400" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-orange-500/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-300 border border-orange-500/30'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 px-4 py-4 border-t border-orange-500/20 bg-orange-500/5">
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-800/50 border border-orange-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-20 right-4 glass border border-orange-500/30 rounded-lg p-3 z-40 animate-fadeIn">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-semibold">2 новых</span>
          </button>
        </div>
      )}

      {/* FAB Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center hover:shadow-xl hover:shadow-orange-500/50 transition-all animate-pulse z-40 hover-lift"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
