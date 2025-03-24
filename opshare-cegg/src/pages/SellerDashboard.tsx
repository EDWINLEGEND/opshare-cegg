import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Package, BarChart2, CheckCircle, Clock, Plus, 
  ArrowRight, Calendar, DollarSign, Tag, ArrowUp, Users
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EarningsSummary from '@/components/dashboard/EarningsSummary';
import RewardsInfo from '@/components/dashboard/RewardsInfo';
import UserListings from '@/components/dashboard/UserListings';

// Sample data - in a real app this would come from your API
const mockProducts = [
  {
    id: 1,
    title: 'Electric Drill',
    price: 8.99,
    rentalPeriod: 'day',
    category: 'Tools',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-10-15'
  },
  {
    id: 2,
    title: 'Mountain Bike',
    price: 15.99,
    rentalPeriod: 'day',
    category: 'Sports',
    status: 'rented',
    returnDate: '2023-11-25',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-09-22'
  },
  {
    id: 3,
    title: 'Camping Tent (4-Person)',
    price: 25.00,
    rentalPeriod: 'day',
    category: 'Outdoor',
    status: 'sold',
    soldPrice: 120.00,
    soldDate: '2023-10-28',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-08-14'
  },
  {
    id: 4,
    title: 'Canon DSLR Camera',
    price: 35.00,
    rentalPeriod: 'day',
    category: 'Electronics',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-10-12'
  },
  {
    id: 5,
    title: 'Stand Mixer',
    price: 12.50,
    rentalPeriod: 'day',
    category: 'Kitchen',
    status: 'rented',
    returnDate: '2023-12-05',
    image: 'https://images.unsplash.com/photo-1594634932563-682ab33e203a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-09-18'
  },
  {
    id: 6,
    title: 'Pressure Washer',
    price: 22.00,
    rentalPeriod: 'day',
    category: 'Tools',
    status: 'sold',
    soldPrice: 160.00,
    soldDate: '2023-11-02',
    image: 'https://images.unsplash.com/photo-1595001057857-c84f40c696a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    createdAt: '2023-07-30'
  }
];

// Mock sales data
const mockSalesData = {
  totalEarnings: 1250.75,
  thisMonth: 420.50,
  pendingPayouts: 85.25,
  recentTransactions: [
    { id: 1, item: 'Electric Drill', amount: 8.99, date: '2023-11-05', type: 'rental' },
    { id: 2, item: 'Camping Tent', amount: 120.00, date: '2023-10-28', type: 'sale' },
    { id: 3, item: 'Power Washer', amount: 35.00, date: '2023-10-22', type: 'rental' },
    { id: 4, item: 'Stand Mixer', amount: 12.50, date: '2023-11-10', type: 'rental' },
    { id: 5, item: 'Pressure Washer', amount: 160.00, date: '2023-11-02', type: 'sale' }
  ]
};

const SellerDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter products by status
  const availableProducts = mockProducts.filter(p => p.status === 'available');
  const rentedProducts = mockProducts.filter(p => p.status === 'rented');
  const soldProducts = mockProducts.filter(p => p.status === 'sold');

  // Filter available products by category if needed
  const filteredProducts = activeCategory === 'all' 
    ? availableProducts 
    : availableProducts.filter(p => p.category.toLowerCase() === activeCategory);

  // Extract unique categories
  const categories = ['all', ...new Set(mockProducts.map(p => p.category.toLowerCase()))];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Dashboard header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.name || 'Seller'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your listings and track your earnings
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                List New Item
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard content */}
      <div className="container mx-auto px-4 py-8">
        {/* Earnings summary */}
        <EarningsSummary />
        
        {/* Rewards information */}
        <RewardsInfo />
        
        {/* Tabs for listings */}
        <Tabs defaultValue="active" className="w-full mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Listings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <UserListings status="active" />
          </TabsContent>
          
          <TabsContent value="pending">
            <UserListings status="pending" />
          </TabsContent>
          
          <TabsContent value="completed">
            <UserListings status="completed" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;