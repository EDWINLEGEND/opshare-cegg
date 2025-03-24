import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Download, 
  Users, 
  DollarSign, 
  Leaf, 
  Server
} from 'lucide-react';

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Reports & Analytics</h1>
          
          <Button variant="outline" className="border-gray-300 shadow-sm hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-2 text-gray-600" />
            Export Reports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-5">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">User Analytics</h3>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">New registrations</p>
                  <p className="text-sm font-medium">124</p>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-5">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md mr-3">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Sustainability Impact</h3>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">CO2 saved (kg)</p>
                  <p className="text-sm font-medium">1,250</p>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-1.5 rounded-full w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-5">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md mr-3">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Financial Analytics</h3>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">Revenue (monthly)</p>
                  <p className="text-sm font-medium">$2,580</p>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full w-4/5"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-to-br from-purple-50 to-fuchsia-50">
            <CardContent className="p-5">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md mr-3">
                  <Server className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">System Performance</h3>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">Uptime</p>
                  <p className="text-sm font-medium">99.8%</p>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full w-[99.8%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border border-gray-200/70 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70 pb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-gray-800">Platform Analytics</CardTitle>
                <CardDescription className="text-gray-600">View comprehensive reports and metrics about platform activity</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Analytics dashboard will be implemented here. Features will include:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  User Engagement Metrics
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  <li className="pl-1">Daily active users</li>
                  <li className="pl-1">Retention rates</li>
                  <li className="pl-1">Session duration</li>
                  <li className="pl-1">Feature usage statistics</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-amber-600" />
                  Transaction Trends
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  <li className="pl-1">Transaction volume by category</li>
                  <li className="pl-1">Average order value</li>
                  <li className="pl-1">Commission analytics</li>
                  <li className="pl-1">Payment method distribution</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Leaf className="h-4 w-4 mr-2 text-green-600" />
                  Sustainability Impact Reports
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  <li className="pl-1">Carbon footprint reduction</li>
                  <li className="pl-1">Resource sharing impact</li>
                  <li className="pl-1">Community sustainability score</li>
                  <li className="pl-1">Environmental benchmarks</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Server className="h-4 w-4 mr-2 text-purple-600" />
                  System Performance Logs
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  <li className="pl-1">Server response times</li>
                  <li className="pl-1">Error rate tracking</li>
                  <li className="pl-1">API endpoint usage</li>
                  <li className="pl-1">Resource utilization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports; 