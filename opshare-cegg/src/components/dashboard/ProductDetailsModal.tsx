import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, MessageSquare, Leaf, DollarSign, Calendar, MapPin, User, Clock } from 'lucide-react';
import { getApiUrl } from '@/config/api';

interface ProductDetailsModalProps {
  product: any; // Replace with proper product type
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl">{product.title}</DialogTitle>
            <Badge variant={product.status === 'active' ? 'success' : 'secondary'}>
              {product.status}
            </Badge>
          </div>
          <DialogDescription className="flex items-center">
            <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
            <span className="font-medium">${product.price}/{product.rentalPeriod}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Product Image */}
          <div className="rounded-md overflow-hidden">
            <img 
              src={product.images && product.images.length > 0 
                ? (product.images[0].startsWith('http')
                    ? product.images[0]
                    : getApiUrl(product.images[0]))
                : product.image || 'https://via.placeholder.com/300?text=No+Image'} 
              alt={product.title} 
              className="w-full h-auto max-h-[300px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Product Details</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Listed: {new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>Location: {product.location || 'Not specified'}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span>Condition: {product.condition || 'Good'}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Min. rental: 1 {product.rentalPeriod}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="font-medium">Performance</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-700">
                  <Eye className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{product.views} views</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{product.requests} requests</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Leaf className="h-4 w-4 mr-1" />
                  <span>+{product.leafsEarned} earned</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-700">
                {product.description || 
                  `This ${product.title} is available for rent at $${product.price} per ${product.rentalPeriod}. 
                  Contact for more details about specifications and availability.`}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="requests" className="w-full mt-6">
          <TabsList>
            <TabsTrigger value="requests">Rental Requests</TabsTrigger>
            <TabsTrigger value="history">Rental History</TabsTrigger>
            <TabsTrigger value="settings">Item Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="py-4">
            {product.requests > 0 ? (
              <div className="space-y-3">
                {Array(product.requests).fill(0).map((_, i) => (
                  <div key={i} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${10 + i}.jpg`}
                      alt="User" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">User Name</div>
                      <div className="text-sm text-gray-600">Requested for 3 days starting May 15</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600">Accept</Button>
                      <Button size="sm" variant="outline" className="text-red-600">Decline</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No rental requests yet.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="py-4">
            <div className="text-center py-8 text-gray-500">
              No rental history available for this item.
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Edit Listing
                </Button>
                <Button variant="outline" className="w-full text-amber-600">
                  Mark as Unavailable
                </Button>
                <Button variant="outline" className="w-full text-red-600">
                  Remove Listing
                </Button>
                <Button variant="outline" className="w-full text-purple-600">
                  Boost Visibility
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => window.location.href = `/listings/${product.id}/manage`}>
            Manage Listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal; 