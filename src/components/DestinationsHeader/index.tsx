import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";

import CountrySelector from "./CountrySelector";
import DesktopSections from "./DesktopSections";
import MobileSections from "./MobileSections";
import DestinationSearch from "./search/DestinationSearch";

export default function DestinationsHeader({
  currentCountry = "Kenya",
}: {
  currentCountry?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const countries = ["Kenya", "Tanzania", "Uganda", "Rwanda", "Zanzibar"];

  const countryRoutes: Record<string, string> = {
    Kenya: "/destinations/kenya",
    Tanzania: "/destinations/tanzania",
    Uganda: "/destinations/uganda",
    Rwanda: "/destinations/rwanda",
    Zanzibar: "/destinations/zanzibar",
  };

  const sectionRoutes: Record<string, Record<string, string>> = {
    Kenya: {
      "Travel Info": "travel-info",
      "National Parks": "national-parks",
      "Tours and Safaris": "safaris",
      "Beach & Water Sports": "water-sports",
      "Bird Watching": "bird-watching",
      "Hiking & Trekking": "hiking",
      "Culture & Sports": "culture",
    },
    Tanzania: {
      "Travel Info": "travel-info",
      "National Parks": "national-parks",
      "Safaris": "safaris",
      "Watersports": "rafting",
      "Air & Balloon": "air-safaris",
      "Culture": "culture",
    },
    Uganda: {
      "National Parks": "national-parks",
      "Travel Info": "travel-info",
      "Safaris": "safaris",
      "Bird Watching": "bird-watching",
      "Water Rafting": "rafting",
      "Hiking & Trekking": "hiking",
    },
    Rwanda: {
      "Safaris": "safaris",
      "National Parks": "national-parks",
      "Travel Info": "travel-info",
    },
    Zanzibar: {
      "Safaris": "safaris",
      "Heart of the Archipelago": "overview",
      "Travel Info": "travel-info",
    },
  };

  const sections = Object.keys(sectionRoutes[currentCountry] || {});

  const handleCountryChange = (country: string) => {
    navigate(countryRoutes[country]);
    setSearchOpen(false);
  };

  const handleSectionClick = (section: string) => {
    const slug = sectionRoutes[currentCountry]?.[section];
    if (!slug) return;

    navigate(`${countryRoutes[currentCountry]}/${slug}`);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-t border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left Section - Country Selector */}
          <div className="flex items-center gap-6">
            <CountrySelector
              countries={countries}
              currentCountry={currentCountry}
              onChange={handleCountryChange}
            />
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className="hidden md:block flex-1">
            <DesktopSections
              sections={sections}
              onNavigate={handleSectionClick}
              pathname={location.pathname}
              basePath={countryRoutes[currentCountry]}
            />
          </div>

          {/* Right Section - Search Toggle */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider text-gray-600 hover:text-[#1A0A0B] transition-colors border border-gray-300 hover:border-gray-400 bg-white"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
              <ChevronDown 
                size={12} 
                className={`transition-transform duration-200 ${searchOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Expandable Search Panel */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: "transform" }}
                  className="
                    absolute top-full left-1/2 -translate-x-1/2
                    mt-2
                    w-[calc(100vw-1.5rem)] sm:w-96
                    max-w-md
                    z-50
                  "
                >
                  <DestinationSearch 
                    onSearchComplete={() => setSearchOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider text-gray-600 hover:text-[#1A0A0B] transition-colors border border-gray-300 hover:border-gray-400 bg-white"
          >
            Sections
            <ChevronDown 
              size={12} 
              className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Sections Menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileSections
            sections={sections}
            onNavigate={handleSectionClick}
            setMenuOpen={setMenuOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}