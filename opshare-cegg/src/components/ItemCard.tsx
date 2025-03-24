import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
        return 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700';
      case 'share':
        return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700';
      case 'sell':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in border-0 shadow-md bg-white rounded-xl">
      <div className="relative">
        <Link to={`/item/${id}`}>
          <div className="overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Link>
        
        <div className="absolute top-3 left-3">
          <Badge className={`px-3 py-1 font-medium text-white ${getTypeStyles()}`}>
            {getTypeLabel()}
          </Badge>
        </div>
        
        <Button
          variant="ghost" 
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm ${saved ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'} transition-colors hover:bg-white shadow-sm`}
          aria-label={saved ? "Remove from saved" : "Save item"}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/item/${id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors text-gray-800">{title}</h3>
        </Link>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
          <span className="mx-1">•</span>
          <span>{distance} miles away</span>
        </div>
        
        {price !== null && (
          <div className="mb-3">
            <span className="font-bold text-lg text-gray-900">${price.toFixed(2)}</span>
            {perDay && <span className="text-sm text-gray-500 ml-1">/ day</span>}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center w-full">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2 border border-gray-200 flex-shrink-0">
            <img 
              src={owner.image} 
              alt={owner.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-700">{owner.name}</p>
            <div className="flex items-center">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-xs ml-1 text-gray-600">{owner.rating.toFixed(1)}</span>
            </div>
          </div>
          <Link to={`/item/${id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-8 px-3 text-sm"
            >
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
