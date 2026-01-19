import { WishlistResponse } from "../types/wishlist";
import api from "./api";


export async function wishlist(page: number = 1, limit: number = 10) {
    try {
        const res = await api.get(`/wishlist/my-wishlist?page=${page}&limit=${limit}`);
        const data = await res.data;
        console.log('wishlist data', data)
        return data;
    } catch (error) {
        console.log('wishlist error', error)
        if (error instanceof Error) {
            throw new Error(error.message || 'fail to fetch wishlist data')
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function removeFromWishlist(id: string) {
    try {
        const res = await api.delete(`/wishlist/delete/${id}`);
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to remove from wishlist');
        }
        throw new Error('An unexpected error occurred');
    }
}

export async function addedWishlist(id:string) {
    try {
        const res = await api.post(`/wishlist/add`,{productId:id});
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to remove from wishlist');
        }
        throw new Error('An unexpected error occurred');
    }
    
} 