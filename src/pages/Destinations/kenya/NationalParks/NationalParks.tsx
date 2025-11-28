import { useState } from "react";
import { nationalParksData } from "./NationalParksInfo";
import { popularParksData } from "./PopularParks/PopularParksInfo";
import { conservanciesData } from "./Conservancies/ConservanciesInfo";
import type { ParkSection } from "./NationalParksInfo";

export default function NationalParks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<"national" | "popular" | "conservancies">("national");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // To determine which dataset to show
  const data =
    category === "national"
      ? nationalParksData
      : category === "popular"
      ? popularParksData
      : conservanciesData;

  const activePark = data[activeIndex];

  const handleParkSelect = (index: number) => {
    setActiveIndex(index);
    setIsSidebarOpen(false);
  };

  const handleCategoryChange = (newCategory: typeof category) => {
    setCategory(newCategory);
    setActiveIndex(0); // reseting the selection
    setShowDropdown(false); // closing the dropdown
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Pullout tab button */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-1/4 z-30 p-2 rounded-r-lg shadow-lg bg-[#1A0A0B] text-white transition-all duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-64" : "translate-x-0"}`}
        style={{ left: -1, width: '40px' }}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-40 z-30 w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-4rem)] overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-screen md:translate-x-0 ${isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-6">
          {/* Dynamic title */}
          <h2 className="text-xl font-semibold text-[#1A0A0B]">
            {category === "national"
              ? "National Parks"
              : category === "popular"
              ? "Popular Parks"
              : "Conservancies"}
          </h2>

          {/* Dropdown arrow */}
          <button onClick={() => setShowDropdown(!showDropdown)} className="text-[#1A0A0B]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="mb-6 space-y-2">
            <button
              className="w-full text-left text-sm px-3 py-1 hover:bg-gray-100"
              onClick={() => handleCategoryChange("popular")}
            >
              Popular Parks
            </button>
            <button
              className="w-full text-left text-sm px-3 py-1 hover:bg-gray-100"
              onClick={() => handleCategoryChange("conservancies")}
            >
              Conservancies
            </button>
          </div>
        )}

        {/* Sidebar list: only show when a specific category,that is, popular or conservancies */}
        {category !== "national" && (
          <ul className="space-y-1 pb-6">
            {(category === "popular" ? popularParksData : conservanciesData).map((park, index) => (
              <li
                key={park.id}
                onClick={() => handleParkSelect(index)}
                className={`cursor-pointer px-3 py-2 transition-all duration-300 ${index === activeIndex ? "bg-[#1A0A0B] text-white" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <span className="text-sm tracking-wide">{park.header}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-10 pb-10 px-4 md:px-0 md:ml-8 lg:ml-12 animate-fadeIn min-w-0">
        <ParkDetails section={activePark} />
      </main>
    </div>
  );
}

function ParkDetails({ section }: { section: ParkSection }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl uppercase tracking-wider font-light text-[#1A0A0B]">{section.header}</h1>

      {section.image && (
        <div className="w-full h-[360px] overflow-hidden shadow-sm">
          <img src={section.image} alt={section.header} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
        </div>
      )}

      {section.content && <p className="text-gray-700 leading-relaxed text-[15px]">{section.content}</p>}

      {section.gallery && section.gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {section.gallery.map((img, i) => (
            <div key={i} className="overflow-hidden h-44 shadow-sm transition-all duration-500 hover:opacity-90">
              <img src={img} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110" />
            </div>
          ))}
        </div>
      )}

      {section.subsections?.length > 0 && (
        <div className="space-y-8">
          {section.subsections.map((sub, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-lg font-medium text-[#1A0A0B] tracking-wide">{sub.subheader}</h3>
              {sub.content && <p className="text-gray-700 leading-relaxed text-[15px]">{sub.content}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// import { useState } from "react";
// import { nationalParksData } from "./NationalParksInfo";
// import type { ParkSection } from "./NationalParksInfo";

// export default function NationalParks() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [category, setCategory] = useState("national");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const activePark = nationalParksData[activeIndex];

//   const handleParkSelect = (index: number) => {
//     setActiveIndex(index);
//     setIsSidebarOpen(false);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="relative flex min-h-screen">
//       {/* 1. Mobile Backdrop Overlay (Hidden on desktop) */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
//           onClick={toggleSidebar}
//           aria-hidden="true"
//         ></div>
//       )}

//       {/* 2. Pullout Tab Button (Only visible on small screens) */}
//       {/* Positioned on the edge, peeking out when closed */}
//       <button
//         onClick={toggleSidebar}
//         className={`
//           md:hidden fixed top-1/4 z-30 p-2 rounded-r-lg shadow-lg 
//           bg-[#1A0A0B] text-white transition-all duration-300 ease-in-out 
//           transform 
//           ${isSidebarOpen ? "translate-x-64" : "translate-x-0"}
//         `}
//         style={{ left: -1, width: '40px' }} // Start position right on the edge
//         aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
//       >
//         {/* Arrow Icon: points left (to close) when open, points right (to open) when closed */}
//         <svg
//           className="w-5 h-5 mx-auto"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           {isSidebarOpen ? (
//             // Arrow pointing left (to close)
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           ) : (
//             // Arrow pointing right (to open)
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           )}
//         </svg>
//       </button>

//       {/* 3. Sidebar */}
//       <aside
//         className={`
//           fixed left-0 top-40   /* <-- added top offset */
//           z-30 w-64 bg-white border-r border-gray-200 p-4
//           h-[calc(100vh-4rem)]  /* 4rem = 64px → remaining height */
//           overflow-y-auto
//           transform transition-transform duration-300 ease-in-out
//           md:relative md:top-0 md:h-screen md:translate-x-0
//           ${isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-[#1A0A0B]">
//             National Parks
//           </h2>

//           {/* Dropdown Arrow Icon */}
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="text-[#1A0A0B]"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""
//                 }`}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//         </div>

//         {/* Dropdown menu */}
//         {showDropdown && (
//           <div className="mb-6 space-y-2">
//             <button
//               className="w-full text-left text-sm px-3 py-1 hover:bg-gray-100"
//               onClick={() => setCategory("national")}
//             >
//               Popular Parks
//             </button>
//             <button
//               className="w-full text-left text-sm px-3 py-1 hover:bg-gray-100"
//               onClick={() => setCategory("popular")}
//             >
//               Kenya Wildlife Conservancies
//             </button>
            
//           </div>
//         )}

//         {/* <h2 className="text-xl font-semibold mb-6 text-[#1A0A0B]">
//           National Parks
//         </h2> */}

//         <ul className="space-y-1 pb-6">
//           {nationalParksData.map((park, index) => (
//             <li
//               key={park.id}
//               onClick={() => handleParkSelect(index)}
//               className={`
//                 cursor-pointer px-3 py-2 transition-all duration-300
//                 ${index === activeIndex
//                   ? "bg-[#1A0A0B] text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//                 }
//               `}
//             >
//               <span className="text-sm tracking-wide">{park.header}</span>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* 4. Main content */}
//       {/* Added pl-4 to prevent content from touching the screen edge on mobile */}
//       <main className="flex-1 space-y-10 pb-10 px-4 md:px-0 md:ml-8 lg:ml-12 animate-fadeIn min-w-0">
//         <ParkDetails section={activePark} />
//       </main>
//     </div>
//   );
// }

// // ParkDetails Component (Definition follows, assuming it is here)
// function ParkDetails({ section }: { section: ParkSection }) {
//   // ... (ParkDetails content as before)
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <h1 className="text-3xl uppercase tracking-wider font-light text-[#1A0A0B]">
//         {section.header}
//       </h1>

//       {/* Main Image */}
//       {section.image && (
//         <div className="w-full h-[360px] overflow-hidden shadow-sm">
//           <img
//             src={section.image}
//             alt={section.header}
//             className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
//           />
//         </div>
//       )}

//       {/* Main Text */}
//       {section.content && (
//         <p className="text-gray-700 leading-relaxed text-[15px]">
//           {section.content}
//         </p>
//       )}

//       {/* Gallery */}
//       {section.gallery && section.gallery.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {section.gallery.map((img, i) => (
//             <div
//               key={i}
//               className="overflow-hidden h-44 shadow-sm transition-all duration-500 hover:opacity-90"
//             >
//               <img
//                 src={img}
//                 className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Subsections */}
//       {section.subsections?.length > 0 && (
//         <div className="space-y-8">
//           {section.subsections.map((sub, idx) => (
//             <div key={idx} className="space-y-2">
//               <h3 className="text-lg font-medium text-[#1A0A0B] tracking-wide">
//                 {sub.subheader}
//               </h3>

//               {sub.content && (
//                 <p className="text-gray-700 leading-relaxed text-[15px]">
//                   {sub.content}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }