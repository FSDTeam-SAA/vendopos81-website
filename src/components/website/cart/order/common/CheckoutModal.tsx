

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CheckoutModal = () => {
  return (
    <div>
         <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="from">Form</Label>
              <Input id="from" name="from" defaultValue="canada" />
            </div>
             <div className="grid gap-3">
              <Label htmlFor="picup">Form</Label>
              <Input id="from" name="picup" defaultValue="picup" />
            </div>
            <div>

                <div className="grid gap-3">
              <Label htmlFor="city">Form</Label>
              <Input id="city" name="city" defaultValue="city" />
            </div>
            
                 <div className="grid gap-3">
              <Label htmlFor="mail">Form</Label>
              <Input id="mail" name="mail" defaultValue="mail" />
            </div>
            </div>
                        <div>

                <div className="grid gap-3">
              <Label htmlFor="Country">Form</Label>
              <Input id="Country" name="Country" defaultValue="Country" />
            </div>
            
                 <div className="grid gap-3">
              <Label htmlFor="Phone Number">Form</Label>
              <Input id="PhoneNumber" name="PhoneNumber" defaultValue="PhoneNumber" />
            </div>
            </div>
          </div>
          <DialogFooter>
       
              <Button variant="outline">Cash On Delivery</Button>
           
            <Button type="submit">Online Payment</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  )
}

export default CheckoutModal