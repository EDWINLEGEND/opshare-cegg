import React from 'react';
import { Leaf, Coins, TrendingUp } from 'lucide-react';
import { useCreditStore } from '@/stores/useCreditStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const NavbarCredits = () => {
  const { leafs, treeCoins } = useCreditStore();
  
  // Mock financial data - replace with actual data when available
  const financialEarnings = 0.00;
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {/* Leaf credits */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-600 px-3 py-1.5 rounded-full border border-green-200 shadow-sm hover:shadow-md transition-all cursor-help">
              <Leaf className="w-4 h-4 mr-1.5" />
              <span className="font-medium">{leafs.toLocaleString()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Leaf Credits: Earn by completing eco-missions</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Tree Coins */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 text-amber-600 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm hover:shadow-md transition-all cursor-help">
              <Coins className="w-4 h-4 mr-1.5" />
              <span className="font-medium">{treeCoins.toLocaleString()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>TreeCoins: Platform currency for transactions</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Growth indicator */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-green-600 ml-1 cursor-help">
              <TrendingUp className="w-4 h-4" />
              <div className="ml-1.5 w-16">
                <Progress 
                  value={(treeCoins / 200) * 100} 
                  className="h-2 bg-gray-100" 
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eco Impact Growth: {Math.round((treeCoins / 200) * 100)}%</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default NavbarCredits; 