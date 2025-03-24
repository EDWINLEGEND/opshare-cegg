import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  DollarSign, TrendingUp, ArrowUp, ArrowDown, Calendar,
  Layers, Filter, Search, Download, PieChart as PieChartIcon,
  BarChart2, RefreshCw, Clock, ShoppingBag, CreditCard
} from 'lucide-react';
import { format, subDays, subMonths, isSameMonth, parseISO, isAfter } from 'date-fns';

// Define transaction interface
interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'fee';
  status: 'completed' | 'pending';
}

// Mock data for financial transactions
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 25,
    date: '2023-05-02T10:30:00Z',
    description: 'Power Drill Rental',
    category: 'Tools',
    type: 'income',
    status: 'completed'
  },
  {
    id: '2',
    amount: 40,
    date: '2023-05-05T14:20:00Z',
    description: 'Camera Rental',
    category: 'Electronics',
    type: 'income',
    status: 'completed'
  },
  {
    id: '3',
    amount: 2.5,
    date: '2023-05-05T14:20:00Z',
    description: 'Platform Fee - Camera Rental',
    category: 'Fees',
    type: 'fee',
    status: 'completed'
  },
  {
    id: '4',
    amount: 35,
    date: '2023-05-10T09:15:00Z',
    description: 'Mountain Bike Rental',
    category: 'Outdoor',
    type: 'income',
    status: 'completed'
  },
  {
    id: '5',
    amount: 2,
    date: '2023-05-10T09:15:00Z',
    description: 'Platform Fee - Bike Rental',
    category: 'Fees',
    type: 'fee',
    status: 'completed'
  },
  {
    id: '6',
    amount: 30,
    date: '2023-05-15T16:45:00Z',
    description: 'Stand Mixer Rental',
    category: 'Kitchen',
    type: 'income',
    status: 'completed'
  },
  {
    id: '7',
    amount: 45,
    date: '2023-05-20T11:30:00Z',
    description: 'Tent Rental',
    category: 'Outdoor',
    type: 'income',
    status: 'pending'
  },
  {
    id: '8',
    amount: 80,
    date: '2023-05-25T13:20:00Z',
    description: 'Pressure Washer Rental',
    category: 'Tools',
    type: 'income',
    status: 'completed'
  },
  {
    id: '9',
    amount: 5,
    date: '2023-05-25T13:20:00Z',
    description: 'Platform Fee - Washer Rental',
    category: 'Fees',
    type: 'fee',
    status: 'completed'
  },
  {
    id: '10',
    amount: 3,
    date: '2023-05-15T16:45:00Z',
    description: 'Platform Fee - Mixer Rental',
    category: 'Fees',
    type: 'fee',
    status: 'completed'
  }
];

// Generate monthly data for the past year
const generateMonthlyData = () => {
  const data = [];
  for (let i = 11; i >= 0; i--) {
    const month = subMonths(new Date(), i);
    const monthStr = format(month, 'MMM yyyy');
    
    const monthTransactions = mockTransactions.filter(t => {
      const transDate = parseISO(t.date);
      return isSameMonth(transDate, month);
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const fees = monthTransactions
      .filter(t => t.type === 'fee' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    data.push({
      name: monthStr,
      income: income || (month.getTime() > Date.now() ? 0 : Math.floor(Math.random() * 200) + 50),
      fees: fees || (month.getTime() > Date.now() ? 0 : Math.floor(Math.random() * 15) + 5),
    });
  }
  return data;
};

// Generate category data
const generateCategoryData = () => {
  const categories = {};
  
  mockTransactions
    .filter(t => t.type === 'income')
    .forEach(transaction => {
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category] += transaction.amount;
    });
  
  return Object.keys(categories).map(key => ({
    name: key,
    value: categories[key]
  }));
};

interface FinancialAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  financialData: {
    thisMonth: number;
    pending: number;
    lifetime: number;
    fees: number;
  };
}

const FinancialAnalysisModal: React.FC<FinancialAnalysisModalProps> = ({ 
  isOpen, 
  onClose,
  financialData
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Monthly data for charts
  const monthlyData = generateMonthlyData();
  
  // Category data for pie chart
  const categoryData = generateCategoryData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Filter transactions based on current criteria
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = transactionFilter === 'all' || 
                         (transactionFilter === 'income' && transaction.type === 'income') ||
                         (transactionFilter === 'fees' && transaction.type === 'fee') ||
                         (transactionFilter === 'pending' && transaction.status === 'pending');
    
    return matchesSearch && matchesFilter;
  });
  
  // Get current month stats
  const currentMonthData = monthlyData[monthlyData.length - 1];
  const previousMonthData = monthlyData[monthlyData.length - 2];
  
  // Calculate monthly percentage change
  const incomeChange = previousMonthData?.income 
    ? ((currentMonthData.income - previousMonthData.income) / previousMonthData.income) * 100 
    : 0;
  
  // Monthly averages
  const averageMonthlyIncome = monthlyData
    .slice(0, -1) // exclude current month
    .reduce((sum, month) => sum + month.income, 0) / (monthlyData.length - 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <DollarSign className="h-6 w-6 text-green-600 mr-2" />
            Financial Analysis
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of your earnings, transactions, and financial trends
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>Trends</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${financialData.thisMonth}</div>
                  <div className="flex items-center mt-2 text-sm">
                    {incomeChange >= 0 ? (
                      <div className="text-green-600 flex items-center">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span>+{Math.abs(incomeChange).toFixed(1)}% from last month</span>
                      </div>
                    ) : (
                      <div className="text-red-600 flex items-center">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        <span>-{Math.abs(incomeChange).toFixed(1)}% from last month</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-amber-500" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${financialData.pending}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    From {mockTransactions.filter(t => t.status === 'pending').length} pending transactions
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    Lifetime Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${financialData.lifetime}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Total earnings since you joined
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, '']} />
                        <Legend />
                        <Bar dataKey="income" name="Earnings" fill="#10B981" />
                        <Bar dataKey="fees" name="Platform Fees" fill="#F87171" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Earnings by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-4">Income</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Average Monthly Income:</span>
                        <span className="font-medium">${averageMonthlyIncome.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Month:</span>
                        <span className="font-medium">${financialData.thisMonth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected Annual:</span>
                        <span className="font-medium">${(averageMonthlyIncome * 12).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-700 mb-4">Fees</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Platform Fees:</span>
                        <span className="font-medium">${financialData.fees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Percentage:</span>
                        <span className="font-medium">
                          {((financialData.fees / financialData.lifetime) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Income:</span>
                        <span className="font-medium">
                          ${(financialData.lifetime - financialData.fees).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        placeholder="Search transactions..."
                        className="pl-8 w-[200px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-x-2 mb-4">
                  <Badge 
                    variant={transactionFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTransactionFilter('all')}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={transactionFilter === 'income' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTransactionFilter('income')}
                  >
                    Income
                  </Badge>
                  <Badge 
                    variant={transactionFilter === 'fees' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTransactionFilter('fees')}
                  >
                    Fees
                  </Badge>
                  <Badge 
                    variant={transactionFilter === 'pending' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTransactionFilter('pending')}
                  >
                    Pending
                  </Badge>
                </div>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] gap-2 p-3 text-sm font-medium bg-gray-50">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Description</div>
                    <div>Category</div>
                    <div>Status</div>
                  </div>
                  <div className="divide-y max-h-[400px] overflow-y-auto">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map(transaction => (
                        <div 
                          key={transaction.id} 
                          className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] gap-2 p-3 text-sm items-center"
                        >
                          <div>{format(parseISO(transaction.date), 'MMM dd, yyyy')}</div>
                          <div className={`font-medium ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                          </div>
                          <div>{transaction.description}</div>
                          <div>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </div>
                          <div>
                            <Badge 
                              variant={transaction.status === 'completed' ? 'success' : 'warning'}
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No transactions found
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="font-bold">${category.value}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(category.value / financialData.lifetime) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {((category.value / financialData.lifetime) * 100).toFixed(1)}% of total income
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Earning Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Sample top 5 items by earnings */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm font-medium bg-gray-50 rounded-t-md">
                    <div>Item</div>
                    <div>Category</div>
                    <div>Rentals</div>
                    <div>Total Income</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm">
                      <div className="font-medium">Pressure Washer</div>
                      <div>Tools</div>
                      <div>4</div>
                      <div className="font-medium text-green-600">$125</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm">
                      <div className="font-medium">Mountain Bike</div>
                      <div>Outdoor</div>
                      <div>5</div>
                      <div className="font-medium text-green-600">$120</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm">
                      <div className="font-medium">DSLR Camera</div>
                      <div>Electronics</div>
                      <div>3</div>
                      <div className="font-medium text-green-600">$95</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm">
                      <div className="font-medium">Stand Mixer</div>
                      <div>Kitchen</div>
                      <div>3</div>
                      <div className="font-medium text-green-600">$60</div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 p-3 text-sm">
                      <div className="font-medium">Power Drill</div>
                      <div>Tools</div>
                      <div>2</div>
                      <div className="font-medium text-green-600">$50</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Income Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        name="Income" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="fees" 
                        name="Platform Fees" 
                        stroke="#F87171" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {incomeChange >= 0 ? (
                      <ArrowUp className="text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="text-red-500 mr-1" />
                    )}
                    {Math.abs(incomeChange).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Month-over-month</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Average Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(financialData.lifetime / mockTransactions.filter(t => t.type === 'income').length).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">Per rental</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Fee Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {((financialData.fees / financialData.lifetime) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Of total earnings</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Earnings Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">30-Day Forecast</div>
                      <div className="text-xl font-bold text-blue-700">
                        ${(financialData.thisMonth * 1.1).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">90-Day Forecast</div>
                      <div className="text-xl font-bold text-blue-700">
                        ${(financialData.thisMonth * 3.5).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-500 mb-1">Annual Forecast</div>
                      <div className="text-xl font-bold text-blue-700">
                        ${(averageMonthlyIncome * 12).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium mb-2">Earnings Insights</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-1 mr-2"></div>
                        <span>Your earnings are {incomeChange >= 0 ? 'growing' : 'declining'} at {Math.abs(incomeChange).toFixed(1)}% month-over-month.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-1 mr-2"></div>
                        <span>Your best performing category is {categoryData.sort((a, b) => b.value - a.value)[0].name} with ${categoryData.sort((a, b) => b.value - a.value)[0].value} in earnings.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0 mt-1 mr-2"></div>
                        <span>You earn an average of ${averageMonthlyIncome.toFixed(2)} monthly, which is {averageMonthlyIncome > financialData.thisMonth ? 'higher' : 'lower'} than this month's earnings.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialAnalysisModal; 