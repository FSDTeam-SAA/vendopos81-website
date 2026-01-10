"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ChangePasswordPresenter from "./ChangePasswordPresenter"
import { changePasswordSchema, type ChangePasswordFormData } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"

const ChangePasswordContainer = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Password change data:", data)
      toast.success("Success", {
        description: "Your password has been changed successfully.",
      })
      form.reset()
    } catch (error) {
      toast.error("Error", {
        description: "Failed to change password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <ChangePasswordPresenter form={form} onSubmit={onSubmit} isLoading={isLoading} />
}

export default ChangePasswordContainer
