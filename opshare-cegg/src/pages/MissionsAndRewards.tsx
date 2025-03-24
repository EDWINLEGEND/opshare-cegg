import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreditStore } from '@/stores/useCreditStore';
import { 
  Leaf, Coins, Award, Target, CheckCircle, Clock, 
  Users, BarChart, ShoppingBag, Recycle, Star, 
  TrendingUp, Medal, Gift, Info, ArrowRight, Sparkles
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend 
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
    <div className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-emerald-700 pb-12 overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Missions & Rewards</h1>
            <p className="text-green-100 text-lg max-w-2xl">Complete missions to earn Leafs and make a positive environmental impact.</p>
          </div>
          <Badge className="bg-white/20 text-white backdrop-blur-sm px-4 py-2 text-sm font-medium border border-white/10">
            <Sparkles className="h-4 w-4 mr-1 text-yellow-300" /> Impact Program
          </Badge>
        </div>
        
        {/* Credit Summary Card */}
        <Card className="mb-8 bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 z-0"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] group">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg mr-4 group-hover:rotate-6 transition-transform">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100 font-medium">Leaf Balance</p>
                  <p className="text-2xl font-bold text-white">{leafs}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] group">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-lg mr-4 group-hover:rotate-6 transition-transform">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100 font-medium">TreeCoins</p>
                  <p className="text-2xl font-bold text-white">{treeCoins.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] group">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg mr-4 group-hover:rotate-6 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100 font-medium">Missions Completed</p>
                  <p className="text-2xl font-bold text-white">{completedMissions}/{missions.length}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] group">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg mr-4 group-hover:rotate-6 transition-transform">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100 font-medium">Eco Score</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xl font-bold text-white mr-2">{ecoScore}/{maxEcoScore}</p>
                    <Badge className="bg-blue-500/30 hover:bg-blue-500/40 text-white border border-blue-400/30">Level {currentEcoLevel}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Eco Level Progress Dashboard */}
        <Card className="mb-8 bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 z-0"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center text-white">
              <div className="h-9 w-9 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg mr-3">
                <Award className="h-5 w-5 text-white" />
              </div>
              Eco Level Progression
            </CardTitle>
            <CardDescription className="text-purple-100">
              Your sustainability journey and impact level
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentLevel.title}</h3>
                    <div className="flex items-center mt-1">
                      <Badge className="bg-purple-500/30 hover:bg-purple-500/40 text-white border border-purple-400/30 mr-2">Level {currentEcoLevel}</Badge>
                      <span className="text-purple-100 text-sm">{ecoScore} points</span>
                    </div>
                  </div>
                  {nextLevel && (
                    <div className="text-right">
                      <p className="text-sm text-purple-100">Next Level</p>
                      <p className="font-medium text-white">{nextLevel.title}</p>
                    </div>
                  )}
                </div>
                
                <div className="relative h-3 bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm mb-2 border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${levelProgress}%`, transition: 'width 1s ease-in-out' }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/30 opacity-50"></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-purple-100 mb-8">
                  <span>Current</span>
                  {nextLevel && <span>{nextLevel.min - ecoScore} points needed for next level</span>}
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h4 className="font-medium text-white mb-4 flex items-center">
                    <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
                    Current Level Benefits
                  </h4>
                  <ul className="space-y-3">
                    {currentLevel.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start bg-white/5 p-3 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-50">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {nextLevel && (
                    <div className="mt-6 pt-6 border-t border-purple-500/20">
                      <h4 className="font-medium text-white mb-4 flex items-center">
                        <Clock className="h-4 w-4 text-yellow-300 mr-2" />
                        Next Level Unlocks
                      </h4>
                      <ul className="space-y-3">
                        {nextLevel.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start bg-white/5 p-3 rounded-lg">
                            <Clock className="h-5 w-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-purple-200">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-[350px] relative flex items-center justify-center">
                <div className="absolute -inset-4">
                  <div className="w-full h-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-30 animate-pulse" 
                      style={{ animationDuration: '4s' }}></div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="20%" 
                    outerRadius="80%" 
                    data={levelChartData} 
                    startAngle={180} 
                    endAngle={0}
                    barSize={12}
                  >
                    <RadialBar
                      background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                    />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '8px', padding: '8px 12px' }} />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl font-extrabold fill-white"
                    >
                      Level {currentEcoLevel}
                    </text>
                    <text
                      x="50%"
                      y="58%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm fill-purple-200"
                    >
                      {currentLevel.title}
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mission Categories and Tabs */}
        <Card className="mb-8 bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 z-0"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center text-white">
              <div className="h-9 w-9 flex items-center justify-center bg-gradient-to-br from-green-400 to-teal-500 rounded-full shadow-lg mr-3">
                <Target className="h-5 w-5 text-white" />
              </div>
              Available Missions
            </CardTitle>
            <CardDescription className="text-green-100">
              Complete these missions to earn rewards and increase your impact
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="rounded-lg bg-white/5 p-1 mb-6 backdrop-blur-sm border border-white/10">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-6 gap-1 bg-transparent h-auto">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setActiveCategory(null)}
                    className="py-2.5 data-[state=active]:bg-white/15 data-[state=active]:text-white text-green-100 hover:text-white"
                  >
                    All Missions
                  </TabsTrigger>
                  {Object.entries(MISSION_CATEGORIES).map(([key, { name, icon }]) => (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      onClick={() => setActiveCategory(key)}
                      className="flex items-center py-2.5 data-[state=active]:bg-white/15 data-[state=active]:text-white text-green-100 hover:text-white"
                    >
                      <span className="mr-1.5">{icon}</span>
                      <span className="hidden md:inline">{name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <ScrollArea className="h-[520px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredMissions.map(mission => (
                      <div 
                        key={mission.id}
                        className={`relative group overflow-hidden backdrop-blur-sm rounded-xl border cursor-pointer transition-all hover:shadow-lg hover:shadow-green-600/10 hover:translate-y-[-2px] ${
                          mission.completed ? 'bg-green-500/10 border-green-400/30' : 'bg-white/5 border-white/10'
                        }`}
                        onClick={() => handleMissionClick(mission)}
                      >
                        <div className="p-5">
                          <div className="flex justify-between">
                            <h3 className="font-medium flex items-center text-white">
                              {mission.completed ? (
                                <div className="h-7 w-7 flex items-center justify-center bg-green-500/20 rounded-full mr-2.5">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                              ) : (
                                <div className="h-7 w-7 flex items-center justify-center bg-white/10 rounded-full mr-2.5">
                                  {MISSION_CATEGORIES[mission.type]?.icon}
                                </div>
                              )}
                              {mission.title}
                            </h3>
                            <div className="flex space-x-1.5">
                              {mission.leafReward > 0 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge className="bg-green-500/30 text-white group-hover:bg-green-500/40 border-green-400/30 flex items-center">
                                        <Leaf className="h-3 w-3 mr-1" />
                                        {mission.leafReward}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black/80 text-white border-green-500/20">
                                      <p>Earn {mission.leafReward} Leafs</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {mission.treeCoinsReward > 0 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge className="bg-amber-500/30 text-white group-hover:bg-amber-500/40 border-amber-400/30 flex items-center">
                                        <Coins className="h-3 w-3 mr-1" />
                                        {mission.treeCoinsReward}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black/80 text-white border-amber-500/20">
                                      <p>Earn {mission.treeCoinsReward} TreeCoins</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-green-100 mt-2 mb-3">{mission.description}</p>
                          
                          {!mission.completed && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-green-200">Progress</span>
                                <span className="text-green-200 font-medium">
                                  {mission.requirement.currentProgress}/{mission.requirement.count}
                                </span>
                              </div>
                              <div className="relative h-2 bg-green-900/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                  style={{ width: `${(mission.requirement.currentProgress / mission.requirement.count) * 100}%` }}
                                >
                                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/30 opacity-50"></div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {mission.completed && (
                            <div className="flex items-center mt-3 text-xs text-green-300">
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                              Completed
                            </div>
                          )}
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              {/* Render content for each category */}
              {Object.keys(MISSION_CATEGORIES).map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <ScrollArea className="h-[520px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {missions
                        .filter(mission => mission.type === category)
                        .map(mission => (
                          <div 
                            key={mission.id}
                            className={`relative group overflow-hidden backdrop-blur-sm rounded-xl border cursor-pointer transition-all hover:shadow-lg hover:shadow-green-600/10 hover:translate-y-[-2px] ${
                              mission.completed ? 'bg-green-500/10 border-green-400/30' : 'bg-white/5 border-white/10'
                            }`}
                            onClick={() => handleMissionClick(mission)}
                          >
                            <div className="p-5">
                              <div className="flex justify-between">
                                <h3 className="font-medium flex items-center text-white">
                                  {mission.completed ? (
                                    <div className="h-7 w-7 flex items-center justify-center bg-green-500/20 rounded-full mr-2.5">
                                      <CheckCircle className="h-4 w-4 text-green-400" />
                                    </div>
                                  ) : (
                                    <div className="h-7 w-7 flex items-center justify-center bg-white/10 rounded-full mr-2.5">
                                      {MISSION_CATEGORIES[mission.type]?.icon}
                                    </div>
                                  )}
                                  {mission.title}
                                </h3>
                                <div className="flex space-x-1.5">
                                  {mission.leafReward > 0 && (
                                    <Badge className="bg-green-500/30 text-white group-hover:bg-green-500/40 border-green-400/30 flex items-center">
                                      <Leaf className="h-3 w-3 mr-1" />
                                      {mission.leafReward}
                                    </Badge>
                                  )}
                                  {mission.treeCoinsReward > 0 && (
                                    <Badge className="bg-amber-500/30 text-white group-hover:bg-amber-500/40 border-amber-400/30 flex items-center">
                                      <Coins className="h-3 w-3 mr-1" />
                                      {mission.treeCoinsReward}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-green-100 mt-2 mb-3">{mission.description}</p>
                              
                              {!mission.completed && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-green-200">Progress</span>
                                    <span className="text-green-200 font-medium">
                                      {mission.requirement.currentProgress}/{mission.requirement.count}
                                    </span>
                                  </div>
                                  <div className="relative h-2 bg-green-900/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                    <div 
                                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                      style={{ width: `${(mission.requirement.currentProgress / mission.requirement.count) * 100}%` }}
                                    >
                                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/30 opacity-50"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {mission.completed && (
                                <div className="flex items-center mt-3 text-xs text-green-300">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-400" />
                                  Completed
                                </div>
                              )}
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Statistics and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-teal-500/10 z-0"></div>
            <CardHeader className="relative z-10 border-b border-white/10">
              <CardTitle className="flex items-center text-white">
                <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg mr-2.5">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                Eco Score Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="h-[300px] bg-white/5 p-4 rounded-xl border border-white/10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ecoTrendData}>
                    <defs>
                      <linearGradient id="ecoScoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month"
                      tick={{ fill: '#E2E8F0' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E2E8F0' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      activeDot={{ r: 8, fill: '#10B981', stroke: 'white', strokeWidth: 2 }} 
                      dot={{ r: 4, fill: '#10B981', stroke: 'white', strokeWidth: 2 }}
                      name="Eco Score"
                    />
                    <area type="monotone" dataKey="score" fill="url(#ecoScoreGradient)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/10 z-0"></div>
            <CardHeader className="relative z-10 border-b border-white/10">
              <CardTitle className="flex items-center text-white">
                <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg mr-2.5">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                Mission Completion by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="h-[300px] bg-white/5 p-4 rounded-xl border border-white/10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1 }}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges & Achievements */}
        <Card className="mb-8 bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 z-0"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <CardTitle className="flex items-center text-white">
              <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg mr-2.5">
                <Medal className="h-4 w-4 text-white" />
              </div>
              Your Badges & Achievements
            </CardTitle>
            <CardDescription className="text-amber-100">
              Showcase your environmental impact and contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {completedMissions > 0 ? (
                missions
                  .filter(m => m.completed)
                  .map(mission => (
                    <div key={mission.id} className="flex flex-col items-center group">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-3 shadow-lg shadow-green-600/20 transition-transform group-hover:scale-110">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center animate-pulse" style={{ animationDuration: '3s' }}>
                          <Gift className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-white mb-1">{mission.title}</div>
                        <div className="text-xs text-amber-200 px-3 py-1 rounded-full bg-amber-500/20 inline-block">
                          Completed
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full text-center py-8 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8 text-amber-300" />
                  </div>
                  <p className="text-white font-medium mb-1">No Badges Yet</p>
                  <p className="text-amber-100 text-sm max-w-md mx-auto">Complete missions to earn badges and achievements that showcase your environmental impact!</p>
                  <Button variant="outline" className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Explore Missions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="bg-white/10 border-0 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-500/10 to-gray-600/10 z-0"></div>
          <CardHeader className="relative z-10 border-b border-white/10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-white">
                <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg mr-2.5">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                Recent Transactions
              </CardTitle>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.slice(0, 5).map(transaction => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                      transaction.type === 'earned' 
                        ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
                        : transaction.type === 'spent'
                          ? 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30'
                    }`}>
                      {transaction.currency === 'treeCoins' ? 
                        <Coins size={20} /> : 
                        <Leaf size={20} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{transaction.description}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className={`font-bold px-4 py-1.5 rounded-full ${
                      transaction.type === 'earned' 
                        ? 'bg-green-500/20 text-green-300' 
                        : transaction.type === 'spent'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}
                      {transaction.amount} 
                      <span className="text-xs ml-1">
                        {transaction.currency === 'treeCoins' ? 'TC' : 'L'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-500/20 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-white font-medium mb-1">No Transactions Yet</p>
                <p className="text-gray-300 text-sm max-w-md mx-auto">Complete missions to earn rewards and build your transaction history!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Mission Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedMission && (
          <DialogContent className="sm:max-w-[550px] bg-gradient-to-b from-green-900 to-green-800 border-0 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
            <DialogHeader className="relative z-10">
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-xl mb-4 border-b border-white/10">
                <DialogTitle className="text-xl flex items-center">
                  {selectedMission.completed ? (
                    <div className="h-8 w-8 flex items-center justify-center bg-green-500/20 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 flex items-center justify-center bg-white/10 rounded-full mr-3">
                      {MISSION_CATEGORIES[selectedMission.type]?.icon}
                    </div>
                  )}
                  {selectedMission.title}
                </DialogTitle>
                <DialogDescription className="text-green-100 mt-2">
                  {selectedMission.description}
                </DialogDescription>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <div className="text-sm text-green-100 mb-1">Leaf Reward</div>
                  <div className="font-bold text-xl flex items-center justify-center text-green-300">
                    <div className="h-7 w-7 flex items-center justify-center bg-green-500/20 rounded-full mr-1.5">
                      <Leaf className="h-4 w-4" />
                    </div>
                    {selectedMission.leafReward}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <div className="text-sm text-amber-100 mb-1">TreeCoin Reward</div>
                  <div className="font-bold text-xl flex items-center justify-center text-amber-300">
                    <div className="h-7 w-7 flex items-center justify-center bg-amber-500/20 rounded-full mr-1.5">
                      <Coins className="h-4 w-4" />
                    </div>
                    {selectedMission.treeCoinsReward}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-5 border border-blue-400/20">
                <div className="font-medium text-blue-100 mb-3 flex items-center">
                  <div className="h-7 w-7 flex items-center justify-center bg-blue-500/20 rounded-full mr-2">
                    <Info className="h-4 w-4" />
                  </div>
                  How to Complete
                </div>
                <p className="text-blue-50">
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
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="font-medium text-white mb-3">Mission Progress</div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-green-100">{selectedMission.requirement.currentProgress} of {selectedMission.requirement.count} completed</span>
                    <span className="text-green-300 font-medium">
                      {Math.round((selectedMission.requirement.currentProgress / selectedMission.requirement.count) * 100)}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-green-900/30 rounded-full overflow-hidden backdrop-blur-sm mb-2 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      style={{ width: `${(selectedMission.requirement.currentProgress / selectedMission.requirement.count) * 100}%` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white/30 opacity-50"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedMission.completed && (
                <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-4 flex items-center border border-green-400/20">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Mission completed!</div>
                    <div className="text-sm text-green-200">Rewards have been added to your account</div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="mt-6 relative z-10">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Close
              </Button>
              
              {!selectedMission.completed && (
                <Button 
                  onClick={() => handleProgressMission(selectedMission.id)}
                  disabled={selectedMission.requirement.currentProgress >= selectedMission.requirement.count}
                  className={selectedMission.requirement.currentProgress >= selectedMission.requirement.count
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"}
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