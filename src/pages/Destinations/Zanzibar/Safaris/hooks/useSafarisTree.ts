import { useQuery } from '@tanstack/react-query';
import type { Category, Safari } from "../types/safari";

const API = import.meta.env.VITE_API_BASE_URL;

export function useSafarisTree(countryId = 1) {
  return useQuery({
    queryKey: ['safarisTree', countryId],
    queryFn: async () => {
      const res = await fetch(`${API}/client/getSafarisTree.php?country_id=${countryId}`);
      const json = await res.json();

      if (!json.success) throw new Error("Failed to fetch safaris tree");

      const treeWithFullImagePaths: Category[] = json.data.map((category: Category) => ({
        ...category,
        subcategories: category.subcategories.map(sub => ({
          ...sub,
          safaris: sub.safaris.map((safari: Safari) => ({
            ...safari,
            images: safari.images.map(img => ({
              ...img,
              src: img.src.startsWith("http") ? img.src : `${API}${img.src}`
            }))
          }))
        }))
      }));

      return treeWithFullImagePaths;
    },
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    gcTime: 7 * 24 * 60 * 60 * 1000,    // 7 days
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}