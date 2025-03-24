import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  MoreHorizontal, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Download
} from 'lucide-react';

// Mock data for listings
const mockListings = [
  {
    id: '1',
    title: 'Mountain Bike',
    category: 'Sports & Outdoors',
    owner: 'John Doe',
    status: 'active',
    listed: '2023-10-15',
    expires: '2023-11-15',
    views: 245,
    requests: 12,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Camping Tent (4-Person)',
    category: 'Outdoor Gear',
    owner: 'Sarah Smith',
    status: 'active',
    listed: '2023-10-10',
    expires: '2023-11-10',
    views: 189,
    requests: 8,
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Professional Camera Kit',
    category: 'Electronics',
    owner: 'Michael Johnson',
    status: 'pending',
    listed: '2023-10-18',
    expires: '2023-11-18',
    views: 78,
    requests: 3,
    rating: 0,
  },
  {
    id: '4',
    title: 'Electric Drill',
    category: 'Tools',
    owner: 'Robert Williams',
    status: 'suspended',
    listed: '2023-09-25',
    expires: '2023-10-25',
    views: 132,
    requests: 5,
    rating: 4.2,
  },
  {
    id: '5',
    title: 'Board Game Collection',
    category: 'Games',
    owner: 'Emily Brown',
    status: 'active',
    listed: '2023-10-05',
    expires: '2023-11-05',
    views: 210,
    requests: 15,
    rating: 4.9,
  },
];

const AdminListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter listings based on search query and status filter
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge renderer
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>;
      case 'pending':
        return <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-sm"><XCircle className="h-3 w-3 mr-1" /> Suspended</Badge>;
      default:
        return <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-sm">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Listing Management</h1>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="border-gray-300 shadow-sm hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </div>
        </div>
        
        <Card className="mb-6 border border-gray-200/70 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/70 pb-4">
            <CardTitle className="text-gray-800">Item Listings</CardTitle>
            <CardDescription className="text-gray-600">Manage product listings across the platform</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="pl-8 border-gray-300 focus-visible:ring-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center border-gray-300 shadow-sm hover:bg-gray-50">
                      <Filter className="h-4 w-4 mr-2 text-gray-600" />
                      <span>Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 shadow-md border-gray-200/70">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setStatusFilter('all')}
                      className={statusFilter === 'all' ? 'bg-gray-100' : ''}
                    >
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setStatusFilter('active')}
                      className={statusFilter === 'active' ? 'bg-gray-100' : ''}
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setStatusFilter('pending')}
                      className={statusFilter === 'pending' ? 'bg-gray-100' : ''}
                    >
                      <Clock className="h-4 w-4 mr-2 text-amber-600" />
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setStatusFilter('suspended')}
                      className={statusFilter === 'suspended' ? 'bg-gray-100' : ''}
                    >
                      <XCircle className="h-4 w-4 mr-2 text-red-600" />
                      Suspended
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Desktop view - Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableRow>
                    <TableHead className="text-gray-700">Title</TableHead>
                    <TableHead className="text-gray-700">Category</TableHead>
                    <TableHead className="text-gray-700">Owner</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-gray-700">Listed Date</TableHead>
                    <TableHead className="text-gray-700">Expires</TableHead>
                    <TableHead className="text-gray-700">Views</TableHead>
                    <TableHead className="text-gray-700">Requests</TableHead>
                    <TableHead className="text-right text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50 border-gray-300 text-gray-700">
                          {listing.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{listing.owner}</TableCell>
                      <TableCell>
                        <StatusBadge status={listing.status} />
                      </TableCell>
                      <TableCell>{listing.listed}</TableCell>
                      <TableCell>{listing.expires}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-gray-500" />
                          {listing.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-500" />
                          {listing.requests}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          >
                            <Edit className="h-4 w-4" />
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
                            <DropdownMenuContent align="end" className="w-56 shadow-md border-gray-200/70">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4 text-blue-600" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4 text-amber-600" />
                                <span>Edit Listing</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {listing.status === 'active' ? (
                                <DropdownMenuItem className="cursor-pointer">
                                  <AlertTriangle className="mr-2 h-4 w-4 text-amber-600" />
                                  <span>Suspend Listing</span>
                                </DropdownMenuItem>
                              ) : listing.status === 'suspended' ? (
                                <DropdownMenuItem className="cursor-pointer">
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  <span>Reactivate Listing</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="cursor-pointer">
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  <span>Approve Listing</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Listing</span>
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
            
            {/* Mobile view - Cards */}
            <div className="md:hidden space-y-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{listing.title}</h3>
                        <p className="text-sm text-gray-500">Owner: {listing.owner}</p>
                      </div>
                      <StatusBadge status={listing.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Category</div>
                        <Badge variant="outline" className="bg-gray-50 border-gray-300 text-gray-700">
                          {listing.category}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Metrics</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1 text-gray-500" />
                            {listing.views}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            {listing.requests}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Listed</div>
                        <div className="text-sm">{listing.listed}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Expires</div>
                        <div className="text-sm">{listing.expires}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredListings.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No listings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
            
            {filteredListings.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 mt-6 pt-4">
                <p className="text-sm text-gray-500">Showing {filteredListings.length} of {mockListings.length} listings</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled className="border-gray-300">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminListings;