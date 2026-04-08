import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import type { Variants } from "framer-motion";
import { Suspense, lazy } from 'react';
import { SkeletonCategoryCard, SkeletonSafariCard } from '../../../../components/destinations/SkeletonCard';

import { useSafarisTree } from "./hooks/useSafarisTree";
import CategoryCard from "./components/CategoryCard";
import SafariCard from "./components/SafariCard";
import { SafariDetailRoute } from "./DetailRoute";
import { categoryDescriptorMap } from "./descriptors/categoryDescriptorMap";
import SafariLoader from "../../../../components/destinations/SafariLoader";
const contentVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function Safaris() {
  return (
    <Routes>
      <Route index element={<SafariCategories />} />
      <Route path=":categoryId" element={<SafariCategory />} />
      <Route path=":categoryId/:safariId" element={<SafariDetailRoute />} />
    </Routes>
  );
}

const CategoryDescriptor = lazy(() => import('./descriptors/CategoryDescriptor'));

function SafariCategories() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useSafarisTree(1);
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && categories.length > 0) {
      setHasLoadedOnce(true);
    }
  }, [isLoading, categories]);

  if (isLoading && !hasLoadedOnce) {
    return (
      <div className="min-h-screen px-4 md:px-10 pb-20">
        <header className="py-10">
          <h1 className="text-3xl md:text-4xl uppercase tracking-wider font-light text-[#1A0A0B]">
            Tours & Safaris
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Explore our curated safari experiences across Rwanda and East Africa.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCategoryCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 md:px-10 pb-20">
        <div className="text-center py-20">
          <p className="text-red-600">Failed to load safaris. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#1A0A0B] text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 pb-20">
      <header className="py-10">
        <h1 className="text-3xl md:text-4xl uppercase tracking-wider font-light text-[#1A0A0B]">
          Tours & Safaris
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Explore our curated safari experiences across Rwanda and East Africa.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onSelect={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              navigate(category.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SafariCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useSafarisTree(1);
  const [categoryView, setCategoryView] = React.useState<"safaris" | "info">("safaris");
  const [hasLoadedOnce, setHasLoadedOnce] = React.useState(false);

  // Track when we first get data
  React.useEffect(() => {
    if (!isLoading && categories.length > 0) {
      setHasLoadedOnce(true);
    }
  }, [isLoading, categories]);

  // Only show skeleton on initial load (when loading AND we haven't loaded once yet)
  if (isLoading && !hasLoadedOnce) {
    return (
      <div className="min-h-screen px-4 md:px-10 pb-20">
        <div className="mb-6 h-4 w-32 bg-gray-200 animate-pulse" />
        <div className="space-y-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <section key={i}>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, j) => (
                  <SkeletonSafariCard key={j} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 md:px-10 pb-20">
        <div className="text-center py-20">
          <p className="text-red-600">Failed to load safaris. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#1A0A0B] text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activeCategory = categories.find((c) => String(c.id) === String(categoryId));
  if (!activeCategory && !isLoading) return <div>Category not found</div>;
  if (!activeCategory) return <div><SafariLoader /></div>;
  
  const descriptorType = categoryDescriptorMap[String(activeCategory.id)];
  const hasDescriptor = !!descriptorType;

  return (
    <div className="min-h-screen px-4 md:px-10 pb-20">
      <button
        onClick={() => navigate("/destinations/Rwanda/safaris")}
        className="mb-6 text-sm underline tracking-wide"
      >
        ← Back to Categories
      </button>

      {hasDescriptor && (
        <div className="flex gap-8 mb-10 border-b pb-3 text-sm uppercase tracking-wide">
          <button
            onClick={() => setCategoryView("safaris")}
            className={categoryView === "safaris" ? "border-b-2 border-black font-medium" : "text-gray-500 hover:text-black"}
          >
            Safaris
          </button>
          <button
            onClick={() => setCategoryView("info")}
            className={categoryView === "info" ? "border-b-2 border-black font-medium" : "text-gray-500 hover:text-black"}
          >
            More Info
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {categoryView === "info" && descriptorType && (
          <motion.div
            key="info"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded" />}>
              <CategoryDescriptor type={descriptorType} />
            </Suspense>
          </motion.div>
        )}

        {categoryView === "safaris" && (
          <motion.div
            key="safaris"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-12"
          >
            {activeCategory.subcategories?.map((sub) => (
              <section key={sub.id}>
                <h3 className="text-xl font-medium mb-4">{sub.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sub.safaris?.map((safari) => (
                    <SafariCard
                      key={safari.id}
                      safari={safari}
                      onClick={async () => {
                        window.scrollTo({ top: 0, behavior: "instant" });
                        await trackClick(safari.id);
                        navigate(safari.id);
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

async function trackClick(safariId: string, timeSpent: number = 0) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/trackers/track_click.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ safariId, timeSpent }),
      }
    );

    return await res.json();
  } catch (err) {
    console.error("Failed to track click:", err);
  }
}