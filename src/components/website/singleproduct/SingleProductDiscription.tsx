import { Product, WholesaleItem, ProductVariant } from "@/lib/types/product";
import { CheckCircle2, Package, Container, Box } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const SingleProductDiscription = ({ data }: { data?: Product }) => {
  if (!data) return null;

  const showWholesale = data.wholesaleId && data.wholesaleId.length > 0;
  const showVariants = !showWholesale && data.variants && data.variants.length > 0;

  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Main HTML Description */}
      <div className="prose prose-stone max-w-none text-gray-600">
         <h3 className="text-xl font-semibold text-gray-900 mb-4 not-prose">Product Description</h3>
         <div dangerouslySetInnerHTML={{ __html: data.description || "No description available." }} />
      </div>

      <hr className="border-gray-100" />

      {/* 2. Product Specifications */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            <SpecRow label="Product Type" value={data.productType} />
            <SpecRow label="Origin" value={data.originCountry} />
            <SpecRow label="Shelf Life" value={data.shelfLife} />
            <SpecRow label="Stock Status" value={data.isAvailable ? "In Stock" : "Out of Stock"} />
            <SpecRow label="Brand" value={typeof data.supplierId === 'object' ? data.supplierId?.brandName : "N/A"} />
        </div>
      </div>

      {/* 3. Certifications / Features */}
      {(data.isOrganic || data.isHalal || data.isKosher || data.isFrozen || data.isFeatured) && (
        <>
            <hr className="border-gray-100" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Certifications</h3>
                <div className="flex flex-wrap gap-4">
                    {data.isOrganic && <FeatureBadge label="Organic" />}
                    {data.isHalal && <FeatureBadge label="Halal" />}
                    {data.isKosher && <FeatureBadge label="Kosher" />}
                    {data.isFrozen && <FeatureBadge label="Frozen" />}
                    {data.isFeatured && <FeatureBadge label="Featured Product" />}
                </div>
            </div>
        </>
      )}

      {/* 4. Available Configurations (Wholesale vs Variants) */}
      {(showWholesale || showVariants) && (
        <>
            <hr className="border-gray-100" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {showWholesale ? "Packaging & Wholesale Options" : "Available Variants"}
                </h3>
                
                <div className="space-y-4">
                    {/* Wholesale List */}
                    {showWholesale && data.wholesaleId?.map((item: WholesaleItem) => (
                        <div key={item._id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                                {item.type === 'pallet' ? <Container size={24} /> : <Box size={24} />}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 capitalize text-lg">{item.type} Option</h4>
                                <p className="text-gray-600 mb-1">{item.label}</p>
                                {/* Display specific items inside if needed, or just general info */}
                                {item.type === 'pallet' && item.palletItems?.[0] && (
                                     <p className="text-sm text-gray-500">
                                        Price: <span className="font-medium text-primary">${item.palletItems[0].price}</span> 
                                        {item.palletItems[0].totalCases && ` • Cases: ${item.palletItems[0].totalCases}`}
                                     </p>
                                )}
                                {item.type === 'case' && item.caseItems?.[0] && (
                                     <p className="text-sm text-gray-500">
                                        Price: <span className="font-medium text-primary">${item.caseItems[0].price}</span>
                                        {item.caseItems[0].quantity && ` • Qty: ${item.caseItems[0].quantity}`}
                                     </p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Variants List */}
                     {showVariants && data.variants?.map((item: ProductVariant) => (
                        <div key={item._id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-900">{item.label || item.unit}</span>
                                    {item.stock < 10 && <span className="text-xs text-red-500 ml-2">Low Stock</span>}
                                </div>
                            </div>
                            <span className="font-semibold text-primary">
                                ${item.price}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
      )}

    </section>
  );
};

// -- Helper Components --

const SpecRow = ({ label, value }: { label: string, value?: string | number | null }) => (
    <div className="flex justify-between items-center sm:grid sm:grid-cols-3 py-2 border-b border-gray-100 last:border-0">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="text-gray-900 font-medium text-right sm:text-left sm:col-span-2">{value || "—"}</span>
    </div>
);

const FeatureBadge = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
        <CheckCircle2 size={14} />
        {label}
    </div>
);

export default SingleProductDiscription;
