"use client";

import { useGetProfile } from "@/lib/hooks/profile";
import { UserProfile } from "@/lib/types/profile";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserSidebar = () => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const userInfo = {
    name: session?.user.name,
    id: session?.user?.id,
    email: session?.user.email,
    phone: "+1 (555) 123-45",
    // company: "Company Name Here",
    location: "4517 Washington Ave. Manchester, Kentucky 39495",
    image: session?.user?.image,
  };
  const profileData: UserProfile = data?.data || userInfo;
  console.log("profile phone number", profileData.phone);
  return (
    <aside className="w-full max-w-sm">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        {/* Header Background */}
        <div className="h-24 bg-primary"></div>

        {/* Profile Section */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4 relative z-10">
            <div className="relative w-24 h-24">
              <Image
                src={profileData?.image?.url || "/images/no.jpg"}
                alt={profileData?.firstName}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
              {/* Verified Badge */}
              <div className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2 text-white">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
          <h2 className="text-center font-semibold text-gray-900 text-lg mb-1">
            {profileData.firstName} {profileData.lastName}{" "}
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            ID: {userInfo.id}
          </p>

          {/* Info Items */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {[
              {
                label: "Name:",
                value: profileData.firstName + profileData.lastName,
              },
              { label: "Email:", value: profileData.email },
              { label: "Phone:", value: profileData.phone },

              { label: "Location:", value: profileData.location },
            ].map((item, idx) => (
              <div key={idx} className="flex  items-center gap-1 flex-wrap">
                <p className="text-gray-700 font-medium text-sm">
                  {item.label}
                </p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
