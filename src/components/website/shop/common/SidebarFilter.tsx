'use client'
import React, { useState } from 'react'
import { Check, ChevronDown, Filter, Search } from 'lucide-react'
// import { Slider } from '@/components/ui/slider' // Slider component not available
import { Checkbox } from '@/components/ui/checkbox'

interface SidebarFilterProps {
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
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

const SidebarFilter: React.FC<SidebarFilterProps> = ({ onCategoryChange, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 1000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);

  const handleRegionToggle = (id: string) => {
    // Logic for single select or multi select? Image looks like list. Let's assume single for "Shop by region" section styling, but functionally could be multi.
    // Image shows active state on one? Let's just do clickable list.
    // For now, let's treat it as toggling visibility or selection.
    
    // Actually, let's just make them clickable to filter.
    const newRegions = selectedRegions.includes(id) 
        ? selectedRegions.filter(r => r !== id)
        : [...selectedRegions, id];
    setSelectedRegions(newRegions);
    onCategoryChange([...newRegions, ...selectedFoodTypes]);
  }

  const handleFoodTypeToggle = (id: string) => {
    const newTypes = selectedFoodTypes.includes(id)
        ? selectedFoodTypes.filter(t => t !== id)
        : [...selectedFoodTypes, id];
    setSelectedFoodTypes(newTypes);
    onCategoryChange([...selectedRegions, ...newTypes]);
  }

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
              onClick={() => handleRegionToggle(region.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                selectedRegions.includes(region.id)
                  ? 'bg-green-50 text-green-700 font-medium ring-1 ring-green-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{region.icon}</span>
              <span>{region.label}</span>
              {selectedRegions.includes(region.id) && <Check size={16} className="ml-auto" />}
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
        
        <div className="px-2">
            {/* Custom Slider Visualization if UI component fails, but let's try standard range inputs for robustness if slider component missing */}
            <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                <div 
                    className="absolute h-full bg-green-500 rounded-full" 
                    style={{ left: '20%', right: '20%' }}
                ></div>
                <div className="absolute h-4 w-4 bg-green-600 rounded-full border-2 border-white shadow top-1/2 -translate-y-1/2 left-[20%]"></div>
                 <div className="absolute h-4 w-4 bg-green-600 rounded-full border-2 border-white shadow top-1/2 -translate-y-1/2 right-[20%]"></div>
            </div>

            <div className="flex items-center justify-between text-sm font-medium text-green-700 mb-6">
                <span>From: ${priceRange[0]}</span>
                <span>To: ${priceRange[1]}</span>
            </div>
        </div>
      </div>
       <hr className="border-gray-100" />

      {/* Food Type */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-4 border-green-500 rounded-sm">
            Food type
        </h3>
        <div className="space-y-3">
            {FOOD_TYPES.map(type => (
                    <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox 
                            id={`food-${type.id}`}
                            checked={selectedFoodTypes.includes(type.id)}
                            onCheckedChange={() => handleFoodTypeToggle(type.id)}
                        />
                        <label 
                            htmlFor={`food-${type.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 cursor-pointer"
                        >
                            {type.label}
                        </label>
                    </div>
            ))}
        </div>
      </div>

      <button className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
         <Filter size={18} />
         Filter
      </button>

    </div>
  )
}

export default SidebarFilter