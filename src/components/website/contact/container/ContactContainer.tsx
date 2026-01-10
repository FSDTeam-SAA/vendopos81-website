"use client";

import { useContact } from "@/lib/hooks/use-contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContactPresenter from "./ContactPresenter";
import { ContactFormData, contactSchema } from "./Schema";


const ContactContainer = () => {
  const { mutate, isPending } = useContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacyAgreed: false,
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phone,
      message: data.message,
    });
  };

  return (
    <ContactPresenter
      form={form}
      isPending={isPending}
      onSubmit={handleSubmit}
    />
  );
};

export default ContactContainer;
