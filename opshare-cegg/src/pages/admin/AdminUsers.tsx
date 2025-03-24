import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Search, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Filter,
  Download,
  AlertTriangle,
  UserPlus,
  Trash2,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Jessica Chen',
    email: 'jessica.chen@example.com',
    status: 'active',
    role: 'user',
    joinDate: '2023-03-15T10:30:00Z',
    lastActive: '2023-05-20T14:45:00Z',
    verified: true,
    listings: 8,
    transactions: 12,
    location: 'San Francisco, CA',
    phone: '(555) 123-4567',
    avatar: '/avatars/jessica.jpg'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@example.com',
    status: 'active',
    role: 'user',
    joinDate: '2023-01-05T08:20:00Z',
    lastActive: '2023-05-19T16:30:00Z',
    verified: true,
    listings: 5,
    transactions: 9,
    location: 'Chicago, IL',
    phone: '(555) 987-6543',
    avatar: '/avatars/marcus.jpg'
  },
  {
    id: '3',
    name: 'Olivia Smith',
    email: 'olivia.smith@example.com',
    status: 'inactive',
    role: 'user',
    joinDate: '2023-04-10T11:15:00Z',
    lastActive: '2023-04-20T09:10:00Z',
    verified: false,
    listings: 2,
    transactions: 3,
    location: 'Seattle, WA',
    phone: '(555) 456-7890',
    avatar: '/avatars/olivia.jpg'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@opshare.com',
    status: 'active',
    role: 'admin',
    joinDate: '2023-01-01T00:00:00Z',
    lastActive: '2023-05-21T10:00:00Z',
    verified: true,
    listings: 0,
    transactions: 0,
    location: 'Austin, TX',
    phone: '(555) 000-0000',
    avatar: '/avatars/admin.jpg'
  },
  {
    id: '5',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    status: 'suspended',
    role: 'user',
    joinDate: '2023-02-15T14:30:00Z',
    lastActive: '2023-05-10T13:20:00Z',
    verified: true,
    listings: 3,
    transactions: 7,
    location: 'Miami, FL',
    phone: '(555) 789-0123',
    avatar: '/avatars/carlos.jpg'
  }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [confirmActionOpen, setConfirmActionOpen] = useState(false);
  const [actionType, setActionType] = useState<'verify' | 'suspend' | 'delete' | null>(null);

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (user: any, action: 'verify' | 'suspend' | 'delete') => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmActionOpen(true);
  };

  const executeAction = () => {
    // In a real implementation, this would call an API endpoint
    console.log(`Executing ${actionType} on user:`, selectedUser);
    setConfirmActionOpen(false);
    
    // Mock update the UI (would be handled by API response in real app)
    // This is just for demo purposes
    setTimeout(() => {
      alert(`Action '${actionType}' performed on ${selectedUser.name}`);
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">User Management</h1>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-grow max-w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-9 w-full border-gray-200 focus-visible:ring-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon" className="border-gray-300 hover:bg-gray-50">
              <Filter className="h-4 w-4 text-gray-600" />
            </Button>
            
            <Button variant="outline" size="icon" className="border-gray-300 hover:bg-gray-50">
              <Download className="h-4 w-4 text-gray-600" />
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        
        {/* Desktop Table View (hidden on mobile) */}
        <div className="hidden md:block bg-white rounded-md shadow-sm overflow-hidden border border-gray-200/70">
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <TableRow>
                <TableHead className="text-gray-700">User</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Role</TableHead>
                <TableHead className="text-gray-700">Joined</TableHead>
                <TableHead className="text-gray-700">Last Active</TableHead>
                <TableHead className="text-gray-700">Verified</TableHead>
                <TableHead className="text-gray-700">Activity</TableHead>
                <TableHead className="text-right text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2 border border-gray-200/70 shadow-sm">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      user.status === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.joinDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.lastActive), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {user.verified ? (
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">Yes</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.listings} listings</div>
                      <div>{user.transactions} transactions</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedUser(user);
                          setUserDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {!user.verified && (
                            <DropdownMenuItem 
                              className="text-green-600 cursor-pointer flex items-center"
                              onClick={() => handleUserAction(user, 'verify')}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Verify User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className={`${user.status === 'active' ? 'text-amber-600' : 'text-green-600'} cursor-pointer flex items-center`}
                            onClick={() => handleUserAction(user, user.status === 'active' ? 'suspend' : 'verify')}
                          >
                            {user.status === 'active' ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Suspend User
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate User
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 cursor-pointer flex items-center"
                            onClick={() => handleUserAction(user, 'delete')}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 border border-gray-200/70 shadow-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        className="cursor-pointer flex items-center"
                        onClick={() => {
                          setSelectedUser(user);
                          setUserDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {!user.verified && (
                        <DropdownMenuItem 
                          className="text-green-600 cursor-pointer flex items-center"
                          onClick={() => handleUserAction(user, 'verify')}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Verify User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className={`${user.status === 'active' ? 'text-amber-600' : 'text-green-600'} cursor-pointer flex items-center`}
                        onClick={() => handleUserAction(user, user.status === 'active' ? 'suspend' : 'verify')}
                      >
                        {user.status === 'active' ? (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 cursor-pointer flex items-center"
                        onClick={() => handleUserAction(user, 'delete')}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <Badge className={
                      user.status === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }>
                      {user.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Role</div>
                    <Badge className={user.role === 'admin' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'}>
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Joined</div>
                    <div className="text-sm">
                      {format(new Date(user.joinDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Activity</div>
                    <div className="text-sm">
                      {user.listings} listings, {user.transactions} trans.
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={() => {
                      setSelectedUser(user);
                      setUserDetailsOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* User Details Dialog */}
        <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Comprehensive information about the selected user.
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedUser.name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;