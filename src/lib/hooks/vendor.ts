'use client'
import { useMutation } from "@tanstack/react-query";
import { regesterSupplier } from "../api/vendor";


export function useVendorRegister() {
    return useMutation({
        mutationKey:['vendor'],
        mutationFn:(data:FormData)=>regesterSupplier(data)
    })
    
}