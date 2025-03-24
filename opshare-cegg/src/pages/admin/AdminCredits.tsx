import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Leaf, Plus, Coins, Award, BarChart3 } from 'lucide-react';

const AdminCredits = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Credit System Management</h1>
          
          <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Create New Mission
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Leaf Credits</p>
                  <div className="text-2xl font-bold text-green-800 mt-1">28,450</div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-1 rounded-full w-2/3"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">TreeCoins Issued</p>
                  <div className="text-2xl font-bold text-amber-800 mt-1">28.45</div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                  <Coins className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-1 rounded-full w-1/2"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Missions</p>
                  <div className="text-2xl font-bold text-blue-800 mt-1">12</div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">+4 new this month</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70 pb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-gray-800">TreeCoin and Leaf Management</CardTitle>
                <CardDescription className="text-gray-600">Monitor and manage the platform's sustainability credit system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Credit management dashboard will be implemented here. Features will include:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
              <li className="pl-2">TreeCoin and Leaf transaction history</li>
              <li className="pl-2">Mission creation and management</li>
              <li className="pl-2">Credit rewards configuration</li>
              <li className="pl-2">Eco Score metrics and adjustments</li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                The credit system is currently in beta phase. New features will be added in upcoming releases.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCredits; 