import { useRef } from "react";
import { useInView } from "framer-motion";

function GridItem({ src, alt, label }: any) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
    once: false,
  });

  return (
    <div ref={ref} className="relative h-75 overflow-hidden group">
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-full object-cover transition-all duration-500

          /* MOBILE: scroll-based */
          ${isInView ? "grayscale-0 scale-105" : "grayscale scale-100"}
          
          /* DESKTOP: override with hover-only */
          md:grayscale md:scale-100
          md:group-hover:grayscale-0 md:group-hover:scale-105
        `}
      />

      <div
        className={`
          absolute inset-0 bg-[#1A0A0B] transition-opacity duration-300

          /* MOBILE */
          ${isInView ? "opacity-20" : "opacity-40"}

          /* DESKTOP */
          md:opacity-40
          md:group-hover:opacity-20
        `}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
        <p className="text-white uppercase tracking-wider text-sm font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function ImageGrid() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
        <GridItem
          src="/images/safaris/kenya/excursions/amboseli.jpg"
          alt="Wildlife Safari"
          label="Wildlife Encounters"
        />
        <GridItem
          src="/images/safaris/kenya/mtkenya/i3.jpg"
          alt="Mountain Trekking"
          label="Mountain Adventures"
        />
        <GridItem
          src="/images/safaris/zanzibar/budget/spice_tour.jpg"
          alt="Cultural Experiences"
          label="Cultural Journeys"
        />
      </div>
    </section>
  );
}