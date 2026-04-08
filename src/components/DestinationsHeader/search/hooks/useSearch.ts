// hooks/useSearch.ts
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type  { SearchResult } from "../types/search";
import { useSearchCache } from "./useSearchCache";

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { getCachedResults, setCachedResults } = useSearchCache();

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    // Check cache first
    const cachedResults = getCachedResults(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        limit: "5"
      });
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE}/safaris/search_safaris.php?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setCachedResults(searchQuery, data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [getCachedResults, setCachedResults]);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      performSearch(searchQuery);
    }, 300),
    [performSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length >= 2) {
      setShowResults(true);
      debouncedSearch(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result: SearchResult, onComplete?: () => void) => {
    navigate(result.url);
    handleClear();
    onComplete?.();
  };

  const handleViewAll = (onComplete?: () => void) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowResults(false);
    onComplete?.();
  };

  const closeResults = () => {
    setShowResults(false);
  };

  return {
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
  };
}