import { useMutation, useQuery } from "@tanstack/react-query";
import { getCatagoryData } from "../api/catagory";



export function useCatagoryData() {
    return useQuery({
        queryKey:['catagory'],
        queryFn:()=>getCatagoryData()
    })
    
}
