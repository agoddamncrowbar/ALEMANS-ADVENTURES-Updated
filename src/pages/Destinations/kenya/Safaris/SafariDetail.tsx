import type { Safari } from "./types/safari";
import SafariDescription from "./components/SafariDescription";
import SafariHero from "./components/safari-detail/SafariHero";
import SafariPricing from "./components/safari-detail/SafariPricing";
import SafariItinerary from "./components/safari-detail/SafariItinerary";
import SafariInclusions from "./components/safari-detail/SafariInclusions";

interface SafariDetailProps {
  safari: Safari;
  onBack: () => void;
}

export default function SafariDetail({ safari, onBack }: SafariDetailProps) {
  return (
    <div className="pb-20 bg-white animate-fade-in">
      
      {/* 1. STICKY NAV */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
        >
          <span className="mr-2">←</span> Back to Safaris
        </button>
      </div>

      {/* 2. HERO SECTION */}
      <SafariHero safari={safari} />

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: Info, Highlights, Itinerary */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description Component (Existing) */}
          {safari.description && (
            <SafariDescription description={safari.description} />
          )}

          {/* Highlights List */}
          {safari.highlights && (
            <section>
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
                  Highlights
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safari.highlights.map((h, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="mr-2 text-green-600">✓</span> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Itinerary Accordion */}
          <SafariItinerary itinerary={safari.itinerary} />
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="space-y-8">
            <div className="sticky top-36 space-y-8">
                {/* Pricing Widget */}
                <SafariPricing safari={safari} />

                {/* Inclusions / Exclusions */}
                <SafariInclusions 
                  includes={safari.includes} 
                  excludes={safari.excludes} 
                />
            </div>
        </aside>

      </div>
    </div>
  );
}