'use client';

import { CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const SuccessModal = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-none p-8 text-center">
        <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/50">
          <CheckCircle2
            className="h-12 w-12 text-green-600 animate-scale-in"
            strokeWidth={2.5}
          />
        </div>

        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-slate-900 text-center">Registration Successful!</DialogTitle>

          <DialogDescription className="text-sm text-gray-500 ">
            You've successfully joined as a supplier. Admin is reviewing your application. Please check your <span className="font-semibold text-foreground">email inbox</span> for approval updates.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4">
          <Button
            onClick={() => setOpen(false)}
            className="w-full py-6 text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;