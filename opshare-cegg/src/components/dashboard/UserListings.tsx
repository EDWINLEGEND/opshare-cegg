import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, DollarSign, Leaf, Trash2, RefreshCcw } from 'lucide-react';
import ProductDetailsModal from './ProductDetailsModal';
import { useUser } from '@/contexts/UserContext';

interface UserListingsProps {
  status?: 'active' | 'pending' | 'completed' | 'all';
}

// Interface for listing item
interface Listing {
  _id: string;
  title: string;
  price: number;
  rentalPeriod: string;
  status: string;
  images: string[];
  views?: number;
  requests?: number;
  leafsEarned?: number;
  location: string;
  condition: string;
  description: string;
  ownerId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const UserListings: React.FC<UserListingsProps> = ({ status = 'all' }) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUser();
  
  // Memoize the fetchUserListings function with useCallback
  const fetchUserListings = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get token from localStorage directly as a backup method
      const storedUser = localStorage.getItem('opshare_user');
      const userToken = user?.token || (storedUser ? JSON.parse(storedUser).token : null);
      
      if (!userToken) {
        throw new Error('You must be logged in to view your listings');
      }
      
      console.log('Fetching listings with token...');
      
      const response = await fetch('http://localhost:5000/api/items/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      // Handle different status codes
      if (response.status === 401) {
        throw new Error('Your session has expired. Please log in again.');
      } else if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
        console.error('Error response:', response.status, errorData);
        throw new Error(errorData.message || `Server error (${response.status})`);
      }
      
      const data = await response.json();
      console.log('Fetched listings:', data);
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err.message || 'Failed to fetch your listings');
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    fetchUserListings();
  }, [fetchUserListings]);
  
  // Filter listings based on status
  const filteredListings = status === 'all' 
    ? listings 
    : listings.filter(listing => listing.status === status);
  
  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductDetails = () => {
    setIsModalOpen(false);
  };
  
  // Delete a listing
  const handleDeleteListing = async (e: React.MouseEvent, listingId: string) => {
    e.stopPropagation(); // Prevent opening the modal
    
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      setIsDeleting(true);
      
      try {
        // Get token from localStorage directly as a backup method
        const storedUser = localStorage.getItem('opshare_user');
        const userToken = user?.token || (storedUser ? JSON.parse(storedUser).token : null);
        
        if (!userToken) {
          throw new Error('You must be logged in to delete a listing');
        }
        
        const response = await fetch(`http://localhost:5000/api/items/${listingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Server error' }));
          throw new Error(errorData.message || 'Failed to delete listing');
        }
        
        // Remove the deleted listing from state
        setListings(prevListings => prevListings.filter(listing => listing._id !== listingId));
        
      } catch (err) {
        console.error('Error deleting listing:', err);
        alert(err.message || 'Something went wrong while deleting the listing');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    fetchUserListings();
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="mt-4 text-gray-600">Loading your listings...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
        <div className="flex items-start">
          <p className="text-red-700 flex-1">{error}</p>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleRefresh}
            className="ml-2"
          >
            <RefreshCcw size={16} className="mr-1" />
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  if (filteredListings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 mb-4">No {status} listings found.</p>
        {status !== 'active' && (
          <Button variant="outline">View All Listings</Button>
        )}
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Your Listings</h2>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCcw size={16} className="mr-1" />
          Refresh
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredListings.map(listing => (
          <div 
            key={listing._id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden flex border hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => openProductDetails(listing)}
          >
            <div className="w-24 h-24 sm:w-36 sm:h-36 flex-shrink-0">
              <img 
                src={listing.images && listing.images.length > 0 
                  ? `http://localhost:5000${listing.images[0]}` 
                  : 'https://via.placeholder.com/300?text=No+Image'}
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium line-clamp-1">{listing.title}</h3>
                  <div className="flex items-center text-sm text-gray-700 mt-1">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
                    <span>${listing.price}/{listing.rentalPeriod || 'day'}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {listing.location}
                  </div>
                </div>
                <Badge variant={
                  listing.status === 'available' 
                    ? 'secondary' 
                    : listing.status === 'pending' 
                      ? 'outline' 
                      : 'secondary'
                }>
                  {listing.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-auto text-sm">
                <div className="flex items-center text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{listing.views || 0} views</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{listing.requests || 0} requests</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Leaf className="h-4 w-4 mr-1" />
                  <span>+{listing.leafsEarned || 0} earned</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle manage click
                  }}
                >
                  Manage
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle view requests click
                  }}
                >
                  View Requests
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => handleDeleteListing(e, listing._id)}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Product Details Modal */}
      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductDetails}
      />
    </>
  );
};

export default UserListings;