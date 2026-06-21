import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function Select({ options, value, onChange, className = '', placeholder = 'Select...' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-[#000] hover:bg-white/[0.02] border border-white/[0.1] hover:border-white/[0.2] text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-left"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400 truncate'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ml-2 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full min-w-[140px] mt-1 bg-[#111] border border-white/[0.1] rounded-md shadow-xl py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 right-0">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-white/[0.05] transition-colors group"
            >
              <span className={value === option.value ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}>
                {option.label}
              </span>
              {value === option.value && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
