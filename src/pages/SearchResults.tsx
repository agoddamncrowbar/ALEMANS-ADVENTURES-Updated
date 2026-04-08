import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import SafariCard from "./Destinations/kenya/Safaris/components/SafariCard";
import type { Safari, SafariImage } from "./Destinations/kenya/Safaris/types/safari";
import Layout from "../components/Layout";
import DestinationsHeader from "../components/DestinationsHeader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Define the search result type based on your actual data structure
interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string;
  destination: string;
  duration_label: string;
  price_from: number;
  currency: string;
  price_note?: string;
  subcategory_id: number;
  category_id: number | null;
  url: string;
}

// Define the image type from your backend
interface SafariImageData {
  id: number;
  safari_id: string;
  src: string;
  alt: string;
  caption: string;
}

export default function SearchResults() {
  const query = useQuery().get("q") || "";
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagesMap, setImagesMap] = useState<Map<string, SafariImage[]>>(new Map());

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: query,
          limit: "50" // Get more results for full page
        });

        // Use your actual API base URL from environment variables
        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_BASE}/safaris/search_safaris.php?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setResults(data.data);
          
          // Fetch images for all safaris in the search results
          if (data.data.length > 0) {
            await fetchImagesForSafaris(data.data);
          }
        } else {
          setError(data.message || "Search failed");
        }
      } catch (error) {
        console.error("Search error:", error);
        setError("Failed to perform search. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  // Fetch images for multiple safaris
  const fetchImagesForSafaris = async (safaris: SearchResult[]) => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const imagePromises = safaris.map(async (safari) => {
        const response = await fetch(`${API_BASE}/safaris/getimages.php?safari_id=${safari.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            // Convert the images to SafariImage type
            const safariImages: SafariImage[] = data.data.map((img: SafariImageData) => ({
              src: `${API_BASE}${img.src}`,
              alt: img.alt || safari.title,
              caption: img.caption || safari.title
            }));
            return { safariId: safari.id, images: safariImages };
          }
        }
        return { safariId: safari.id, images: [] };
      });

      const imageResults = await Promise.all(imagePromises);
      
      // Create a map of safari_id to images
      const newImagesMap = new Map<string, SafariImage[]>();
      imageResults.forEach(({ safariId, images }) => {
        newImagesMap.set(safariId, images);
      });
      
      setImagesMap(newImagesMap);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Convert SearchResult to Safari type for SafariCard
  const convertToSafari = (result: SearchResult): Safari => {
    // Get images from the map or use empty array
    const safariImages = imagesMap.get(result.id) || [];
    
    return {
      id: result.id,
      slug: result.slug,
      title: result.title,
      description: result.description,
      destination: result.destination,
      durationLabel: result.duration_label,
      images: safariImages,
    };
  };

  return (
    <Layout showHero={false}>
      <DestinationsHeader />
      <div className="min-h-screen px-4 md:px-10 pb-20">
        <header className="py-20">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide">
            Search Results
          </h1>
          <p className="text-gray-600 mt-2">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                {results.length} result{results.length !== 1 && "s"} found for "
                <span className="font-medium">{query}</span>"
              </>
            )}
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-[#F5D547]" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-[#F5D547] hover:underline"
            >
              ← Go back
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No safaris match your search.</p>
            <button
              onClick={() => navigate(-1)}
              className="text-[#F5D547] hover:underline"
            >
              ← Go back
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <SafariCard
                key={result.id}
                safari={convertToSafari(result)}
                onClick={() => navigate(result.url)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}