import { MapPin, Clock, DollarSign } from "lucide-react";
import type { SearchResult } from "./types/search";

interface SearchResultItemProps {
  result: SearchResult;
  onClick: () => void;
}

export const SearchResultItem = ({ result, onClick }: SearchResultItemProps) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left 
        px-3 sm:px-4 py-2.5 sm:py-3 
        hover:bg-gray-50 
        active:bg-gray-100 
        transition-colors 
        border-b border-gray-100 
        last:border-0 
        group
        touch-manipulation
      "
    >
      <div className="flex flex-col gap-1 sm:gap-1.5">
        <div className="text-sm sm:text-base font-medium leading-tight sm:leading-tight text-[#1A0A0B] group-hover:text-[#F5D547] transition-colors line-clamp-2">
          {result.title}
        </div>
        
        {result.description && (
          <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-2">
            {result.description}
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs text-gray-400">
          {result.destination && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="sm:w-3 sm:h-3" />
              <span className="text-xs">{result.destination}</span>
            </span>
          )}
          {result.duration_label && (
            <span className="flex items-center gap-1">
              <Clock size={12} className="sm:w-3 sm:h-3" />
              <span className="text-xs">{result.duration_label}</span>
            </span>
          )}
          {result.price_from && (
            <span className="flex items-center gap-1 text-[#F5D547] font-medium">
              <DollarSign size={12} className="sm:w-3 sm:h-3" />
              <span className="text-xs">
                {result.currency} {result.price_from.toLocaleString()}
              </span>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}; 