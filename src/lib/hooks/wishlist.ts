'use client'
import { useQuery } from "@tanstack/react-query";
import { wishlist } from "../api/wishlist";
import { WishlistResponse } from "../types/wishlist";


export function useWishlistData(page: number = 1){
    return useQuery<WishlistResponse, Error>({
        queryKey:['wishlist', page],
        queryFn:()=>wishlist(page)
    })
}