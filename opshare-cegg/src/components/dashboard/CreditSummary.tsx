import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Leaf, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreditSummaryProps {
  treeCoins: number;
  leafs: number;
  onConvert: () => void;
}

const CreditSummary: React.FC<CreditSummaryProps> = ({ treeCoins, leafs, onConvert }) => {
  const convertibleAmount = Math.floor(leafs / 1000);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Coins className="w-5 h-5 mr-2 text-amber-500" />
            Your TreeCoin Wallet
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  TreeCoins represent your sustainability impact. 
                  Earn Leafs through actions and convert them to TreeCoins (1000:1 ratio).
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-green-50 to-amber-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Balance</div>
              <div className="flex items-center text-2xl font-bold">
                <Coins className="mr-2 text-amber-500" />
                {treeCoins}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Leafs</div>
              <div className="flex items-center text-2xl font-bold">
                <Leaf className="mr-2 text-green-500" />
                {leafs}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm mb-2">
            <span className="font-medium">Ready to convert:</span> {convertibleAmount} TreeCoins
          </div>
          <Button 
            onClick={onConvert} 
            disabled={leafs < 1000}
            className="w-full bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600"
          >
            Convert {Math.floor(leafs / 1000) * 1000} Leafs to {convertibleAmount} TreeCoins
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          <p>Conversion rate: 1000 Leafs = 1 TreeCoin</p>
          <p className="mt-1">
            TreeCoins can be used for premium features and represent your environmental impact.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditSummary; 