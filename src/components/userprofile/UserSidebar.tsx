/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetProfile } from '@/lib/hooks/profile';
import { UserProfile } from '@/lib/types/profile';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Mail, Phone, MapPin, User } from 'lucide-react';

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
      <Icon className="h-4 w-4 text-gray-600" />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>

      <p className="mt-1 text-sm font-medium leading-5 text-gray-900 break-words">
        {value || 'Not Provided'}
      </p>
    </div>
  </div>
);

const UserSidebar = () => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const userInfo = {
    name: session?.user.name,
    id: session?.user?.id,
    email: session?.user.email,
    phone: '+1 (555) 123-45',
    location: '4517 Washington Ave. Manchester, Kentucky 39495',
    image: session?.user?.image,
  };

  const profileData: UserProfile = data?.data || userInfo;

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Top Banner */}
      <div className="relative h-32 bg-gradient-to-r from-[#3a8d71] to-[#2f6f59]">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 -mt-16 relative z-10">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative h-32 w-32">
            <Image
              src={profileData?.image?.url || '/images/no.jpg'}
              alt={profileData?.firstName || 'User Avatar'}
              fill
              className="rounded-full border-4 border-white object-cover bg-white"
            />

            {/* Status Badge */}
            <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#09714e] border-2 border-white">
              <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-5 text-center border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#09714e]">
            {profileData.firstName} {profileData.lastName}
          </h2>

          <p className="mt-2 text-sm text-gray-500">Customer ID #{userInfo.id?.slice(-8)}</p>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">
          <InfoItem
            icon={User}
            label="Full Name"
            value={`${profileData.firstName || ''} ${profileData.lastName || ''}`}
          />

          <InfoItem icon={Mail} label="Email Address" value={profileData.email} />

          <InfoItem icon={Phone} label="Phone Number" value={profileData.phone} />

          <InfoItem icon={MapPin} label="Location" value={profileData.location || 'Not Provided'} />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
