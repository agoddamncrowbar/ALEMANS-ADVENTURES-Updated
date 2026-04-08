import { motion } from "framer-motion";

export default function MobileSections({
  sections,
  onNavigate,
  setMenuOpen,
}: {
  sections: string[];
  onNavigate: (section: string) => void;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => {
            onNavigate(section);
            setMenuOpen(false);
          }}
          className="w-full text-left py-3 px-6 text-sm text-gray-600 hover:text-[#1A0A0B] hover:bg-gray-50 uppercase tracking-wider border-l-2 border-transparent hover:border-[#F5D547] transition-all"
        >
          {section}
        </button>
      ))}
    </motion.div>
  );
}