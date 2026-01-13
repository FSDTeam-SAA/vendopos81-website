'use client'
import React, { useState } from 'react'
import { Check } from 'lucide-react'
// import { Slider } from '@/components/ui/slider' // Slider component not available
import { Checkbox } from '@/components/ui/checkbox'
import { ProductParams } from '@/lib/types/product'

interface SidebarFilterProps {
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onRegionChange: (region: string | null) => void;
  onProductTypeChange: (type: string | null) => void;
  query: ProductParams;
}

const REGIONS = [
  { id: 'african', label: 'African', icon: '🌍' },
  { id: 'caribbean', label: 'Caribbean', icon: '🏝️' },
  { id: 'latin', label: 'Latin American', icon: '💃' },
  { id: 'asian', label: 'Asian', icon: '🥢' },
  { id: 'mediterranean', label: 'Mediterranean', icon: '🏺' },
]

const FOOD_TYPES = [
  { id: 'grains', label: 'Grains & Rice' },
  { id: 'flours', label: 'Flours & Fufu Mixes' },
  { id: 'palm_oil', label: 'Palm Oil & Cooking Oils' },
  { id: 'dried_fish', label: 'Dried Fish & Seafood' },
  { id: 'smoked_meats', label: 'Smoked Meats' },
  { id: 'sauces', label: 'Sauces & Pastes' },
]

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
  onCategoryChange, 
  onPriceChange,
  onRegionChange,
  onProductTypeChange,
  query
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const selectedRegion = query.region || null;
  const selectedFoodType = query.productType || null;

  const handleRegionClick = (id: string) => {
    const newRegion = selectedRegion === id ? null : id;
    onRegionChange(newRegion);
  };

  const handleFoodTypeClick = (id: string) => {
    const newFoodType = selectedFoodType === id ? null : id;
    onProductTypeChange(newFoodType);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    
    // Ensure min doesn't exceed max and vice-versa
    if (index === 0 && value > newRange[1]) newRange[1] = value;
    if (index === 1 && value < newRange[0]) newRange[0] = value;
    
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      
      {/* Shop by Region */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-4 border-green-500 rounded-sm">
          Shop by region
        </h3>
        <div className="space-y-2">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                selectedRegion === region.id
                  ? 'bg-green-50 text-green-700 font-medium ring-1 ring-green-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{region.icon}</span>
              <span>{region.label}</span>
              {selectedRegion === region.id && <Check size={16} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Fill by Price */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6 px-2 border-l-4 border-green-500 rounded-sm">
          Fill by price
        </h3>
        
        <div className="px-2 space-y-4">
            <div className="relative h-6 flex items-center">
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                    className="absolute w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600 z-10 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                />
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
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
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-4 border-green-500 rounded-sm">
            Food type
        </h3>
        <div className="space-y-2">
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

    </div>
  )
}

export default SidebarFilter