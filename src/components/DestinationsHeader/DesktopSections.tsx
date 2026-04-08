export default function DesktopSections({
  sections,
  onNavigate,
  pathname,
  basePath,
}: {
  sections: string[];
  onNavigate: (section: string) => void;
  pathname: string;
  basePath: string;
}) {
  return (
    <div className="flex justify-center gap-6 lg:gap-8 text-xs uppercase tracking-wider">
      {sections.map((section) => {
        const sectionSlug = section.toLowerCase().replace(/\s+/g, "-");
        const isActive = pathname === `${basePath}/${sectionSlug}` || 
                         (pathname === basePath && section === sections[0]);

        return (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className={`relative py-1 transition-colors duration-200 font-medium ${
              isActive 
                ? "text-[#1A0A0B]" 
                : "text-gray-500 hover:text-[#1A0A0B]"
            }`}
          >
            {section}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#F5D547] transition-transform duration-300 ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}