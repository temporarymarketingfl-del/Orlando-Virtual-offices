"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavDropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export default function NavDropdown({ 
  label, 
  children, 
  className = "",
  align = "start" 
}: NavDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className={`text-foreground hover:text-primary transition-colors px-3 py-2 h-auto font-normal group ${className}`}
          data-testid={`button-dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <span>{label}</span>
          <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="w-64 mt-1 z-[60]"
        data-testid={`dropdown-content-${label.toLowerCase().replace(/\s+/g, '-')}`}
        side="bottom"
        sideOffset={4}
        onEscapeKeyDown={(e) => {
          e.currentTarget.closest('[data-radix-dropdown-menu-content]')?.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
          );
        }}
        onPointerDownOutside={(e) => {
          // Ensure outside clicks close the dropdown
          e.preventDefault();
        }}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export dropdown menu components for use in specific dropdowns
export {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
};