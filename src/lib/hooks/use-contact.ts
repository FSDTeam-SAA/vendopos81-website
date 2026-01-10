'use client';


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactFormData, sendContactForm } from "../api/contact";



export const useContact = () => {
  return useMutation({
    mutationFn: (formData: ContactFormData) =>
      sendContactForm(formData),
    onSuccess:(data)=>{
      toast.success(data?.message || "Message sent successfully!");
    },
    onError:(error)=>{
      toast.error(`Failed to send message: ${error.message}`);
    }
  });
};