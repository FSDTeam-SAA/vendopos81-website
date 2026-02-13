import { Category } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

const CountryCard = ({ data }: { data: Category }) => {
  const imageUrl = data.regionImage?.url || data.productImage.url;

  return (
    <Link
      href={`/shop?country=${data.region}`}
      className="flex flex-col items-center text-center group"
    >
      {/* Circle Image */}
      <div
        className="
          relative
          w-[110px] h-[110px]
          sm:w-[130px] sm:h-[130px]
          md:w-[150px] md:h-[150px]
          lg:w-[170px] lg:h-[170px]
          rounded-full
          border
          bg-white
          overflow-hidden
          transition-all duration-300
          group-hover:scale-105
          group-hover:shadow-md
        "
      >
        <Image
          src={imageUrl}
          alt={data.region}
          fill
          sizes="(max-width: 640px) 110px,
                 (max-width: 768px) 130px,
                 (max-width: 1024px) 150px,
                 170px"
          className="object-contain p-4 sm:p-5 md:p-6 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <p className="mt-3 text-xs sm:text-sm md:text-base font-semibold">
        {data.region}
      </p>
    </Link>
  );
};

export default CountryCard;
