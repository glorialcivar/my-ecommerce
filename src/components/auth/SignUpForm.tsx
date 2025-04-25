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

export default function SignUpForm() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically call your sign-up API
      // For now, we'll simulate a successful sign-up
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
      toast({
        title: "Welcome to Nestora!",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.push("/");
      toast({
        title: "Welcome to Nestora!",
        description: "Your account has been created successfully with Google.",
      });
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast({
        title: "Error",
        description: "Failed to create account with Google",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </div>
      </form>

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
        Sign up with Google
      </Button>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href="/auth/sign-in"
          className="font-medium text-primary hover:text-primary/90"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
