// components/SearchResultsDropdown.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { SearchResult } from "./types/search";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsDropdownProps {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onResultClick: (result: SearchResult) => void;
  onViewAllClick: () => void;
}

export const SearchResultsDropdown = ({
  isOpen,
  query,
  results,
  isLoading,
  onResultClick,
  onViewAllClick,
}: SearchResultsDropdownProps) => {
  if (!isOpen || query.length < 2) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="
          absolute top-full left-0
          w-[calc(100vw-1.5rem)] sm:w-full
          max-w-xl
          mt-2
          bg-white border border-gray-200
          shadow-lg rounded-lg
          z-50
          max-h-[70vh] sm:max-h-96
          overflow-y-auto
        "
      >
        {isLoading ? (
          <div className="p-4 sm:p-6 text-center text-sm text-gray-500">
            <Loader2 size={20} className="animate-spin inline-block mr-2" />
            <span className="text-sm">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">
                {results.length} result{results.length !== 1 && 's'} found
              </p>
            </div>
            
            {results.map((result, index) => (
              <SearchResultItem
                key={`${result.id}-${index}`}
                result={result}
                onClick={() => onResultClick(result)}
              />
            ))}
            
            <button
              onClick={onViewAllClick}
              className="
                w-full text-center 
                py-2.5 sm:py-3 
                text-xs sm:text-sm 
                font-medium text-[#F5D547] 
                hover:bg-gray-50 
                active:bg-gray-100 
                transition-colors 
                border-t border-gray-200
                touch-manipulation
              "
            >
              View all {results.length}+ results →
            </button>
          </>
        ) : (
          <div className="p-4 sm:p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              No results found for "{query}"
            </p>
            <button
              onClick={onViewAllClick}
              className="text-sm text-[#F5D547] hover:underline font-medium"
            >
              Try full search →
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};