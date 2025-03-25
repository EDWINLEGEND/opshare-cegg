import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, MapPin, Clock, DollarSign, X, Trash2, AlertCircle, 
  Heart, Share2, MessageCircle, Eye, Calendar, Award, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { getApiUrl, checkApiConnection } from '@/config/api';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Keep mock data as fallback during development
const mockProducts = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    description: 'High-quality camera for professional photography',
    price: 25,
    rentalPeriod: 'day',
    location: 'Downtown',
    distance: 1.2,
    rating: 4.9,
    reviews: 56,
    seller: {
      id: '101',
      name: 'John D.',
      rating: 4.8,
      verified: true,
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    available: true,
    condition: 'Like New',
    features: ['4K Video', '24.2MP', 'Wireless'],
    listingType: 'rent'
  },
  {
    id: '2',
    title: 'Mountain Bike',
    description: 'Great for trail riding and commuting',
    price: 15,
    rentalPeriod: 'day',
    location: 'Park Area',
    distance: 2.5,
    rating: 4.7,
    reviews: 28,
    seller: {
      id: '102',
      name: 'Emma S.',
      rating: 4.9,
      verified: true,
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    available: true,
    condition: 'Good',
    features: ['21 Speed', 'Disc Brakes', 'Aluminum Frame'],
    listingType: 'rent'
  },
  {
    id: '3',
    title: 'Camping Tent (4 Person)',
    description: 'Waterproof tent perfect for family camping',
    price: 20,
    rentalPeriod: 'day',
    location: 'North End',
    distance: 3.8,
    rating: 4.6,
    reviews: 42,
    seller: {
      id: '103',
      name: 'Robert T.',
      rating: 4.7,
      verified: true,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: 'Camping',
    images: [
      'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    available: true,
    condition: 'Excellent',
    features: ['Waterproof', 'Easy Setup', 'Carry Bag Included'],
    listingType: 'rent'
  }
];

// Group products by category
const productsByCategory = mockProducts.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});

// Get all unique categories
const categories = Object.keys(productsByCategory);

// Server Item interface
interface ServerItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rentalPeriod?: string;
  location?: string;
  distance?: number;
  rating?: number;
  reviews?: number;
  ownerId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  images?: string[];
  status: string;
  condition?: string;
  listingType?: string;
}

// Frontend processed item interface
interface ProcessedItem {
  id: string;
  title: string;
  description: string;
  price: number;
  rentalPeriod: string;
  location: string;
  distance: number;
  rating: number;
  reviews: number;
  seller: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
    image: string;
  };
  category: string;
  images: string[];
  available: boolean;
  condition: string;
  features: string[];
  listingType: string;
  // Additional mock data for the detail view
  viewCount?: number;
  datePosted?: string;
  reviewList?: {
    id: string;
    user: {
      name: string;
      image: string;
    };
    rating: number;
    date: string;
    comment: string;
  }[];
}

// Mock reviews data to enhance the product detail
const mockReviews = [
  {
    id: 'r1',
    user: {
      name: 'Alex M.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    rating: 5,
    date: '2 weeks ago',
    comment: 'This was exactly what I needed for my weekend project. Great condition and the owner was very helpful with pickup arrangements.'
  },
  {
    id: 'r2',
    user: {
      name: 'Sarah L.',
      image: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    rating: 4,
    date: '1 month ago',
    comment: 'Good quality item, would rent again. Only giving 4 stars because the battery life was a bit shorter than expected.'
  },
  {
    id: 'r3',
    user: {
      name: 'Marcus J.',
      image: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    rating: 5,
    date: '2 months ago',
    comment: 'Perfect! Saved me so much money by borrowing instead of buying. The owner provided a quick tutorial on how to use it properly.'
  }
];

const Browse = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // Add user context
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedProduct, setSelectedProduct] = useState<ProcessedItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // For tracking delete operation
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null); // Track which item is being deleted
  
  // New state for API data
  const [products, setProducts] = useState<ProcessedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [realCategories, setRealCategories] = useState<string[]>(['All']);
  const [apiAvailable, setApiAvailable] = useState(true);
  
  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // Check API availability first
  useEffect(() => {
    const checkApiAvailability = async () => {
      const isAvailable = await checkApiConnection();
      setApiAvailable(isAvailable);
      if (!isAvailable) {
        console.log('API not available, using mock data');
        setProducts(mockProducts);
        setRealCategories(['All', ...categories]);
        setLoading(false);
      }
    };
    
    checkApiAvailability();
  }, []);
  
  // Fetch products from API if API is available
  useEffect(() => {
    const fetchProducts = async () => {
      if (!apiAvailable) return;
      
      setLoading(true);
      try {
        // Build query parameters for filtering
        const queryParams = new URLSearchParams();
        
        if (selectedCategory && selectedCategory !== 'All') {
          queryParams.append('category', selectedCategory);
        }
        
        if (searchTerm) {
          queryParams.append('search', searchTerm);
        }
        
        // Fetch products from API using the config helper
        const response = await fetch(getApiUrl(`api/items?${queryParams}`));
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
          throw new Error(errorData.message || `Server error (${response.status})`);
        }
        
        const data = await response.json() as ServerItem[];
        console.log('Fetched data with filters:', { 
          selectedCategory, 
          searchTerm, 
          queryParams: queryParams.toString(),
          itemsCount: data.length 
        });
        
        // Process the data
        const processedData: ProcessedItem[] = data.map(item => ({
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          rentalPeriod: item.rentalPeriod || 'day',
          location: item.location || 'Local Area',
          distance: item.distance || 0,
          rating: item.rating || 5,
          reviews: item.reviews || 0,
          seller: {
            id: item.ownerId._id,
            name: `${item.ownerId.firstName} ${item.ownerId.lastName.charAt(0)}.`,
            rating: 5,
            verified: true,
            image: 'https://randomuser.me/api/portraits/people/1.jpg' // Default image
          },
          category: item.category,
          images: item.images && item.images.length > 0 
            ? item.images
            : ['https://via.placeholder.com/300x200?text=No+Image'],
          available: item.status === 'available',
          condition: item.condition || 'Good',
          features: [],
          listingType: item.listingType || 'rent'
        }));
        
        setProducts(processedData);
        
        // Extract categories
        const allCategories = ['All', ...new Set(data.map(item => item.category))];
        setRealCategories(allCategories);
        
        setLoading(false);
        setError('');
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        setLoading(false);
        
        // Fallback to mock data if API fails
        setProducts(mockProducts);
        setRealCategories(['All', ...categories]);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, searchTerm, apiAvailable]);
  
  // Display either real categories or mock categories based on API availability
  const displayCategories = realCategories.length > 1 ? realCategories : ['All', ...categories];
  
  // Display either API products or mock products
  const displayProducts = products.length > 0 ? products : mockProducts;
  
  // Function to handle category change
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    
    // Update the URL to reflect the category change without a full page reload
    if (newCategory === 'All') {
      navigate('/browse');
    } else {
      navigate(`/browse/${newCategory}`);
    }
  };

  // Function to open delete confirmation dialog
  const openDeleteConfirmation = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation(); // Prevent opening the product detail
    setItemToDelete(itemId);
    setShowConfirmDialog(true);
    setDeleteSuccess(false);
    setDeleteError('');
  };

  // Function to close delete confirmation dialog
  const closeDeleteConfirmation = () => {
    setShowConfirmDialog(false);
    // Wait a bit before resetting everything to allow animations to complete
    setTimeout(() => {
      setItemToDelete(null);
      setDeleteSuccess(false);
      setDeleteError('');
    }, 300);
  };

  // Function to confirm deletion of a listing
  const confirmDeleteListing = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    
    try {
      // Only attempt to call API if it's available
      if (apiAvailable) {
        const token = localStorage.getItem('token') || (user?.token || '');
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const response = await fetch(getApiUrl(`api/items/${itemToDelete}`), {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete listing');
        }
      } else {
        // Simulate API delay in offline mode
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // If we're here, either API call succeeded or we're in offline mode
      console.log(`Item ${itemToDelete} deleted successfully`);
      setDeleteSuccess(true);
      
      // Remove the item from the products list
      setProducts(prevProducts => prevProducts.filter(p => p.id !== itemToDelete));
      
      // Hide the dialog after a delay to show success message
      setTimeout(() => {
        closeDeleteConfirmation();
      }, 2000);
    } catch (err) {
      console.error('Error deleting listing:', err);
      setDeleteError(err.message || 'Failed to delete listing');
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to open product detail
  const openProductDetail = (product: ProcessedItem) => {
    setSelectedProduct(enhanceProductData(product));
  };

  // Function to close product detail
  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Render function for API connection error message
  const renderApiError = () => {
    if (!apiAvailable && !loading) {
      return (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-yellow-700">
              Unable to connect to the server. Showing sample data for demonstration purposes.
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Render function for the delete confirmation dialog
  const renderDeleteConfirmationDialog = () => {
    if (!showConfirmDialog) return null;
    
    return (
      <ConfirmationDialog
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        isSuccess={deleteSuccess}
        isError={!!deleteError}
        successMessage="Listing deleted successfully!"
        errorMessage={deleteError}
        onConfirm={confirmDeleteListing}
        onCancel={closeDeleteConfirmation}
      />
    );
  };

  // Enhance product data with additional detail info
  const enhanceProductData = (product: ProcessedItem): ProcessedItem => {
    return {
      ...product,
      viewCount: Math.floor(Math.random() * 200) + 50, // Random view count
      datePosted: '2 weeks ago',
      reviewList: mockReviews,
    };
  };
  
  // Render star rating component
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };
  
  // Render product detail modal
  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    
    return (
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && closeProductDetail()}>
        <DialogContent className="sm:max-w-[95%] md:max-w-[85%] lg:max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images Section */}
            <div className="bg-gray-100 p-4 lg:p-8 relative">
              <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-white/80 backdrop-blur p-2 hover:bg-white">
                <X className="h-4 w-4" />
              </DialogClose>
              
              <div className="relative h-80 sm:h-96 md:h-[500px] rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button className="bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                
                <div className="absolute top-4 left-4">
                  <Badge className={`${selectedProduct.listingType === 'rent' ? 'bg-blue-500' : 'bg-emerald-500'} hover:${selectedProduct.listingType === 'rent' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    {selectedProduct.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnails - would be shown if product had multiple images */}
              {selectedProduct.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {selectedProduct.images.map((img, index) => (
                    <div key={index} className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-white">
                      <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details Section */}
            <div className="p-4 lg:p-8 flex flex-col h-full">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedProduct.title}</h1>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-lg font-medium">{selectedProduct.rating}</span>
                    <span className="text-gray-500 ml-1">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{selectedProduct.viewCount} views</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Posted {selectedProduct.datePosted}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 mr-3">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={selectedProduct.seller.image} alt={selectedProduct.seller.name} />
                    <AvatarFallback>{selectedProduct.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{selectedProduct.seller.name}</span>
                    {selectedProduct.seller.verified && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {renderStars(selectedProduct.seller.rating)}
                    <span className="ml-1 text-sm text-gray-500">{selectedProduct.seller.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Price</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">${selectedProduct.price}</span>
                    {selectedProduct.listingType === 'rent' && (
                      <span className="text-gray-600 ml-1">/{selectedProduct.rentalPeriod}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Location</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-gray-900">{selectedProduct.location}</span>
                    <span className="text-gray-600 ml-1">({selectedProduct.distance} miles)</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Condition</span>
                  <span className="text-gray-900">{selectedProduct.condition}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Category</span>
                  <span className="text-gray-900">{selectedProduct.category}</span>
                </div>
              </div>
              
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">{selectedProduct.description}</p>
              </div>
              
              <div className="mt-auto space-y-3">
                <Button className={`w-full ${selectedProduct.listingType === 'rent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`} size="lg">
                  {selectedProduct.listingType === 'rent' ? (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Rent Now
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Buy Now
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Seller
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabs for Reviews, Shipping, Return Policy */}
          <div className="border-t p-4 lg:p-8">
            <Tabs defaultValue="reviews">
              <TabsList className="mb-6">
                <TabsTrigger value="reviews" className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Reviews ({selectedProduct.reviewList?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Shipping & Pickup
                </TabsTrigger>
                <TabsTrigger value="policy" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Return Policy
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold">{selectedProduct.rating.toFixed(1)}</h3>
                        <span className="text-gray-500 ml-2">out of 5</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {renderStars(selectedProduct.rating)}
                        <span className="ml-2 text-gray-500">Based on {selectedProduct.reviews} reviews</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block space-y-2 w-64">
                      {[5, 4, 3, 2, 1].map(num => (
                        <div key={num} className="flex items-center">
                          <span className="text-sm text-gray-500 w-2">{num}</span>
                          <Star className="h-4 w-4 text-gray-400 ml-1 mr-2" />
                          <Progress 
                            value={num === 5 ? 75 : num === 4 ? 20 : num === 3 ? 5 : 0} 
                            className="h-2 w-full" 
                          />
                          <span className="text-sm text-gray-500 ml-2 w-8">
                            {num === 5 ? '75%' : num === 4 ? '20%' : num === 3 ? '5%' : '0%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedProduct.reviewList?.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.user.image} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium">{review.user.name}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{review.comment}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  See all reviews
                </Button>
              </TabsContent>
              
              <TabsContent value="shipping" className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 flex">
                  <Truck className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                  <p className="text-blue-800">
                    This item {selectedProduct.listingType === 'rent' ? 'can be picked up locally' : 'can be shipped or picked up locally'}. Coordinate with the seller for details.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Pickup Options</h3>
                  <p className="text-gray-600 mb-4">Meet the seller at a safe public location. We recommend:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Police stations or public buildings</li>
                    <li>Shopping malls or busy retail locations</li>
                    <li>Coffee shops or restaurants during daylight hours</li>
                  </ul>
                </div>
                
                {selectedProduct.listingType !== 'rent' && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Shipping Options</h3>
                    <p className="text-gray-600 mb-4">If shipping is available, the following options might apply:</p>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 border rounded-lg">
                        <span>Standard Shipping</span>
                        <span>3-5 business days</span>
                      </div>
                      <div className="flex justify-between p-3 border rounded-lg">
                        <span>Express Shipping</span>
                        <span>1-2 business days</span>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="policy" className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4 flex">
                  <RotateCcw className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                  <p className="text-orange-800">
                    Return policies are set by individual sellers and may vary. Always confirm the policy before completing your transaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Common Policies</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><span className="font-medium">For rentals:</span> Inspect the item at pickup. Report any issues immediately.</li>
                    <li><span className="font-medium">For purchases:</span> Typically 7-14 days return window if item is not as described.</li>
                    <li><span className="font-medium">Condition:</span> Items should be returned in the same condition as received.</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium mb-2">This Seller's Policy</h3>
                  <p className="text-gray-600">
                    {selectedProduct.listingType === 'rent' 
                      ? "Rental items must be returned in the same condition. Security deposit may be required."
                      : "This seller accepts returns within 7 days if the item is not as described."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">Find the perfect items to borrow or buy</p>
        </div>
        
        {/* API error message */}
        {renderApiError()}
        
        {/* Rest of the component remains the same */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
                <input
                  type="text"
              className="pl-10 block w-full rounded-lg border-gray-300 bg-white py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Search for items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
            />
      </div>
      
          <div className="flex gap-2">
            <div className="relative inline-block text-left">
              <button
                className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="category-button"
                aria-expanded={showCategoryDropdown}
                aria-haspopup="true"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                {selectedCategory}
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {displayCategories.map((cat) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${selectedCategory === cat ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                        key={cat}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryChange(cat);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              </div>
            
            <button
              className="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 text-gray-400" />
              Filters
              {showFilters ? (
                <ChevronDown className="h-5 w-5 text-gray-400 transform rotate-180" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
                  </div>
                </div>
              
        {/* Show loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-600">Loading items...</p>
                          </div>
                        )}
                        
        {/* Show error state */}
        {error && !loading && (
          <div className="text-center py-10">
            <div className="mb-4 text-red-500">
              <AlertCircle className="h-12 w-12 mx-auto" />
                        </div>
            <h3 className="text-lg font-medium text-gray-900">Error loading items</h3>
            <p className="mt-1 text-gray-500">{error}</p>
                          <button
              onClick={() => window.location.reload()} 
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Try Again
                          </button>
                        </div>
        )}
        
        {/* No items found */}
        {!loading && !error && displayProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-gray-500">Try changing your search or filter criteria</p>
          </div>
        )}
        
        {/* Display products grid */}
        {!loading && !error && displayProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openProductDetail(product)}
              >
                <div className="relative h-48">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {user && user.id === product.seller.id && (
                    <button
                      className="absolute top-2 right-2 p-1.5 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                      onClick={(e) => openDeleteConfirmation(e, product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{product.location} ({product.distance} miles)</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{product.listingType === 'rent' ? 'Rental' : 'For Sale'}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4 text-gray-900" />
                      <span className="text-gray-900">{product.price}</span>
                      {product.listingType === 'rent' && (
                        <span className="text-gray-500 text-sm ml-1">/{product.rentalPeriod}</span>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {renderDeleteConfirmationDialog()}
        {renderProductDetail()}
      </div>
    </div>
  );
};

export default Browse;