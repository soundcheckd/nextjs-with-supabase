import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reset password</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your email and we'll send you a reset link
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
        
        <SubmitButton 
          formAction={forgotPasswordAction}
          pendingText="Sending reset link..."
          className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
        >
          Send reset link
        </SubmitButton>
        
        <FormMessage message={searchParams} />
      </form>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
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
