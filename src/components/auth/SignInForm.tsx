"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/components/ui/use-toast";

export default function SignInForm() {
  const router = useRouter();
  const { signInWithGoogle, signInWithOtp, verifyOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpLoading(true);

    try {
      await signInWithOtp(email);
      setShowOtpInput(true);
      toast({ title: "Success", description: "Check your email for the OTP" });
    } catch (error) {
      console.error("OTP send error:", error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpLoading(true);

    try {
      await verifyOtp(email, otp);
      router.push("/");
      toast({ title: "Success", description: "Signed in successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.push("/");
      toast({
        title: "Success",
        description: "Signed in with Google successfully",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      {!showOtpInput ? (
        <form onSubmit={handleEmailSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isOtpLoading}>
              {isOtpLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send OTP
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isOtpLoading}>
              {isOtpLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify OTP
            </Button>
          </div>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading}
        onClick={handleGoogleSignIn}
      >
        {isGoogleLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Do not have an account? </span>
        <Link
          href="/auth/sign-up"
          className="font-medium text-primary hover:text-primary/90"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
