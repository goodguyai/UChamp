import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getCoachResponse, QUICK_PROMPTS } from '../../lib/aiCoachData';
import type { ChatMessage } from '../../lib/aiCoachData';

interface AICoachChatProps {
  athleteName: string;
}

export default function AICoachChat({ athleteName }: AICoachChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'coach',
      content: `What's good, ${athleteName.split(' ')[0]}! I've been analyzing your recent workouts and I've got insights ready. Ask me about your training, plateaus, speed work, recovery — anything. Let's get better today.`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getCoachResponse(text);
      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        role: 'coach',
        content: response,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, coachMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickPrompt = (label: string) => {
    sendMessage(label);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'coach'
                  ? 'bg-gold-primary/10 text-gold-primary'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {msg.role === 'coach' ? <Bot size={16} /> : <User size={16} />}
            </div>

            {/* Message bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'coach'
                  ? 'bg-black-elevated border border-gray-800 text-gray-200'
                  : 'bg-gold-primary/10 border border-gold-primary/30 text-white'
              }`}
            >
              {/* Render markdown-like bold */}
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                  {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={j} className="text-gold-primary font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-gold-primary" />
            </div>
            <div className="bg-black-elevated border border-gray-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles size={12} />
            Quick questions
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt.label}
                onClick={() => handleQuickPrompt(prompt.label)}
                className="px-3 py-1.5 bg-black-elevated border border-gray-700 rounded-full text-xs text-gray-300 hover:border-gold-primary hover:text-gold-primary transition-all cursor-pointer"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your AI coach anything..."
            className="flex-1 bg-black-elevated border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-primary focus:shadow-gold transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-gold-primary text-black-pure w-11 h-11 rounded-xl flex items-center justify-center hover:bg-gold-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
