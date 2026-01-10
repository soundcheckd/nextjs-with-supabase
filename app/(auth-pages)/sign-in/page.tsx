import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default async function Login(props: { searchParams: Promise<Message> }) {
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
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your soundcheckd account
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
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              className="text-xs text-primary hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="bg-background border-border/60 focus:border-primary"
          />
        </div>
        
        <SubmitButton 
          pendingText="Signing in..." 
          formAction={signInAction}
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
        >
          Sign in
        </SubmitButton>
        
        <FormMessage message={searchParams} />
      </form>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          New to soundcheckd?{" "}
          <Link 
            className="text-primary font-medium hover:underline" 
            href="/sign-up"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
