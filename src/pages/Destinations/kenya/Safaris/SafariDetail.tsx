// src/components/SafariDetail.tsx
import { useState } from "react";
import type { Safari } from "./types/safari"; 

/* ----------------------------------
   Pricing Table Component 
---------------------------------- */
function PricingTable({ safari }: { safari: Safari }) {
  const [season, setSeason] = useState<"lowSeason" | "peakSeason">("lowSeason");

  // CASE 1: Simple Price (e.g., Maasai Mara)
  if (safari.price) {
    return (
      <div>
        <p className="text-lg font-semibold text-gray-900">
          From {safari.price.currency} {safari.price.amountFrom}
        </p>
        {safari.price.note && (
          <p className="text-sm text-gray-500">{safari.price.note}</p>
        )}
      </div>
    );
  }

  // CASE 2: Complex Price Table (e.g., kaa-02)
  // We check safari.prices directly
  const priceMap = safari.prices?.[season];

  if (!priceMap) {
    return (
      <p className="text-sm text-gray-600 italic">
        Pricing available on request.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Season Toggles */}
      <div className="flex gap-4">
        <button
          onClick={() => setSeason("lowSeason")}
          className={`px-4 py-2 text-sm border transition-colors ${
            season === "lowSeason" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
          }`}
        >
          Low Season
        </button>
        <button
          onClick={() => setSeason("peakSeason")}
          className={`px-4 py-2 text-sm border transition-colors ${
            season === "peakSeason" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
          }`}
        >
          Peak Season
        </button>
      </div>

      {/* Pricing Table */}
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-900">Guests</th>
              <th className="p-3 text-left font-semibold text-gray-900">Price (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Object.entries(priceMap).map(([pax, price]) => (
              <tr key={pax} className="hover:bg-gray-50">
                <td className="p-3">{pax} persons</td>
                <td className="p-3 font-medium text-gray-900">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">
        * Prices are per person based on group size.
      </p>
    </div>
  );
}

/* ----------------------------------
   Main Detail Component
---------------------------------- */
interface SafariDetailProps {
  safari: Safari;
  onBack: () => void;
}

export default function SafariDetail({ safari, onBack }: SafariDetailProps) {
  
  // Helper: Safely calculate "From $X" for the Hero section
  const getLowestPrice = (s: Safari) => {
    // 1. Check simple price
    if (s.price?.amountFrom) {
      return s.price.amountFrom;
    }

    // 2. Check complex prices
    if (s.prices) {
      const allPrices: number[] = [];
      
      // Extract prices from lowSeason
      if (s.prices.lowSeason) {
        Object.values(s.prices.lowSeason).forEach(p => {
             if(typeof p === 'number') allPrices.push(p);
        });
      }
      
      // Extract prices from peakSeason
      if (s.prices.peakSeason) {
        Object.values(s.prices.peakSeason).forEach(p => {
             if(typeof p === 'number') allPrices.push(p);
        });
      }

      return allPrices.length > 0 ? Math.min(...allPrices) : null;
    }

    return null;
  };

  const heroImage = safari.images?.[0]?.src ?? "/images/placeholder.jpg";
  const lowestPrice = getLowestPrice(safari);

  return (
    <div className="pb-20 bg-white animate-fade-in">
      
      {/* NAVIGATION */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
        >
          <span className="mr-2">←</span> Back to Safaris
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={heroImage}
          alt={safari.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md rounded-full">
               {safari.destination || "Kenya"}
            </span>
            <h1 className="text-3xl md:text-5xl font-light uppercase tracking-wide mb-2">
              {safari.title}
            </h1>
            <p className="text-lg opacity-90">
              {safari.durationLabel}
              {lowestPrice && (
                <span className="font-semibold ml-2">
                   • From USD {lowestPrice}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN (Main Content) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description */}
          {safari.description && (
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg">{safari.description}</p>
            </div>
          )}

          {/* Highlights */}
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

          {/* Itinerary */}
          {safari.itinerary && (
            <section>
              <h3 className="text-xl font-medium mb-6">Detailed Itinerary</h3>
              <div className="space-y-4">
                {safari.itinerary.days.map((day) => (
                  <div key={day.dayNumber} className="border rounded-lg overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="font-medium">
                          <span className="text-gray-500 mr-2">Day {day.dayNumber}:</span>
                          {day.title}
                        </span>
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-5 bg-white border-t">
                        <p className="text-gray-700 leading-relaxed mb-4">{day.description}</p>
                        
                        {(day.meals || day.activities) && (
                           <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                              {day.meals && day.meals.map(m => <span key={m} className="bg-gray-100 px-2 py-1 rounded">🍽 {m}</span>)}
                              {day.activities && day.activities.map(a => <span key={a} className="bg-gray-100 px-2 py-1 rounded">🦁 {a}</span>)}
                           </div>
                        )}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN (Sticky Sidebar for Pricing & Info) */}
        <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
                
                {/* Pricing Widget */}
                <div className="bg-white border shadow-sm rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Pricing & Booking</h3>
                    <PricingTable safari={safari} />
                    
                    <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm font-medium">
                        Request Quote
                    </button>
                </div>

                {/* Includes/Excludes */}
                {(safari.includes || safari.excludes) && (
                    <div className="bg-gray-50 rounded-xl p-6 text-sm">
                        {safari.includes && (
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Included</h4>
                                <ul className="space-y-2">
                                    {safari.includes.slice(0, 5).map((inc, i) => (
                                        <li key={i} className="flex items-start text-gray-600">
                                            <span className="text-green-500 mr-2">✓</span> {inc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                         {safari.excludes && (
                            <div>
                                <h4 className="font-semibold mb-3">Excluded</h4>
                                <ul className="space-y-2">
                                    {safari.excludes.slice(0, 5).map((exc, i) => (
                                        <li key={i} className="flex items-start text-gray-600">
                                            <span className="text-red-400 mr-2">✕</span> {exc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}