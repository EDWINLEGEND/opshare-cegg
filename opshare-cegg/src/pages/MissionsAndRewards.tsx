import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreditStore } from '@/stores/useCreditStore';
import { 
  Leaf, Coins, Award, Target, CheckCircle, Clock, 
  Users, BarChart, ShoppingBag, Recycle, Star, 
  TrendingUp, Medal, Gift, Info
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend 
} from 'recharts';

// Define additional mission categories and their icons
const MISSION_CATEGORIES = {
  'onboarding': { name: 'Getting Started', icon: <Target className="h-5 w-5" /> },
  'community': { name: 'Community', icon: <Users className="h-5 w-5" /> },
  'sharing': { name: 'Sharing Economy', icon: <ShoppingBag className="h-5 w-5" /> },
  'sustainability': { name: 'Sustainability', icon: <Recycle className="h-5 w-5" /> },
  'achievements': { name: 'Achievements', icon: <Medal className="h-5 w-5" /> },
};

// Define eco levels with titles and benefits
const ECO_LEVELS = [
  { level: 1, title: "Eco Novice", min: 0, max: 200, benefits: ["Basic profile badge", "Access to community forums"] },
  { level: 2, title: "Eco Enthusiast", min: 200, max: 400, benefits: ["5% discount on platform fees", "Priority customer support"] },
  { level: 3, title: "Eco Explorer", min: 400, max: 600, benefits: ["Featured listing spot (once per month)", "Access to exclusive items"] },
  { level: 4, title: "Eco Advocate", min: 600, max: 800, benefits: ["10% discount on platform fees", "Special profile verification"] },
  { level: 5, title: "Eco Champion", min: 800, max: 1000, benefits: ["15% discount on platform fees", "Premium account features"] },
  { level: 6, title: "Sustainability Hero", min: 1000, max: 1200, benefits: ["Free featured listings", "Eco ambassador status"] },
  { level: 7, title: "Planet Protector", min: 1200, max: 1400, benefits: ["20% discount on platform fees", "Early access to new features"] },
  { level: 8, title: "Climate Guardian", min: 1400, max: 1600, benefits: ["Premium support line", "Community leadership opportunities"] },
  { level: 9, title: "Earth Steward", min: 1600, max: 1800, benefits: ["25% discount on platform fees", "Exclusive eco-events invitations"] },
  { level: 10, title: "Eco Legend", min: 1800, max: 2000, benefits: ["Zero platform fees", "Ultimate sustainability badge"] },
];

// Colors for charts
const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EC4899', '#8B5CF6'];

const MissionsAndRewards: React.FC = () => {
  const { 
    leafs, 
    treeCoins, 
    ecoScore, 
    maxEcoScore, 
    ecoLevel: currentEcoLevel,
    missions, 
    transactions,
    completeMission,
    progressMission
  } = useCreditStore();
  
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter missions by category if one is selected
  const filteredMissions = activeCategory 
    ? missions.filter(mission => mission.type === activeCategory)
    : missions;
  
  // Get completed missions
  const completedMissions = missions.filter(m => m.completed).length;
  const completionPercentage = (completedMissions / missions.length) * 100;
  
  // Get current eco level details
  const currentLevel = ECO_LEVELS.find(level => level.level === currentEcoLevel) || ECO_LEVELS[0];
  const nextLevel = ECO_LEVELS.find(level => level.level === currentEcoLevel + 1);
  
  // Calculate progress to next level
  const levelProgress = nextLevel 
    ? ((ecoScore - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 
    : 100;
  
  // Generate level chart data
  const levelChartData = ECO_LEVELS.slice(0, Math.max(currentEcoLevel + 2, 5)).map(level => ({
    name: `Level ${level.level}`,
    value: level.level <= currentEcoLevel ? 100 : level.level === currentEcoLevel + 1 ? levelProgress : 0,
    fill: level.level < currentEcoLevel ? '#10B981' : level.level === currentEcoLevel ? '#6366F1' : '#E5E7EB'
  }));
  
  // Generate mock eco score trend data
  const ecoTrendData = [
    { month: 'Jan', score: 50 },
    { month: 'Feb', score: 150 },
    { month: 'Mar', score: 220 },
    { month: 'Apr', score: 310 },
    { month: 'May', score: ecoScore },
  ];
  
  // Generate mission category distribution data
  const categoryData = Object.keys(MISSION_CATEGORIES).map(category => {
    const count = missions.filter(m => m.type === category && m.completed).length;
    return {
      name: MISSION_CATEGORIES[category].name,
      value: count > 0 ? count : Math.floor(Math.random() * 5) + 1 // For demo, random if none completed
    };
  });
  
  // Handle mission click to open modal
  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };
  
  // Handle mission progress (simulated for demo)
  const handleProgressMission = (missionId) => {
    progressMission(missionId, 1);
    setIsModalOpen(false);
  };
  
  return (
    <div className="bg-gradient-to-b from-green-600 to-green-700 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Missions & Rewards</h1>
        <p className="text-green-100 mb-8">Complete missions to earn Leafs and make a positive environmental impact.</p>
        
        {/* Credit Summary Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center">
                <Leaf className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Leaf Balance</p>
                  <p className="text-2xl font-bold">{leafs}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Coins className="h-10 w-10 text-amber-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">TreeCoins</p>
                  <p className="text-2xl font-bold">{treeCoins.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Target className="h-10 w-10 text-purple-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Missions Completed</p>
                  <p className="text-2xl font-bold">{completedMissions}/{missions.length}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Award className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Eco Score</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xl font-bold mr-2">{ecoScore}/{maxEcoScore}</p>
                    <Badge className="bg-blue-100 text-blue-700">Level {currentEcoLevel}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Eco Level Progress Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 text-purple-500 mr-2" />
              Eco Level Progression
            </CardTitle>
            <CardDescription>
              Your sustainability journey and impact level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-purple-700">{currentLevel.title}</h3>
                    <p className="text-gray-600">Level {currentEcoLevel}</p>
                  </div>
                  {nextLevel && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next Level</p>
                      <p className="font-medium text-gray-700">{nextLevel.title}</p>
                    </div>
                  )}
                </div>
                
                <Progress 
                  value={levelProgress} 
                  className="h-2.5 mb-4" 
                />
                
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span>{ecoScore} points</span>
                  {nextLevel && <span>{nextLevel.min} points needed</span>}
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-700 mb-2">Current Level Benefits:</h4>
                  <ul className="space-y-2">
                    {currentLevel.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {nextLevel && (
                    <div className="mt-4 pt-4 border-t border-purple-100">
                      <h4 className="font-medium text-purple-700 mb-2">Next Level Unlocks:</h4>
                      <ul className="space-y-2">
                        {nextLevel.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="20%" 
                    outerRadius="80%" 
                    data={levelChartData} 
                    startAngle={180} 
                    endAngle={0}
                  >
                    <RadialBar
                      background
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                    />
                    <Tooltip />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-lg font-bold fill-purple-700"
                    >
                      Level {currentEcoLevel}
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mission Categories and Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 text-green-600 mr-2" />
              Available Missions
            </CardTitle>
            <CardDescription>
              Complete these missions to earn rewards and increase your impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveCategory(null)}
                >
                  All Missions
                </TabsTrigger>
                {Object.entries(MISSION_CATEGORIES).map(([key, { name, icon }]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    onClick={() => setActiveCategory(key)}
                    className="flex items-center"
                  >
                    <span className="mr-2">{icon}</span>
                    <span>{name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMissions.map(mission => (
                    <div 
                      key={mission.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        mission.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                      onClick={() => handleMissionClick(mission)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium flex items-center">
                          {mission.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          )}
                          {mission.title}
                        </h3>
                        <div className="flex">
                          {mission.leafReward > 0 && (
                            <Badge className="mr-1 bg-green-100 text-green-700 flex items-center">
                              <Leaf className="h-3 w-3 mr-1" />
                              {mission.leafReward}
                            </Badge>
                          )}
                          {mission.treeCoinsReward > 0 && (
                            <Badge className="bg-amber-100 text-amber-700 flex items-center">
                              <Coins className="h-3 w-3 mr-1" />
                              {mission.treeCoinsReward}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 mb-3">{mission.description}</p>
                      
                      {!mission.completed && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-500">
                              {mission.requirement.currentProgress}/{mission.requirement.count}
                            </span>
                          </div>
                          <Progress 
                            value={(mission.requirement.currentProgress / mission.requirement.count) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Render content for each category */}
              {Object.keys(MISSION_CATEGORIES).map(category => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missions
                      .filter(mission => mission.type === category)
                      .map(mission => (
                        <div 
                          key={mission.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                            mission.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                          }`}
                          onClick={() => handleMissionClick(mission)}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium flex items-center">
                              {mission.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                              )}
                              {mission.title}
                            </h3>
                            <div className="flex">
                              {mission.leafReward > 0 && (
                                <Badge className="mr-1 bg-green-100 text-green-700 flex items-center">
                                  <Leaf className="h-3 w-3 mr-1" />
                                  {mission.leafReward}
                                </Badge>
                              )}
                              {mission.treeCoinsReward > 0 && (
                                <Badge className="bg-amber-100 text-amber-700 flex items-center">
                                  <Coins className="h-3 w-3 mr-1" />
                                  {mission.treeCoinsReward}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1 mb-3">{mission.description}</p>
                          
                          {!mission.completed && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-gray-500">
                                  {mission.requirement.currentProgress}/{mission.requirement.count}
                                </span>
                              </div>
                              <Progress 
                                value={(mission.requirement.currentProgress / mission.requirement.count) * 100} 
                                className="h-2" 
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Statistics and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                Eco Score Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ecoTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 text-purple-500 mr-2" />
                Mission Completion by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges & Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Medal className="h-6 w-6 text-amber-500 mr-2" />
              Your Badges & Achievements
            </CardTitle>
            <CardDescription>
              Showcase your environmental impact and contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {completedMissions > 0 ? (
                missions
                  .filter(m => m.completed)
                  .map(mission => (
                    <div key={mission.id} className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-2">
                        <Gift className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{mission.title}</div>
                        <div className="text-xs text-gray-500">Completed</div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full text-center py-6 text-gray-500">
                  <Gift className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Complete missions to earn badges and achievements!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                Recent Transactions
              </div>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'earned' 
                        ? 'bg-green-100 text-green-600' 
                        : transaction.type === 'spent'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.currency === 'treeCoins' ? 
                        <Coins size={18} /> : 
                        <Leaf size={18} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'earned' 
                        ? 'text-green-600' 
                        : transaction.type === 'spent'
                          ? 'text-red-600'
                          : 'text-blue-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}
                      {transaction.amount} 
                      {transaction.currency === 'treeCoins' ? 'TreeCoins' : 'Leafs'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions yet. Complete missions to earn rewards!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Mission Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedMission && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                {selectedMission.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                )}
                {selectedMission.title}
              </DialogTitle>
              <DialogDescription>
                {selectedMission.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600">Leaf Reward</div>
                  <div className="font-bold text-xl flex items-center justify-center text-green-600">
                    <Leaf className="h-5 w-5 mr-1" />
                    {selectedMission.leafReward}
                  </div>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600">TreeCoin Reward</div>
                  <div className="font-bold text-xl flex items-center justify-center text-amber-600">
                    <Coins className="h-5 w-5 mr-1" />
                    {selectedMission.treeCoinsReward}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="font-medium text-blue-700 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  How to Complete
                </div>
                <p className="text-sm text-gray-700">
                  {selectedMission.requirement.type === 'listings' && 
                    "Create a listing for an item you're willing to share or rent out."}
                  {selectedMission.requirement.type === 'rentals' && 
                    "Complete a rental transaction as either a renter or provider."}
                  {selectedMission.requirement.type === 'referrals' && 
                    "Invite a friend to join OpShare using your referral link."}
                  {selectedMission.requirement.type === 'profileSections' && 
                    "Fill out all required sections in your user profile."}
                  {selectedMission.requirement.type === 'rentalsProvided' && 
                    "Provide items for others to rent, helping reduce consumption."}
                </p>
              </div>
              
              {!selectedMission.completed && (
                <div>
                  <div className="font-medium mb-2">Progress</div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{selectedMission.requirement.currentProgress} of {selectedMission.requirement.count} completed</span>
                    <span className="text-gray-500">
                      {Math.round((selectedMission.requirement.currentProgress / selectedMission.requirement.count) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(selectedMission.requirement.currentProgress / selectedMission.requirement.count) * 100} 
                    className="h-2.5" 
                  />
                </div>
              )}
              
              {selectedMission.completed && (
                <div className="bg-green-50 p-3 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-700">Mission completed! Rewards earned.</span>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              
              {!selectedMission.completed && (
                <Button 
                  onClick={() => handleProgressMission(selectedMission.id)}
                  disabled={selectedMission.requirement.currentProgress >= selectedMission.requirement.count}
                >
                  {selectedMission.requirement.currentProgress >= selectedMission.requirement.count 
                    ? 'Complete Mission' 
                    : 'Make Progress'}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MissionsAndRewards; 