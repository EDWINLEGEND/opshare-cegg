import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../contexts/UserContext';
import { ShoppingBag, Package, Clock, CheckCircle, AlertCircle, Plus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useCreditStore, Mission, MissionType } from "@/stores/useCreditStore";
import { 
  Coins, Leaf, DollarSign, TrendingUp, 
  BarChart4, ListChecks, Award, Check, Clock
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import MissionCard from "@/components/dashboard/MissionCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserListings from "@/components/dashboard/UserListings";
import CreditSummary from "@/components/dashboard/CreditSummary";

const Dashboard = () => {
  const { user } = useUser();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { 
    treeCoins, 
    leafs, 
    ecoScore, 
    maxEcoScore,
    ecoLevel,
    missions,
    transactions,
    convertLeafsToTreeCoins 
  } = useCreditStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [missionFilter, setMissionFilter] = useState<MissionType | 'all'>('all');

  // Add effect to check if user is loaded
  useEffect(() => {
    // Log user details for debugging
    console.log('Dashboard - User state:', { 
      isAuthenticated: !!user,
      id: user?.id, 
      email: user?.email,
      tokenExists: !!user?.token
    });
    setIsLoadingUser(false);
  }, [user]);

  // For demo purposes: Mock financial data
  const financialData = {
    earnings: 320.50,
    pendingPayments: 75.25,
    totalRentals: 12,
    completedTransactions: 15,
  };

  // Generate mock eco trend data for charts
  const ecoTrendData = Array(7).fill(0).map((_, i) => ({
    day: i,
    score: Math.floor(Math.random() * 100) + 50
  }));

  // Filter active missions (not completed)
  const activeMissions = missions.filter(m => !m.completed);
  
  // Filter missions by type for the mission tabs
  const filterMissionsByType = (type: MissionType | 'all') => {
    return type === 'all' 
      ? missions 
      : missions.filter(m => m.type === type);
  };

  const handleConvertLeafs = () => {
    const convertibleLeafs = Math.floor(leafs / 1000) * 1000;
    if (convertibleLeafs >= 1000) {
      convertLeafsToTreeCoins();
      toast({
        title: "Conversion Successful!",
        description: `Converted ${convertibleLeafs} Leafs to ${convertibleLeafs/1000} TreeCoins`,
        variant: "default",
      });
    } else {
      toast({
        title: "Cannot Convert Leafs",
        description: "You need at least 1000 Leafs to convert to TreeCoins",
        variant: "destructive",
      });
    }
  };

  // Calculate stats
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  const missionCompletionPercentage = Math.round((completedMissions / totalMissions) * 100);
  
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Dashboard header */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-600 pb-5 mb-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="pt-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-green-100">
                  Welcome back, {user?.name || 'User'}! Track your items, performance, and impact.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link to="/sell">
                  <Button className="bg-white text-green-700 hover:bg-green-50 shadow-md flex items-center">
                    <Plus size={16} className="mr-2" />
                    List New Item
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-10">
          {/* LeafPoints Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white rounded-xl z-0"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Leaf Balance</p>
                  <h3 className="text-3xl font-bold text-gray-900">{leafs}</h3>
                  <p className="text-sm text-gray-500 mt-1">Earn by completing missions</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-400 rounded-full shadow-md flex items-center justify-center text-white">
                  <Leaf className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => convertLeafsToTreeCoins(100)}
                  disabled={leafs < 100}
                  className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
                >
                  Convert to TreeCoins 
                  <TrendingUp className="h-3 w-3 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
          
          {/* TreeCoins Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-xl z-0"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">TreeCoins</p>
                  <h3 className="text-3xl font-bold text-gray-900">{treeCoins.toFixed(2)}</h3>
                  <p className="text-sm text-gray-500 mt-1">Digital currency for the platform</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-full shadow-md flex items-center justify-center text-white">
                  <Coins className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/transactions" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center">
                  View Transactions
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Eco Score Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl z-0"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Eco Score</p>
                  <h3 className="text-3xl font-bold text-gray-900">{ecoScore}</h3>
                  <p className="text-sm text-gray-500 mt-1">Level {ecoLevel} Eco User</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-md flex items-center justify-center text-white">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(ecoScore / maxEcoScore) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">{Math.round((ecoScore / maxEcoScore) * 100)}% to next level</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Missions Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white rounded-xl z-0"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Missions</p>
                  <h3 className="text-3xl font-bold text-gray-900">{completedMissions}/{totalMissions}</h3>
                  <p className="text-sm text-gray-500 mt-1">Completed</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full shadow-md flex items-center justify-center text-white">
                  <ListChecks className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${missionCompletionPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{missionCompletionPercentage}% complete</p>
                  <Link to="/missions" className="text-xs text-purple-600 hover:text-purple-700">View All</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Keep the rest of the original dashboard UI below */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white rounded-lg shadow-sm p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-md">
              Your Listings
            </TabsTrigger>
            <TabsTrigger value="rentals" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-md">
              Your Rentals
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-md">
              Impact
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Listings & Activity */}
              <div className="md:col-span-2 space-y-6">
                {/* Earnings Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                        Financial Earnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">${financialData.earnings.toFixed(2)}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        ${financialData.pendingPayments.toFixed(2)} pending payments
                      </div>
                      <div className="flex items-center mt-4 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+12% from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-500" />
                        Sustainability Earnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Coins className="text-amber-500" />
                        <div className="text-3xl font-bold">{treeCoins}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <Leaf className="w-4 h-4 mr-1 text-green-500" />
                        <span>{leafs} Leafs accumulated</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="font-medium">Eco Score</span>
                          <span>{ecoScore}/{maxEcoScore}</span>
                        </div>
                        <Progress value={(ecoScore / maxEcoScore) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* User Listings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Listings</CardTitle>
                    <CardDescription>
                      Manage your active items and view their performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserListings status="active" />
                  </CardContent>
                </Card>
                
                {/* Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest transactions and platform activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityFeed transactions={transactions.slice(0, 10)} />
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column: Stats & Missions */}
              <div className="space-y-6">
                {/* Eco Score Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-500" />
                      Eco Impact Level {ecoLevel}
                    </CardTitle>
                    <CardDescription>
                      Your sustainability journey progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium">Level Progress</span>
                        <span>{ecoScore % 200}/{200}</span>
                      </div>
                      <Progress 
                        value={((ecoScore % 200) / 200) * 100} 
                        className="h-2.5 bg-gray-100" 
                      />
                    </div>
                    
                    <div className="text-center my-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-700 text-xl font-bold">
                        {ecoLevel}
                      </div>
                      <div className="mt-2 font-medium">
                        {getEcoLevelTitle(ecoLevel)}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-2">
                      Reach level {ecoLevel + 1} to unlock new rewards and features.
                    </div>
                  </CardContent>
                </Card>
                
                {/* Active Missions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ListChecks className="w-5 h-5 mr-2 text-blue-500" />
                      Active Missions
                    </CardTitle>
                    <CardDescription>
                      Complete missions to earn Leafs and TreeCoins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {activeMissions.length > 0 ? (
                          activeMissions.slice(0, 3).map(mission => (
                            <MissionCard key={mission.id} mission={mission} />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            All missions completed! Check back soon for more.
                          </div>
                        )}
                      </div>
                      
                      {activeMissions.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setActiveTab("missions")}
                        >
                          View All Missions
                        </Button>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                {/* Credit Summary */}
                <CreditSummary 
                  treeCoins={treeCoins} 
                  leafs={leafs} 
                  onConvert={handleConvertLeafs} 
                />
              </div>
            </div>
            
            {/* Eco Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Your Eco Impact Trend</CardTitle>
                <CardDescription>
                  Watch your sustainability score grow over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ecoTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Mission Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => setMissionFilter('all')}
                      >
                        <ListChecks className="mr-2 h-4 w-4" />
                        All Missions
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => setMissionFilter('rental')}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Rental Missions
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => setMissionFilter('listing')}
                      >
                        <ListChecks className="mr-2 h-4 w-4" />
                        Listing Missions
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => setMissionFilter('referral')}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Referral Missions
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => setMissionFilter('sustainability')}
                      >
                        <Leaf className="mr-2 h-4 w-4" />
                        Sustainability Missions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Missions</CardTitle>
                    <CardDescription>
                      Complete missions to earn rewards and increase your impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterMissionsByType(missionFilter).map(mission => (
                        <MissionCard key={mission.id} mission={mission} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Breakdown</CardTitle>
                    <CardDescription>
                      Your financial and sustainability earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Financial Earnings Section */}
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                          Financial Earnings
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm text-blue-600">Total Earned</div>
                            <div className="text-2xl font-bold">${financialData.earnings.toFixed(2)}</div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm text-blue-600">Pending</div>
                            <div className="text-2xl font-bold">${financialData.pendingPayments.toFixed(2)}</div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm text-blue-600">Transactions</div>
                            <div className="text-2xl font-bold">{financialData.completedTransactions}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sustainability Earnings Section */}
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <Leaf className="w-5 h-5 mr-2 text-green-500" />
                          Sustainability Earnings
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-sm text-green-600">TreeCoins</div>
                            <div className="text-2xl font-bold flex items-center">
                              <Coins className="w-5 h-5 mr-1 text-amber-500" />
                              {treeCoins}
                            </div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-sm text-green-600">Leafs</div>
                            <div className="text-2xl font-bold flex items-center">
                              <Leaf className="w-5 h-5 mr-1 text-green-500" />
                              {leafs}
                            </div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-sm text-green-600">Eco Level</div>
                            <div className="text-2xl font-bold flex items-center">
                              <Award className="w-5 h-5 mr-1 text-purple-500" />
                              {ecoLevel}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Transactions Chart */}
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Earnings Over Time</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={generateMockEarningsData()}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="financial" 
                                name="Financial ($)"
                                stroke="#3b82f6" 
                                strokeWidth={2}
                              />
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="treeCoins" 
                                name="TreeCoins"
                                stroke="#f59e0b" 
                                strokeWidth={2}
                              />
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="leafs" 
                                name="Leafs"
                                stroke="#10b981" 
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {/* Distribution Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Distribution</CardTitle>
                    <CardDescription>
                      How you've earned credits by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Listings', value: 40 },
                              { name: 'Rentals', value: 25 },
                              { name: 'Referrals', value: 15 },
                              { name: 'Missions', value: 20 }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#8b5cf6" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Listings (40%)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Rentals (25%)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span>Referrals (15%)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span>Missions (20%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Earnings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {transactions
                          .filter(t => t.type === 'earned')
                          .slice(0, 8)
                          .map(transaction => (
                            <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-medium flex items-center">
                                  {transaction.currency === 'treeCoins' ? (
                                    <Coins className="w-4 h-4 mr-2 text-amber-500" />
                                  ) : (
                                    <Leaf className="w-4 h-4 mr-2 text-green-500" />
                                  )}
                                  {transaction.description}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(transaction.timestamp).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Listing card component
const ListingCard = ({ listing }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 h-40 sm:h-auto">
          <img 
            src={listing.image} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 sm:p-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
              <p className="text-green-600 font-medium mt-1">
                ${listing.price}/{listing.rentalPeriod}
              </p>
            </div>
            <div>
              {getStatusBadge(listing.status)}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{listing.views}</span> views
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">{listing.requests}</span> requests
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Link 
              to={`/dashboard/edit/${listing.id}`}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Edit
            </Link>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              View Requests
            </button>
            {listing.status === 'active' && (
              <button className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                Deactivate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 