import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTreeCoinsStore, MissionType, TransactionType } from '../store/useTreeCoinsStore';
import { 
  Leaf, 
  TrendingUp, 
  History, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  UserPlus,
  Package,
  ShoppingCart,
  User,
  Share2,
  Calendar,
  Star,
  Users,
  Leaf as LeafIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Map mission types to icons
const missionIcons: Record<MissionType, React.ReactNode> = {
  'SIGNUP': <UserPlus size={20} />,
  'FIRST_LISTING': <Package size={20} />,
  'FIRST_RENTAL': <ShoppingCart size={20} />,
  'COMPLETE_PROFILE': <User size={20} />,
  'SHARE_ITEM': <Share2 size={20} />,
  'RENT_ITEM': <Calendar size={20} />,
  'LEAVE_REVIEW': <Star size={20} />,
  'REFER_FRIEND': <Users size={20} />,
  'WEEKLY_ACTIVE': <Award size={20} />,
  'SUSTAINABLE_CHOICE': <LeafIcon size={20} />,
};

const TreeCoinsPage = () => {
  const { user } = useUser();
  const { 
    getUserBalance, 
    getUserTransactions, 
    missions, 
    getCompletedMissions,
    calculateEcoScore
  } = useTreeCoinsStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // If no user is logged in, redirect or show a message
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your TreeCoins</h1>
        <Button asChild>
          <a href="/signin">Sign In</a>
        </Button>
      </div>
    );
  }
  
  const balance = getUserBalance(user.id);
  const transactions = getUserTransactions(user.id);
  const completedMissions = getCompletedMissions(user.id);
  const ecoScore = calculateEcoScore(user.id);
  
  // Calculate total earned and spent
  const totalEarned = transactions
    .filter(t => t.type === 'EARNED')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalSpent = transactions
    .filter(t => t.type === 'SPENT')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Prepare data for charts
  const prepareChartData = () => {
    // Group transactions by day
    const last30Days = [...Array(30)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });
    
    // Create a map of dates to earned amounts
    const dateToEarned = new Map<string, number>();
    
    // Initialize with 0 for all dates
    last30Days.forEach(date => {
      dateToEarned.set(date, 0);
    });
    
    // Add transaction amounts
    transactions
      .filter(t => t.type === 'EARNED')
      .forEach(t => {
        const date = new Date(t.timestamp).toISOString().split('T')[0];
        if (dateToEarned.has(date)) {
          dateToEarned.set(date, (dateToEarned.get(date) || 0) + t.amount);
        }
      });
    
    // Convert to chart data format
    return last30Days.map(date => ({
      date,
      amount: dateToEarned.get(date) || 0,
    }));
  };
  
  const chartData = prepareChartData();
  
  // Prepare data for pie chart
  const preparePieData = () => {
    const missionCounts: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'EARNED' && t.mission)
      .forEach(t => {
        if (t.mission) {
          missionCounts[t.mission] = (missionCounts[t.mission] || 0) + 1;
        }
      });
    
    return Object.entries(missionCounts).map(([mission, count]) => ({
      name: mission,
      value: count,
    }));
  };
  
  const pieData = preparePieData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  
  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">TreeCoins Dashboard</h1>
          <p className="text-green-100 max-w-2xl">
            Earn TreeCoins by sharing resources and making sustainable choices. Use them to unlock special features and rewards.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-3xl font-bold">{balance}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">TreeCoins to spend</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Eco-Friendliness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-3xl font-bold">{ecoScore}%</div>
              </div>
              <Progress value={ecoScore} className="h-2 mb-2" />
              <p className="text-sm text-gray-500">Based on your sustainable actions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Missions Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-3xl font-bold">{completedMissions.length}/{missions.length}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {missions.length - completedMissions.length} missions remaining
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="eco-score">Eco-Score</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {/* Overview content */}
          </TabsContent>
          <TabsContent value="transactions">
            {/* Transactions content */}
          </TabsContent>
          <TabsContent value="missions">
            {/* Missions content */}
          </TabsContent>
          <TabsContent value="eco-score">
            {/* Eco-Score content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TreeCoinsPage; 