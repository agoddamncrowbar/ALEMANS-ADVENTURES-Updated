import { useState } from "react";
import { safarisMainData } from "./SafarisInfo";
import { kenyaExcursionsData } from "./KenyaExcursionsInfo";
import { kenyaTopRequestsData } from "./KenyaTopRequestsSafarisInfo";
import { kenyaBudgetData } from "./KenyaBudgetInfo";
// import { safariDestinationsData } from "./SafariDestinationsInfo";
import { kenyaLuxuryData } from "./KenyaLuxurySafarisInfo";
import { kenyaPopularData } from "./KenyaPopularSafarisInfo";
import { birdWatchingData } from "./KenyaBirdWatchingInfo";
import { eastAfricaSafarisData } from "./EastAfricaSafarisInfo";
import type { SafariSection } from "./SafarisInfo";

export default function Safaris() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<
    | "main"
    | "excursions"
    | "topRequests"
    | "budget"
    | "destinations"
    | "luxury"
    | "popular"
    | "birdwatching"
    | "eastAfrica"
  >("main");

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Category lookup
const data = (
  category === "main"
    ? safarisMainData
    : category === "excursions"
    ? kenyaExcursionsData
    : category === "topRequests"
    ? kenyaTopRequestsData
    : category === "budget"
    ? kenyaBudgetData
    : category === "luxury"
    ? kenyaLuxuryData
    : category === "popular"
    ? kenyaPopularData
    : category === "birdwatching"
    ? birdWatchingData
    : eastAfricaSafarisData
) as any[];



  const activeItem = data[activeIndex] ?? safarisMainData[0];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCategoryChange = (
    newCategory: typeof category
  ) => {
    setCategory(newCategory);
    setActiveIndex(0);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex min-h-screen">

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile pull-out tab */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-1/4 z-30 p-2 rounded-r-lg shadow-lg bg-[#1A0A0B] text-white transition-all duration-300 transform ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        }`}
        style={{ left: -1, width: "40px" }}
      >
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          )}
        </svg>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-40 z-30 w-64 bg-white border-r border-gray-200 p-4 
        h-[calc(100vh-4rem)] overflow-y-auto transform transition-transform duration-300 
        ease-in-out md:relative md:top-0 md:h-screen md:translate-x-0 
        ${isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-semibold mb-6 text-[#1A0A0B]">
          {category === "main"
            ? "Safaris"
            : category === "excursions"
            ? "Kenya Excursions"
            : category === "topRequests"
            ? "Top Safari Requests"
            : category === "budget"
            ? "Budget Safaris"
            : category === "destinations"
            ? "Safari Destinations"
            : category === "luxury"
            ? "Luxury Safaris"
            : category === "popular"
            ? "Popular Safaris"
            : category === "birdwatching"
            ? "Bird Watching"
            : "East Africa Safaris"}
        </h2>

        {/* Sidebar list only for sub-pages */}
        {category !== "main" && (
          <ul className="space-y-1 pb-6">
            {data.map((item, index) => (
              <li
                key={item.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsSidebarOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#1A0A0B] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-sm tracking-wide">{item.header}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 space-y-10 pb-10 px-4 md:px-0 md:ml-8 lg:ml-12 animate-fadeIn min-w-0">

        {/* Header + dropdown */}
        <div className="flex items-center gap-3 relative">
          <h1 className="text-3xl uppercase tracking-wider font-light text-[#1A0A0B]">
            {category === "main"
              ? "Safaris"
              : category === "excursions"
              ? "Kenya Excursions"
              : category === "topRequests"
              ? "Kenya Top Safari Requests"
              : category === "budget"
              ? "Kenya Budget Safaris"
              : category === "destinations"
              ? "Safari Destinations"
              : category === "luxury"
              ? "Kenya Luxury Safaris"
              : category === "popular"
              ? "Kenya Popular Safaris"
              : category === "birdwatching"
              ? "Bird Watching"
              : "East Africa Safaris"}
          </h1>

          {/* Dropdown button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-[#1A0A0B]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute top-10 left-0 bg-white border border-gray-200 shadow-md rounded-md w-64 z-50">

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("main")}
              >
                Safaris (Main Page)
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("excursions")}
              >
                Kenya Excursions
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("topRequests")}
              >
                Kenya Top Safari Requests
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("budget")}
              >
                Kenya Budget Safaris
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("destinations")}
              >
                Safari Destinations
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("luxury")}
              >
                Kenya Luxury Safaris
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("popular")}
              >
                Kenya Popular Safaris
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("birdwatching")}
              >
                Kenya Bird Watching
              </button>

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryChange("eastAfrica")}
              >
                Safaris Across East Africa
              </button>

            </div>
          )}
        </div>

        {/* Render the currently active section */}
        <SafariDetails section={activeItem} />
      </main>
    </div>
  );
}

function SafariDetails({ section }: { section: SafariSection }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl uppercase tracking-wider font-light text-[#1A0A0B]">
        {section.header}
      </h1>

      {section.image && (
        <div className="w-full h-[360px] overflow-hidden shadow-sm">
          <img
            src={section.image}
            alt={section.header}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      {section.content && (
        <p className="text-gray-700 leading-relaxed text-[16px] whitespace-pre-line">
          {section.content}
        </p>
      )}

      {section.gallery && section.gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {section.gallery.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden h-44 shadow-sm transition-all hover:opacity-90"
            >
              <img
                src={img}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
