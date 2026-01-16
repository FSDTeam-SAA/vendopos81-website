import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { decreaseQuantity, fetchCartData, increaseQuantity, removeCartItem, addToCart } from "../api/cart";
import { CartResponse } from "../types/cart";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on layout.tsx

export function useFetchCartData() {
    return useQuery<CartResponse, Error>({
        queryKey: ["allProduct"],
        queryFn: () => fetchCartData(),
    });
}

interface AddToCartVariables {
    productId: string
    variantId?: string
    wholesaleId?: string
    quantity?: number
}

export function useAddToCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (variables: AddToCartVariables) => addToCart(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProduct"] });
            toast.success("Item added to cart");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to add item to cart");
        }
    });
}

import { Product } from "@/lib/types/product"

export function useSmartAddToCart() {
    const { mutate: addToCartMutate, isPending } = useAddToCart()

    const smartAddToCart = (product: Product, quantity: number = 1) => {
        let variantId: string | undefined
        let wholesaleId: string | undefined

        // Priority 1: Wholesale
        if (product.wholesaleId && product.wholesaleId.length > 0) {
            wholesaleId = product.wholesaleId[0]._id
        } 
        // Priority 2: Variant (only if no wholesale selected/available)
        else if (product.variants && product.variants.length > 0) {
            variantId = product.variants[0]._id
        }

        addToCartMutate({
            productId: product._id,
            variantId,
            wholesaleId,
            quantity
        })
    }

    return { smartAddToCart, isPending }
}

export function useIncreaseQuantity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => increaseQuantity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProduct"] });
            toast.success("Quantity updated");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update quantity");
        }
    });
}

export function useDecreaseQuantity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => decreaseQuantity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProduct"] });
            toast.success("Quantity updated");
        },
        onError: (error) => {
             toast.error(error.message || "Failed to update quantity");
        }
    });
}

export function useRemoveCartItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => removeCartItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProduct"] });
            toast.success("Item removed from cart");
        },
        onError: (error) => {
             toast.error(error.message || "Failed to remove item");
        }
    });
}
