import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  BarChart4, Users, ShoppingBag, DollarSign, Shield, 
  Flag, Award, Settings, Search, Filter, ArrowUpDown, 
  CheckCircle, XCircle, AlertTriangle, Edit, Trash2,
  Eye, Clock, Leaf, Coins, ThumbsUp, AlertCircle,
  Download, FileText, Send, Bell
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data
  const stats = {
    totalUsers: 1248,
    activeListings: 856,
    pendingApprovals: 24,
    reportedContent: 7,
    totalTransactions: 432,
    platformFees: 5245.50
  };
  
  // Mock users data
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@opshare.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'Banned' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'User', status: 'Active' },
  ];

  // Mock listings data
  const listings = [
    { id: 1, name: 'Power Drill - Professional Grade', owner: 'John Smith', category: 'Tools', price: 15.00, status: 'Active', views: 42, requests: 3 },
    { id: 2, name: 'Mountain Bike - Trek 820', owner: 'Emily Davis', category: 'Outdoor', price: 25.00, status: 'Active', views: 38, requests: 5 },
    { id: 3, name: 'DSLR Camera Kit', owner: 'Michael Brown', category: 'Electronics', price: 35.00, status: 'Inactive', views: 12, requests: 0 },
    { id: 4, name: 'Stand Mixer - KitchenAid', owner: 'Robert Wilson', category: 'Kitchen', price: 20.00, status: 'Active', views: 29, requests: 2 },
    { id: 5, name: 'Camping Tent - 4 Person', owner: 'Emily Davis', category: 'Outdoor', price: 30.00, status: 'Active', views: 47, requests: 4 },
  ];

  // Mock transactions data
  const transactions = [
    { id: 1, date: '2023-05-15', seller: 'John Smith', buyer: 'Emily Davis', item: 'Power Drill', amount: 25.00, status: 'Completed', fee: 2.50 },
    { id: 2, date: '2023-05-18', seller: 'Emily Davis', buyer: 'Robert Wilson', item: 'Mountain Bike', amount: 45.00, status: 'Completed', fee: 4.50 },
    { id: 3, date: '2023-05-20', seller: 'Michael Brown', buyer: 'John Smith', item: 'DSLR Camera', amount: 60.00, status: 'Disputed', fee: 6.00 },
    { id: 4, date: '2023-05-22', seller: 'Robert Wilson', buyer: 'Emily Davis', item: 'Stand Mixer', amount: 30.00, status: 'Pending', fee: 3.00 },
    { id: 5, date: '2023-05-25', seller: 'Emily Davis', buyer: 'Michael Brown', item: 'Camping Tent', amount: 40.00, status: 'Completed', fee: 4.00 },
  ];

  // Mock pending approvals
  const pendingApprovals = [
    { id: 1, date: '2023-05-22', seller: 'John Smith', item: 'Chainsaw', category: 'Tools', price: 35.00, images: 3, description: 'Professional chainsaw, perfect for yard work.' },
    { id: 2, date: '2023-05-23', seller: 'Emily Davis', item: 'Kayak', category: 'Outdoor', price: 50.00, images: 4, description: 'Single-person kayak, includes paddle and life vest.' },
    { id: 3, date: '2023-05-24', seller: 'Robert Wilson', item: 'Pressure Washer', category: 'Tools', price: 40.00, images: 2, description: 'Electric pressure washer with multiple nozzles.' },
    { id: 4, date: '2023-05-25', seller: 'Michael Brown', item: 'Projector', category: 'Electronics', price: 45.00, images: 5, description: '1080p HD projector with HDMI and USB inputs.' },
  ];

  // Mock reported content
  const reportedContent = [
    { id: 1, date: '2023-05-18', reporter: 'Emily Davis', reported: 'Michael Brown', content: 'Inappropriate message in chat', type: 'Message', status: 'Pending' },
    { id: 2, date: '2023-05-20', reporter: 'John Smith', reported: 'Robert Wilson', content: 'Misleading item description', type: 'Listing', status: 'Pending' },
    { id: 3, date: '2023-05-21', reporter: 'Robert Wilson', reported: 'Michael Brown', content: 'Abusive review content', type: 'Review', status: 'Resolved' },
    { id: 4, date: '2023-05-22', reporter: 'Michael Brown', reported: 'John Smith', content: 'Fake listing with stock images', type: 'Listing', status: 'Pending' },
  ];

  // Mock credit system data
  const creditData = {
    totalLeafs: 25640,
    totalTreeCoins: 25.64,
    activeMissions: 8,
    topUsers: [
      { id: 1, name: 'Emily Davis', leafs: 1230, treeCoins: 1.23, ecoScore: 85 },
      { id: 2, name: 'John Smith', leafs: 980, treeCoins: 0.98, ecoScore: 72 },
      { id: 3, name: 'Robert Wilson', leafs: 850, treeCoins: 0.85, ecoScore: 68 },
    ],
    missions: [
      { id: 1, name: 'Resource Saver', description: 'Borrow 5 different items in one month', reward: 25, completions: 42 },
      { id: 2, name: 'Community Champion', description: 'Lend items to 10 different users', reward: 50, completions: 28 },
      { id: 3, name: 'Eco Warrior', description: 'Save 100kg of carbon through sharing', reward: 100, completions: 15 },
    ]
  };

  // Mock settings data
  const siteSettings = {
    siteName: 'OpShare',
    platformFeePercentage: 5,
    leafToTreeCoinRatio: 1000,
    requireApproval: true,
    allowUserReports: true,
    maxListingsPerUser: 50,
    emailNotifications: true,
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart4 className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'listings', label: 'Listings', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'transactions', label: 'Transactions', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'approvals', label: 'Approvals', icon: <Shield className="h-5 w-5" /> },
    { id: 'reports', label: 'Reports', icon: <Flag className="h-5 w-5" /> },
    { id: 'credits', label: 'Credits', icon: <Award className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <AdminLayout>
      {/* Horizontal Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 border-b pb-4 pt-1 px-2 overflow-x-auto sticky top-0 z-10 bg-gray-50">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`flex items-center px-4 py-2.5 rounded-md transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-green-600/90 to-green-500/90 text-white font-medium shadow-md' 
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className={`mr-2.5 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 px-2 md:px-0">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to the OpShare admin panel. Here's an overview of what's happening on the platform.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardTitle className="text-sm font-medium text-blue-900">Total Users</CardTitle>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-blue-600 h-1.5 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-gray-500">+12% this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 bg-gradient-to-br from-indigo-50 to-purple-50">
                <CardTitle className="text-sm font-medium text-indigo-900">Active Listings</CardTitle>
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold">{stats.activeListings}</div>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-indigo-600 h-1.5 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-xs text-gray-500">+8% this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardTitle className="text-sm font-medium text-green-900">Platform Revenue</CardTitle>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold">${stats.platformFees.toFixed(2)}</div>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-green-600 h-1.5 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-gray-500">+15% this month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 border-b border-amber-200/50">
                <CardTitle className="text-sm font-medium text-amber-800">Pending Approvals</CardTitle>
                <div className="h-8 w-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold text-amber-800">{stats.pendingApprovals}</div>
                <p className="text-xs text-amber-700 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Requires your attention
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 border-b border-red-200/50">
                <CardTitle className="text-sm font-medium text-red-800">Reported Content</CardTitle>
                <div className="h-8 w-8 bg-red-200 rounded-full flex items-center justify-center">
                  <Flag className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold text-red-800">{stats.reportedContent}</div>
                <p className="text-xs text-red-700 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Urgent review required
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <CardHeader className="pb-2 px-5 pt-5 flex flex-row items-center justify-between space-y-0 bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardTitle className="text-sm font-medium text-cyan-900">Total Transactions</CardTitle>
                <div className="h-8 w-8 bg-cyan-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-cyan-600" />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-3">
                <div className="text-2xl font-bold">{stats.totalTransactions}</div>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                    <div className="bg-cyan-600 h-1.5 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-gray-500">+5% this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200/70 bg-gradient-to-br from-white to-gray-50">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setActiveTab('approvals')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Review Pending Approvals
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setActiveTab('reports')}
              >
                <Flag className="h-4 w-4 mr-2" />
                Check Reported Content
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setActiveTab('users')}
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6 px-2 md:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">User Management</h1>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md">
              <Users className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 rounded-lg shadow-sm gap-4 border border-gray-200/70">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Search users..." className="pl-9 w-full" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="border-gray-300 shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 shadow-sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
          
          {/* Desktop Table View (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200/70">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left">
                    <th className="px-5 py-3.5 font-medium text-gray-700">Name</th>
                    <th className="px-5 py-3.5 font-medium text-gray-700">Email</th>
                    <th className="px-5 py-3.5 font-medium text-gray-700">Role</th>
                    <th className="px-5 py-3.5 font-medium text-gray-700">Status</th>
                    <th className="px-5 py-3.5 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium mr-3 shadow-sm">
                            {user.name.charAt(0)}
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td className="px-5 py-4">{user.email}</td>
                      <td className="px-5 py-4">
                        <Badge className={user.role === 'Admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-800'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge className={user.status === 'Active' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                          : 'bg-gradient-to-r from-red-500 to-red-600 text-white'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                            {user.status === 'Active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 1-5 of 1,248 users</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled className="border-gray-300">Previous</Button>
                <Button variant="outline" size="sm" className="border-gray-300">Next</Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Card View (hidden on desktop) */}
          <div className="md:hidden space-y-4">
            {users.map(user => (
              <Card key={user.id} className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium mr-3 shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Role:</span>
                      <div className="mt-1">
                        <Badge className={user.role === 'Admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-800'}>
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-500">Status:</span>
                      <div className="mt-1">
                        <Badge className={user.status === 'Active' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                          : 'bg-gradient-to-r from-red-500 to-red-600 text-white'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-gray-500">Showing 1-5 of 1,248 users</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled className="border-gray-300">Previous</Button>
                <Button variant="outline" size="sm" className="border-gray-300">Next</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <div className="space-y-6 px-2 md:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Listings Management</h1>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Add New Listing
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between bg-white p-5 rounded-lg shadow-sm gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Search listings..." className="pl-9 w-full" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* Desktop Table View (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3.5 font-medium">Listing</th>
                    <th className="px-5 py-3.5 font-medium">Owner</th>
                    <th className="px-5 py-3.5 font-medium">Category</th>
                    <th className="px-5 py-3.5 font-medium">Price</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Metrics</th>
                    <th className="px-5 py-3.5 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {listings.map(listing => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">{listing.name}</td>
                      <td className="px-5 py-4">{listing.owner}</td>
                      <td className="px-5 py-4">
                        <Badge variant="outline">{listing.category}</Badge>
                      </td>
                      <td className="px-5 py-4">${listing.price.toFixed(2)}/day</td>
                      <td className="px-5 py-4">
                        <Badge className={
                          listing.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }>
                          {listing.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs text-gray-600">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" /> {listing.views} views
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> {listing.requests} requests
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 1-5 of 856 listings</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Card View (hidden on desktop) */}
          <div className="md:hidden space-y-4">
            {listings.map(listing => (
              <Card key={listing.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="font-medium text-base">{listing.name}</div>
                  <div className="text-sm text-gray-500 mt-1">Owner: {listing.owner}</div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Category:</span>
                      <div className="mt-1">
                        <Badge variant="outline">{listing.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-500">Price:</span>
                      <div className="mt-1 font-medium">${listing.price.toFixed(2)}/day</div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-500">Status:</span>
                      <div className="mt-1">
                        <Badge className={
                          listing.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-500">Metrics:</span>
                      <div className="mt-1 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" /> {listing.views} views
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> {listing.requests} requests
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-600">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-amber-600">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-gray-500">Showing 1-5 of 856 listings</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Transaction Management</h1>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Transactions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTransactions}</div>
                <p className="text-xs text-gray-500">All-time transactions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Transaction Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450.00</div>
                <p className="text-xs text-gray-500">Total value processed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.platformFees.toFixed(2)}</div>
                <p className="text-xs text-gray-500">Revenue from fees</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap items-center justify-between bg-white p-5 rounded-lg shadow-sm gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Search transactions..." className="pl-9" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Input type="date" className="w-[180px]" placeholder="Date from" />
              <Input type="date" className="w-[180px]" placeholder="Date to" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3.5 font-medium">ID</th>
                    <th className="px-5 py-3.5 font-medium">Date</th>
                    <th className="px-5 py-3.5 font-medium">Seller</th>
                    <th className="px-5 py-3.5 font-medium">Buyer</th>
                    <th className="px-5 py-3.5 font-medium">Item</th>
                    <th className="px-5 py-3.5 font-medium">Amount</th>
                    <th className="px-5 py-3.5 font-medium">Fee</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">#{transaction.id}</td>
                      <td className="px-5 py-4">{transaction.date}</td>
                      <td className="px-5 py-4">{transaction.seller}</td>
                      <td className="px-5 py-4">{transaction.buyer}</td>
                      <td className="px-5 py-4">{transaction.item}</td>
                      <td className="px-5 py-4 font-medium">${transaction.amount.toFixed(2)}</td>
                      <td className="px-5 py-4 text-green-600">${transaction.fee.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <Badge className={
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          transaction.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {transaction.status === 'Disputed' && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 1-5 of 432 transactions</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Approval Requests</h1>
              <p className="text-gray-600 mt-1">Review and approve new listings before they go live on the platform.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm">
            <div className="text-amber-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">You have {pendingApprovals.length} items waiting for approval</span>
            </div>
            
            <div className="flex space-x-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by Date
              </Button>
            </div>
          </div>
          
          <div className="space-y-5">
            {pendingApprovals.map(approval => (
              <div key={approval.id} className="bg-white rounded-lg shadow-sm p-5 border border-amber-200">
                <div className="flex flex-wrap gap-4 justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">{approval.item}</h3>
                      <Badge className="ml-3 bg-amber-100 text-amber-800">Pending Approval</Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><span className="font-medium">Seller:</span> {approval.seller}</div>
                      <div><span className="font-medium">Category:</span> {approval.category}</div>
                      <div><span className="font-medium">Price:</span> ${approval.price.toFixed(2)}/day</div>
                      <div><span className="font-medium">Submitted:</span> {approval.date}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">{approval.description}</p>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-1" />
                      {approval.images} images attached
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Reports Management</h1>
              <p className="text-gray-600 mt-1">Review and manage content reported by users.</p>
            </div>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportedContent.filter(r => r.status === 'Pending').length}</div>
                <p className="text-xs text-gray-500">Awaiting review</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportedContent.filter(r => r.status === 'Resolved').length}</div>
                <p className="text-xs text-gray-500">Handled and closed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.2 hours</div>
                <p className="text-xs text-gray-500">Time to resolution</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap items-center justify-between bg-white p-5 rounded-lg shadow-sm gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Search reports..." className="pl-9" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                  <SelectItem value="listing">Listing</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3.5 font-medium">ID</th>
                    <th className="px-5 py-3.5 font-medium">Date</th>
                    <th className="px-5 py-3.5 font-medium">Reporter</th>
                    <th className="px-5 py-3.5 font-medium">Reported User</th>
                    <th className="px-5 py-3.5 font-medium">Type</th>
                    <th className="px-5 py-3.5 font-medium">Content</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reportedContent.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">#{report.id}</td>
                      <td className="px-5 py-4">{report.date}</td>
                      <td className="px-5 py-4">{report.reporter}</td>
                      <td className="px-5 py-4">{report.reported}</td>
                      <td className="px-5 py-4">
                        <Badge variant="outline">{report.type}</Badge>
                      </td>
                      <td className="px-5 py-4 max-w-xs truncate">{report.content}</td>
                      <td className="px-5 py-4">
                        <Badge className={
                          report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                          'bg-amber-100 text-amber-800'
                        }>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === 'Pending' && (
                            <>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing {reportedContent.length} of {reportedContent.length} reports</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </div>
          
          {/* Report Details Panel */}
          <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold mb-4">Report Management Guidelines</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p>Review reported content within 24 hours to maintain platform safety.</p>
              </div>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p>When a listing is reported, temporarily hide it until review is complete.</p>
              </div>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p>For serious violations, consider suspending user accounts pending investigation.</p>
              </div>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p>Document all actions taken for compliance and audit purposes.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credits Tab */}
      {activeTab === 'credits' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sustainability Credits</h1>
              <p className="text-gray-600 mt-1">Manage the TreeCoin credit system and sustainability rewards.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Create New Mission
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Total Leaf Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <div className="text-2xl font-bold text-green-800">{creditData.totalLeafs.toLocaleString()}</div>
                </div>
                <p className="text-xs text-green-700 mt-1">Earned by all users</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">TreeCoins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-amber-600 mr-2" />
                  <div className="text-2xl font-bold text-amber-800">{creditData.totalTreeCoins.toFixed(2)}</div>
                </div>
                <p className="text-xs text-amber-700 mt-1">Converted from Leaf credits</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creditData.activeMissions}</div>
                <p className="text-xs text-gray-500 mt-1">Available sustainability tasks</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Eco Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-gray-500 mt-1">Platform sustainability rating</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Missions Management */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-semibold">Mission Management</h3>
                <Button variant="outline" size="sm">Add Mission</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-5 py-3 text-left font-medium">Mission</th>
                      <th className="px-5 py-3 text-left font-medium">Reward</th>
                      <th className="px-5 py-3 text-left font-medium">Completions</th>
                      <th className="px-5 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {creditData.missions.map(mission => (
                      <tr key={mission.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <div className="font-medium">{mission.name}</div>
                          <div className="text-xs text-gray-500">{mission.description}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center text-green-600">
                            <Leaf className="h-4 w-4 mr-1" />
                            <span>{mission.reward} Leafs</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">{mission.completions}</td>
                        <td className="px-5 py-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Top Users by Eco Score */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b">
                <h3 className="font-semibold">Top Users by Eco Score</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-5 py-3 text-left font-medium">User</th>
                      <th className="px-5 py-3 text-left font-medium">Leaf Credits</th>
                      <th className="px-5 py-3 text-left font-medium">TreeCoins</th>
                      <th className="px-5 py-3 text-left font-medium">Eco Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {creditData.topUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium">{user.name}</td>
                        <td className="px-5 py-4">{user.leafs.toLocaleString()}</td>
                        <td className="px-5 py-4">{user.treeCoins.toFixed(2)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${user.ecoScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{user.ecoScore}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 border-t">
                <Button variant="outline" size="sm" className="w-full">View All Users</Button>
              </div>
            </div>
          </div>
          
          {/* Credit System Configuration */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Credit System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Leaf to TreeCoin Conversion Rate</label>
                  <div className="flex items-center">
                    <Input type="number" defaultValue="1000" className="max-w-[120px]" />
                    <span className="mx-2 text-sm text-gray-500">Leafs =</span>
                    <Input type="number" defaultValue="1" className="max-w-[120px]" disabled />
                    <span className="mx-2 text-sm text-gray-500">TreeCoin</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default New User Leaf Balance</label>
                  <Input type="number" defaultValue="100" className="max-w-[120px]" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum TreeCoins for Rewards</label>
                  <Input type="number" defaultValue="0.5" className="max-w-[120px]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Enable Missions System</div>
                    <p className="text-xs text-gray-500">Allow users to complete missions for rewards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Show Eco Score on Profiles</div>
                    <p className="text-xs text-gray-500">Display user sustainability rankings publicly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Enable TreeCoin Redemption</div>
                    <p className="text-xs text-gray-500">Allow users to redeem TreeCoins for discounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Platform Settings</h1>
            <p className="text-gray-600 mt-1">Configure global settings for the OpShare platform.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">General Settings</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Name</label>
                    <Input defaultValue={siteSettings.siteName} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Admin Email</label>
                    <Input defaultValue="admin@opshare.com" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Fee (%)</label>
                    <Input 
                      type="number" 
                      defaultValue={siteSettings.platformFeePercentage} 
                      className="max-w-[120px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Listings Per User</label>
                    <Input 
                      type="number" 
                      defaultValue={siteSettings.maxListingsPerUser} 
                      className="max-w-[120px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform Description</label>
                  <Textarea 
                    defaultValue="OpShare is a peer-to-peer rental marketplace that helps communities share resources while promoting sustainability."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t p-6">
              <h3 className="text-lg font-semibold mb-6">Feature Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Require Listing Approval</div>
                    <p className="text-sm text-gray-500">All new listings must be approved by an admin</p>
                  </div>
                  <Switch defaultChecked={siteSettings.requireApproval} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow User Reports</div>
                    <p className="text-sm text-gray-500">Enable users to report problematic content</p>
                  </div>
                  <Switch defaultChecked={siteSettings.allowUserReports} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <p className="text-sm text-gray-500">Send automated email notifications</p>
                  </div>
                  <Switch defaultChecked={siteSettings.emailNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">User Messaging</div>
                    <p className="text-sm text-gray-500">Allow direct messaging between users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Public User Profiles</div>
                    <p className="text-sm text-gray-500">Make user profiles visible to other users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="border-t p-6">
              <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New User Notification</div>
                    <p className="text-sm text-gray-500">Send admin notification when new users register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Listing Notification</div>
                    <p className="text-sm text-gray-500">Send admin notification for new listings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Report Notification</div>
                    <p className="text-sm text-gray-500">Send admin notification for new reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium">Admin Notification Email</label>
                <Input defaultValue="alerts@opshare.com" type="email" />
              </div>
            </div>
            
            <div className="border-t p-6">
              <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="number" defaultValue="30" className="w-20" />
                    <span className="text-sm text-gray-500">minutes</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Password Expiry</div>
                    <p className="text-sm text-gray-500">Force password change every X days</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="number" defaultValue="90" className="w-20" />
                    <span className="text-sm text-gray-500">days</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-6 flex justify-end">
              <div className="flex space-x-3">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-green-600 hover:bg-green-700">Save All Settings</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard; 