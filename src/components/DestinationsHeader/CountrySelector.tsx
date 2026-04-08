import { ChevronDown } from "lucide-react";

export default function CountrySelector({
  countries,
  currentCountry,
  onChange,
}: {
  countries: string[];
  currentCountry: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="relative group">
      <select
        className="appearance-none bg-white border border-gray-300 text-[#1A0A0B] text-sm px-4 py-1.5 pr-8 rounded-none focus:outline-none focus:border-gray-400 hover:border-gray-400 transition cursor-pointer font-medium tracking-wide"
        value={currentCountry}
        onChange={(e) => onChange(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country} value={country} className="bg-white">
            {country}
          </option>
        ))}
      </select>
      <ChevronDown 
        size={14} 
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
    </div>
  );
}