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
  onDiscard: () => void;
}

const PersonalInformationPresenter = ({
  form,
  onSubmit,
  isLoading = false,
  profile,
  onDiscard,
}: PersonalInformationPresenterProps) => {
  // console.log('profile edit data',profile)
  const profileData=profile?.data;
  return (
    <div className="flex-1 h-full bg-white rounded-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Personal Information
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Update your personal details below.
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

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              onClick={onDiscard}
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