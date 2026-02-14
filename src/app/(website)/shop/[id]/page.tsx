"use client";

import Skeleton from "@/components/website/shop/common/Skeleton";
import RelatedProduct from "@/components/website/singleproduct/relatedProduct/RelatedProduct";
import SingleProductDetail from "@/components/website/singleproduct/SingleProductDetail";
import SingleProductHero from "@/components/website/singleproduct/SingleProductHero";
import { useRelatedProduct, useSingleProduct } from "@/lib/hooks/product";
import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = ({ params }: PageProps) => {
  const { id } = use(params);

  const { data, isLoading, error } = useSingleProduct(id);
  const { data: relatedtDatas } = useRelatedProduct(id);

  if (isLoading) return <Skeleton />;

  if (error || (!isLoading && !data)) {
    return <div className="container mx-auto">Error loading product</div>;
  }

  const singleProductData = data?.data || [];

  const relatedtData = relatedtDatas?.data || [];
  return (
    <div>
      <SingleProductHero product={singleProductData} />
      <SingleProductDetail data={singleProductData} />
      <RelatedProduct data={relatedtData || []} />
    </div>
  );
};

export default Page;
