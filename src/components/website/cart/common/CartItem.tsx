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
    <div className="flex items-center justify-between bg-white p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onRemove(item._id)}
          className="text-red-500 hover:text-red-700 p-2"
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
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className=" space-y-2 gap-4">
        <span className="font-semibold w-20 text-right">
          ${item.price.toFixed(2)}
        </span>
        <div className="flex">
          <button
            onClick={() => onDecrease(item._id)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            -
          </button>
          <span className="font-medium w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item._id)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
