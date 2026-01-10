import { CartResponse } from "../types/cart";
import api from "./api";

export async function fetchCartData(): Promise<CartResponse> {
 try{
    const res= await api.get(`/cart/my-cart`);
    const data= await res.data;
    return data;
 }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || 'fail to fetch wishlist data')
    }
    }
    throw new Error('An unexpected error occurred');
}



export async function increaseQuantity(id: string) {
    try {
        const res = await api.put(`/cart/increase-quantity/${id}`, { quantity: 1 });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to increase quantity');
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function decreaseQuantity(id: string) {
    try {
        const res = await api.put(`/cart/decrease-quantity/${id}`, { quantity: 1 });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to decrease quantity');
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function removeCartItem(id: string) {
    try {
        const res = await api.delete(`/cart/remove/${id}`);
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to remove item');
        }
        throw new Error('An unexpected error occurred');
    }
}