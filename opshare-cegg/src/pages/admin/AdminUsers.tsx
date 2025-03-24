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
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-9 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* User Table */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === 'active' ? 'success' :
                      user.status === 'inactive' ? 'outline' : 'destructive'
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
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
                      <Badge variant="success" className="bg-green-100 text-green-800">Yes</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.listings} listings</div>
                      <div>{user.transactions} transactions</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedUser(user);
                          setUserDetailsOpen(true);
                        }}>
                          View details
                        </DropdownMenuItem>
                        
                        {!user.verified && (
                          <DropdownMenuItem onClick={() => handleUserAction(user, 'verify')}>
                            Verify account
                          </DropdownMenuItem>
                        )}
                        
                        {user.status !== 'suspended' ? (
                          <DropdownMenuItem 
                            className="text-amber-600"
                            onClick={() => handleUserAction(user, 'suspend')}
                          >
                            Suspend account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => handleUserAction(user, 'verify')}
                          >
                            Reactivate account
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleUserAction(user, 'delete')}
                        >
                          Delete account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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