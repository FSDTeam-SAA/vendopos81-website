/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useAllCategory, useGetAllRegions } from "@/lib/hooks/useCategory";
import { Category } from "@/lib/types/category";
import { ProductParams } from "@/lib/types/product";
import { Check, Filter } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface SidebarFilterProps {
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onRegionChange: (region: string | null) => void;
  onProductTypeChange: (type: string | null) => void;
  onAttributeChange: <K extends keyof ProductParams>(
    key: K,
    value: ProductParams[K],
  ) => void;
  query: ProductParams;
}

interface FilterContentProps {
  query: ProductParams;
  priceRange: [number, number];
  onPriceChangeHandler: (index: number, value: number) => void;
  onRegionChange: (region: string | null) => void;
  onProductTypeChange: (type: string | null) => void;
  onCategoryChange: (categories: string[]) => void;
  onAttributeChange: <K extends keyof ProductParams>(
    key: K,
    value: ProductParams[K],
  ) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  query,
  priceRange,
  onPriceChangeHandler,
  onRegionChange,
  onProductTypeChange,
  onCategoryChange,
  onAttributeChange,
}) => {
  const { data } = useGetAllRegions();
  const regionData = data?.data || [];

  const selectedRegion = query.region || null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: foodTypeData } = useAllCategory(
    selectedRegion ? { region: selectedRegion } : undefined,
  );

  const foodType = foodTypeData?.filters?.productTypes || [];
  const productNames = foodTypeData?.filters?.productNames || [];

  // region select
  const handleRegionClick = (regionId: string) => {
    const newRegion = selectedRegion === regionId ? null : regionId;
    setSelectedCategory(null);
    setSelectedType(null);
    onRegionChange(newRegion);
  };

  // product type single select
  const handleFoodTypeClick = (id: string) => {
    const newType = selectedType === id ? null : id;
    setSelectedType(newType);
    onProductTypeChange(newType);
  };

  // product category single select
  const handleCategoryClick = (name: string) => {
    const newCategory = selectedCategory === name ? null : name;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory ? [newCategory] : []);
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl border border-gray-100">
      {/* Product by Region */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-100 rounded-sm">
          Product by Region
        </h3>

        <div className="space-y-2">
          {regionData.map((region: Category) => (
            <button
              key={region._id}
              onClick={() => handleRegionClick(region._id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                selectedRegion === region._id
                  ? "bg-green-50 text-green-700 font-medium ring-1 ring-green-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Image
                className="object-cover rounded-md w-8 aspect-square"
                src={region.regionImage?.url || "/no-image.jpg"}
                alt="region"
                width={20}
                height={20}
              />
              <span>{region.region}</span>
              {selectedRegion === region._id && (
                <Check size={16} className="ml-auto" />
              )}
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
              onChange={(e) =>
                onPriceChangeHandler(0, parseInt(e.target.value))
              }
              className="absolute w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600 z-10 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
            />
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChangeHandler(1, parseInt(e.target.value))
              }
              className="absolute w-full h-1 bg-transparent rounded-full appearance-none cursor-pointer accent-green-600 z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">
                Min Price
              </label>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm font-bold text-green-700">
                ${priceRange[0]}
              </div>
            </div>
            <div className="flex-1 text-right">
              <label className="text-xs text-gray-500 mb-1 block">
                Max Price
              </label>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm font-bold text-green-700">
                ${priceRange[1]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Product Type (Single Select) */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-200 rounded-sm">
          Product Type
        </h3>

        <div className="space-y-2 max-h-60 overflow-y-scroll">
          {!selectedRegion ? (
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              Please select a region to view product types
            </div>
          ) : foodType.length === 0 ? (
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              No product types found for this region
            </div>
          ) : (
            foodType.map((name: any) => {
              const isSelected = selectedType === name;

              return (
                <button
                  key={name}
                  onClick={() => handleFoodTypeClick(name)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left text-sm ${
                    isSelected
                      ? "bg-green-50 text-green-700 font-medium ring-1 ring-green-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{name}</span>
                  {isSelected && <Check size={16} className="text-green-600" />}
                </button>
              );
            })
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Product Category (Single Select) */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-200 rounded-sm">
          Product Category
        </h3>

        <div className="space-y-2 max-h-60 overflow-y-scroll">
          {!selectedRegion ? (
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              Please select a region to view categories
            </div>
          ) : productNames.length === 0 ? (
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              No categories available for this region
            </div>
          ) : (
            productNames.map((name: string) => {
              const isSelected = selectedCategory === name;

              return (
                <button
                  key={name}
                  onClick={() => handleCategoryClick(name)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left text-sm ${
                    isSelected
                      ? "bg-green-50 text-green-700 font-medium ring-1 ring-green-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{name}</span>
                  {isSelected && <Check size={16} className="text-green-600" />}
                </button>
              );
            })
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Attributes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2 border-l-2 border-green-100 rounded-sm">
          Product Attributes
        </h3>
        <div className="space-y-3">
          {(["isHalal", "isOrganic", "isFrozen", "isKosher"] as const).map(
            (key) => {
              const labels: Record<string, string> = {
                isHalal: "Halal Certified",
                isOrganic: "Organic",
                isFrozen: "Frozen",
                isKosher: "Kosher",
              };
              const isChecked = query[key] === "true" || query[key] === true;

              return (
                <div
                  key={key}
                  className="flex items-center space-x-3 cursor-pointer group"
                  onClick={() => {
                    const newValue = isChecked ? undefined : "true";
                    onAttributeChange(key, newValue);
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-primary border-primary text-white"
                        : "border-gray-200 group-hover:border-primary/50"
                    }`}
                  >
                    {isChecked && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span
                    className={`text-sm ${
                      isChecked ? "text-gray-900 font-medium" : "text-gray-600"
                    }`}
                  >
                    {labels[key]}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  onCategoryChange,
  onPriceChange,
  onRegionChange,
  onProductTypeChange,
  onAttributeChange,
  query,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-2xl px-6 py-6 bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Filter size={20} />
          <span>Filters</span>
        </Button>
      </div>

      <div className="hidden lg:block sticky top-24 h-fit">
        <FilterContent
          query={query}
          priceRange={priceRange}
          onPriceChangeHandler={handlePriceChange}
          onRegionChange={onRegionChange}
          onProductTypeChange={onProductTypeChange}
          onCategoryChange={onCategoryChange}
          onAttributeChange={onAttributeChange}
        />
      </div>
    </>
  );
};

export default SidebarFilter;
