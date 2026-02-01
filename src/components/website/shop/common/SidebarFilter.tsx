'use client'
import React, { useState } from 'react'
import { Check, Filter, X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { ProductParams } from '@/lib/types/product'
import { Button } from '@/components/ui/button'
import { useAllCategory } from '@/lib/hooks/useCategory'
import { Category } from '@/lib/types/category'
import Image from 'next/image'

interface SidebarFilterProps {
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onRegionChange: (region: string | null) => void;
  onProductTypeChange: (type: string | null) => void;
  onAttributeChange: <K extends keyof ProductParams>(key: K, value: ProductParams[K]) => void;
  query: ProductParams;
}

interface FilterContentProps {
  query: ProductParams;
  priceRange: [number, number];
  onPriceChangeHandler: (index: number, value: number) => void;
  onRegionChange: (region: string | null) => void;
  onProductTypeChange: (type: string | null) => void;
  onAttributeChange: <K extends keyof ProductParams>(key: K, value: ProductParams[K]) => void;
}


const FOOD_TYPES = [
  { id: 'grains', label: 'Grains & Rice' },
  { id: 'flours', label: 'Flours & Fufu Mixes' },
  { id: 'palm_oil', label: 'Palm Oil & Cooking Oils' },
  { id: 'dried_fish', label: 'Dried Fish & Seafood' },
  { id: 'smoked_meats', label: 'Smoked Meats' },
  { id: 'sauces', label: 'Sauces & Pastes' },
]

const FilterContent: React.FC<FilterContentProps> = ({
  query,
  priceRange,
  onPriceChangeHandler,
  onRegionChange,
  onProductTypeChange,
  onAttributeChange
}) => {
    const { data, isLoading } = useAllCategory();

  
    const countryData = data?.data || [];
  const selectedRegion = query.region || null;
  const selectedFoodType = query.productType || null;

  const handleRegionClick = (region: string) => {
    const newRegion = selectedRegion ===region ? null : region;
    onRegionChange(newRegion);
  };

  const handleFoodTypeClick = (id: string) => {
    const newFoodType = selectedFoodType === id ? null : id;
    onProductTypeChange(newFoodType);
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Shop by Region */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-100 rounded-sm">
          Shop by region
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-scroll scrollbar-hide">
          {countryData.map((region:Category) => (
            <button
              key={region._id}
              onClick={() => handleRegionClick(region.region)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                selectedRegion === region._id
                  ? 'bg-green-50 text-green-700 font-medium ring-1 ring-green-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Image className=' object-cover rounded-md w-8 aspect-square' src={region.regionImage?.url|| '/no-image.jpg'} alt='region' width={20} height={20} />
              <span className="text-xl">{}</span>
              <span>{region.region}</span>
              {selectedRegion === region._id && <Check size={16} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Fill by Price */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6 px-2 border-l-2 border-green-100 rounded-sm">
          Fill by price
        </h3>
        <div className="px-2 space-y-4">
            <div className="relative h-6 flex items-center">
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => onPriceChangeHandler(0, parseInt(e.target.value))}
                    className="absolute w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600 z-10 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                />
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => onPriceChangeHandler(1, parseInt(e.target.value))}
                    className="absolute w-full h-1 bg-transparent rounded-full appearance-none cursor-pointer accent-green-600 z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                />
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm font-bold text-green-700">
                        ${priceRange[0]}
                    </div>
                </div>
                <div className="flex-1 text-right">
                    <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm font-bold text-green-700">
                        ${priceRange[1]}
                    </div>
                </div>
            </div>
        </div>
      </div>

       <hr className="border-gray-100" />

      {/* Food Type */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-100 rounded-sm">
            Food type
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-scroll scrollbar-hide">
            {FOOD_TYPES.map(type => (
                <button
                    key={type.id}
                    onClick={() => handleFoodTypeClick(type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left text-sm ${
                        selectedFoodType === type.id
                            ? 'bg-green-50 text-green-700 font-bold ring-1 ring-green-200'
                            : 'text-gray-600 hover:bg-gray-50 font-medium'
                    }`}
                >
                    <span>{type.label}</span>
                    {selectedFoodType === type.id && <Check size={16} className="text-green-600" />}
                </button>
            ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Additional Attributes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-100 rounded-sm">
            Product Attributes
        </h3>
        <div className="space-y-3">
            {(['isHalal', 'isOrganic', 'isFrozen', 'isKosher'] as const).map((key) => {
                const labels: Record<string, string> = {
                  isHalal: 'Halal Certified',
                  isOrganic: 'Organic',
                  isFrozen: 'Frozen',
                  isKosher: 'Kosher'
                };
                const isChecked = query[key] === 'true' || query[key] === true;
                
                return (
                  <div 
                    key={key} 
                    className="flex items-center space-x-3 cursor-pointer group" 
                    onClick={() => {
                        const newValue = isChecked ? undefined : 'true';
                        onAttributeChange(key, newValue);
                    }}
                  >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isChecked 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-gray-200 group-hover:border-primary/50'
                      }`}>
                          {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {labels[key]}
                      </span>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  )
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
  onCategoryChange, 
  onPriceChange,
  onRegionChange,
  onProductTypeChange,
  onAttributeChange,
  query
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    
    if (index === 0 && value > newRange[1]) newRange[1] = value;
    if (index === 1 && value < newRange[0]) newRange[0] = value;
    
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-2xl px-6 py-6 bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Filter size={20} />
          <span>Filters</span>
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-24 h-fit">
        <FilterContent 
           query={query}
           priceRange={priceRange}
           onPriceChangeHandler={handlePriceChange}
           onRegionChange={onRegionChange}
           onProductTypeChange={onProductTypeChange}
           onAttributeChange={onAttributeChange}
        />
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Container */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[60] 
        transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-4">
             <FilterContent 
                query={query}
                priceRange={priceRange}
                onPriceChangeHandler={handlePriceChange}
                onRegionChange={onRegionChange}
                onProductTypeChange={onProductTypeChange}
                onAttributeChange={onAttributeChange}
             />
          </div>
          <div className="p-4 border-t">
            <Button 
              className="w-full rounded-xl py-6"
              onClick={() => setIsOpen(false)}
            >
              Show Results
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarFilter