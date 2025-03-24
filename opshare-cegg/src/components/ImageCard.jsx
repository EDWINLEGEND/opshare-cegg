// ... existing code ...

return (
  <div className="relative rounded-3xl overflow-hidden shadow-lg mb-8">
    {/* Main image container without overlapping elements */}
    <div className="w-full">
      <img 
        src="/path-to-collaboration-image.jpg" 
        alt="Collaboration hands" 
        className="w-full object-cover"
      />
    </div>
    
    {/* Tags/buttons positioned below the image instead of overlapping */}
    <div className="p-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-2 bg-gray-50 text-gray-800 rounded-full px-4 py-2">
          <span>Across Community</span>
        </div>
        
        <div className="flex items-center gap-2 bg-green-50 text-green-800 rounded-full px-4 py-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span>Sustainability Impact</span>
        </div>
      </div>
      
      {/* Additional content can go here */}
    </div>
  </div>
);

// ... existing code ...
