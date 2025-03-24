import React, { useState, useRef } from 'react';
import { X, Plus, Upload, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const SellForm = () => {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [listingType, setListingType] = useState('rent'); // 'rent' or 'sell'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();
  
  // Form refs
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const conditionRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const rentalPriceRef = useRef(null);
  const rentalPeriodRef = useRef(null);
  const securityDepositRef = useRef(null);
  const salePriceRef = useRef(null);
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Just for demo - in real app, you'd upload to server/storage
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file
    }));
    
    setUploadedImages([...uploadedImages, ...newImages]);
  };
  
  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter(image => image.id !== id));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Check if user is authenticated
    if (!user || !user.token) {
      setError('You must be logged in to create a listing');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Validate form inputs
      if (!titleRef.current.value) {
        setError('Please enter a title');
        setIsSubmitting(false);
        return;
      }
      
      if (!categoryRef.current.value) {
        setError('Please select a category');
        setIsSubmitting(false);
        return;
      }
      
      if (!conditionRef.current.value) {
        setError('Please select an item condition');
        setIsSubmitting(false);
        return;
      }
      
      if (!locationRef.current.value) {
        setError('Please enter a location');
        setIsSubmitting(false);
        return;
      }
      
      // Create form data object
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', titleRef.current.value);
      formData.append('category', categoryRef.current.value);
      formData.append('condition', conditionRef.current.value);
      formData.append('description', descriptionRef.current.value);
      formData.append('listingType', listingType);
      formData.append('location', locationRef.current.value);
      
      if (listingType === 'rent') {
        if (!rentalPriceRef.current.value) {
          setError('Please enter a rental price');
          setIsSubmitting(false);
          return;
        }
        formData.append('price', rentalPriceRef.current.value);
        formData.append('rentalPeriod', rentalPeriodRef.current.value);
        if (securityDepositRef.current.value) {
          formData.append('securityDeposit', securityDepositRef.current.value);
        }
      } else {
        if (!salePriceRef.current.value) {
          setError('Please enter a sale price');
          setIsSubmitting(false);
          return;
        }
        formData.append('price', salePriceRef.current.value);
      }
      
      // Add image files
      if (uploadedImages.length === 0) {
        setError('Please upload at least one image');
        setIsSubmitting(false);
        return;
      }
      
      uploadedImages.forEach(image => {
        formData.append('images', image.file);
      });
      
      console.log('Submitting form data...');
      
      // Send data to server
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Log the full error response for debugging
        console.error('Server error response:', data);
        throw new Error(data.message || 'Failed to create listing');
      }
      
      // Log successful listing creation
      console.log('Listing created successfully:', data);
      
      // Wait a brief moment to ensure the server has processed the request
      setTimeout(() => {
        // Redirect to browse page
        console.log('Redirecting to browse page...');
        navigate('/browse');
      }, 500);
    } catch (err) {
      // Log the full error for debugging
      console.error('Complete error details:', err);
      
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold">Create a Listing</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 text-red-500">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Listing type selection */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Listing Type</h2>
              <p className="text-gray-600 mb-4">
                Choose whether you want to rent out your item or sell it outright.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setListingType('rent')}
                  className={`flex-1 p-4 rounded-lg border-2 ${
                    listingType === 'rent' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="font-medium text-lg mb-2">Rent</h3>
                  <p className="text-sm text-gray-600">
                    Lend your item to others for a period of time
                  </p>
                </button>
                
                <button
                  type="button"
                  onClick={() => setListingType('sell')}
                  className={`flex-1 p-4 rounded-lg border-2 ${
                    listingType === 'sell' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="font-medium text-lg mb-2">Sell</h3>
                  <p className="text-sm text-gray-600">
                    Sell your item outright for a one-time payment
                  </p>
                </button>
              </div>
            </div>
            
            {/* Image upload */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Upload Photos</h2>
              <p className="text-gray-600 mb-4">
                Add up to 5 photos of your item. The first image will be your listing's cover photo.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-4">
                {uploadedImages.map(image => (
                  <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={image.url} alt="Uploaded" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {uploadedImages.length < 5 && (
                  <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square hover:bg-gray-100">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center px-1">Add Photo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      multiple={uploadedImages.length < 4}
                    />
                  </label>
                )}
              </div>
            </div>
            
            {/* Item details */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Item Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    ref={titleRef}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="Enter a descriptive title (e.g. 'Bosch Electric Drill')"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    ref={locationRef}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="Enter your location (e.g. 'Downtown, New York')"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      ref={categoryRef}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="tools">Tools</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="home">Home & Garden</option>
                      <option value="electronics">Electronics</option>
                      <option value="sports">Sports & Fitness</option>
                      <option value="party">Party & Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <select
                      id="condition"
                      ref={conditionRef}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="new">New / Like New</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    ref={descriptionRef}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="Describe your item in detail. Include brand, model, features, etc."
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Pricing</h2>
              
              {listingType === 'rent' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Rental Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          id="rentalPrice"
                          ref={rentalPriceRef}
                          min="0"
                          step="0.01"
                          className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="rentalPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                        Per
                      </label>
                      <select
                        id="rentalPeriod"
                        ref={rentalPeriodRef}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        required
                      >
                        <option value="hour">Hour</option>
                        <option value="day" selected>Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700 mb-1">
                      Security Deposit (optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        id="securityDeposit"
                        ref={securityDepositRef}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      A security deposit helps protect your item and will be refunded when the item is returned in good condition.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price
                  </label>
                  <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="salePrice"
                      ref={salePriceRef}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit button */}
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary text-lg py-3 px-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Creating Listing...' : 'Publish Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellForm;