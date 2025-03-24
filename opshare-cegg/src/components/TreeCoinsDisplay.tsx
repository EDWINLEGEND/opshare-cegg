import React from 'react';
import { useTreeCoinsStore } from '../store/useTreeCoinsStore';
import { Leaf, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Progress } from './ui/progress';
import { useUser } from '../contexts/UserContext';

const TreeCoinsDisplay = () => {
  const { user } = useUser();
  const { getUserBalance, calculateEcoScore } = useTreeCoinsStore();
  
  // If no user is logged in, don't display anything
  if (!user) return null;
  
  const balance = getUserBalance(user.id);
  const ecoScore = calculateEcoScore(user.id);
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="font-medium">{balance}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-sm font-medium">TreeCoins Balance</p>
            <p className="text-xs text-muted-foreground">Earn more by sharing and renting items</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hidden md:flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <Progress value={ecoScore} className="h-full" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="space-y-2">
              <p className="text-sm font-medium">Eco-Friendliness Score: {ecoScore}%</p>
              <p className="text-xs text-muted-foreground">Based on your sustainable actions</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TreeCoinsDisplay; 