"use client"

import React, { use } from "react"
import SingleProductHero from "@/components/website/singleproduct/SingleProductHero"
import { useSingleProduct } from "@/lib/hooks/product"
import SingleProductDetail from "@/components/website/singleproduct/SingleProductDetail"
import { da } from "zod/v4/locales"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page = ({ params }: PageProps) => {
  const { id } = use(params)

  const { data, isLoading, error } = useSingleProduct(id)

  if (isLoading) return <div>Loading...</div>
  // If data is missing but no error, we might still want to show something or stick with loading
  if (error || (!isLoading && !data)) return <div>Error loading product</div>
 const singleProductData=data?.data || []
  return (
    <div>
      <SingleProductHero product={singleProductData} />
      <SingleProductDetail data={singleProductData} />
    </div>
  )
}

export default Page
