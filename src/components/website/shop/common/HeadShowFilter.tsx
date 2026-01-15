'use client'
import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductParams } from '@/lib/types/product';


interface FilterItem {
  id: string;
  label: string;
  value: string;
}

interface HeadShowFilterProps {
  title?: string;
  query: ProductParams;
  onFilterChange?: (filters: string[]) => void;
  onRegionChange?: (region: string | null) => void;
  onProductTypeChange?: (type: string | null) => void;
  onClearFilters?: () => void;
  showBreadcrumb?: boolean;
  breadcrumbItems?: { label: string; href: string }[];
}

const HeadShowFilter: React.FC<HeadShowFilterProps> = ({
  title = 'Shop',
  query,
  onFilterChange,
  onRegionChange,
  onProductTypeChange,
  showBreadcrumb = true,
  breadcrumbItems = [
     { label: 'Home', href: '/' },
     { label: 'Shop', href: '/shop' },
     { label: 'Snack', href: '#' }
  ],
}) => {
 
  // Aggregate all active filters for display
  const activeChips: { id: string; type: 'category' | 'region' | 'productType'; value: string; label: string }[] = [];

  if (query.categorySlug) {
    query.categorySlug.split(',').forEach(slug => {
      activeChips.push({ id: `cat-${slug}`, type: 'category', value: slug, label: slug });
    });
  }

  if (query.region) {
    activeChips.push({ id: `reg-${query.region}`, type: 'region', value: query.region, label: query.region });
  }

  if (query.productType) {
    activeChips.push({ id: `type-${query.productType}`, type: 'productType', value: query.productType, label: query.productType });
  }

  const handleRemoveChip = (chip: typeof activeChips[0]) => {
    if (chip.type === 'category') {
      const newCategories = query.categorySlug?.split(',').filter(s => s !== chip.value) || [];
      if (onFilterChange) onFilterChange(newCategories);
    } else if (chip.type === 'region') {
      if (onRegionChange) onRegionChange(null);
    } else if (chip.type === 'productType') {
      if (onProductTypeChange) onProductTypeChange(null);
    }
  };

  return (
<div
  style={{ backgroundImage: "url(/images/shopher.png)" }}
  className="relative bg-cover bg-center bg-no-repeat rounded-3xl p-8 md:p-12 overflow-hidden mb-10"
>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">{title}</h1>
          
          {/* Breadcrumb */}
          {showBreadcrumb && (
            <div className="flex items-center text-sm text-gray-500">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <Link href={item.href} className="hover:text-green-600 transition-colors">
                    {item.label}
                  </Link>
                  {index < breadcrumbItems.length - 1 && (
                    <span className="mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3">
          {activeChips.map((chip) => (
              <Button 
                key={chip.id}
                variant="default"
                onClick={() => handleRemoveChip(chip)}
                className="flex items-center gap-2 px-4 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-white shadow-md hover:bg-primary/90 capitalize"
              >
                <X size={14} />
                {chip.label.replace(/_/g, ' ')}
              </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadShowFilter;