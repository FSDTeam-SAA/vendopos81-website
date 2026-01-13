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
      phone: "",
      email: "",
      experience: "",
      expiry: "",
      warehouseLocation: "",
      street: "",
      address: "",
      location: "",
      state: "",
      postalCode: "",
    },
  });

  const onSubmit = (data: DriverRegistrationFormData) => {
    const formData = new FormData();

    // Personal Information
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("experience", data.experience);
    formData.append("expiry", data.expiry);

    // Location
    formData.append("warehouseLocation", data.warehouseLocation);
    formData.append("street", data.street);
    formData.append("address", data.address);
    formData.append("location", data.location);
    formData.append("state", data.state);
    formData.append("postalCode", data.postalCode);

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
          route.push(`/email-verify?token=${token}`);
        }
        route.push("/login");
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
