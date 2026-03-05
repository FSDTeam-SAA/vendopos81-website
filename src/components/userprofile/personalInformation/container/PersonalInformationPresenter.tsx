"use client";

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
import type { UseFormReturn } from "react-hook-form";

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
  const profileData = profile?.data;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="pb-6 border-b">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Edit Personal Information
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Update your personal details below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Olivia"
                      {...field}
                      defaultValue={profileData?.firstName || ""}
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
                  <FormLabel>Last Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Rhye"
                      {...field}
                      defaultValue={profileData?.lastName || ""}
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
                <FormLabel>Profile Image</FormLabel>

                {profileData?.image?.url && (
                  <div className="mb-3">
                    <img
                      src={profileData.image.url}
                      alt="profile"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
                    />
                  </div>
                )}

                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Florida, USA"
                      {...field}
                      defaultValue={profileData?.location || ""}
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
                  <FormLabel>Postal Code</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="30301"
                      {...field}
                      defaultValue={profileData?.postalCode || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Street + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your street"
                      {...field}
                      defaultValue={profileData?.street || ""}
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
                  <FormLabel>Phone Number</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      {...field}
                      defaultValue={profileData?.phone || ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onDiscard}
              className="w-full sm:w-auto"
            >
              Discard
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
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
