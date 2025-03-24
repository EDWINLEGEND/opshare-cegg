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
  XCircle
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
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500 hover:bg-red-600"><XCircle className="h-3 w-3 mr-1" /> Suspended</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Listing Management</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Item Listings</CardTitle>
            <CardDescription>Manage product listings across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>Suspended</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button>
                  Add Listing
                </Button>
              </div>
            </div>
            
            {/* Desktop view - Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Listed Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>{listing.category}</TableCell>
                      <TableCell>{listing.owner}</TableCell>
                      <TableCell>
                        <StatusBadge status={listing.status} />
                      </TableCell>
                      <TableCell>{listing.listed}</TableCell>
                      <TableCell>{listing.expires}</TableCell>
                      <TableCell>{listing.views}</TableCell>
                      <TableCell>{listing.requests}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Listing</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {listing.status === 'active' ? (
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                <span>Suspend Listing</span>
                              </DropdownMenuItem>
                            ) : listing.status === 'suspended' ? (
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Reactivate Listing</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Approve Listing</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Listing</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile view - Cards */}
            <div className="md:hidden space-y-4">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{listing.title}</CardTitle>
                        <CardDescription>{listing.category}</CardDescription>
                      </div>
                      <StatusBadge status={listing.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Owner:</span> {listing.owner}
                      </div>
                      <div>
                        <span className="text-gray-500">Listed:</span> {listing.listed}
                      </div>
                      <div>
                        <span className="text-gray-500">Expires:</span> {listing.expires}
                      </div>
                      <div>
                        <span className="text-gray-500">Views:</span> {listing.views}
                      </div>
                      <div>
                        <span className="text-gray-500">Requests:</span> {listing.requests}
                      </div>
                      <div>
                        <span className="text-gray-500">Rating:</span> {listing.rating || 'N/A'}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 px-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {listing.status === 'active' ? (
                            <DropdownMenuItem>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>Suspend</span>
                            </DropdownMenuItem>
                          ) : listing.status === 'suspended' ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Reactivate</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredListings.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No listings found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminListings;