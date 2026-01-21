import { useQuery } from "@tanstack/react-query";
import { singleReviewProduct } from "../api/review";


export function useSingleProduct(id:string){
    return useQuery({
        queryKey:['profile',id],
        queryFn:()=>singleReviewProduct(id)
    })
}
