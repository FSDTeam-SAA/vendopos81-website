'use client'
import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

interface FilterItem {
  id: string;
  label: string;
  value: string;
}

interface HeadShowFilterProps {
  title?: string;
  filterItems?: FilterItem[];
  activeFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
  onClearFilters?: () => void;
  showBreadcrumb?: boolean;
  breadcrumbItems?: { label: string; href: string }[];
}

const HeadShowFilter: React.FC<HeadShowFilterProps> = ({
  title = 'Snack',
  filterItems = [
    { id: '1', label: 'Cabbage', value: 'cabbage' },
    { id: '2', label: 'Broccoli', value: 'broccoli' },
    { id: '3', label: 'Artichoke', value: 'artichoke' },
    { id: '4', label: 'Celery', value: 'celery' },
    { id: '5', label: 'Spinach', value: 'spinach' },
  ],
  activeFilters = [],
  onFilterChange,
  onClearFilters,
  showBreadcrumb = true,
  breadcrumbItems = [
     { label: 'Home', href: '/' },
     { label: 'Shop', href: '/shop' },
     { label: 'Snack', href: '#' }
  ],
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(activeFilters);

  const removeFilter = (filterToRemove: string) => {
    const newFilters = selectedFilters.filter(filter => filter !== filterToRemove);
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const toggleFilter = (value: string) => {
     const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter(f => f !== value)
      : [...selectedFilters, value];
    setSelectedFilters(newFilters);
    if(onFilterChange) onFilterChange(newFilters);
  }

  return (
    <div className="relative bg-[#D4F3E4] rounded-3xl p-8 md:p-12 overflow-hidden mb-10">
      {/* Background Pattern - Simulated with circles for now */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        
        {/* Breadcrumb */}
        {showBreadcrumb && (
          <div className="flex items-center text-sm text-gray-500 mb-8">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.href} className="hover:text-green-600 transition-colors">
                  {item.label}
                </Link>
                {index < breadcrumbItems.length - 1 && (
                  <span className="mx-2 text-gray-400">,</span> 
                  // Image shows commas for breadcrumbs? Or dots. Standard is chevron usually but let's stick to standard chevron for clarity or comma if image implies list. 
                  // Looking at image: Home > Shop > Snack. It uses chevrons or dots. Let's use simple dot or nothing? 
                  // Re-reading image: Home . Shop . Snack (looks like dots)
                )}
                 {index < breadcrumbItems.length - 1 && (
                   <span className="mx-2">•</span>
                 )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Filter Chips - Horizontal Scrollable */}
        <div className="flex flex-wrap gap-3">
          {filterItems.map((filter) => {
             const isActive = selectedFilters.includes(filter.value);
             return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {isActive && <X size={14} />}
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default HeadShowFilter;