import { WishlistResponse } from "../types/wishlist";
import api from "./api";


export async function wishlist(page: number = 1): Promise<WishlistResponse> {
 try{
    const res= await api.get(`/wishlist/my-wishlist?page=${page}`);
    const data= await res.data;
    return data;
 }catch(error){
    if(error instanceof Error){
        throw new Error(error.message || 'fail to fetch wishlist data')
    }
    throw new Error('An unexpected error occurred');
}

}