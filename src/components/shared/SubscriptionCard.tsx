'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { subcription } from '@/lib/api/api';
import { toast } from 'sonner';

interface SubscriptionCardInterface {
  tittle: string;
  dis: string;
  image: string;
}

const SubscriptionCard = ({ data }: { data: SubscriptionCardInterface }) => {
  const [email, setEmail] = useState('');

  const subscriptionMutation = useMutation({
    mutationKey: ['subscription'],
    mutationFn: (email: string) => subcription(email),
    // If you have your own toast implementation
    onSuccess: () => {
      setEmail('');
      toast.success('You have been subscribed to our newsletter.');
    },
    onError: (error: Error) => {
      toast.error(error?.message || 'Unable to subscribe. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscriptionMutation.mutate(email);
    }
  };

  return (
    <div className="relative h-70 sm:h-80 md:h-[30vh] lg:h-[40vh] overflow-hidden rounded-lg">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 right-0">
        <Image src={data.image} alt={data.tittle} fill className="object-cover" priority={false} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 md:max-w-10/12">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold text-primary mb-2">
          {data.tittle}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-xl">{data.dis}</p>
      </div>
    </div>
  );
};

export default SubscriptionCard;
