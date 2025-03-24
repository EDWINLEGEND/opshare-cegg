import React from 'react';
import { Mission } from '@/stores/useCreditStore';
import { Progress } from '@/components/ui/progress';
import { Coins, Leaf, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const progress = mission.requirement.currentProgress / mission.requirement.count * 100;
  
  return (
    <div className={cn(
      "bg-white border rounded-lg p-4 transition-all",
      mission.completed ? "border-green-200 bg-green-50" : "border-gray-200 hover:border-gray-300"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium flex items-center">
            {mission.completed && (
              <Check className="mr-2 h-4 w-4 text-green-500" />
            )}
            {mission.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
        </div>
        <div className="flex flex-col items-end">
          {mission.leafReward > 0 && (
            <div className="flex items-center text-sm font-medium text-green-600">
              <span className="mr-1">+{mission.leafReward}</span>
              <Leaf size={16} />
            </div>
          )}
          {mission.treeCoinsReward > 0 && (
            <div className="flex items-center text-sm font-medium text-amber-600">
              <span className="mr-1">+{mission.treeCoinsReward}</span>
              <Coins size={16} />
            </div>
          )}
        </div>
      </div>
      
      {!mission.completed && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{mission.requirement.currentProgress}/{mission.requirement.count}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default MissionCard; 