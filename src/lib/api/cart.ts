import { CartResponse } from "../types/cart";
import api from "./api";

// add to cart item fatch
export async function fetchCartData() {
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


// add to cart item increase
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


// add to cart item decrement
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


// add to cart item remove
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


// add to cart
export async function addToCart(productId: string,variantId:string, quantity: number = 1) {
    try {
        const res = await api.post(`/cart/add-to-cart`, { productId,variantId, quantity });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to add item to cart');
        }
        throw new Error('An unexpected error occurred');
    }
}