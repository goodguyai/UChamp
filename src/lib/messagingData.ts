// Messaging system mock data

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  participantRoles: ('athlete' | 'trainer' | 'recruiter')[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['ath-1', 'trainer-1'],
    participantNames: ['Marcus Johnson', 'Coach Mike Davis'],
    participantRoles: ['athlete', 'trainer'],
    lastMessage: 'Great work today, Marcus. Your 40 time is looking sharp. Let\'s push for 4.55 by March.',
    lastMessageTime: '2 hours ago',
    unreadCount: 1,
  },
  {
    id: 'conv-2',
    participantIds: ['ath-1', 'trainer-2'],
    participantNames: ['Marcus Johnson', 'Coach Sarah Johnson'],
    participantRoles: ['athlete', 'trainer'],
    lastMessage: 'I reviewed your film from Tuesday. Let\'s talk about your release point.',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participantIds: ['trainer-1', 'ath-2'],
    participantNames: ['Coach Mike Davis', 'Jamal Williams'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Coach, can we do an extra position drill session this week?',
    lastMessageTime: '3 hours ago',
    unreadCount: 1,
  },
  {
    id: 'conv-4',
    participantIds: ['trainer-1', 'ath-5'],
    participantNames: ['Coach Mike Davis', 'Khalil Robinson'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Remember to stretch before tomorrow\'s speed session.',
    lastMessageTime: '5 hours ago',
    unreadCount: 0,
  },
  {
    id: 'conv-5',
    participantIds: ['trainer-1', 'ath-3'],
    participantNames: ['Coach Mike Davis', 'DeAndre Thomas'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Your bench press form needs work. Let\'s review it together.',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
  },
  {
    id: 'conv-6',
    participantIds: ['trainer-2', 'ath-7'],
    participantNames: ['Coach Sarah Johnson', 'Isaiah Brooks'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Isaiah, your film from the playoff game was outstanding. Let\'s break it down tomorrow.',
    lastMessageTime: '4 hours ago',
    unreadCount: 1,
  },
  {
    id: 'conv-7',
    participantIds: ['trainer-3', 'ath-6'],
    participantNames: ['Coach Ray Lewis Jr.', 'Davonte Carter'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'We need to get your verification rate up. Let\'s make that a priority this week.',
    lastMessageTime: '6 hours ago',
    unreadCount: 0,
  },
  {
    id: 'conv-8',
    participantIds: ['trainer-3', 'ath-10'],
    participantNames: ['Coach Ray Lewis Jr.', 'Jordan Phillips'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Great coverage drill today. Your hip flip is looking elite.',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
  },
  {
    id: 'conv-9',
    participantIds: ['trainer-1', 'ath-9'],
    participantNames: ['Coach Mike Davis', 'Malik Scott'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Malik, you missed your last verification. Let\'s get back on track.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
  },
  {
    id: 'conv-10',
    participantIds: ['trainer-2', 'ath-4'],
    participantNames: ['Coach Sarah Johnson', 'Terrell Green'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Terrell, your route tree is looking crisp. Keep working on the comeback route.',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
  },
  {
    id: 'conv-11',
    participantIds: ['trainer-3', 'ath-8'],
    participantNames: ['Coach Ray Lewis Jr.', 'Trevon Harris'],
    participantRoles: ['trainer', 'athlete'],
    lastMessage: 'Your blocking technique is coming along. We\'ll drill it more Thursday.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
  },
];

export const MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    { id: 'msg-1', conversationId: 'conv-1', senderId: 'ath-1', senderName: 'Marcus Johnson', content: 'Coach, just finished the speed drill. Felt fast today.', timestamp: '2026-02-10T14:30:00', read: true },
    { id: 'msg-2', conversationId: 'conv-1', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'I saw the data come in. You hit 4.62 on the last rep \u2014 that\'s a session PR. Keep that foot drive going.', timestamp: '2026-02-10T14:35:00', read: true },
    { id: 'msg-3', conversationId: 'conv-1', senderId: 'ath-1', senderName: 'Marcus Johnson', content: 'Thanks Coach! Should I add an extra sprint session this week?', timestamp: '2026-02-10T14:40:00', read: true },
    { id: 'msg-4', conversationId: 'conv-1', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Stick to the plan. Recovery matters more right now. We need you fresh for the combine simulation Saturday.', timestamp: '2026-02-10T14:45:00', read: true },
    { id: 'msg-5', conversationId: 'conv-1', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Great work today, Marcus. Your 40 time is looking sharp. Let\'s push for 4.55 by March.', timestamp: '2026-02-10T16:00:00', read: false },
  ],
  'conv-2': [
    { id: 'msg-6', conversationId: 'conv-2', senderId: 'trainer-2', senderName: 'Coach Sarah Johnson', content: 'Marcus, I wanted to share some film notes on your throwing motion.', timestamp: '2026-02-09T10:00:00', read: true },
    { id: 'msg-7', conversationId: 'conv-2', senderId: 'ath-1', senderName: 'Marcus Johnson', content: 'Definitely! I appreciate the extra eyes.', timestamp: '2026-02-09T10:15:00', read: true },
    { id: 'msg-8', conversationId: 'conv-2', senderId: 'trainer-2', senderName: 'Coach Sarah Johnson', content: 'I reviewed your film from Tuesday. Let\'s talk about your release point.', timestamp: '2026-02-09T10:30:00', read: true },
  ],
  'conv-3': [
    { id: 'msg-9', conversationId: 'conv-3', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Jamal, your position drill session yesterday was solid. The hip flip numbers are improving.', timestamp: '2026-02-10T08:00:00', read: true },
    { id: 'msg-10', conversationId: 'conv-3', senderId: 'ath-2', senderName: 'Jamal Williams', content: 'Coach, can we do an extra position drill session this week?', timestamp: '2026-02-10T11:30:00', read: false },
  ],
  'conv-4': [
    { id: 'msg-11', conversationId: 'conv-4', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Remember to stretch before tomorrow\'s speed session.', timestamp: '2026-02-10T09:00:00', read: true },
  ],
  'conv-5': [
    { id: 'msg-12', conversationId: 'conv-5', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Your bench press form needs work. Let\'s review it together.', timestamp: '2026-02-09T15:00:00', read: true },
  ],
  'conv-6': [
    { id: 'msg-13', conversationId: 'conv-6', senderId: 'trainer-2', senderName: 'Coach Sarah Johnson', content: 'Isaiah, your film from the playoff game was outstanding. Let\'s break it down tomorrow.', timestamp: '2026-02-10T12:00:00', read: false },
  ],
  'conv-7': [
    { id: 'msg-14', conversationId: 'conv-7', senderId: 'trainer-3', senderName: 'Coach Ray Lewis Jr.', content: 'Davonte, I want to see more intensity in your next workout. You have the tools.', timestamp: '2026-02-10T09:30:00', read: true },
    { id: 'msg-15', conversationId: 'conv-7', senderId: 'ath-6', senderName: 'Davonte Carter', content: 'Yes sir. I\'ll get those workouts verified this week.', timestamp: '2026-02-10T10:00:00', read: true },
    { id: 'msg-16', conversationId: 'conv-7', senderId: 'trainer-3', senderName: 'Coach Ray Lewis Jr.', content: 'We need to get your verification rate up. Let\'s make that a priority this week.', timestamp: '2026-02-10T10:15:00', read: true },
  ],
  'conv-8': [
    { id: 'msg-17', conversationId: 'conv-8', senderId: 'trainer-3', senderName: 'Coach Ray Lewis Jr.', content: 'Great coverage drill today. Your hip flip is looking elite.', timestamp: '2026-02-09T16:00:00', read: true },
  ],
  'conv-9': [
    { id: 'msg-18', conversationId: 'conv-9', senderId: 'trainer-1', senderName: 'Coach Mike Davis', content: 'Malik, you missed your last verification. Let\'s get back on track.', timestamp: '2026-02-08T14:00:00', read: true },
  ],
  'conv-10': [
    { id: 'msg-19', conversationId: 'conv-10', senderId: 'trainer-2', senderName: 'Coach Sarah Johnson', content: 'Terrell, your route tree is looking crisp. Keep working on the comeback route.', timestamp: '2026-02-09T14:00:00', read: true },
  ],
  'conv-11': [
    { id: 'msg-20', conversationId: 'conv-11', senderId: 'trainer-3', senderName: 'Coach Ray Lewis Jr.', content: 'Your blocking technique is coming along. We\'ll drill it more Thursday.', timestamp: '2026-02-08T11:00:00', read: true },
  ],
};

export function getConversationsForUser(userId: string): Conversation[] {
  return CONVERSATIONS.filter(c => c.participantIds.includes(userId));
}

export function getMessagesForConversation(conversationId: string): Message[] {
  return MESSAGES[conversationId] || [];
}

export function getOtherParticipant(conversation: Conversation, currentUserId: string): { id: string; name: string; role: 'athlete' | 'trainer' | 'recruiter' } {
  const idx = conversation.participantIds.indexOf(currentUserId) === 0 ? 1 : 0;
  return {
    id: conversation.participantIds[idx],
    name: conversation.participantNames[idx],
    role: conversation.participantRoles[idx],
  };
}
