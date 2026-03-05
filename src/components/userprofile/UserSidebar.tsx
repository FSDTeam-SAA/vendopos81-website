"use client";

import { useGetProfile } from "@/lib/hooks/profile";
import { UserProfile } from "@/lib/types/profile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Mail, Phone, MapPin, User } from "lucide-react";

const UserSidebar = () => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const userInfo = {
    name: session?.user.name,
    id: session?.user?.id,
    email: session?.user.email,
    phone: "+1 (555) 123-45",
    location: "4517 Washington Ave. Manchester, Kentucky 39495",
    image: session?.user?.image,
  };

  const profileData: UserProfile = data?.data || userInfo;

  return (
    <div className="w-full max-w-sm rounded-xl bg-white overflow-hidden border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="h-28 bg-gradient-to-r from-[#3a8d71] to-[#2f6f59]" />

      {/* Content */}
      <div className="px-6 pb-6 -mt-14">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-28 h-28">
            <Image
              src={profileData?.image?.url || "/images/no.jpg"}
              alt={profileData?.firstName || "User Avatar"}
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />

            {/* Verified badge */}
            <div className="absolute bottom-1 right-1 bg-teal-600 text-white rounded-full p-1.5 shadow">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold !text-[#09714e]">
            {profileData.firstName} {profileData.lastName}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            ID: #{userInfo.id?.slice(-10)}
          </p>
        </div>

        {/* Info Section */}
        <div className="border-t pt-5 space-y-4">
          <div className="flex items-start gap-3">
            <User className="text-gray-400 w-4 h-4 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm text-gray-800">
                {profileData.firstName} {profileData.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-gray-400 w-4 h-4 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-800">{profileData.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-gray-400 w-4 h-4 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-800">{profileData.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-gray-400 w-4 h-4 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                {profileData.location || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
