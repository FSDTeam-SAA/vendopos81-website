"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import PersonalInformationPresenter from "./PersonalInformationPresenter"
import { personalInformationSchema, type PersonalInformationFormData } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"

const PersonalInformationContainer = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: "Olivia",
      lastName: "Rhye",
      email: "bessieedwards@gmail.com",
      phone: "+1 (555) 123-4567",
      company: "Company Name Here",
      location: "Florida, USA",
      postalCode: "30301",
      gender: "female",
    },
  })

  const onSubmit = async (data: PersonalInformationFormData) => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form data:", data)
      toast.success("Success", {
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <PersonalInformationPresenter form={form} onSubmit={onSubmit} isLoading={isLoading} />
}

export default PersonalInformationContainer
