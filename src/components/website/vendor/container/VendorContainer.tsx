/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useVendorRegister } from '@/lib/hooks/vendor';
import { vendorRegistrationSchema, type VendorRegistrationFormData } from '@/lib/schemas';
import { extractErrorMessage, getResponseDataFromError } from '@/lib/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import VendorPresenter from './VendorPresenter';

const VendorContainer = () => {
  const { mutate, isPending } = useVendorRegister();
  const route = useRouter();

  const form = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(vendorRegistrationSchema),
    defaultValues: {
      shopName: '',
      brandName: '',
      description: '',
      phone: '',
      email: '',
      warehouseLocation: '',
      street: '',
      address: '',
      state: '',
      postalCode: '',
      logo: undefined,
      documents: undefined,
    },
  });

  const getErrorMessage = (error: unknown) => {
    console.log('FULL ERROR:', error);
    return extractErrorMessage(error, 'Something went wrong');
  };

  const onSubmit = (data: VendorRegistrationFormData) => {
    const formData = new FormData();

    // Business Info
    formData.append('shopName', data.shopName);
    formData.append('brandName', data.brandName);
    formData.append('description', data.description || '');

    if (data.logo) {
      formData.append('logo', data.logo);
    }

    // Contact
    formData.append('phone', data.phone);
    formData.append('email', data.email);

    // Location
    formData.append('warehouseLocation', data.warehouseLocation);
    formData.append('street', data.street);
    formData.append('address', data.address);
    formData.append('state', data.state);
    formData.append('postalCode', data.postalCode);

    // Documents
    if (data.documents) {
      formData.append('documents', data.documents);
    }

    mutate(formData, {
      onSuccess: (res: any) => {
        const token = res?.data?.accessToken;

        toast.success('Success', {
          description: 'Vendor registration submitted successfully.',
        });

        form.reset();

        if (token) {
          route.push(`/email-verify?token=${token}`);
        } else {
          route.push('/login');
        }
      },
      onError: (error: unknown) => {
        const message = getErrorMessage(error);

        const resp = getResponseDataFromError(error) as
          | { errorSource?: Array<{ path?: string; message?: string }> }
          | undefined;

        if (resp?.errorSource && Array.isArray(resp.errorSource)) {
          resp.errorSource.forEach((e) => {
            const path = e.path || '';
            const msg = e.message || message;
            if (path) {
              form.setError(path as any, { type: 'server', message: msg });
            }
          });
        }
      },
    });
  };

  return <VendorPresenter form={form} onSubmit={onSubmit} isLoading={isPending} />;
};

export default VendorContainer;
