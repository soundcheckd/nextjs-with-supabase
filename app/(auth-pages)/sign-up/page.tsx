import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/soundcheckd-logo-outline-transparent.png"
          alt="Soundcheckd"
          width={80}
          height={80}
          className="rounded"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Join soundcheckd</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Track your concert journey
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input 
            name="email" 
            type="email"
            placeholder="you@example.com" 
            required 
            className="bg-background border-border/60 focus:border-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="Create a password"
            minLength={6}
            required
            className="bg-background border-border/60 focus:border-primary"
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 6 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            minLength={6}
            required
            className="bg-background border-border/60 focus:border-primary"
          />
        </div>
        
        <SubmitButton 
          formAction={signUpAction} 
          pendingText="Creating account..."
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
        >
          Create account
        </SubmitButton>
        
        <FormMessage message={searchParams} />
      </form>

      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms
        </Link>
        {" "}and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link 
            className="text-primary font-medium hover:underline" 
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
