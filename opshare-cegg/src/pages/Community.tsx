import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Users, Search, Send, 
  ThumbsUp, Clock, Filter, User, 
  PlusCircle, ChevronDown, Tag, Shield, AlertTriangle, X
} from 'lucide-react';

// Function to generate random names
const generateRandomName = () => {
  const adjectives = ['Happy', 'Clever', 'Brave', 'Calm', 'Gentle', 'Swift', 'Wise', 'Bright', 'Kind', 'Vivid'];
  const animals = ['Falcon', 'Turtle', 'Rabbit', 'Panda', 'Dolphin', 'Tiger', 'Koala', 'Eagle', 'Fox', 'Wolf'];
  
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  
  return `${randomAdj} ${randomAnimal}`;
};

// Generate random avatar color
const getRandomColor = () => {
  const colors = ['red', 'blue', 'green', 'purple', 'orange', 'teal', 'pink', 'indigo'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Mock data for community members (anonymized)
const mockUsers = [
  {
    id: 1,
    name: generateRandomName(),
    avatar: null, // Will use initials-based avatar
    rating: 4.9,
    itemsShared: 12,
    memberSince: 'Jan 2023',
    isOnline: true,
    bgColor: getRandomColor(),
  },
  {
    id: 2,
    name: generateRandomName(),
    avatar: null,
    rating: 4.7,
    itemsShared: 8,
    memberSince: 'Mar 2023',
    isOnline: true,
    bgColor: getRandomColor(),
  },
  {
    id: 3,
    name: generateRandomName(),
    avatar: null,
    rating: 4.8,
    itemsShared: 15,
    memberSince: 'Nov 2022',
    isOnline: false,
    bgColor: getRandomColor(),
  },
  {
    id: 4,
    name: generateRandomName(),
    avatar: null,
    rating: 4.6,
    itemsShared: 5,
    memberSince: 'Apr 2023',
    isOnline: false,
    bgColor: getRandomColor(),
  },
  {
    id: 5,
    name: generateRandomName(),
    avatar: null,
    rating: 5.0,
    itemsShared: 20,
    memberSince: 'Sep 2022',
    isOnline: true,
    bgColor: getRandomColor(),
  },
];

// Mock data for forum discussions
const mockDiscussions = [
  {
    id: 1,
    title: 'Best practices for renting out power tools?',
    author: mockUsers[0],
    date: '2 days ago',
    category: 'Sharing Tips',
    replies: 12,
    views: 89,
    likes: 24,
    isSticky: true,
    lastReply: {
      author: mockUsers[2],
      date: '3 hours ago',
    },
    tags: ['tools', 'safety', 'tips'],
  },
  {
    id: 2,
    title: 'How to properly clean camping gear before returning?',
    author: mockUsers[1],
    date: '5 days ago',
    category: 'Borrower Etiquette',
    replies: 8,
    views: 56,
    likes: 15,
    isSticky: false,
    lastReply: {
      author: mockUsers[4],
      date: '1 day ago',
    },
    tags: ['camping', 'cleaning', 'etiquette'],
  },
  {
    id: 3,
    title: 'Share your sustainability success stories!',
    author: mockUsers[4],
    date: '1 week ago',
    category: 'Success Stories',
    replies: 23,
    views: 142,
    likes: 47,
    isSticky: true,
    lastReply: {
      author: mockUsers[3],
      date: '12 hours ago',
    },
    tags: ['sustainability', 'impact', 'stories'],
  },
  {
    id: 4,
    title: 'Tips for photographing items for better listings',
    author: mockUsers[2],
    date: '3 days ago',
    category: 'Listing Tips',
    replies: 15,
    views: 98,
    likes: 32,
    isSticky: false,
    lastReply: {
      author: mockUsers[0],
      date: '6 hours ago',
    },
    tags: ['photography', 'listings', 'tips'],
  },
  {
    id: 5,
    title: 'Introducing myself - new to the community!',
    author: mockUsers[3],
    date: '1 day ago',
    category: 'Introductions',
    replies: 7,
    views: 42,
    likes: 18,
    isSticky: false,
    lastReply: {
      author: mockUsers[1],
      date: '5 hours ago',
    },
    tags: ['new member', 'introduction'],
  },
];

// Add violation tracking to chat data
const mockChats = [
  {
    id: 1,
    user: mockUsers[1],
    violations: 0,
    isBlocked: false,
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hi there! I saw you have a pressure washer available. Is it still available for this weekend?',
        time: '2:30 PM',
        isRead: true,
      },
      {
        id: 2,
        sender: 'me',
        text: 'Yes, it is! Were you thinking of Saturday or Sunday?',
        time: '2:35 PM',
        isRead: true,
      },
      {
        id: 3,
        sender: 'them',
        text: 'Saturday would be perfect. I need to clean my deck. How much would it be for the whole day?',
        time: '2:38 PM',
        isRead: true,
      },
      {
        id: 4,
        sender: 'me',
        text: 'It\'s $25 for the day. I can also include some cleaning solution if you need it.',
        time: '2:40 PM',
        isRead: true,
      },
      {
        id: 5,
        sender: 'them',
        text: 'That would be great! What time can I pick it up?',
        time: '2:42 PM',
        isRead: false,
      },
    ],
  },
  {
    id: 2,
    user: mockUsers[4],
    violations: 0,
    isBlocked: false,
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hello! I\'m interested in your camera for a photoshoot next week.',
        time: '10:15 AM',
        isRead: true,
      },
      {
        id: 2,
        sender: 'me',
        text: 'Hi Emma! The camera is available. Which days were you thinking?',
        time: '10:30 AM',
        isRead: true,
      },
      {
        id: 3,
        sender: 'them',
        text: 'Tuesday through Thursday if possible. It\'s for a family portrait session.',
        time: '10:35 AM',
        isRead: false,
      },
    ],
  },
  {
    id: 3,
    user: mockUsers[2],
    violations: 0,
    isBlocked: false,
    messages: [
      {
        id: 1,
        sender: 'me',
        text: 'Hi Jessica, just checking if you\'re still planning to return the stand mixer today?',
        time: 'Yesterday',
        isRead: true,
      },
      {
        id: 2,
        sender: 'them',
        text: 'Yes! Sorry for the delay. I\'ll drop it off around 6pm if that works for you?',
        time: 'Yesterday',
        isRead: true,
      },
      {
        id: 3,
        sender: 'me',
        text: 'Perfect, see you then!',
        time: 'Yesterday',
        isRead: true,
      },
    ],
  },
];

// Categories for forum
const forumCategories = [
  'All Categories',
  'Sharing Tips',
  'Borrower Etiquette',
  'Success Stories',
  'Listing Tips',
  'Introductions',
  'Technical Help',
  'Sustainability',
];

// Function to detect personal information in messages
const detectPersonalInfo = (message) => {
  // Patterns to detect
  const patterns = {
    phoneNumber: /(\+?[0-9]{1,3}[-.\s]?)?(\([0-9]{1,4}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}/g,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    address: /\d+\s+[a-zA-Z]+\s+(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|court|ct|lane|ln|way)/gi,
    // Add more patterns as needed
  };

  // Check for matches
  const matches = {};
  let hasMatch = false;
  
  Object.entries(patterns).forEach(([type, pattern]) => {
    const found = message.match(pattern);
    if (found) {
      hasMatch = true;
      matches[type] = found;
    }
  });
  
  return { hasViolation: hasMatch, matches };
};

const Community = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [reportedViolations, setReportedViolations] = useState([]);
  
  // Filter discussions based on search and category
  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          discussion.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || discussion.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle sending a new message with personal info check
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Check for personal information
    const { hasViolation, matches } = detectPersonalInfo(newMessage);
    
    if (hasViolation) {
      // Increment violations count
      const updatedChats = [...mockChats];
      const chatIndex = updatedChats.findIndex(chat => chat.id === selectedChat.id);
      
      if (chatIndex !== -1) {
        updatedChats[chatIndex].violations += 1;
        
        // Determine warning message based on number of violations
        const violations = updatedChats[chatIndex].violations;
        let warningText = '';
        
        if (violations === 1) {
          warningText = "We've detected personal information in your message. For privacy reasons, sharing personal details is not allowed. This is your first warning.";
        } else if (violations === 2) {
          warningText = "We've detected personal information again. This is your second warning. One more violation will result in being blocked from this chat.";
        } else if (violations >= 3) {
          warningText = "You have been blocked from this conversation for repeatedly sharing personal information. Please review our community guidelines.";
          updatedChats[chatIndex].isBlocked = true;
        }
        
        setWarningMessage(warningText);
        setShowWarning(true);
        
        // Report to admin dashboard
        const newViolation = {
          id: reportedViolations.length + 1,
          userId: selectedChat.user.id,
          userName: selectedChat.user.name,
          chatId: selectedChat.id,
          message: newMessage,
          detectedInfo: matches,
          timestamp: new Date().toISOString(),
          violationCount: violations
        };
        
        setReportedViolations([...reportedViolations, newViolation]);
        
        // Update the selected chat
        setSelectedChat(updatedChats[chatIndex]);
      }
      
      // Clear the message without sending
      setNewMessage('');
      return;
    }
    
    // If no violations, proceed with sending the message
    console.log('Sending message:', newMessage);
    
    // For demo purposes, we'll just add it to the UI
    const updatedChats = [...mockChats];
    const chatIndex = updatedChats.findIndex(chat => chat.id === selectedChat.id);
    
    if (chatIndex !== -1) {
      updatedChats[chatIndex].messages.push({
        id: selectedChat.messages.length + 1,
        sender: 'me',
        text: newMessage,
        time: 'Just now',
        isRead: false,
      });
      
      setSelectedChat(updatedChats[chatIndex]);
    }
    
    setNewMessage('');
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">OpShare Community</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connect with other members, share tips, and build relationships beyond transactions.
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex border-b mb-8">
            <button
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === 'forum'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('forum')}
            >
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Community Forum</span>
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === 'messages'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('messages')}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>My Messages</span>
                <span className="bg-green-600 text-white text-xs rounded-full px-2 py-1">3</span>
              </div>
            </button>
          </div>
          
          {/* Forum Content */}
          {activeTab === 'forum' && (
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-3/4">
                {/* Search and filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <select
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {forumCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    <PlusCircle size={18} />
                    <span>New Discussion</span>
                  </button>
                </div>
                
                {/* Discussions list */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">Recent Discussions</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Sort by:</span>
                        <select className="border-none bg-transparent focus:ring-0 py-0">
                          <option>Recent Activity</option>
                          <option>Most Popular</option>
                          <option>Newest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {mockDiscussions.length > 0 ? (
                    <div className="divide-y">
                      {mockDiscussions.map(discussion => (
                        <div key={discussion.id} className={`p-6 hover:bg-gray-50 transition ${discussion.isSticky ? 'bg-green-50' : ''}`}>
                          <div className="flex items-start gap-4">
                            {/* Anonymous Avatar */}
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}
                              style={{backgroundColor: `var(--${discussion.author.bgColor}-500, #4f46e5)`}}
                            >
                              {getInitials(discussion.author.name)}
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                {discussion.isSticky && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Sticky</span>
                                )}
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{discussion.category}</span>
                              </div>
                              <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition">
                                <a href="#">{discussion.title}</a>
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {discussion.tags.map(tag => (
                                  <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Tag size={12} />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center text-sm text-gray-600 mb-3">
                                <span className="mr-4">Started by {discussion.author.name}</span>
                                <span className="mr-4">{discussion.date}</span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <MessageCircle size={16} />
                                  <span>{discussion.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <ThumbsUp size={16} />
                                  <span>{discussion.likes} likes</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Clock size={16} />
                                  <span>Last reply {discussion.lastReply.date} by {discussion.lastReply.author.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                      <p className="text-gray-500 mb-6">
                        Try adjusting your search or filter criteria
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All Categories');
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/4">
                {/* Community stats */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="font-bold text-lg mb-4">Community Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">5,243</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discussions:</span>
                      <span className="font-medium">1,872</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comments:</span>
                      <span className="font-medium">12,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Online now:</span>
                      <span className="font-medium text-green-600">124</span>
                    </div>
                  </div>
                </div>
                
                {/* Active members - Anonymized */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Active Members</h3>
                  <div className="space-y-4">
                    {mockUsers.map(user => (
                      <div key={user.id} className="flex items-center gap-3">
                        <div className="relative">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-${user.bgColor}-500`}
                            style={{backgroundColor: `var(--${user.bgColor}-500, #4f46e5)`}}
                          >
                            {getInitials(user.name)}
                          </div>
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-600">{user.itemsShared} items shared</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Messages Content */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex h-[600px]">
                {/* Conversations list - Anonymized */}
                <div className="w-1/3 border-r">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Search messages..."
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto h-[calc(600px-73px)]">
                    {mockChats.map(chat => (
                      <div 
                        key={chat.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          selectedChat.id === chat.id ? 'bg-gray-50' : ''
                        } ${chat.isBlocked ? 'opacity-50' : ''}`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                              {chat.id % 2 === 0 ? 'L' : 'B'}
                            </div>
                            {chat.user.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">
                                {chat.id % 2 === 0 ? 'Lender' : 'Borrower'}
                                {chat.violations > 0 && (
                                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                                    {chat.violations} warning{chat.violations > 1 ? 's' : ''}
                                  </span>
                                )}
                                {chat.isBlocked && (
                                  <span className="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                                    Blocked
                                  </span>
                                )}
                              </h4>
                              <span className="text-xs text-gray-500">{chat.messages[chat.messages.length - 1].time}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">
                              Re: {chat.id === 1 ? 'Pressure Washer' : chat.id === 2 ? 'Camera Rental' : 'Stand Mixer'}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {chat.messages[chat.messages.length - 1].text}
                            </p>
                            {chat.messages.some(msg => msg.sender === 'them' && !msg.isRead) && (
                              <div className="mt-1 bg-green-600 text-white text-xs rounded-full px-2 py-0.5 inline-block">
                                New
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chat window */}
                <div className="w-2/3 flex flex-col">
                  {/* Chat header - Anonymized */}
                  <div className="p-4 border-b flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                          {selectedChat.id % 2 === 0 ? 'L' : 'B'}
                        </div>
                        {selectedChat.user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {selectedChat.id % 2 === 0 ? 'Lender' : 'Borrower'}
                          {selectedChat.violations > 0 && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                              {selectedChat.violations} warning{selectedChat.violations > 1 ? 's' : ''}
                            </span>
                          )}
                        </h4>
                        <div className="text-xs text-gray-500">
                          Re: {selectedChat.id === 1 ? 'Pressure Washer' : selectedChat.id === 2 ? 'Camera Rental' : 'Stand Mixer'}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Anonymous Chat
                    </div>
                  </div>
                  
                  {/* Messages - Anonymized */}
                  <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {/* Privacy notice banner */}
                      <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm text-center mx-auto max-w-md">
                        <span className="font-medium">Privacy Protected:</span> To protect your identity, OpShare uses anonymous identifiers. Personal contact details are automatically filtered.
                      </div>

                      {selectedChat.messages.map((message, index) => (
                        <div 
                          key={index}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.sender !== 'me' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold mr-2 flex-shrink-0">
                              {selectedChat.id % 2 === 0 ? 'L' : 'B'}
                            </div>
                          )}
                          <div 
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender === 'me' 
                                ? 'bg-green-600 text-white rounded-br-none' 
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              <span className={`text-xs font-medium ${message.sender === 'me' ? 'text-green-100' : 'text-gray-500'}`}>
                                {message.sender === 'me' ? 'You' : selectedChat.id % 2 === 0 ? 'Lender' : 'Borrower'}
                              </span>
                            </div>
                            <p>{message.text}</p>
                            <div 
                              className={`text-xs mt-1 ${
                                message.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                              }`}
                            >
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Warning message if chat is blocked */}
                      {selectedChat.isBlocked && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-sm text-center mx-auto">
                          <AlertTriangle className="h-5 w-5 mx-auto mb-2" />
                          <p className="font-medium">This chat has been blocked due to multiple privacy violations.</p>
                          <p className="mt-1">Sharing personal contact information is not allowed on OpShare.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Message input with privacy warning */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${selectedChat.isBlocked ? 'bg-gray-100 text-gray-500' : ''}`}
                        placeholder={selectedChat.isBlocked ? "You cannot send messages in this chat" : "Type a message..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !selectedChat.isBlocked) {
                            handleSendMessage();
                          }
                        }}
                        disabled={selectedChat.isBlocked}
                      />
                      <button 
                        className={`p-2 rounded-lg ${selectedChat.isBlocked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 transition'}`}
                        onClick={handleSendMessage}
                        disabled={selectedChat.isBlocked}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-500 flex items-center justify-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Your identity is protected. Avoid sharing personal contact information.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Warning Popup */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-bold">Privacy Warning</h3>
              </div>
              <button 
                onClick={() => setShowWarning(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">{warningMessage}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800 mb-4">
              <p className="font-medium">Why this matters:</p>
              <p>Sharing personal information in chats compromises your privacy and safety. OpShare is designed to protect all users by keeping communications anonymous until an item exchange is confirmed.</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Community Guidelines */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Community Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Be Respectful</h3>
                <p className="text-gray-600">
                  Treat others with kindness and respect. We're all here to help each other and build a positive community.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Communicate Clearly</h3>
                <p className="text-gray-600">
                  Be clear and honest in your communications. Respond promptly to messages and keep your commitments.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Share Knowledge</h3>
                <p className="text-gray-600">
                  Share your experiences and tips with others. Your insights can help make our community stronger and more sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community; 