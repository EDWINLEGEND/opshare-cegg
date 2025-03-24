return (
  <div className="relative rounded-3xl overflow-hidden shadow-lg mb-8">
    {/* Main card image */}
    <div className="w-full">
      <img 
        src="/path-to-your-image.jpg" 
        alt="Collaboration hands" 
        className="w-full object-cover"
      />
    </div>
    
    {/* Content container with proper spacing */}
    <div className="mt-4 px-6 pb-6">
      {/* Button/tag container with proper spacing */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 bg-green-50 text-green-800 rounded-full px-4 py-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>Sustainability Impact</span>
        </div>
        {/* Add other buttons/tags here with proper spacing */}
        <div className="flex items-center gap-2 bg-gray-50 text-gray-800 rounded-full px-4 py-2">
          <span>Across Community</span>
        </div>
      </div>
      
      {/* Additional content */}
      <div className="mt-2">
        {/* Other content like heading, description etc. */}
      </div>
    </div>
  </div>
); 