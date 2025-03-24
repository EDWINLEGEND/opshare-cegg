import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Leaf, Coins, Award, Target, LineChart } from 'lucide-react';
import { useCreditStore } from '@/stores/useCreditStore';
import { Button } from '@/components/ui/button';
import FinancialAnalysisModal from './FinancialAnalysisModal';

// Mock financial data - replace with actual data when available
const financialData = {
  thisMonth: 255,
  pending: 45,
  lifetime: 450,
  fees: 12.50
};

const EarningsSummary: React.FC = () => {
  const { leafs, treeCoins, ecoScore, maxEcoScore, missions } = useCreditStore();
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  
  // Calculate completed missions
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monetary Earnings Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Monetary Earnings</h2>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={() => setIsFinancialModalOpen(true)}
            >
              <LineChart className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">${financialData.thisMonth}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium">${financialData.pending}</span>
            </div>
            
            <div className="border-t my-2"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Lifetime Earnings</span>
              <span className="font-bold">${financialData.lifetime}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center text-green-600 text-sm mb-1">
                <ArrowUp size={16} className="mr-1" />
                <span>INCOME</span>
              </div>
              <div className="font-bold">${financialData.lifetime}</div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center text-red-600 text-sm mb-1">
                <ArrowDown size={16} className="mr-1" />
                <span>FEES</span>
              </div>
              <div className="font-bold">${financialData.fees}</div>
            </div>
          </div>
        </div>
        
        {/* Credit Earnings Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Credit Earnings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Leaf className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-600">Leaf Balance</span>
              </div>
              <span className="font-medium">{leafs}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Coins className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-gray-600">TreeCoins</span>
              </div>
              <span className="font-medium">{treeCoins.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-gray-600">Eco Score</span>
              </div>
              <span className="font-medium">{Math.round((ecoScore / maxEcoScore) * 100)}%</span>
            </div>
            
            <div className="border-t my-1"></div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-600">Missions Completed</span>
              </div>
              <span className="font-medium">{completedMissions}/{totalMissions}</span>
            </div>
          </div>
          
          <Button
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.location.href = '/missions'}
          >
            <Target className="w-4 h-4 mr-2" />
            View Missions & Rewards
          </Button>
        </div>
      </div>
      {isFinancialModalOpen && (
        <FinancialAnalysisModal
          isOpen={isFinancialModalOpen}
          onClose={() => setIsFinancialModalOpen(false)}
          financialData={financialData}
        />
      )}
    </>
  );
};

export default EarningsSummary; 