import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, MapPin, Clock, DollarSign, X, Trash2 } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { getApiUrl } from '@/config/api';

// Keep mock data as fallback during development
const mockProducts = [
  // ... (rest of the mock data remains the same)
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
  
  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
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
            ? item.images.map(img => {
                // Check if the image URL is already a full URL (Cloudinary) or a local path
                return img.startsWith('http') 
                  ? img // Already a full URL (Cloudinary)
                  : `${getApiUrl(img)}`; // Local path that needs the server prefix
              }) 
            : ['https://via.placeholder.com/800x600?text=No+Image+Available'],
          available: item.status === 'available',
          condition: item.condition || 'Good',
          features: [],
          listingType: item.listingType || 'rent'
        }));
        
        setProducts(processedData);
        
        // Extract unique categories from data
        const categorySet = new Set<string>(['All']);
        data.forEach(item => {
          if (item.category) {
            categorySet.add(item.category);
          }
        });
        const uniqueCategories = Array.from(categorySet);
        setRealCategories(uniqueCategories);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load listings. Please try again later.');
        // Fall back to mock data in development
        if (process.env.NODE_ENV !== 'production') {
          setProducts(mockProducts as unknown as ProcessedItem[]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
  }, [category]);

  // Filter products based on filters only (search term and category used in API)
  const filteredProducts = products.filter(product => {
    // Filter by distance
    const matchesDistance = product.distance <= maxDistance;
    
    // Filter by price
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesDistance && matchesPrice;
  });

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    console.log('Changing category to:', newCategory);
    setSelectedCategory(newCategory);
    
    // Update URL
    if (newCategory === 'All') {
      navigate('/browse');
    } else {
      navigate(`/browse/${newCategory}`);
    }
  };

  // Open delete confirmation dialog
  const openDeleteConfirmation = (e: React.MouseEvent, listingId: string) => {
    e.stopPropagation(); // Prevent opening the product detail
    setItemToDelete(listingId);
    setShowConfirmDialog(true);
    setDeleteError('');
    setDeleteSuccess(false);
  };

  // Close delete confirmation dialog
  const closeDeleteConfirmation = () => {
    setShowConfirmDialog(false);
    setItemToDelete(null);
    setDeleteError('');
    
    // If deletion was successful, reset the success state after dialog closes
    if (deleteSuccess) {
      setTimeout(() => setDeleteSuccess(false), 300);
    }
  };

  // Delete listing
  const confirmDeleteListing = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    setDeletingItemId(itemToDelete);
    
    try {
      if (!user || !user.token) {
        throw new Error('You must be logged in to delete a listing');
      }
      
      const response = await fetch(getApiUrl(`api/items/${itemToDelete}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || 'Failed to delete listing');
      }
      
      // Remove the deleted item from the state
      setProducts(prevProducts => prevProducts.filter(product => product.id !== itemToDelete));
      setDeleteSuccess(true);
      
      // Close the dialog after a short delay to show success state
      setTimeout(() => {
        setShowConfirmDialog(false);
        setItemToDelete(null);
      }, 1000);
      
    } catch (err) {
      console.error('Error deleting listing:', err);
      setDeleteError(err.message || 'Something went wrong while deleting the listing');
    } finally {
      setIsDeleting(false);
      setDeletingItemId(null);
    }
  };

  // Open product detail modal
  const openProductDetail = (product: ProcessedItem) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close product detail modal
  const closeProductDetail = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with search */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find what you need</h1>
            <p className="text-green-100 text-xl mb-8">
              Browse thousands of items available to rent or buy from your community
            </p>
            
            {/* Search form */}
            <div className="max-w-xl mx-auto">
              <div className="flex bg-white rounded-lg shadow-lg p-1 overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-3 focus:outline-none"
                />
                <button
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-md flex items-center transition-all font-medium shadow-md"
                  onClick={fetchProducts}
                >
                  <Search size={18} className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row">
          {/* Filters sidebar */}
          <div className="lg:w-64 mb-8 lg:mb-0 lg:mr-8">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Filter size={20} className="mr-2 text-green-600" />
                Filters
              </h2>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-700">Category</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={() => handleCategoryChange('all')}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2 text-gray-700">All Categories</span>
                  </label>
                  
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="form-radio h-4 w-4 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-700">Price Range</h3>
                <div className="flex items-center">
                  <div className="flex-1 mr-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                    />
                  </div>
                  <span className="text-gray-500 mx-1">-</span>
                  <div className="flex-1 ml-2">
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              {/* Distance filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-700">Maximum Distance</h3>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="ml-2 min-w-[40px] text-gray-700">{maxDistance} mi</span>
                </div>
              </div>

              {/* Listing type filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-700">Listing Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory === 'rent'}
                      onChange={() => handleCategoryChange('rent')}
                      className="form-checkbox h-4 w-4 text-green-600 rounded"
                    />
                    <span className="ml-2 text-gray-700">For Rent</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategory === 'buy'}
                      onChange={() => handleCategoryChange('buy')}
                      className="form-checkbox h-4 w-4 text-green-600 rounded"
                    />
                    <span className="ml-2 text-gray-700">For Sale</span>
                  </label>
                </div>
              </div>

              {/* Apply filters button */}
              <button
                onClick={fetchProducts}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
              >
                Apply Filters
              </button>
              
              {/* Clear filters button */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setMaxDistance(10);
                  setPriceRange([0, 100]);
                }}
                className="w-full mt-2 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try clearing some filters or changing your search query.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {products.length} {products.length === 1 ? 'Item' : 'Items'} Found
                  </h2>
                  <div className="flex items-center">
                    <label className="text-sm text-gray-700 mr-2">Sort by:</label>
                    <select
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <option value="All">Relevance</option>
                      <option value="rent">Price: Low to High</option>
                      <option value="buy">Price: High to Low</option>
                      <option value="All">Distance: Nearest</option>
                      <option value="All">Rating: Highest</option>
                    </select>
                  </div>
                </div>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                    >
                      {/* Product image */}
                      <div 
                        className="h-48 bg-gray-200 relative cursor-pointer"
                        onClick={() => openProductDetail(product)}
                      >
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                          </div>
                        )}
                        
                        {/* Listing type badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            product.listingType === 'rent' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-green-500 text-white'
                          }`}>
                            {product.listingType === 'rent' ? 'Rental' : 'For Sale'}
                          </span>
                        </div>
                        
                        {/* Delete button for user's own listings */}
                        {product.seller.id === (user?.id || '') && (
                          <button
                            onClick={(e) => openDeleteConfirmation(e, product.id)}
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      {/* Product info */}
                      <div className="p-5 cursor-pointer" onClick={() => openProductDetail(product)}>
                        <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">{product.title}</h3>
                        
                        <div className="mb-3 flex items-center">
                          <span className="flex items-center text-amber-500 mr-1">
                            <Star size={16} className="fill-amber-500" />
                            <span className="ml-1 text-sm font-medium">{product.rating.toFixed(1)}</span>
                          </span>
                          <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                        </div>
                        
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin size={16} className="mr-1 text-gray-400" />
                          <span>{product.location} ({product.distance} mi away)</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-green-600">
                            ${product.price.toFixed(2)} 
                            {product.listingType === 'rent' && (
                              <span className="text-sm font-normal text-gray-500">
                                /{product.rentalPeriod}
                              </span>
                            )}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openProductDetail(product);
                            }}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <ConfirmationDialog 
        isOpen={showConfirmDialog}
        title="Delete Listing"
        message={
          deleteSuccess 
            ? "Your listing has been successfully deleted." 
            : deleteError 
              ? `Error: ${deleteError}` 
              : "Are you sure you want to delete this listing? This action cannot be undone."
        }
        confirmLabel={deleteSuccess ? "OK" : "Delete"}
        cancelLabel="Cancel"
        onConfirm={deleteSuccess ? closeDeleteConfirmation : confirmDeleteListing}
        onCancel={closeDeleteConfirmation}
      />
      
      {/* Product detail dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">{selectedProduct.title}</h2>
              <button 
                onClick={closeProductDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product images */}
                <div>
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    <div className="mb-4">
                      <img 
                        src={selectedProduct.images[0]} 
                        alt={selectedProduct.title} 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      
                      {selectedProduct.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {selectedProduct.images.slice(1).map((image, index) => (
                            <img 
                              key={index} 
                              src={image} 
                              alt={`${selectedProduct.title} - ${index+1}`} 
                              className="h-20 w-full object-cover rounded-md"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                      No Image
                    </div>
                  )}
                </div>
                
                {/* Product details */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-2xl text-gray-800">{selectedProduct.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="flex items-center text-amber-500">
                          <Star size={18} className="fill-amber-500" />
                          <span className="ml-1 font-medium">{selectedProduct.rating.toFixed(1)}</span>
                        </span>
                        <span className="text-gray-500 ml-1">({selectedProduct.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${selectedProduct.price.toFixed(2)}
                      </div>
                      {selectedProduct.listingType === 'rent' && (
                        <div className="text-sm text-gray-500">
                          per {selectedProduct.rentalPeriod}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Details</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-24">Category:</span>
                          <span className="text-gray-600">{selectedProduct.category}</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-24">Condition:</span>
                          <span className="text-gray-600">{selectedProduct.condition}</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 w-24">Listing Type:</span>
                          <span className="text-gray-600">
                            {selectedProduct.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Location</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <MapPin size={16} className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">{selectedProduct.location}</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <Clock size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">{selectedProduct.distance} miles away</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Seller Information</h4>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        {selectedProduct.seller.image ? (
                          <img 
                            src={selectedProduct.seller.image} 
                            alt={selectedProduct.seller.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium">
                            {selectedProduct.seller.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {selectedProduct.seller.name}
                          {selectedProduct.seller.verified && (
                            <span className="ml-1 text-blue-500 text-sm">(Verified)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedProduct.seller.rating.toFixed(1)} seller rating
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {/* Contact buttons */}
                    <button
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium flex items-center justify-center"
                    >
                      Contact Seller
                    </button>
                    
                    {selectedProduct.listingType === 'rent' ? (
                      <button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium flex items-center justify-center"
                      >
                        Request Rental
                      </button>
                    ) : (
                      <button 
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium flex items-center justify-center"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;