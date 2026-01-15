"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vendorRegistrationSchema,
  type VendorRegistrationFormData,
} from "@/lib/schemas";
import { toast } from "sonner";
import VendorPresenter from "./VendorPresenter";
import { useVendorRegister } from "@/lib/hooks/vendor";
import { useRouter } from "next/navigation";
import { da } from "zod/v4/locales";

const VendorContainer = () => {
  const { mutate, isPending } = useVendorRegister();
  const route = useRouter();
  const form = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(vendorRegistrationSchema),
    defaultValues: {
      shopName: "",
      brandName: "",
      description: "",
      phone: "",
      email: "",
      warehouseLocation: "",
      street: "",
      address: "",

      location: "",
      state: "",
      postalCode: "",
    },
  });

  const onSubmit = (data: VendorRegistrationFormData) => {
    const formData = new FormData();

    // Business Information
    formData.append("shopName", data.shopName);
    formData.append("brandName", data.brandName);
    formData.append("description", data.description);
    if (data.logo) {
      formData.append("logo", data.logo);
    }

    // Contact Information
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    // Warehouse Location
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
            "Your vendor registration has been submitted successfully.",
        });
        form.reset();
        if (data?.data?.accessToken) {
          route.push(`/email-verify?token=${token}`);
        }else{

          route.push("/login");
        }
      },
      onError: () => {
        toast.error("Error", {
          description: "Failed to submit registration. Please try again.",
        });
      },
    });
  };

  return (
    <VendorPresenter form={form} onSubmit={onSubmit} isLoading={isPending} />
  );
};

export default VendorContainer;
