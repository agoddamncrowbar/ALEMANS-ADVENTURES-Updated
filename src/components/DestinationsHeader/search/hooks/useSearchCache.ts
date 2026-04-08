// hooks/useSearchCache.ts
import { useRef, useEffect } from "react";
import type { CacheItem, SearchResult } from "../types/search";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useSearchCache() {
  const searchCache = useRef<Map<string, CacheItem>>(new Map());

  // Load cache from localStorage on mount
  useEffect(() => {
    try {
      const savedCache = localStorage.getItem("searchCache");
      if (savedCache) {
        const parsed = JSON.parse(savedCache);
        searchCache.current = new Map(Object.entries(parsed));
        
        // Clear expired cache entries
        const now = Date.now();
        for (const [key, value] of searchCache.current.entries()) {
          if (now - (value as CacheItem).timestamp > CACHE_DURATION) {
            searchCache.current.delete(key);
          }
        }
        saveCacheToLocalStorage();
      }
    } catch (error) {
      console.error("Failed to load search cache:", error);
    }
  }, []);

  const saveCacheToLocalStorage = () => {
    try {
      const cacheObject = Object.fromEntries(searchCache.current);
      localStorage.setItem("searchCache", JSON.stringify(cacheObject));
    } catch (error) {
      console.error("Failed to save search cache:", error);
    }
  };

  const getCachedResults = (query: string): SearchResult[] | null => {
    const cached = searchCache.current.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.results;
    }
    return null;
  };

  const setCachedResults = (query: string, results: SearchResult[]) => {
    searchCache.current.set(query, {
      results,
      timestamp: Date.now(),
      query
    });
    saveCacheToLocalStorage();
  };

  return { getCachedResults, setCachedResults };
}