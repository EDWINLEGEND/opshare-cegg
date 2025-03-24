
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';

interface ItemCardProps {
  id: number;
  title: string;
  type: 'rent' | 'share' | 'sell';
  image: string;
  price: number | null;
  perDay?: boolean;
  location: string;
  distance: number;
  owner: {
    name: string;
    rating: number;
    image: string;
  };
  saved?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  type,
  image,
  price,
  perDay = false,
  location,
  distance,
  owner,
  saved = false,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'rent':
        return 'bg-teal-100 text-teal-700';
      case 'share':
        return 'bg-green-100 text-green-700';
      case 'sell':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'rent':
        return 'For Rent';
      case 'share':
        return 'To Share';
      case 'sell':
        return 'For Sale';
      default:
        return '';
    }
  };

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="relative">
        <Link to={`/item/${id}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
        
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeStyles()}`}>
            {getTypeLabel()}
          </span>
        </div>
        
        <button 
          className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm ${saved ? 'text-red-500' : 'text-gray-500'} transition-colors hover:bg-white`}
          aria-label={saved ? "Remove from saved" : "Save item"}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/item/${id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-green transition-colors">{title}</h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
          <span className="mx-1">•</span>
          <span>{distance} miles away</span>
        </div>
        
        {price !== null && (
          <div className="mb-3">
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
            {perDay && <span className="text-sm text-muted-foreground ml-1">/ day</span>}
          </div>
        )}
        
        <div className="flex items-center pt-3 border-t">
          <img 
            src={owner.image} 
            alt={owner.name}
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <div>
            <p className="text-sm font-medium">{owner.name}</p>
            <div className="flex items-center">
              <Star size={14} className="text-yellow fill-current" />
              <span className="text-xs ml-1">{owner.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
