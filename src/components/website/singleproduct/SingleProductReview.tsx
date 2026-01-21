import ReviewCard from "@/components/shared/ReviewCard";
import { useSingleProductReview } from "@/lib/hooks/product";

import { Review } from "@/lib/types/review";
import ReviewSkeleton from "./ReviewSkeleton";

const SingleProductReview = ({ id }: { id: string }) => {
  const { data, isLoading } = useSingleProductReview(id);

if (isLoading) {
  return <ReviewSkeleton />;
}


  const reviews = data?.data || [];

  if (!reviews.length) {
    return <p className="text-sm text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-8">
      {reviews.map((review:Review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default SingleProductReview;
