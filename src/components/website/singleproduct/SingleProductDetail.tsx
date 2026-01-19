"use client";

import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types/product'
import React, { useState } from 'react'
import SingleProductDiscription from './SingleProductDiscription';
import SingleProductReview from './SingleProductReview';
import { cn } from "@/lib/utils";

const SingleProductDetail = ({ data }: { data: Product }) => {
    const [activeTab, setActiveTab] = useState<'Description' | 'Review'>('Description');

    return (
        <section className="bg-gray-50 py-10 mt-10">
            <div className='container mx-auto px-4'>
                <div className='flex gap-4 border-b border-gray-200 mb-6'>
                    <button
                        onClick={() => setActiveTab('Description')}
                        className={cn(
                            "pb-4 text-sm font-medium transition-all relative",
                            activeTab === 'Description' 
                            ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                            : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('Review')}
                        className={cn(
                            "pb-4 text-sm font-medium transition-all relative",
                            activeTab === 'Review' 
                            ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                            : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Reviews ({data?.totalRatings || 0})
                    </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm min-h-[200px]">
                    {activeTab === 'Description' && (
                        <SingleProductDiscription data={data} />
                    )}
                    
                    {activeTab === 'Review' && (
                        <SingleProductReview id={data._id}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SingleProductDetail