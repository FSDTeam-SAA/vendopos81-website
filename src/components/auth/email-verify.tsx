'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import SuccessModal from '../shared/SuccessModal';

const EmailVerifyPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get('token');
  const from = params.get('from');

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        if (!token) return;

        // ✅ তোমার verify API call
        await axios.post('/api/v1/auth/verify-email', { token });

        // ✅ vendor হলে modal show
        if (from === 'vendor') {
          setOpen(true);
        } else {
          router.push('/login');
        }
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Email verification failed';

        toast.error('Error', { description: message });
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, from, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading && <p className="text-lg">Verifying your email...</p>}

      {/* ✅ Success Modal */}
      <SuccessModal open={open} setOpen={(val) => { setOpen(val); if (!val) router.push('/login'); }} />
    </div>
  );
};

export default EmailVerifyPage;
