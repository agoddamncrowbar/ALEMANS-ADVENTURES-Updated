// components/DestinationSearch.tsx
import { useRef, useEffect } from "react";
import { useSearch } from "./hooks/useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResultsDropdown } from "./SearchResultsDropdown";

interface DestinationSearchProps {
  onSearchComplete?: () => void;
  className?: string;
  placeholder?: string;
}

export default function DestinationSearch({ 
  onSearchComplete, 
  className = "",
  placeholder = "Search safaris..."
}: DestinationSearchProps) {
  const {
    query,
    results,
    isLoading,
    showResults,
    handleInputChange,
    handleClear,
    handleResultClick,
    handleViewAll,
    closeResults,
    setShowResults,
  } = useSearch();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeResults();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeResults]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
      closeResults();
    } else if (e.key === "Enter" && query.length >= 2) {
      handleViewAll(onSearchComplete);
    }
  };

  // Handle touch devices
  const handleTouchStart = () => {
    if (query.length >= 2 && !showResults) {
      setShowResults(true);
    }
  };

  const onResultClickWrapper = (result: any) => {
    handleResultClick(result, onSearchComplete);
  };

  const onViewAllWrapper = () => {
    handleViewAll(onSearchComplete);
  };

  const onFocus = () => {
    if (query.length >= 2) {
      setShowResults(true);
    }
  };

  return (
      <div 
        ref={searchRef} 
        className={`
          relative 
          w-full 
          max-w-xl 
          mx-auto           
          px-3 sm:px-0      
          overflow-visible
          ${className}
        `}
        onTouchStart={handleTouchStart}
      >
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        isLoading={isLoading}
        onClear={handleClear}
        placeholder={placeholder}
        autoComplete="off"
        aria-label="Search safaris"
        aria-expanded={showResults}
        aria-haspopup="listbox"
      />

      <SearchResultsDropdown
        isOpen={showResults}
        query={query}
        results={results}
        isLoading={isLoading}
        onResultClick={onResultClickWrapper}
        onViewAllClick={onViewAllWrapper}
      />
    </div>
  );
}