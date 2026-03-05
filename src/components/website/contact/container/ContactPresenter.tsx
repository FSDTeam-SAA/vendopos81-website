import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "./Schema";

interface Props {
  form: UseFormReturn<ContactFormData>;
  isPending: boolean;
  onSubmit: (data: ContactFormData) => void;
}

const ContactPresenter = ({ form, isPending, onSubmit }: Props) => {
  return (
    <section className="my-16 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-10">
          {/* Call Section */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Phone className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Call Us
              </h3>

              <a
                href="tel:4505408161"
                className="block  hover:text-primary text-black transition"
              >
                450 540 8161
              </a>

              <a
                href="tel:4389382053"
                className="block text-black hover:text-primary transition"
              >
                438-938-2053
              </a>
            </div>
          </div>

          {/* Email Section */}
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Mail className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Email Us
              </h3>

              <a
                href="mailto:info@vendofood.com"
                className="block text-black hover:text-primary transition"
              >
                info@vendofood.com
              </a>

              <a
                href="mailto:order@vendofood.com"
                className="block text-black hover:text-primary transition"
              >
                order@vendofood.com
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-sm rounded-2xl p-8 md:p-10 lg:col-span-1">
          <h2 className="text-3xl font-bold mb-2">Get in touch</h2>
          <p className="text-muted-foreground mb-8">
            Our friendly team would love to hear from you.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Privacy */}
              <FormField
                control={form.control}
                name="privacyAgreed"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-snug">
                      <FormLabel className="font-normal text-muted-foreground">
                        I agree to the{" "}
                        <Link href="/privacy-policy" className="underline">
                          privacy policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-6 text-base"
              >
                {isPending ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Image */}
        <div className="hidden lg:block">
          <Image
            src="/images/contact.png"
            alt="Contact our team"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPresenter;
