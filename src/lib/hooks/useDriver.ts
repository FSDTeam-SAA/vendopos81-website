'use client'
import { useMutation } from "@tanstack/react-query";
import { registerDriver } from "../api/driver";


export function useDriverRegister() {
    return useMutation({
        mutationKey:['driver'],
        mutationFn:(data:FormData)=>registerDriver(data)
    })
    
}
