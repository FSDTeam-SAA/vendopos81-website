"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/lib/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState<string>(
    images?.[0]?.url || "/placeholder.png"
  );

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
         <Image
            src="/placeholder.png"
            alt="No Image Available"
            fill
            className="object-contain p-4"
            priority
          />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-300 hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image) => (
            <button
              key={image._id}
              onClick={() => setMainImage(image.url)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-white transition-all ${
                mainImage === image.url
                  ? "border-primary ring-2 ring-primary ring-offset-1"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              type="button"
              aria-label="View product image"
            >
              <Image
                src={image.url}
                alt={`${title} thumbnail`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
