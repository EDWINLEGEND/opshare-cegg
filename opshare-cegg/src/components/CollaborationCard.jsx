import React from 'react';

const CollaborationCard = ({ imageSrc }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg mb-8 bg-white">
      {/* Image container without overlapping elements */}
      <div className="w-full">
        <img 
          src={imageSrc || "/images/collaboration-hands.jpg"} 
          alt="Collaboration hands" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Tags container below the image */}
      <div className="p-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2 bg-gray-50 text-gray-800 rounded-full px-4 py-2 text-sm">
          <span>Across Community</span>
        </div>
        
        <div className="flex items-center gap-2 bg-green-50 text-green-800 rounded-full px-4 py-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Sustainability Impact</span>
        </div>
      </div>
    </div>
  );
};

export default CollaborationCard; 