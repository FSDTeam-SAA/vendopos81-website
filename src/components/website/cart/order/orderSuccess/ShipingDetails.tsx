import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShippingDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-xl font-semibold">
                Shipping Address
              </CardTitle>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="font-medium text-gray-900 text-lg">John Doe</p>
              <div className="text-gray-600 space-y-1">
                <p>123 Main Street, Apt 4B</p>
                <p>New York, NY</p>
                <p>10001</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-xl font-semibold">
                Payment Method
              </CardTitle>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 text-lg">
                  Visa ending in 4242
                </p>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Payment Successful</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 shadow-lg ">
        <CardContent className="py-2 flex justify-center items-center mx-auto flex-col">
          <h2 className="text-xl font-semibold mb-4">Looking for more Great Products?</h2>
          <Button className="flex justify-center items-center py-5">Continue Shopping</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingDetails;
