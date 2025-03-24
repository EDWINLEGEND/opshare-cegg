import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, MapPin, Clock, DollarSign, X } from 'lucide-react';

// Mock data for products with images
const mockProducts = [
  {
    id: '1',
    title: 'Power Drill - Professional Grade',
    description: 'Heavy-duty power drill, perfect for home projects and construction work.',
    price: 15,
    rentalPeriod: 'day',
    location: 'Downtown',
    distance: 1.2,
    rating: 4.8,
    reviews: 24,
    seller: {
      id: 's1',
      name: 'Mike T.',
      rating: 4.9,
      verified: true,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: 'Tools',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590599145008-e4ec48682067?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Excellent',
    features: ['Variable speed', '20V battery included', 'Carrying case']
  },
  {
    id: '2',
    title: 'Mountain Bike - Trek 820',
    description: 'Great mountain bike for weekend adventures. Well maintained and ready to ride.',
    price: 25,
    rentalPeriod: 'day',
    location: 'Riverside Park',
    distance: 2.5,
    rating: 4.6,
    reviews: 18,
    seller: {
      id: 's2',
      name: 'Sarah K.',
      rating: 4.7,
      verified: true,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    category: 'Outdoor',
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Good',
    features: ['21-speed', 'Front suspension', 'Helmet included']
  },
  {
    id: '3',
    title: 'DSLR Camera - Canon EOS 80D',
    description: 'Professional camera with 18-135mm lens. Perfect for photography enthusiasts.',
    price: 40,
    rentalPeriod: 'day',
    location: 'Arts District',
    distance: 3.7,
    rating: 4.9,
    reviews: 32,
    seller: {
      id: 's3',
      name: 'David L.',
      rating: 5.0,
      verified: true,
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Like New',
    features: ['24.2MP sensor', '1080p video', 'Extra battery', 'Memory card included']
  },
  {
    id: '4',
    title: 'Stand Mixer - KitchenAid Professional',
    description: 'Powerful stand mixer for all your baking needs. Multiple attachments included.',
    price: 20,
    rentalPeriod: 'day',
    location: 'Northside',
    distance: 4.1,
    rating: 4.7,
    reviews: 15,
    seller: {
      id: 's4',
      name: 'Jessica M.',
      rating: 4.8,
      verified: true,
      image: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1558138838-76294be30005?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578738288760-05ce9be719d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591223285322-f8d3cc4d8b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Excellent',
    features: ['5-quart capacity', '10 speeds', 'Includes whisk, dough hook, and paddle attachments']
  },
  {
    id: '5',
    title: 'Camping Tent - 4 Person',
    description: 'Spacious 4-person tent, easy to set up. Waterproof and perfect for weekend getaways.',
    price: 30,
    rentalPeriod: 'day',
    location: 'Green Valley',
    distance: 5.3,
    rating: 4.5,
    reviews: 12,
    seller: {
      id: 's5',
      name: 'Alex R.',
      rating: 4.6,
      verified: false,
      image: 'https://randomuser.me/api/portraits/men/52.jpg'
    },
    category: 'Outdoor',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Good',
    features: ['Waterproof', 'UV protection', 'Includes carrying bag', 'Setup instructions']
  },
  {
    id: '6',
    title: 'Pressure Washer - 2000 PSI',
    description: 'Electric pressure washer, great for cleaning driveways, decks, and vehicles.',
    price: 35,
    rentalPeriod: 'day',
    location: 'Westside',
    distance: 3.2,
    rating: 4.4,
    reviews: 9,
    seller: {
      id: 's6',
      name: 'Tom B.',
      rating: 4.5,
      verified: true,
      image: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    category: 'Tools',
    images: [
      'https://images.unsplash.com/photo-1621976360623-004223992275?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558624232-75ee22af7e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Good',
    features: ['2000 PSI', 'Multiple nozzles', '20ft hose', 'Detergent tank']
  },
  {
    id: '7',
    title: 'Projector - 1080p HD',
    description: 'High-definition projector for movie nights and presentations. HDMI and USB inputs.',
    price: 25,
    rentalPeriod: 'day',
    location: 'Tech District',
    distance: 2.8,
    rating: 4.7,
    reviews: 21,
    seller: {
      id: 's7',
      name: 'Emma W.',
      rating: 4.9,
      verified: true,
      image: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601944179066-29b8f7e29c3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Excellent',
    features: ['1080p resolution', 'Built-in speaker', '120" display', 'HDMI cable included']
  },
  {
    id: '8',
    title: 'Ladder - 8ft Aluminum',
    description: 'Sturdy aluminum ladder, extends to 8 feet. Perfect for home maintenance tasks.',
    price: 12,
    rentalPeriod: 'day',
    location: 'Eastside',
    distance: 4.5,
    rating: 4.3,
    reviews: 7,
    seller: {
      id: 's8',
      name: 'Ryan K.',
      rating: 4.4,
      verified: false,
      image: 'https://randomuser.me/api/portraits/men/77.jpg'
    },
    category: 'Tools',
    images: [
      'https://images.unsplash.com/photo-1620219365994-f451bdb5f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598521145507-96c181e0c8f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116493-a029325540fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    available: true,
    condition: 'Good',
    features: ['8ft height', 'Non-slip feet', 'Lightweight aluminum', '225lb capacity']
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

const Browse = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [showFilters, setShowFilters] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Filter products based on search term, category, and filters
  const filteredProducts = mockProducts.filter(product => {
    // Filter by search term
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Filter by distance
    const matchesDistance = product.distance <= maxDistance;
    
    // Filter by price
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesDistance && matchesPrice;
  });

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    navigate(newCategory === 'All' ? '/browse' : `/browse/${newCategory}`);
  };

  // Open product detail modal
  const openProductDetail = (product) => {
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
          {categories.map((cat) => (
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
              <p className="text-gray-600">{filteredProducts.length} items found</p>
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

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openProductDetail(product)}
                  >
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
                            "Home & Kitchen": "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                          };
                          e.currentTarget.src = fallbacks[product.category] || "https://via.placeholder.com/400x300?text=No+Image";
                          e.currentTarget.onerror = null;
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                        {product.category}
                      </div>
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
            ) : (
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
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
                <div className="h-80 overflow-hidden rounded-lg mb-2">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain bg-gray-100"
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
                        alt={`${selectedProduct.title} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">{selectedProduct.title}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-amber-500 mr-4">
                      <Star size={18} className="mr-1" fill="currentColor" />
                      <span className="font-medium">{selectedProduct.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({selectedProduct.reviews} reviews)</span>
                    </div>
                    <div className="text-gray-500 flex items-center">
                      <MapPin size={16} className="mr-1" />
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
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
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
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProduct.seller.name)}&background=0D8ABC&color=fff`;
                          e.currentTarget.onerror = null;
                        }}
                      />
                      <div>
                        <div className="font-medium">{selectedProduct.seller.name}</div>
                        <div className="flex items-center text-sm">
                          <Star size={14} className="text-amber-500 mr-1" fill="currentColor" />
                          <span>{selectedProduct.seller.rating}</span>
                          {selectedProduct.seller.verified && (
                            <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mb-3">
                    Rent Now
                  </button>
                  <button className="w-full bg-white border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-medium mb-3">
                    Message Seller
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium">
                    Save for Later
                  </button>
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