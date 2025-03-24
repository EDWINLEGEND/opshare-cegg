import React from 'react';
import { Leaf, Coins } from 'lucide-react';
import { useCreditStore } from '@/stores/useCreditStore';

const RewardsInfo: React.FC = () => {
  const { leafs, treeCoins } = useCreditStore();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">How Our Rewards Work</h2>
      
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <div className="bg-gray-50 py-2 px-4 rounded-lg">
          <span className="font-medium">1 Credit</span>
        </div>
        
        <span className="text-gray-500 font-medium">=</span>
        
        <div className="bg-green-50 py-2 px-4 rounded-lg flex items-center">
          <Leaf className="w-4 h-4 text-green-500 mr-2" />
          <span className="font-medium">1 Leaf</span>
        </div>
        
        <span className="text-gray-500 font-medium">=</span>
        
        <div className="bg-amber-50 py-2 px-4 rounded-lg flex items-center">
          <Coins className="w-4 h-4 text-amber-500 mr-2" />
          <span className="font-medium">0.001 TreeCoin</span>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-gray-700">Your balance:</p>
        <p className="text-xl font-bold">
          {leafs} Leafs = {treeCoins.toFixed(2)} TreeCoins
        </p>
      </div>
    </div>
  );
};

export default RewardsInfo; 