import { useState } from "react"
import { Menu, X } from "lucide-react"
import rawData from "./data/data.json"
import type { Safari, GeneralInfo } from "./data/types"

export default function Culture() {
  /* ================= DATA ================= */
  const { safaris, generalInfo } = rawData as {
    safaris: Safari[]
    generalInfo: GeneralInfo[]
  }
  const generalImages: Record<string, string> = {
  culture: "/images/safaris/kenya/culture/i1.png",
  car: "/images/safaris/kenya/culture/i15.png",
  water: "/images/safaris/kenya/culture/i10.png",
}

  /* ================= STATE ================= */
  const [activeTab, setActiveTab] =
    useState<"safaris" | "generalInfo">("safaris")

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ================= SELECTED ITEMS ================= */
  const selectedSafari = safaris[selectedIndex]
  const selectedInfo = generalInfo[selectedIndex]

  /* ================= HERO IMAGE ================= */
  const heroImage =
  activeTab === "safaris"
    ? selectedSafari?.images?.[0] ?? "/images/safaris/default.jpg"
    : generalImages[selectedInfo.slug] ??
      "/images/safaris/default.jpg"

    


  const title =
    activeTab === "safaris"
      ? selectedSafari.title
      : selectedInfo.title

  const description =
    activeTab === "safaris"
      ? selectedSafari.description
      : selectedInfo.description

  const list = activeTab === "safaris" ? safaris : generalInfo

  /* ================= RENDER ================= */
  return (
    <section className="max-w-7xl mx-auto">

      {/* ======================================================
         HERO
      ====================================================== */}
      <div className="relative h-96 overflow-hidden">
        <img
          key={heroImage}
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#1A0A0B]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl uppercase tracking-widest font-light text-white">
            {title}
          </h1>
        </div>
      </div>


      {/* ======================================================
         TABS
      ====================================================== */}
      <div className="flex border-b border-[#1A0A0B]/20">
        {(["safaris", "generalInfo"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              setSelectedIndex(0)
            }}
            className={`px-8 py-4 uppercase tracking-wide text-sm transition
              ${activeTab === tab
                ? "border-b-2 border-[#1A0A0B] font-medium"
                : "text-[#1A0A0B]/60 hover:text-[#1A0A0B]"
              }`}
          >
            {tab === "safaris" ? "Safaris" : "General Information"}
          </button>
        ))}
      </div>


      {/* ======================================================
         MOBILE SIDEBAR BUTTON
      ====================================================== */}
      <div className="md:hidden px-4 mt-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center gap-2 w-full border border-[#1A0A0B] px-4 py-3 uppercase tracking-wide text-sm"
        >
          <Menu size={18} />
          Browse {activeTab === "safaris" ? "Safaris" : "Information"}
        </button>
      </div>


      {/* ======================================================
         MAIN GRID
      ====================================================== */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">

        {/* ==================================================
           LEFT CONTENT
        ================================================== */}
        <div className="md:col-span-2">

          <div className="bg-white border border-[#1A0A0B]/10 p-10 shadow-sm space-y-6">

            {/* Safari Meta */}
            {activeTab === "safaris" && selectedSafari && (
              <div className="flex gap-6 text-sm uppercase tracking-wider text-[#1A0A0B]/60">
                {selectedSafari.code && <span>{selectedSafari.code}</span>}
                {selectedSafari.duration && <span>{selectedSafari.duration}</span>}
              </div>
            )}

            {/* Description */}
            <p className="text-[#1A0A0B]/85 text-[16px] leading-[1.9] text-justify hyphens-auto">
              {description}
            </p>

            {/* Images (safaris only) */}
            {activeTab === "safaris" &&
              (selectedSafari?.images?.length ?? 0) > 1 && (
                <div className="grid md:grid-cols-2 gap-4 pt-6">
                  {(selectedSafari.images ?? []).slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={title}
                      className="h-60 w-full object-cover"
                    />
                  ))}
                </div>
              )}
          </div>
        </div>


        {/* ==================================================
           DESKTOP SIDEBAR
        ================================================== */}
        <div className="hidden md:block space-y-8">
          <div className="bg-white border border-[#1A0A0B]/10 p-6 shadow-sm sticky top-6">

            <h2 className="text-xl uppercase tracking-wide text-[#1A0A0B] mb-6">
              {activeTab === "safaris" ? "All Safaris" : "Information"}
            </h2>

            <ul className="space-y-3">
              {list.map((item, i) => (
                <li key={item.title}>
                  <button
                    onClick={() => setSelectedIndex(i)}
                    className={`
                      w-full text-left px-4 py-3 text-sm uppercase tracking-wide
                      border transition-colors
                      ${selectedIndex === i
                        ? "bg-[#1A0A0B] text-white border-[#1A0A0B]"
                        : "border-[#1A0A0B]/20 text-[#1A0A0B]/85 hover:bg-[#1A0A0B]/5"
                      }
                    `}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* ======================================================
         MOBILE DRAWER SIDEBAR
      ====================================================== */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition
          ${sidebarOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* overlay */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={`
            absolute inset-0 bg-black/40 transition-opacity
            ${sidebarOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* drawer */}
        <div
          className={`
            absolute right-0 top-0 h-full w-72 bg-white shadow-xl
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-6 space-y-6">

            {/* header */}
            <div className="flex justify-between items-center">
              <h2 className="uppercase tracking-wide font-medium">
                {activeTab === "safaris" ? "Safaris" : "Information"}
              </h2>

              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* list */}
            <ul className="space-y-3">
              {list.map((item, i) => (
                <li key={item.title}>
                  <button
                    onClick={() => {
                      setSelectedIndex(i)
                      setSidebarOpen(false)
                    }}
                    className={`
                      w-full text-left px-4 py-3 text-sm uppercase tracking-wide
                      border transition
                      ${selectedIndex === i
                        ? "bg-[#1A0A0B] text-white"
                        : "border-[#1A0A0B]/20 hover:bg-[#1A0A0B]/5"
                      }
                    `}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

    </section>
  )
}
