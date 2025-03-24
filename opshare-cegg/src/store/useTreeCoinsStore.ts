import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Define the store state
interface TreeCoinsState {
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

// Create the store with persistence
export const useTreeCoinsStore = create<TreeCoinsState>()(
  persist(
    (set, get) => ({
      balances: {},
      transactions: [],
      missions: [
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
      ],
      
      // Initialize a new user with 100 TreeCoins
      initializeUser: (userId: string) => {
        const { balances, completeMission } = get();
        
        // Only initialize if user doesn't exist
        if (balances[userId] === undefined) {
          set((state) => ({
            balances: {
              ...state.balances,
              [userId]: 0, // Start with 0, will be increased by completeMission
            },
          }));
          
          // Complete the signup mission to award initial 100 TreeCoins
          completeMission(userId, 'SIGNUP');
        }
      },
      
      // Earn TreeCoins
      earnTreeCoins: (userId: string, amount: number, description: string, mission?: MissionType) => {
        set((state) => {
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
          const currentBalance = state.balances[userId] || 0;
          
          return {
            balances: {
              ...state.balances,
              [userId]: currentBalance + amount,
            },
            transactions: [newTransaction, ...state.transactions],
          };
        });
      },
      
      // Spend TreeCoins
      spendTreeCoins: (userId: string, amount: number, description: string) => {
        const currentBalance = get().balances[userId] || 0;
        
        // Check if user has enough TreeCoins
        if (currentBalance < amount) {
          return false;
        }
        
        set((state) => {
          // Create new transaction
          const newTransaction: TreeCoinTransaction = {
            id: `spend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            userId,
            amount,
            type: 'SPENT',
            description,
            timestamp: new Date(),
          };
          
          return {
            balances: {
              ...state.balances,
              [userId]: currentBalance - amount,
            },
            transactions: [newTransaction, ...state.transactions],
          };
        });
        
        return true;
      },
      
      // Get user balance
      getUserBalance: (userId: string) => {
        return get().balances[userId] || 0;
      },
      
      // Get user transactions
      getUserTransactions: (userId: string) => {
        return get().transactions.filter(
          (transaction) => transaction.userId === userId
        );
      },
      
      // Get completed missions for a user
      getCompletedMissions: (userId: string) => {
        return get().missions
          .filter((mission) => mission.completedBy.includes(userId))
          .map((mission) => mission.id);
      },
      
      // Complete a mission and earn rewards
      completeMission: (userId: string, missionType: MissionType) => {
        const { missions, earnTreeCoins } = get();
        
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
        set((state) => ({
          missions: state.missions.map((m) => 
            m.id === missionType
              ? { ...m, completedBy: [...m.completedBy, userId] }
              : m
          ),
        }));
        
        // Award TreeCoins
        earnTreeCoins(
          userId,
          mission.reward,
          `Completed mission: ${mission.name}`,
          missionType
        );
        
        return true;
      },
      
      // Calculate eco-friendliness score (0-100)
      calculateEcoScore: (userId: string) => {
        const { getUserTransactions } = get();
        const transactions = getUserTransactions(userId);
        
        // Calculate total earned from eco-friendly activities
        const ecoMissions: MissionType[] = [
          'SHARE_ITEM',
          'RENT_ITEM',
          'SUSTAINABLE_CHOICE',
        ];
        
        const ecoPoints = transactions
          .filter(
            (t) => t.type === 'EARNED' && t.mission && ecoMissions.includes(t.mission)
          )
          .reduce((sum, t) => sum + t.amount, 0);
        
        // Calculate score (max score at 500 points)
        return Math.min(Math.round((ecoPoints / 500) * 100), 100);
      },
    }),
    {
      name: 'opshare-treecoins-storage',
    }
  )
); 