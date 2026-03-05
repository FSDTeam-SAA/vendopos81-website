/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/lib/hooks/profile";
import { useSession } from "next-auth/react";
import { Mail, Phone, MapPin, User } from "lucide-react";

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
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-gray-400 mt-1" />

    <div className="space-y-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900 break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);

const PersonalDataShow = ({ onSetEdit, edit }: EditProps) => {
  const { data } = useGetProfile();
  const { data: session } = useSession();

  const profile = data?.data || session?.user;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Personal Information
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and profile details.
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
        <InfoItem icon={User} label="First Name" value={profile?.firstName} />

        <InfoItem icon={User} label="Last Name" value={profile?.lastName} />

        <InfoItem icon={Mail} label="Email Address" value={profile?.email} />

        <InfoItem icon={Phone} label="Phone Number" value={profile?.phone} />

        <InfoItem icon={MapPin} label="Street" value={profile?.street} />

        <InfoItem icon={MapPin} label="Location" value={profile?.location} />

        <InfoItem
          icon={MapPin}
          label="Postal Code"
          value={profile?.postalCode}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => onSetEdit(!edit)}
          className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default PersonalDataShow;
