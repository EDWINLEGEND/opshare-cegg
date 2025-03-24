import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type MissionType = 'rental' | 'listing' | 'referral' | 'review' | 'profile' | 'sustainability' | 'onboarding' | 'community' | 'sharing' | 'achievements';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  leafReward: number;
  treeCoinsReward: number;
  completed: boolean;
  repeatable: boolean;
  expiresAt?: Date;
  requirement: {
    type: string;
    count: number;
    currentProgress: number;
  };
}

export interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'converted';
  amount: number;
  currency: 'treeCoins' | 'leafs';
  description: string;
  timestamp: Date;
  relatedMissionId?: string;
}

interface CreditState {
  treeCoins: number;
  leafs: number;
  ecoScore: number;
  maxEcoScore: number;
  ecoLevel: number;
  transactions: Transaction[];
  missions: Mission[];
  
  // Actions
  earnTreeCoins: (amount: number, description: string, missionId?: string) => void;
  spendTreeCoins: (amount: number, description: string) => boolean;
  earnLeafs: (amount: number, description: string, missionId?: string) => void;
  convertLeafsToTreeCoins: () => void;
  completeMission: (missionId: string) => void;
  progressMission: (missionId: string, progressAmount: number) => void;
  resetMissionProgress: (missionId: string) => void;
  addMission: (mission: Omit<Mission, "id" | "completed" | "requirement"> & { requirementType: string, requirementCount: number }) => void;
}

// Initialize with default missions
const defaultMissions: Mission[] = [
  {
    id: uuidv4(),
    title: 'Join OpShare',
    description: 'Create an account and join our community',
    type: 'onboarding',
    leafReward: 100000,
    treeCoinsReward: 0,
    completed: true, // Users will have this completed by default
    repeatable: false,
    requirement: {
      type: 'account',
      count: 1,
      currentProgress: 1 
    }
  },
  {
    id: uuidv4(),
    title: 'First Listing',
    description: 'Create your first listing on OpShare',
    type: 'sharing',
    leafReward: 50000,
    treeCoinsReward: 0,
    completed: false,
    repeatable: false,
    requirement: {
      type: 'listings',
      count: 1,
      currentProgress: 0
    }
  },
  {
    id: uuidv4(),
    title: 'Rent an Item',
    description: 'Complete your first rental on OpShare',
    type: 'rental',
    leafReward: 50000,
    treeCoinsReward: 0,
    completed: false,
    repeatable: false,
    requirement: {
      type: 'rentals',
      count: 1,
      currentProgress: 0
    }
  },
  {
    id: uuidv4(),
    title: 'Invite a Friend',
    description: 'Refer a friend to join OpShare',
    type: 'community',
    leafReward: 75000,
    treeCoinsReward: 0,
    completed: false,
    repeatable: true,
    requirement: {
      type: 'referrals',
      count: 1,
      currentProgress: 0
    }
  },
  {
    id: uuidv4(),
    title: 'Complete Your Profile',
    description: 'Fill out all sections of your profile',
    type: 'onboarding',
    leafReward: 25000,
    treeCoinsReward: 0,
    completed: false,
    repeatable: false,
    requirement: {
      type: 'profileSections',
      count: 5,
      currentProgress: 0
    }
  },
  {
    id: uuidv4(),
    title: 'Share an Item',
    description: 'List an item for others to borrow',
    type: 'sharing',
    leafReward: 30000,
    treeCoinsReward: 0,
    completed: false,
    repeatable: false,
    requirement: {
      type: 'listingsShared',
      count: 1,
      currentProgress: 0
    }
  },
  {
    id: uuidv4(),
    title: 'Sustainability Champion',
    description: 'Rent out 5 items to help reduce consumption',
    type: 'sustainability',
    leafReward: 2000,
    treeCoinsReward: 20,
    completed: false,
    repeatable: false,
    requirement: {
      type: 'rentalsProvided',
      count: 5,
      currentProgress: 0
    }
  }
];

export const useCreditStore = create<CreditState>()(
  persist(
    (set, get) => ({
      treeCoins: 100, // Starting amount
      leafs: 100,
      ecoScore: 0,
      maxEcoScore: 1000,
      ecoLevel: 1,
      transactions: [],
      missions: defaultMissions,
      
      earnTreeCoins: (amount, description, missionId) => {
        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'earned',
          amount,
          currency: 'treeCoins',
          description,
          timestamp: new Date(),
          relatedMissionId: missionId
        };
        
        set(state => ({
          treeCoins: state.treeCoins + amount,
          ecoScore: Math.min(state.ecoScore + (amount * 5), state.maxEcoScore),
          ecoLevel: Math.floor((state.ecoScore + (amount * 5)) / 200) + 1,
          transactions: [newTransaction, ...state.transactions]
        }));
      },
      
      spendTreeCoins: (amount, description) => {
        const { treeCoins } = get();
        
        if (treeCoins < amount) {
          return false;
        }
        
        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'spent',
          amount,
          currency: 'treeCoins',
          description,
          timestamp: new Date()
        };
        
        set(state => ({
          treeCoins: state.treeCoins - amount,
          transactions: [newTransaction, ...state.transactions]
        }));
        
        return true;
      },
      
      earnLeafs: (amount, description, missionId) => {
        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'earned',
          amount,
          currency: 'leafs',
          description,
          timestamp: new Date(),
          relatedMissionId: missionId
        };
        
        set(state => ({
          leafs: state.leafs + amount,
          ecoScore: Math.min(state.ecoScore + Math.floor(amount / 50), state.maxEcoScore),
          ecoLevel: Math.floor((state.ecoScore + Math.floor(amount / 50)) / 200) + 1,
          transactions: [newTransaction, ...state.transactions]
        }));
      },
      
      convertLeafsToTreeCoins: () => {
        const { leafs } = get();
        const convertibleLeafs = Math.floor(leafs / 1000) * 1000;
        
        if (convertibleLeafs < 1000) {
          return;
        }
        
        const treeCoinsToAdd = convertibleLeafs / 1000;
        
        const newTransaction: Transaction = {
          id: uuidv4(),
          type: 'converted',
          amount: convertibleLeafs,
          currency: 'leafs',
          description: `Converted ${convertibleLeafs} Leafs to ${treeCoinsToAdd} TreeCoins`,
          timestamp: new Date()
        };
        
        set(state => ({
          leafs: state.leafs - convertibleLeafs,
          treeCoins: state.treeCoins + treeCoinsToAdd,
          transactions: [newTransaction, ...state.transactions]
        }));
      },
      
      completeMission: (missionId) => {
        const { missions } = get();
        const mission = missions.find(m => m.id === missionId);
        
        if (!mission || mission.completed) {
          return;
        }
        
        // Mark mission as completed
        set(state => ({
          missions: state.missions.map(m => 
            m.id === missionId ? { ...m, completed: true } : m
          )
        }));
        
        // Award rewards
        if (mission.leafReward > 0) {
          get().earnLeafs(mission.leafReward, `Completed mission: ${mission.title}`, missionId);
        }
        
        if (mission.treeCoinsReward > 0) {
          get().earnTreeCoins(mission.treeCoinsReward, `Completed mission: ${mission.title}`, missionId);
        }
      },
      
      progressMission: (missionId, progressAmount) => {
        const { missions } = get();
        const mission = missions.find(m => m.id === missionId);
        
        if (!mission || mission.completed) {
          return;
        }
        
        const newProgress = Math.min(
          mission.requirement.currentProgress + progressAmount,
          mission.requirement.count
        );
        
        set(state => ({
          missions: state.missions.map(m => 
            m.id === missionId 
              ? { 
                  ...m, 
                  requirement: { 
                    ...m.requirement, 
                    currentProgress: newProgress 
                  } 
                } 
              : m
          )
        }));
        
        // Check if mission is now complete
        if (newProgress >= mission.requirement.count) {
          get().completeMission(missionId);
        }
      },
      
      resetMissionProgress: (missionId) => {
        const { missions } = get();
        const mission = missions.find(m => m.id === missionId);
        
        if (!mission || !mission.repeatable) {
          return;
        }
        
        set(state => ({
          missions: state.missions.map(m => 
            m.id === missionId 
              ? { 
                  ...m, 
                  completed: false,
                  requirement: { 
                    ...m.requirement, 
                    currentProgress: 0 
                  } 
                } 
              : m
          )
        }));
      },
      
      addMission: (mission) => {
        const newMission: Mission = {
          id: uuidv4(),
          title: mission.title,
          description: mission.description,
          type: mission.type,
          leafReward: mission.leafReward,
          treeCoinsReward: mission.treeCoinsReward,
          repeatable: mission.repeatable,
          completed: false,
          requirement: {
            type: mission.requirementType,
            count: mission.requirementCount,
            currentProgress: 0
          }
        };
        
        if (mission.expiresAt) {
          newMission.expiresAt = mission.expiresAt;
        }
        
        set(state => ({
          missions: [...state.missions, newMission]
        }));
      }
    }),
    {
      name: 'opshare-credit-storage'
    }
  )
); 