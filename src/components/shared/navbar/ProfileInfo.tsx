/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyProfile } from "@/lib/hooks/useAuth";

import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileInfo = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  // Profile data fetch
  const { data: userData, isLoading, isError } = useGetMyProfile(accessToken);

  // Loading / Error handle
  if (isLoading) return <div>Loading...</div>;
  if (isError || !userData?.data) return <div>Guest</div>;

  const user: any = userData.data;

  const profileImage = user.image?.url || "/public/images/default-profile.png";

  // Full name
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <div className="flex items-center gap-3">
      {/* Profile Image */}
      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
        <Image
          src={profileImage}
          alt={fullName || "User"}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name & Role */}
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{fullName || "Guest"}</span>
        <span className="text-sm text-gray-500">{user.role || ""}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
