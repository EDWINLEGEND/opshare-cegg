import React from 'react';
import { Leaf, Coins, TrendingUp } from 'lucide-react';
import { useCreditStore } from '@/stores/useCreditStore';

const NavbarCredits = () => {
  const { leafs, treeCoins } = useCreditStore();
  
  // Mock financial data - replace with actual data when available
  const financialEarnings = 0.00;
  
  return (
    <div className="flex items-center gap-2">
      {/* Leaf credits */}
      <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
        <Leaf className="w-4 h-4 mr-1.5" />
        <span className="font-medium">{leafs}</span>
      </div>
      
      {/* Financial earnings */}
      <div className="flex items-center bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
        <Coins className="w-4 h-4 mr-1.5" />
        <span className="font-medium">{financialEarnings.toFixed(2)}</span>
      </div>
      
      {/* Growth indicator */}
      <div className="flex items-center text-green-600">
        <TrendingUp className="w-4 h-4" />
        <div className="ml-1 w-16 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${(treeCoins / 200) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCredits; 