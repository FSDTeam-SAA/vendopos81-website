import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { decreaseQuantity, fetchCartData, increaseQuantity, removeCartItem } from "../api/cart";
import { CartResponse } from "../types/cart";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on layout.tsx

export function useFetchCartData() {
  return useQuery<CartResponse, Error>({
    queryKey: ["allProduct"], 
    queryFn: () => fetchCartData(),
  });
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
