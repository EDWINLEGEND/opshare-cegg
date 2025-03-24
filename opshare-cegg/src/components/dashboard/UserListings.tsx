import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, DollarSign, Leaf } from 'lucide-react';
import ProductDetailsModal from './ProductDetailsModal';

interface UserListingsProps {
  status?: 'active' | 'pending' | 'completed' | 'all';
}

// Mock data for user listings
const mockListings = [
  {
    id: '1',
    title: 'Power Drill - Professional Grade',
    price: 15,
    rentalPeriod: 'day',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 24,
    requests: 2,
    leafsEarned: 150,
    location: 'Downtown',
    condition: 'Excellent',
    description: 'High-quality power drill perfect for home improvement projects. Includes multiple drill bits and carrying case.'
  },
  {
    id: '2',
    title: 'Mountain Bike - Trek 820',
    price: 25,
    rentalPeriod: 'day',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 18,
    requests: 1,
    leafsEarned: 120,
    location: 'Riverfront',
    condition: 'Good',
    description: 'Trek 820 mountain bike in good condition. Perfect for trail riding or casual use around town. Helmet can be included upon request.'
  },
  {
    id: '3',
    title: 'DSLR Camera - Canon EOS 80D',
    price: 40,
    rentalPeriod: 'day',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    views: 32,
    requests: 3,
    leafsEarned: 200,
    location: 'Arts District',
    condition: 'Like New',
    description: 'Professional DSLR camera with 18-135mm lens. Great for portraits, events, and landscape photography. Includes extra battery and memory card.'
  }
];

const UserListings: React.FC<UserListingsProps> = ({ status = 'all' }) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter listings based on status
  const filteredListings = status === 'all' 
    ? mockListings 
    : mockListings.filter(listing => listing.status === status);
  
  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductDetails = () => {
    setIsModalOpen(false);
  };
  
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
      <div className="space-y-4">
        {filteredListings.map(listing => (
          <div 
            key={listing.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden flex border hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => openProductDetails(listing)}
          >
            <div className="w-24 h-24 sm:w-36 sm:h-36 flex-shrink-0">
              <img 
                src={listing.image} 
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
                    <span>${listing.price}/{listing.rentalPeriod}</span>
                  </div>
                </div>
                <Badge variant={listing.status === 'active' ? 'success' : listing.status === 'pending' ? 'warning' : 'secondary'}>
                  {listing.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-auto text-sm">
                <div className="flex items-center text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{listing.views} views</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{listing.requests} requests</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Leaf className="h-4 w-4 mr-1" />
                  <span>+{listing.leafsEarned} earned</span>
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