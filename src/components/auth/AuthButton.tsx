import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  className?: string;
}

export function AuthButton({
  onClick,
  isLoading = false,
  children,
  variant = "default",
  className = "",
}: AuthButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={`w-full ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
