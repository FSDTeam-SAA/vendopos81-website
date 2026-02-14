"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Package, Truck } from "lucide-react";
import Link from "next/link";

const JoinWithUsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors lg:border lg:border-gray-200"
        >
          <Package className="h-4 w-4 mr-1" />
          JOIN WITH US
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-48 bg-white border border-gray-100 shadow-xl rounded-lg p-1 z-60"
        >
          <Link href="/driver">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-colors focus:bg-primary/10 focus:text-primary outline-none">
              <Truck className="h-4 w-4" />
              <span>As a Driver</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/vendor">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md transition-colors focus:bg-primary/10 focus:text-primary outline-none mt-1">
              <Package className="h-4 w-4" />
              <span>As a Supplier</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default JoinWithUsDropdown;
