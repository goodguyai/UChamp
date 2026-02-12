import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowLeft, Search, Circle } from 'lucide-react';
import { CONVERSATIONS, MESSAGES, getOtherParticipant } from '../../lib/messagingData';
import type { Conversation, Message } from '../../lib/messagingData';
import PageLayout from '../../components/layout/PageLayout';

interface MessagesPageProps {
  role: 'athlete' | 'trainer' | 'recruiter';
  userId: string;
  userName: string;
  userPhoto: string;
}

export default function MessagesPage({ role, userId, userName, userPhoto }: MessagesPageProps) {
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const myConversations = CONVERSATIONS.filter(c => c.participantIds.includes(userId));
  const filtered = search
    ? myConversations.filter(c => {
        const other = getOtherParticipant(c, userId);
        return other.name.toLowerCase().includes(search.toLowerCase());
      })
    : myConversations;

  useEffect(() => {
    if (selectedConvo) {
      setMessages(MESSAGES[selectedConvo.id] || []);
    }
  }, [selectedConvo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !selectedConvo) return;
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      conversationId: selectedConvo.id,
      senderId: userId,
      senderName: userName,
      content: input.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  const totalUnread = myConversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <PageLayout role={role} title="Messages" userName={userName} userPhoto={userPhoto} notificationCount={totalUnread}>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-3 mb-1">
          <MessageSquare size={24} className="text-gold-primary" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Messages</h2>
        </div>
        <p className="text-gray-500 text-sm">Communicate with your {role === 'athlete' ? 'coaches' : 'athletes'}.</p>
      </div>

      <div className="bg-black-card border border-gray-800 rounded-xl overflow-hidden" style={{ minHeight: '500px' }}>
        <div className="flex h-[500px] md:h-[600px]">
          {/* Conversation list */}
          <div className={`${selectedConvo ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-800`}>
            <div className="p-3 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input type="text" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full bg-black-elevated border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-primary transition-all" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex items-center justify-center h-full"><p className="text-gray-600 text-sm">No conversations found</p></div>
              ) : (
                filtered.map(convo => {
                  const other = getOtherParticipant(convo, userId);
                  return (
                    <button key={convo.id} onClick={() => setSelectedConvo(convo)}
                      className={`w-full p-3 md:p-4 text-left border-b border-gray-800/50 hover:bg-black-elevated transition-colors cursor-pointer ${selectedConvo?.id === convo.id ? 'bg-black-elevated border-l-2 border-l-gold-primary' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black-elevated border border-gray-700 flex items-center justify-center shrink-0 text-xs font-bold text-gray-400">
                          {other.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium truncate">{other.name}</p>
                            {convo.unreadCount > 0 && <Circle size={8} className="text-gold-primary shrink-0" fill="currentColor" />}
                          </div>
                          <p className="text-gray-500 text-xs capitalize">{other.role}</p>
                          <p className="text-gray-600 text-xs truncate mt-0.5">{convo.lastMessage}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-[10px] mt-1 pl-13">{convo.lastMessageTime}</p>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className={`${selectedConvo ? 'flex' : 'hidden md:flex'} flex-col flex-1`}>
            {selectedConvo ? (
              <>
                <div className="flex items-center gap-3 p-3 md:p-4 border-b border-gray-800">
                  <button onClick={() => setSelectedConvo(null)} className="md:hidden text-gray-400 hover:text-white cursor-pointer"><ArrowLeft size={20} /></button>
                  <div className="w-8 h-8 rounded-full bg-black-elevated border border-gray-700 flex items-center justify-center shrink-0 text-xs font-bold text-gray-400">
                    {getOtherParticipant(selectedConvo, userId).name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{getOtherParticipant(selectedConvo, userId).name}</p>
                    <p className="text-gray-500 text-xs capitalize">{getOtherParticipant(selectedConvo, userId).role}</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
                  {messages.map(msg => {
                    const isMe = msg.senderId === userId;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-xl px-3 py-2 md:px-4 md:py-3 ${isMe ? 'bg-gold-primary/10 border border-gold-primary/30 text-gray-200' : 'bg-black-elevated border border-gray-700 text-gray-300'}`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <p className="text-[10px] text-gray-600 mt-1">{new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..."
                      className="flex-1 bg-black-elevated border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-primary transition-all" />
                    <button onClick={handleSend} disabled={!input.trim()}
                      className="w-10 h-10 rounded-lg bg-gold-primary text-black-pure flex items-center justify-center hover:bg-gold-bright transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={48} className="text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Select a conversation</p>
                  <p className="text-gray-600 text-sm mt-1">Choose from the list to start chatting.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700 text-sm uppercase tracking-[0.3em]">Communication builds champions.</p>
      </div>
    </PageLayout>
  );
}
