import { forwardRef, type InputHTMLAttributes } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ isLoading, onClear, value, className = "", ...props }, ref) => {
    const hasValue = value && String(value).length > 0;

    return (
      <div className="relative w-full min-w-0">
        <input
          ref={ref}
          value={value}
          className={`
            w-full min-w-0 px-3 py-2.5 
            text-sm 
            text-[#1A0A0B] bg-white 
            border border-gray-300 
            focus:outline-none focus:border-gray-400 
            focus:ring-2 focus:ring-[#F5D547]/20 
            placeholder:text-gray-400
            transition-all duration-200
            ${className}
          `}
          style={{
            paddingRight: '2.5rem',
            boxSizing: 'border-box'
          }}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-gray-400 shrink-0" />
          ) : hasValue && onClear ? (
            <button 
              onClick={onClear} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 shrink-0"
              aria-label="Clear search"
              type="button"
            >
              <X size={16} className="shrink-0" />
            </button>
          ) : null}
          <Search size={16} className="text-gray-400 shrink-0" />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";