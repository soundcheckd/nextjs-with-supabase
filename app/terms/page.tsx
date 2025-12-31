import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SoundCheckd",
  description: "SoundCheckd Terms of Service - Read our terms and conditions for using our concert tracking platform.",
};

export default function TermsPage() {
    return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Effective Date: January 1, 2025
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using SoundCheckd ("Service"), operated by SoundCheckd ("Company," "we," "us," or "our"), 
              you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, 
              you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              SoundCheckd is a concert tracking and review platform that allows users to discover, track, rate, 
              and review live music events. Our Service includes mobile applications and web-based platforms that 
              enable users to log concerts they have attended, share reviews with the community, follow other users, 
              and discover new live music experiences.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                To access certain features of the Service, you must register for an account. When you create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information to keep it accurate and complete</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access to your account</li>
                <li>Notify us immediately if you discover or suspect any security breaches related to the Service</li>
              </ul>
              <p>
                You are responsible for all activities that occur under your account. We reserve the right to suspend or 
                terminate accounts that violate these Terms or for any other reason at our sole discretion.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. User Content</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our Service allows you to post, link, store, share, and otherwise make available certain information, 
                text, graphics, or other material ("User Content"). You retain ownership of any intellectual property 
                rights that you hold in that User Content.
              </p>
              <p>
                By posting User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free license 
                to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection 
                with operating and providing the Service.
              </p>
              <p>You represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own the User Content or have the right to use it and grant us the rights and license as provided in these Terms</li>
                <li>Your User Content does not violate the privacy rights, publicity rights, copyrights, or other rights of any person or entity</li>
                <li>Your User Content does not contain any defamatory, obscene, offensive, or otherwise objectionable material</li>
              </ul>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Prohibited Conduct</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copying, distributing, or disclosing any part of the Service in any medium</li>
                <li>Using any automated system to access the Service in a manner that sends more requests than a human can reasonably produce</li>
                <li>Transmitting spam, chain letters, or other unsolicited communications</li>
                <li>Attempting to interfere with or compromise the system integrity or security</li>
                <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity</li>
                <li>Collecting or harvesting any personally identifiable information from the Service</li>
                <li>Using the Service for any commercial solicitation purposes without our prior written consent</li>
                <li>Violating any applicable laws or regulations</li>
            </ul>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service may integrate with third-party services. Your use of such third-party services is subject 
              to their respective terms of service and privacy policies. We are not responsible for the content, 
              privacy policies, or practices of any third-party services.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content (excluding User Content), features, and functionality are and will 
              remain the exclusive property of SoundCheckd and its licensors. The Service is protected by copyright, 
              trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product 
              or service without our prior written consent.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Disclaimer of Warranties</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="uppercase font-medium">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, 
                WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
              <p>
                SoundCheckd does not warrant that the Service will function uninterrupted, secure, or available at 
                any particular time or location, that any errors or defects will be corrected, or that the Service 
                is free of viruses or other harmful components.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed uppercase font-medium">
              IN NO EVENT SHALL SOUNDCHECKD, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES 
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT 
              LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR 
              ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to defend, indemnify, and hold harmless SoundCheckd and its officers, directors, employees, 
              and agents from and against any claims, liabilities, damages, losses, and expenses, including without 
              limitation reasonable attorney's fees, arising out of or in any way connected with your access to or 
              use of the Service, your User Content, or your violation of these Terms.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account and access to the Service immediately, without prior notice 
              or liability, for any reason, including without limitation if you breach these Terms. Upon termination, 
              your right to use the Service will immediately cease. All provisions of these Terms which by their 
              nature should survive termination shall survive, including ownership provisions, warranty disclaimers, 
              indemnity, and limitations of liability.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions. Any disputes arising from these Terms or the 
              Service shall be resolved in the courts of competent jurisdiction.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a 
              revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. 
              What constitutes a material change will be determined at our sole discretion. By continuing to access 
              or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:cole.first@soundcheckd.co" className="text-primary hover:underline font-medium">
                cole.first@soundcheckd.co
              </a>
            </p>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 SoundCheckd. All rights reserved.</p>
        </footer>
      </div>
        </div>
    );
} 
