import { Review } from "@/lib/types/review";
import Image from "next/image";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { userId, rating, comment, createdAt } = review;

  const fullName = `${userId.firstName} ${userId.lastName}`;

  return (
    <div className="space-y-4 border-b border-gray-200 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Avatar (fallback letter) */}
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
          {userId.firstName?.[0]}
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-sm md:text-2xl ${
                  index < rating ? "text-[#F59E0B]" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Name */}
          {/* <p className="text-sm font-medium text-gray-800">{fullName}</p> */}
        </div>
      </div>

      {/* Comment */}
      <p className="text-[#18181B] text-sm md:text-base leading-relaxed max-w-3xl">
        {comment}
      </p>

      {/* Date */}
      <div>
        {/* Name */}
        <p className="text-sm font-medium text-[#18181B]">{fullName}</p>
        <p className="text-sm text-gray-400 mt-1">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
