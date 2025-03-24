import React, { createContext, useContext, useState, useEffect } from 'react';

// Define mission types
export type MissionType = 
  | 'SIGNUP'
  | 'FIRST_LISTING'
  | 'FIRST_RENTAL'
  | 'COMPLETE_PROFILE'
  | 'SHARE_ITEM'
  | 'RENT_ITEM'
  | 'LEAVE_REVIEW'
  | 'REFER_FRIEND'
  | 'WEEKLY_ACTIVE'
  | 'SUSTAINABLE_CHOICE';

// Define transaction types
export type TransactionType = 'EARNED' | 'SPENT';

// Define transaction interface
export interface TreeCoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  mission?: MissionType;
  timestamp: Date;
}

// Define mission interface
export interface Mission {
  id: MissionType;
  name: string;
  description: string;
  reward: number;
  icon: string;
  completedBy: string[]; // Array of user IDs who completed this mission
}

// Define the context type
interface TreeCoinsContextType {
  // User balances
  balances: Record<string, number>;
  
  // Transaction history
  transactions: TreeCoinTransaction[];
  
  // Available missions
  missions: Mission[];
  
  // Actions
  initializeUser: (userId: string) => void;
  earnTreeCoins: (userId: string, amount: number, description: string, mission?: MissionType) => void;
  spendTreeCoins: (userId: string, amount: number, description: string) => boolean;
  getUserBalance: (userId: string) => number;
  getUserTransactions: (userId: string) => TreeCoinTransaction[];
  getCompletedMissions: (userId: string) => MissionType[];
  completeMission: (userId: string, missionType: MissionType) => boolean;
  calculateEcoScore: (userId: string) => number;
}

// Create the context
const TreeCoinsContext = createContext<TreeCoinsContextType | undefined>(undefined);

// Define the initial missions
const initialMissions: Mission[] = [
  {
    id: 'SIGNUP',
    name: 'Join OpShare',
    description: 'Create an account and join our community',
    reward: 100,
    icon: 'UserPlus',
    completedBy: [],
  },
  {
    id: 'FIRST_LISTING',
    name: 'First Listing',
    description: 'List your first item for sharing',
    reward: 50,
    icon: 'Package',
    completedBy: [],
  },
  {
    id: 'FIRST_RENTAL',
    name: 'First Rental',
    description: 'Rent your first item from the community',
    reward: 50,
    icon: 'ShoppingCart',
    completedBy: [],
  },
  {
    id: 'COMPLETE_PROFILE',
    name: 'Complete Profile',
    description: 'Fill out all your profile information',
    reward: 25,
    icon: 'User',
    completedBy: [],
  },
  {
    id: 'SHARE_ITEM',
    name: 'Share an Item',
    description: 'List an item for others to borrow',
    reward: 30,
    icon: 'Share2',
    completedBy: [],
  },
  {
    id: 'RENT_ITEM',
    name: 'Rent an Item',
    description: 'Borrow an item instead of buying new',
    reward: 20,
    icon: 'Calendar',
    completedBy: [],
  },
  {
    id: 'LEAVE_REVIEW',
    name: 'Leave a Review',
    description: 'Share your experience with the community',
    reward: 15,
    icon: 'Star',
    completedBy: [],
  },
  {
    id: 'REFER_FRIEND',
    name: 'Refer a Friend',
    description: 'Invite a friend to join OpShare',
    reward: 75,
    icon: 'Users',
    completedBy: [],
  },
  {
    id: 'WEEKLY_ACTIVE',
    name: 'Weekly Active User',
    description: 'Use OpShare at least 3 times in a week',
    reward: 40,
    icon: 'Award',
    completedBy: [],
  },
  {
    id: 'SUSTAINABLE_CHOICE',
    name: 'Sustainable Choice',
    description: 'Choose a sustainable option for delivery or pickup',
    reward: 25,
    icon: 'Leaf',
    completedBy: [],
  },
];

// Provider component
export const TreeCoinsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [transactions, setTransactions] = useState<TreeCoinTransaction[]>([]);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  
  // Load data from localStorage on mount
  useEffect(() => {
    const storedBalances = localStorage.getItem('opshare_treecoins_balances');
    const storedTransactions = localStorage.getItem('opshare_treecoins_transactions');
    const storedMissions = localStorage.getItem('opshare_treecoins_missions');
    
    if (storedBalances) {
      setBalances(JSON.parse(storedBalances));
    }
    
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    
    if (storedMissions) {
      setMissions(JSON.parse(storedMissions));
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('opshare_treecoins_balances', JSON.stringify(balances));
    localStorage.setItem('opshare_treecoins_transactions', JSON.stringify(transactions));
    localStorage.setItem('opshare_treecoins_missions', JSON.stringify(missions));
  }, [balances, transactions, missions]);
  
  // Initialize a new user with 100 TreeCoins
  const initializeUser = (userId: string) => {
    // Only initialize if user doesn't exist
    if (balances[userId] === undefined) {
      setBalances(prev => ({
        ...prev,
        [userId]: 0, // Start with 0, will be increased by completeMission
      }));
      
      // Complete the signup mission to award initial 100 TreeCoins
      completeMission(userId, 'SIGNUP');
    }
  };
  
  // Earn TreeCoins
  const earnTreeCoins = (userId: string, amount: number, description: string, mission?: MissionType) => {
    // Create new transaction
    const newTransaction: TreeCoinTransaction = {
      id: `earn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      type: 'EARNED',
      description,
      mission,
      timestamp: new Date(),
    };
    
    // Update balance
    const currentBalance = balances[userId] || 0;
    
    setBalances(prev => ({
      ...prev,
      [userId]: currentBalance + amount,
    }));
    
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  // Spend TreeCoins
  const spendTreeCoins = (userId: string, amount: number, description: string) => {
    const currentBalance = balances[userId] || 0;
    
    // Check if user has enough TreeCoins
    if (currentBalance < amount) {
      return false;
    }
    
    // Create new transaction
    const newTransaction: TreeCoinTransaction = {
      id: `spend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      type: 'SPENT',
      description,
      timestamp: new Date(),
    };
    
    setBalances(prev => ({
      ...prev,
      [userId]: currentBalance - amount,
    }));
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    return true;
  };
  
  // Get user balance
  const getUserBalance = (userId: string) => {
    return balances[userId] || 0;
  };
  
  // Get user transactions
  const getUserTransactions = (userId: string) => {
    return transactions.filter(
      (transaction) => transaction.userId === userId
    );
  };
  
  // Get completed missions for a user
  const getCompletedMissions = (userId: string) => {
    return missions
      .filter((mission) => mission.completedBy.includes(userId))
      .map((mission) => mission.id);
  };
  
  // Complete a mission and earn rewards
  const completeMission = (userId: string, missionType: MissionType) => {
    // Find the mission
    const mission = missions.find((m) => m.id === missionType);
    
    if (!mission) {
      return false;
    }
    
    // Check if already completed
    if (mission.completedBy.includes(userId)) {
      return false;
    }
    
    // Mark mission as completed
    setMissions(prev => 
      prev.map((m) => 
        m.id === missionType
          ? { ...m, completedBy: [...m.completedBy, userId] }
          : m
      )
    );
    
    // Award TreeCoins
    earnTreeCoins(
      userId,
      mission.reward,
      `Completed mission: ${mission.name}`,
      missionType
    );
    
    return true;
  };
  
  // Calculate eco-friendliness score (0-100)
  const calculateEcoScore = (userId: string) => {
    const userTransactions = getUserTransactions(userId);
    
    // Calculate total earned from eco-friendly activities
    const ecoMissions: MissionType[] = [
      'SHARE_ITEM',
      'RENT_ITEM',
      'SUSTAINABLE_CHOICE',
    ];
    
    const ecoPoints = userTransactions
      .filter(
        (t) => t.type === 'EARNED' && t.mission && ecoMissions.includes(t.mission)
      )
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate score (max score at 500 points)
    return Math.min(Math.round((ecoPoints / 500) * 100), 100);
  };
  
  return (
    <TreeCoinsContext.Provider
      value={{
        balances,
        transactions,
        missions,
        initializeUser,
        earnTreeCoins,
        spendTreeCoins,
        getUserBalance,
        getUserTransactions,
        getCompletedMissions,
        completeMission,
        calculateEcoScore,
      }}
    >
      {children}
    </TreeCoinsContext.Provider>
  );
};

// Custom hook to use the TreeCoins context
export const useTreeCoins = () => {
  const context = useContext(TreeCoinsContext);
  if (context === undefined) {
    throw new Error('useTreeCoins must be used within a TreeCoinsProvider');
  }
  return context;
}; 