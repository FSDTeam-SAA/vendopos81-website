"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  driverRegistrationSchema,
  type DriverRegistrationFormData,
} from "@/lib/schemas";
import { toast } from "sonner";
import DriverPresenter from "./DriverPresenter";
import { useDriverRegister } from "@/lib/hooks/useDriver";
import { useRouter } from "next/navigation";

const DriverContainer = () => {
  const { mutate, isPending } = useDriverRegister();
  const route = useRouter();
  const form = useForm<DriverRegistrationFormData>({
    resolver: zodResolver(driverRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // password: "",
      yearsOfExperience: "",
      licenseExpiryDate: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: DriverRegistrationFormData) => {
    const formData = new FormData();

    // Mapping fields to match backend requirements
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    // formData.append("password", data.password);
    formData.append("yearsOfExperience", data.yearsOfExperience);
    formData.append("licenseExpiryDate", data.licenseExpiryDate);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("zipCode", data.zipCode);

    // Documents
    if (data.documents) {
      formData.append("documents", data.documents);
    }

    mutate(formData, {
      onSuccess: (data) => {
        const token = data?.data?.accessToken;
        toast.success("Success", {
          description:
            "Your driver registration has been submitted successfully.",
        });
        form.reset();
        if (data.accessToken) {
          route.push(`/`);
        }
        route.push("/");
      },
      onError: () => {
        toast.error("Error", {
          description: "Failed to submit registration. Please try again.",
        });
      },
    });
  };

  return (
    <DriverPresenter form={form} onSubmit={onSubmit} isLoading={isPending} />
  );
};

export default DriverContainer;
