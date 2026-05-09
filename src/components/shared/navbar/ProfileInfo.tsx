/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetMyProfile } from '@/lib/hooks/useAuth';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const DEFAULT_AVATAR = '/images/default-profile.png';

const ProfileInfo = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: userData, isLoading, isError } = useGetMyProfile(accessToken);

  if (isLoading) return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  if (isError || !userData?.data) return <div>Guest</div>;

  const user: any = userData.data;

  // Fallback to default avatar if no image
  const profileImage =
    user.image?.url && user.image.url.trim() !== ''
      ? user.image.url
      : DEFAULT_AVATAR;

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      {/* Trigger — avatar + name */}
      <div className="flex items-center gap-3 cursor-pointer select-none">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
          <Image
            src={profileImage}
            alt={fullName || 'User'}
            width={40}
            height={40}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
            }}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-gray-800 text-sm">{fullName || 'Guest'}</span>
          <span className="text-xs text-gray-500">{user.role || ''}</span>
        </div>
      </div>

      {/* Hover Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <Link
            href="/profile"
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
          >
            <LayoutDashboard size={15} />
            Dashboard
          </Link>

          <div className="border-t border-gray-100" />

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
