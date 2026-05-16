/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { useGetProfile } from '@/lib/hooks/profile';
import { useSession } from 'next-auth/react';
import { Mail, Phone, MapPin, User } from 'lucide-react';

interface EditProps {
  onSetEdit: (v: boolean) => void;
  edit: boolean;
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-start gap-4 rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-gray-200">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
      <Icon className="h-4 w-4 text-gray-600" />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>

      <p className="mt-1 text-sm sm:text-[15px] font-medium text-gray-900 break-words">
        {value || 'Not Provided'}
      </p>
    </div>
  </div>
);

const PersonalDataShow = ({ onSetEdit, edit }: EditProps) => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const profile = data?.data || session?.user;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
            Personal Details
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Keep your personal information up to date to ensure a smooth and secure account
            experience.
          </p>
        </div>

        <Button
          onClick={() => onSetEdit(!edit)}
          className="h-11 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 w-full sm:w-auto"
        >
          Update Information
        </Button>
      </div>

      {/* Information Section */}
      <div className="pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoItem icon={User} label="First Name" value={profile?.firstName} />
          <InfoItem icon={User} label="Last Name" value={profile?.lastName} />
          <InfoItem icon={Mail} label="Email Address" value={profile?.email} />
          <InfoItem icon={Phone} label="Phone Number" value={profile?.phone} />
          <InfoItem icon={MapPin} label="Street Address" value={profile?.street} />
          <InfoItem icon={MapPin} label="City / Location" value={profile?.location} />
          <InfoItem icon={MapPin} label="Postal Code" value={profile?.postalCode} />
        </div>
      </div>
    </div>
  );
};

export default PersonalDataShow;
