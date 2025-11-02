import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Plus, Users, User } from "lucide-react";

interface Conversation {
  id: number;
  type: string;
  team_id?: number;
  name?: string;
  created_by: string;
  last_message?: string;
  last_message_at?: string;
  unread_count?: number;
  created_at: string;
}

interface Message {
  id: number;
  conversation_id: number;
  sender_id: string;
  sender_name?: string;
  sender_photo?: string;
  content: string;
  message_type: string;
  created_at: string;
}

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock conversations data
  const mockConversations: Conversation[] = [
    {
      id: 1,
      type: "team",
      team_id: 1,
      name: "Thunder Bolts Team",
      created_by: "captain1",
      last_message: "Great practice session today! Ready for the weekend match?",
      last_message_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
      unread_count: 3,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    {
      id: 2,
      type: "team",
      team_id: 2,
      name: "Lightning Stars Squad",
      created_by: "captain2",
      last_message: "Team meeting at 5 PM tomorrow",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      unread_count: 1,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
      id: 3,
      type: "direct",
      name: "Virat Sharma",
      created_by: "user1",
      last_message: "Thanks for the batting tips!",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      unread_count: 0,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: 4,
      type: "direct",
      name: "Rohit Patel",
      created_by: "user2",
      last_message: "See you at the ground tomorrow!",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      unread_count: 0,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: 5,
      type: "team",
      team_id: 3,
      name: "Weekend Warriors",
      created_by: "captain3",
      last_message: "Tournament registration completed! 🎉",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      unread_count: 0,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
  ];

  // Mock messages for each conversation
  const mockMessagesData: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        conversation_id: 1,
        sender_id: "captain1",
        sender_name: "Team Captain",
        content: "Hey everyone! Practice session starts at 6 PM today.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 2,
        conversation_id: 1,
        sender_id: "user123",
        sender_name: "You",
        content: "I'll be there! Should I bring extra balls?",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 3,
        conversation_id: 1,
        sender_id: "player1",
        sender_name: "Jasprit Kumar",
        content: "Count me in! 🏏",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: 4,
        conversation_id: 1,
        sender_id: "captain1",
        sender_name: "Team Captain",
        content: "Great! Yes, please bring extra balls. We'll focus on batting drills today.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
    ],
    2: [
      {
        id: 5,
        conversation_id: 2,
        sender_id: "captain2",
        sender_name: "Squad Leader",
        content: "Important team meeting tomorrow at 5 PM. Please confirm attendance.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        id: 6,
        conversation_id: 2,
        sender_id: "user123",
        sender_name: "You",
        content: "Confirmed! Will be there.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
    3: [
      {
        id: 7,
        conversation_id: 3,
        sender_id: "user1",
        sender_name: "Virat Sharma",
        content: "Hey! Can you share those batting techniques you mentioned?",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
      {
        id: 8,
        conversation_id: 3,
        sender_id: "user123",
        sender_name: "You",
        content: "Sure! Focus on your footwork and keep your eyes on the ball. I'll show you some drills at practice.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5.5).toISOString(),
      },
      {
        id: 9,
        conversation_id: 3,
        sender_id: "user1",
        sender_name: "Virat Sharma",
        content: "Thanks for the batting tips!",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
    4: [
      {
        id: 10,
        conversation_id: 4,
        sender_id: "user2",
        sender_name: "Rohit Patel",
        content: "Ready for tomorrow's match?",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      },
      {
        id: 11,
        conversation_id: 4,
        sender_id: "user123",
        sender_name: "You",
        content: "Absolutely! Been practicing hard all week.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24.5).toISOString(),
      },
      {
        id: 12,
        conversation_id: 4,
        sender_id: "user2",
        sender_name: "Rohit Patel",
        content: "See you at the ground tomorrow!",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    5: [
      {
        id: 13,
        conversation_id: 5,
        sender_id: "captain3",
        sender_name: "Warriors Captain",
        content: "Just registered our team for the Summer Championship!",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        id: 14,
        conversation_id: 5,
        sender_id: "player5",
        sender_name: "MS Reddy",
        content: "That's awesome! When does it start?",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
      },
      {
        id: 15,
        conversation_id: 5,
        sender_id: "captain3",
        sender_name: "Warriors Captain",
        content: "Tournament registration completed! 🎉 First match is on Nov 15th.",
        message_type: "text",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(),
      },
    ],
  };

  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessagesData[1] || []);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessagesData[conversation.id] || []);
    
    // Mark as read (clear unread count)
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversation.id ? { ...conv, unread_count: 0 } : conv
      )
    );
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);
    
    // Simulate sending message
    const newMsg: Message = {
      id: messages.length + 1,
      conversation_id: selectedConversation.id,
      sender_id: "user123",
      sender_name: "You",
      content: newMessage.trim(),
      message_type: "text",
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // Update conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, last_message: newMessage.trim(), last_message_at: new Date().toISOString() }
          : conv
      )
    );

    setSendingMessage(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.type === 'team') return `Team Chat`;
    return 'Direct Message';
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-20 md:pb-8 page-transition">
      <div className="mb-4 sm:mb-8 fade-in">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Chat</h1>
        <p className="text-gray-600 text-sm sm:text-base">Connect with fellow cricketers and team members</p>
      </div>

      <div className="cricket-card overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`w-full sm:w-2/5 md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden sm:flex' : ''}`}>
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base sm:text-lg">Conversations</h3>
                <button 
                  onClick={() => setShowNewChatModal(true)}
                  className="w-8 h-8 cricket-gradient rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 touch-manipulation active:scale-95"
                  title="Start new conversation"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto touch-manipulation">
              {conversations.length === 0 ? (
                <div className="p-4 sm:p-6 text-center">
                  <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-xs sm:text-sm">No conversations yet</p>
                  <p className="text-gray-400 text-xs mt-1">Start a new chat to get connected</p>
                </div>
              ) : (
                <div className="space-y-1 p-1.5 sm:p-2">
                  {conversations.map((conversation, index) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-cricket-green-50 scale-in touch-manipulation active:scale-95 ${
                        selectedConversation?.id === conversation.id
                          ? "bg-cricket-green-100 border-l-4 border-cricket-green-600"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-full flex items-center justify-center flex-shrink-0">
                          {conversation.type === 'team' ? (
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-xs sm:text-sm truncate">
                              {getConversationName(conversation)}
                            </p>
                            {conversation.last_message_at && (
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-1">
                                {formatTime(conversation.last_message_at)}
                              </span>
                            )}
                          </div>
                          {conversation.last_message && (
                            <p className="text-xs text-gray-600 truncate mt-1">
                              {conversation.last_message}
                            </p>
                          )}
                        </div>
                        {conversation.unread_count && conversation.unread_count > 0 && (
                          <div className="w-5 h-5 bg-cricket-green-600 text-white text-xs rounded-full flex items-center justify-center bounce-in flex-shrink-0">
                            {conversation.unread_count}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden sm:flex' : ''}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button 
                      onClick={() => setSelectedConversation(null)}
                      className="sm:hidden w-8 h-8 flex items-center justify-center hover:bg-white/50 rounded-lg transition-colors touch-manipulation active:scale-95"
                    >
                      <span className="text-xl">←</span>
                    </button>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 cricket-gradient rounded-full flex items-center justify-center pulse-glow flex-shrink-0">
                      {selectedConversation.type === 'team' ? (
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{getConversationName(selectedConversation)}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {selectedConversation.type === 'team' ? 'Team conversation' : 'Direct message'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 touch-manipulation">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center px-4">
                        <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm sm:text-base">No messages yet</p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => {
                    const isOwnMessage = message.sender_name === "You";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} fade-in`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className={`max-w-[75%] sm:max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                          {!isOwnMessage && (
                            <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                              {message.sender_photo ? (
                                <img
                                  src={message.sender_photo}
                                  alt={message.sender_name}
                                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-cricket-green-200"
                                />
                              ) : (
                                <div className="w-5 h-5 sm:w-6 sm:h-6 cricket-gradient-alt rounded-full flex items-center justify-center">
                                  <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                </div>
                              )}
                              <span className="text-xs font-medium text-gray-600 truncate">
                                {message.sender_name || 'Unknown User'}
                              </span>
                            </div>
                          )}
                          <div
                            className={`rounded-lg px-3 sm:px-4 py-2 ${
                              isOwnMessage
                                ? 'bg-cricket-green-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            } shadow-sm hover:shadow-md transition-shadow duration-200`}
                          >
                            <p className="text-xs sm:text-sm break-words">{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-green-100' : 'text-gray-500'}`}>
                              {formatTime(message.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-2 sm:p-4 border-t border-gray-200 bg-gradient-to-r from-cricket-green-50 to-cricket-blue-50 safe-area-inset-bottom">
                  <form onSubmit={sendMessage} className="flex space-x-2 sm:space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent transition-all duration-200 touch-manipulation"
                      disabled={sendingMessage}
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sendingMessage}
                      className="w-10 h-10 sm:w-12 sm:h-12 cricket-gradient rounded-full flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 disabled:hover:scale-100 touch-manipulation active:scale-95 flex-shrink-0"
                    >
                      {sendingMessage ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center hidden sm:flex">
                <div className="text-center px-4">
                  <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4 floating" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
                  <p className="text-sm sm:text-base text-gray-500">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Modal - Full Screen */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-in fade-in duration-200">
          <div className="min-h-screen pb-safe">
            <div className="bg-gradient-to-r from-cricket-green-600 to-cricket-blue-600 p-4 sm:p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-lg sm:text-2xl font-bold text-white">New Conversation</h2>
              </div>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200 touch-manipulation active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-12 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Chat Type</label>
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation">
                  <option value="direct">Direct Message</option>
                  <option value="team">Team Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Select Player/Team</label>
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent touch-manipulation">
                  <option value="">Choose...</option>
                  <option value="1">Virat Sharma</option>
                  <option value="2">Rohit Patel</option>
                  <option value="3">Jasprit Kumar</option>
                  <option value="4">MS Reddy</option>
                  <option value="5">Thunder Bolts Team</option>
                  <option value="6">Lightning Stars Squad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">First Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Start the conversation..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricket-green-500 focus:border-transparent resize-none touch-manipulation"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg font-medium text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-all duration-200 touch-manipulation active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('New conversation started! Feature will be fully functional in production.');
                    setShowNewChatModal(false);
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-cricket-green-600 hover:bg-cricket-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation active:scale-95"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
