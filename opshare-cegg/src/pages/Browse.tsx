import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, MapPin, Clock, DollarSign, X, Trash2, AlertCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { getApiUrl, checkApiConnection } from '@/config/api';

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
}

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
    setSelectedProduct(product);
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
        </div>
    </div>
  );
};

export default Browse;