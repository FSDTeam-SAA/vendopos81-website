import Image from "next/image";

import { Trash2 } from "lucide-react";
import { CartItem as CartItemModel } from "@/lib/types/cart";

interface Props {
  item: CartItemModel;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: Props) => {
  const image = item?.product?.images?.[0]?.url || "/images/placeholder.png";
  const title = item?.product.title || "Unknown Product";
  const description = item.variant?.label || "Standard";
  console.log("product?.images?.[0]?.url", item?.product?.images?.[0]?.url);
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-400  ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onRemove(item._id)}
          className="text-primary hover:text-primary/80 p-2"
        >
          <Trash2 size={18} />
        </button>
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="w-20 h-20 rounded object-cover shadow-md"
        />
        <div>
          <h4 className="font-semibold text-primary text-base md:text-lg mb-1.5">{title}</h4>
          <p className="text-sm text-[#6C757D]">{description}</p>
        </div>
      </div>

      <div className=" space-y-2 gap-4">
        <span className="font-semibold w-20 text-right ">
          ${item.price.toFixed(2)}
        </span>
        <div className=" space-x-2 flex items-center mt-6">
          <button
            onClick={() => onDecrease(item._id)}
            className="w-8 h-8 rounded-xs  border-2 border-primary  text-primary flex items-center justify-center"
          >
            -
          </button>
          <span className="font-medium w-6 text-center text-primary">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item._id)}
            className="w-8 h-8 rounded-xs  border-2 border-primary text-primary  flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
