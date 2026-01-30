"use client"

import React, { use } from "react"
import SingleProductHero from "@/components/website/singleproduct/SingleProductHero"
import { useRelatedProduct, useSingleProduct } from "@/lib/hooks/product"
import SingleProductDetail from "@/components/website/singleproduct/SingleProductDetail"
import { da } from "zod/v4/locales"
import Skeleton from "@/components/website/shop/common/Skeleton"
import RelatedProduct from "@/components/website/singleproduct/relatedProduct/RelatedProduct"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page = ({ params }: PageProps) => {
  const { id } = use(params)

  const { data, isLoading, error } = useSingleProduct(id)
  const {data:relatedtDatas} = useRelatedProduct(id)

if (isLoading) return <Skeleton />;

if (error || (!isLoading && !data)) {
  return <div className="container mx-auto">Error loading product</div>;
}

 const singleProductData=data?.data || []
 console.log('related ',relatedtDatas)
 const relatedtData=relatedtDatas?.data || []
  return (
    <div>
      <SingleProductHero product={singleProductData} />
      <SingleProductDetail data={singleProductData} />
      <RelatedProduct data={relatedtData || []} />  
    </div>
  )
}

export default Page
