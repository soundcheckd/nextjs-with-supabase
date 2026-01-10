import { Metadata } from "next";
import { Mail, MessageCircle, Clock, HelpCircle, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Support | soundcheckd",
  description: "Get help with soundcheckd - Contact our support team for assistance with your concert tracking experience.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-16 pt-24 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help you get the most out of soundcheckd. 
            Reach out to our team with any questions, feedback, or issues.
          </p>
        </header>

        {/* Main Contact Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary/10 via-blue-500/10 to-primary/10 rounded-2xl p-8 md:p-12 border shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground mb-4">
                  Have a question or need assistance? Send us an email and we'll get back to you as soon as possible.
                </p>
                <a 
                  href="mailto:support@soundcheckd.co"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  support@soundcheckd.co
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="mb-12">
          <div className="bg-card rounded-xl p-6 border shadow-sm flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Response Time</h3>
              <p className="text-muted-foreground text-sm">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </section>

        {/* How We Can Help */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">How We Can Help</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">General Questions</h3>
                  <p className="text-muted-foreground text-sm">
                    Questions about using soundcheckd, features, or how to get started
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Feedback & Suggestions</h3>
                  <p className="text-muted-foreground text-sm">
                    Share your ideas for new features or improvements to the platform
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Account & Privacy</h3>
                  <p className="text-muted-foreground text-sm">
                    Account issues, data requests, or privacy-related inquiries
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Bug Reports</h3>
                  <p className="text-muted-foreground text-sm">
                    Found something not working correctly? Let us know so we can fix it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Quick Links</h2>
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/terms" 
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Terms of Service</p>
                  <p className="text-sm text-muted-foreground">Review our terms and conditions</p>
                </div>
              </Link>
              <Link 
                href="/privacy" 
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Shield className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Privacy Policy</p>
                  <p className="text-sm text-muted-foreground">Learn how we protect your data</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="text-center">
          <div className="bg-muted/30 rounded-xl p-8 border border-dashed">
            <h2 className="text-xl font-semibold mb-2 text-foreground">Coming Soon: FAQ & Help Center</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're building a comprehensive help center with answers to common questions. 
              In the meantime, don't hesitate to reach out directly!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
