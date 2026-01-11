"use client";

import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PersonalInformationFormData } from "@/lib/schemas";
import { ProfileResponse } from "@/lib/types/profile";

interface PersonalInformationPresenterProps {
  form: UseFormReturn<PersonalInformationFormData>;
  onSubmit: (data: PersonalInformationFormData) => void;
  isLoading?: boolean;
  profile?: ProfileResponse;
}

const PersonalInformationPresenter = ({
  form,
  onSubmit,
  isLoading = false,
  profile
}: PersonalInformationPresenterProps) => {
  console.log('profile edit data',profile)
  const profileData=profile?.data;
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your personal information and profile details.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Olivia"
                      {...field}
                      defaultValue={profileData?.firstName || ""}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
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
                  <FormLabel className="text-gray-700 font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rhye"
                      {...field}
                      defaultValue={profileData?.lastName || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Profile Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Profile Image
                </FormLabel>
                {profileData?.image?.url && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                    <img 
                      src={profileData.image.url} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border border-gray-300"
                    />
                  </div>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0] : null);
                    }}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location and Postal Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Florida, USA"
                      {...field}
                      defaultValue={profileData?.location || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="30301"
                      {...field}
                      defaultValue={profileData?.postalCode || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Street and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Street
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Street"
                      {...field}
                      defaultValue={profileData?.street || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Phone Number"
                      {...field}
                      defaultValue={profileData?.phone || ""}
                      className="border-gray-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email (Read-only if needed) */}
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address (Read-only)
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="bessieedwards@gmail.com"
                    {...field}
                    defaultValue={profile?.email || ""}
                    readOnly
                    className="border-gray-300 bg-gray-50 focus:border-teal-600 focus:ring-teal-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              onClick={() => {
                // Reset form to original profile values
                if (profileData) {
                  form.reset({
                    firstName: profileData.firstName || "",
                    lastName: profileData.lastName || "",
                    // email: profileData.email || "",
                    location: profileData.location || "",
                    postalCode: profileData.postalCode || "",
                    street: profileData.street || "",
                    phone: profileData.phone || "",
                    image: null, // Reset image file input
                  });
                }
              }}
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInformationPresenter;