import React, { useState, useRef } from 'react';
import { X, Plus, Upload, ArrowLeft, ImagePlus, Banknote, Tag, Info, MapPin, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getApiUrl } from '@/config/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      const response = await fetch(getApiUrl('api/items'), {
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
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="mr-4 text-gray-600 hover:text-gray-900">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Create a Listing</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Listing type selection */}
            <Card className="mb-6 shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <Tag className="mr-2 h-5 w-5 text-gray-700" />
                  Listing Type
                </CardTitle>
                <CardDescription>
                  Choose whether you want to rent out your item or sell it outright.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup 
                  defaultValue="rent" 
                  value={listingType}
                  onValueChange={setListingType}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    listingType === 'rent' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <RadioGroupItem value="rent" id="rent" className="sr-only" />
                    <Label htmlFor="rent" className="flex flex-col cursor-pointer">
                      <h3 className="font-medium text-lg mb-1">Rent</h3>
                      <p className="text-sm text-gray-600">
                        Lend your item to others for a period of time
                      </p>
                    </Label>
                  </div>
                  
                  <div className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    listingType === 'sell' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <RadioGroupItem value="sell" id="sell" className="sr-only" />
                    <Label htmlFor="sell" className="flex flex-col cursor-pointer">
                      <h3 className="font-medium text-lg mb-1">Sell</h3>
                      <p className="text-sm text-gray-600">
                        Sell your item outright for a one-time payment
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            {/* Image upload */}
            <Card className="mb-6 shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <ImagePlus className="mr-2 h-5 w-5 text-gray-700" />
                  Upload Photos
                </CardTitle>
                <CardDescription>
                  Add up to 5 photos of your item. The first image will be your listing's cover photo.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {uploadedImages.map(image => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border shadow-sm bg-white">
                      <img src={image.url} alt="Uploaded" className="w-full h-full object-cover" />
                      <Button 
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 rounded-full p-1 text-white"
                        onClick={() => removeImage(image.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                  
                  {uploadedImages.length < 5 && (
                    <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square hover:bg-gray-50 transition-colors bg-white shadow-sm">
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
              </CardContent>
            </Card>
            
            {/* Item details */}
            <Card className="mb-6 shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <FileText className="mr-2 h-5 w-5 text-gray-700" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    ref={titleRef}
                    className="focus-visible:ring-green-600 focus-visible:ring-offset-0"
                    placeholder="Enter a descriptive title (e.g. 'Bosch Electric Drill')"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    ref={locationRef}
                    className="focus-visible:ring-green-600 focus-visible:ring-offset-0"
                    placeholder="Enter your location (e.g. 'Downtown, New York')"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      ref={categoryRef}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <select
                      id="condition"
                      ref={conditionRef}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
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
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    ref={descriptionRef}
                    rows={4}
                    className="focus-visible:ring-green-600 focus-visible:ring-offset-0 min-h-24"
                    placeholder="Describe your item in detail. Include brand, model, features, etc."
                    required
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Pricing */}
            <Card className="mb-6 shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <Banknote className="mr-2 h-5 w-5 text-gray-700" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {listingType === 'rent' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rentalPrice">Rental Price</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <Input
                            type="number"
                            id="rentalPrice"
                            ref={rentalPriceRef}
                            min="0"
                            step="0.01"
                            className="pl-8 focus-visible:ring-green-600 focus-visible:ring-offset-0"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rentalPeriod">Per</Label>
                        <select
                          id="rentalPeriod"
                          ref={rentalPeriodRef}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
                          required
                        >
                          <option value="hour">Hour</option>
                          <option value="day" selected>Day</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="securityDeposit">Security Deposit (optional)</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input
                          type="number"
                          id="securityDeposit"
                          ref={securityDepositRef}
                          min="0"
                          step="0.01"
                          className="pl-8 focus-visible:ring-green-600 focus-visible:ring-offset-0"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        A security deposit helps protect your item and will be refunded when the item is returned in good condition.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <div className="relative max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        type="number"
                        id="salePrice"
                        ref={salePriceRef}
                        min="0"
                        step="0.01"
                        className="pl-8 focus-visible:ring-green-600 focus-visible:ring-offset-0"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Submit button */}
            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all font-medium"
              >
                {isSubmitting ? 'Creating Listing...' : 'Publish Listing'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellForm;