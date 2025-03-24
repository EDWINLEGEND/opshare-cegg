import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, MapPin, Clock, DollarSign, X, Trash2 } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';

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
        
        // Fetch products from API
        const response = await fetch(`http://localhost:5000/api/items?${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
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
            ? item.images.map(img => `http://localhost:5000${img}`) 
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
        setProducts(mockProducts as unknown as ProcessedItem[]);
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
      
      const response = await fetch(`http://localhost:5000/api/items/${itemToDelete}`, {
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
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-white mb-6">Browse Items</h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pl-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${
              selectedCategory === 'All'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {realCategories.filter(cat => cat !== 'All').map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters and results */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden text-gray-500"
                >
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
                {/* Distance filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Distance: {maxDistance} miles
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 mile</span>
                    <span>20 miles</span>
                  </div>
                </div>

                {/* Price range filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 p-2 border rounded-md"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 p-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* More filters can be added here */}
              </div>
            </div>
          </div>

          {/* Results grid */}
          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredProducts.length} items found`}
              </p>
              <div className="flex items-center">
                <label className="mr-2 text-sm text-gray-600">Sort by:</label>
                <select className="border rounded-md p-2 text-sm">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Distance: Nearest</option>
                  <option>Rating: Highest</option>
                </select>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="text-center p-8 bg-red-50 rounded-lg">
                <p className="text-red-500">{error}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500 mb-4">No items found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setMaxDistance(10);
                    setPriceRange([0, 100]);
                  }}
                  className="text-green-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Results grid */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
                    onClick={() => openProductDetail(product)}
                  >
                    {/* Add delete button for user's own listings */}
                    {user && user.id && product.seller.id && (user.id === product.seller.id) && (
                      <button
                        className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                        onClick={(e) => openDeleteConfirmation(e, product.id)}
                        disabled={isDeleting && deletingItemId === product.id}
                      >
                        {isDeleting && deletingItemId === product.id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    )}
                    
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={product.images && product.images.length > 0 ? product.images[0] : ''}
                        alt={product.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Category-specific fallback images
                          const fallbacks = {
                            "Tools": "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            "Outdoor": "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            "Home & Garden": "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                          };
                          e.currentTarget.src = fallbacks[product.category] || "https://via.placeholder.com/400x300?text=No+Image";
                          e.currentTarget.onerror = null;
                        }}
                      />
                      
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                        {product.category}
                      </div>
                      
                      {product.listingType === 'sell' && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                          For Sale
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign size={16} className="mr-1" />
                          <span>{product.price}</span>
                          <span className="text-gray-500 font-normal ml-1">/{product.rentalPeriod}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <Star size={16} className="mr-1" fill="currentColor" />
                          <span>{product.rating}</span>
                          <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          <span>{product.distance} miles</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>Available Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
              <button 
                onClick={closeProductDetail}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Image gallery */}
              <div className="mb-6">
                <div className="aspect-video rounded-lg overflow-hidden mb-2">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedProduct.images.map((image, index) => (
                    <div 
                      key={index}
                      className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-green-600 cursor-pointer"
                    >
                      <img 
                        src={image} 
                        alt={`${selectedProduct.title} - image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-amber-500">
                      <Star size={20} className="mr-1" fill="currentColor" />
                      <span className="font-medium">{selectedProduct.rating}</span>
                      <span className="text-gray-500 ml-1">({selectedProduct.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={20} className="mr-1" />
                      <span>{selectedProduct.location} ({selectedProduct.distance} miles away)</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProduct.features && selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Condition</h4>
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {selectedProduct.condition}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${selectedProduct.price}<span className="text-gray-500 text-base font-normal">/{selectedProduct.rentalPeriod}</span>
                  </div>
                  
                  <div className="border-t border-b py-4 my-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src={selectedProduct.seller.image} 
                        alt={selectedProduct.seller.name} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{selectedProduct.seller.name}</div>
                        <div className="flex items-center text-sm">
                          <Star size={14} className="text-amber-500 mr-1" fill="currentColor" />
                          <span>{selectedProduct.seller.rating}</span>
                          {selectedProduct.seller.verified && (
                            <span className="ml-2 text-green-600 text-xs font-medium">Verified</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="w-full text-green-600 border border-green-600 py-2 rounded-lg font-medium hover:bg-green-50">
                      View Profile
                    </button>
                  </div>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mb-3">
                    {selectedProduct.listingType === 'rent' ? 'Rent Now' : 'Buy Now'}
                  </button>
                  <button className="w-full border py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        title={deleteSuccess ? "Success!" : "Delete Listing"}
        message={
          deleteSuccess 
            ? "Your listing has been successfully deleted." 
            : deleteError 
              ? `Error: ${deleteError}` 
              : "Are you sure you want to delete this listing? This action cannot be undone."
        }
        confirmText={deleteSuccess ? "OK" : "Delete"}
        cancelText="Cancel"
        onConfirm={deleteSuccess ? closeDeleteConfirmation : confirmDeleteListing}
        onCancel={closeDeleteConfirmation}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Browse;