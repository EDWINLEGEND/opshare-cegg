import React from 'react';
import { Transaction } from '@/stores/useCreditStore';
import { Coins, Leaf, ArrowRight, ArrowLeft, RotateCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  transactions: Transaction[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activity yet. Start using OpShare to earn credits!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            transaction.type === 'earned' 
              ? 'bg-green-100 text-green-600' 
              : transaction.type === 'spent'
                ? 'bg-red-100 text-red-600'
                : 'bg-blue-100 text-blue-600'
          }`}>
            {transaction.type === 'earned' && transaction.currency === 'treeCoins' && <Coins size={18} />}
            {transaction.type === 'earned' && transaction.currency === 'leafs' && <Leaf size={18} />}
            {transaction.type === 'spent' && <ArrowLeft size={18} />}
            {transaction.type === 'converted' && <RotateCw size={18} />}
          </div>
          
          <div className="flex-1">
            <div className="font-medium">
              {transaction.description}
            </div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true })}
            </div>
          </div>
          
          <div className={`font-bold ${
            transaction.type === 'earned' 
              ? 'text-green-600' 
              : transaction.type === 'spent'
                ? 'text-red-600'
                : 'text-blue-600'
          } flex items-center`}>
            {transaction.type === 'earned' && '+'}
            {transaction.type === 'spent' && '-'}
            {transaction.amount} 
            {transaction.currency === 'treeCoins' 
              ? <Coins size={16} className="ml-1 text-amber-500" /> 
              : <Leaf size={16} className="ml-1 text-green-500" />
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed; 