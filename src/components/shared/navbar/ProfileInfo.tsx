/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetMyProfile } from '@/lib/hooks/useAuth';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_AVATAR = '/images/default-profile.png';

const ProfileInfo = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data: userData, isLoading, isError } = useGetMyProfile(accessToken);

  if (isLoading) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />;
  }

  if (isError || !userData?.data) {
    return <div>Guest</div>;
  }

  const user: any = userData.data;

  const profileImage =
    user.image?.url && user.image.url.trim() !== '' ? user.image.url : DEFAULT_AVATAR;

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="flex cursor-pointer select-none items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 shrink-0">
          <Image
            src={profileImage}
            alt={fullName || 'User'}
            width={40}
            height={40}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
            }}
          />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-800">{fullName || 'Guest'}</span>

          <span className="text-xs capitalize text-gray-500">{user.role || ''}</span>
        </div>
      </div>

      {/* Dropdown */}
      <div
        className="
          absolute right-0 top-full z-50 mt-3 w-52
          overflow-hidden rounded-xl border border-gray-100 bg-white
          opacity-0 invisible translate-y-2
          transition-all duration-200
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
        "
      >
        {/* Small spacing bridge to prevent hover gap */}
        <div className="absolute -top-3 left-0 h-3 w-full" />

        <div className="p-2">
          <Link
            href="/profile"
            className="
              flex items-center gap-3 rounded-lg px-3 py-2.5
              text-sm font-medium text-gray-700
              transition-colors hover:bg-primary/5 hover:text-primary
            "
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>

          <div className="my-1 border-t border-gray-100" />

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="
              flex w-full items-center gap-3 rounded-lg px-3 py-2.5
              text-sm font-medium text-red-500
              transition-colors hover:bg-red-50
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
