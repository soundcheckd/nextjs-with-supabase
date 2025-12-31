import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SoundCheckd",
  description: "SoundCheckd Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Effective Date: January 1, 2025
          </p>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              SoundCheckd ("Company," "we," "us," or "our") respects your privacy and is committed to protecting 
              your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our mobile application and website (collectively, the "Service"). Please 
              read this Privacy Policy carefully. By using the Service, you consent to the data practices described 
              in this policy.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Personal Information You Provide</h3>
                <p className="mb-3">We collect information you voluntarily provide when using our Service, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, username, and password when you create an account</li>
                  <li><strong>Profile Information:</strong> Profile picture, bio, and other optional details you choose to share</li>
                  <li><strong>User Content:</strong> Concert reviews, ratings, photos, comments, and lists you create or share</li>
                  <li><strong>Communications:</strong> Information from your correspondence with us, including support requests</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Information Collected Automatically</h3>
                <p className="mb-3">When you access our Service, we automatically collect certain information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information</li>
                  <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service, and interaction patterns</li>
                  <li><strong>Log Data:</strong> IP address, browser type, access times, and referring URLs</li>
                  <li><strong>Location Data:</strong> General location based on IP address (we do not collect precise geolocation without consent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Third-Party Information</h3>
                <p>
                  We may receive information from third-party services you choose to connect with your account. 
                  We only access data you explicitly authorize through authentication processes.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve our Service</li>
                <li><strong>Personalization:</strong> To personalize your experience and provide concert recommendations</li>
                <li><strong>Communication:</strong> To send you service-related notices, updates, and promotional materials (with your consent)</li>
                <li><strong>Analytics:</strong> To understand how users interact with our Service and improve user experience</li>
                <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security issues</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
                <li><strong>Third-Party Integrations:</strong> To display connected features and provide personalized concert suggestions</li>
              </ul>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. How We Share Your Information</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Public Content:</strong> Your reviews, ratings, and profile information may be visible to other users as part of the Service</li>
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our Service (hosting, analytics, customer support)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Safety:</strong> To protect the rights, property, or safety of SoundCheckd, our users, or the public</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
              <p className="mt-4 font-medium">
                We do not sell your personal information to third parties. We do not share your personal SoundCheckd 
                data with third parties for their marketing purposes.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We use cookies and similar tracking technologies to collect and store information. These include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the Service to function properly, including authentication</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that disabling certain cookies may 
                affect the functionality of our Service.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide 
              you with our Service. We may retain certain information as required by law or for legitimate 
              business purposes, such as resolving disputes or enforcing our agreements. When you delete your 
              account, we will delete or anonymize your personal information within 30 days, unless retention 
              is required for legal compliance.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. These measures 
              include encryption, secure data storage, and access controls. However, no method of transmission 
              over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Your Privacy Rights</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:cole.first@soundcheckd.co" className="text-primary hover:underline font-medium">
                  cole.first@soundcheckd.co
                </a>. We will respond to your request within 30 days.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service may contain links to third-party websites or integrate with third-party services. 
              We are not responsible for the privacy practices of these third parties. We encourage you to 
              review the privacy policies of any third-party services you interact with. You can disconnect 
              any connected third-party services at any time through your SoundCheckd account settings.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected personal information 
              from a child under 13, we will take steps to delete such information promptly. If you believe we 
              may have information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of 
              residence. These countries may have data protection laws that differ from your jurisdiction. 
              By using our Service, you consent to the transfer of your information to the United States and 
              other countries where we operate. We take appropriate safeguards to ensure your information 
              remains protected in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. California Privacy Rights</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you are a California resident, you have additional rights under the California Consumer 
                Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information held by businesses</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>
              <p>We do not sell personal information as defined by the CCPA.</p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Effective Date" above. We encourage 
              you to review this Privacy Policy periodically. Your continued use of the Service after any changes 
              constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="bg-card rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Contact Us</h2>
            <div className="text-muted-foreground leading-relaxed">
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-foreground">SoundCheckd</p>
                <p>
                  Email:{" "}
                  <a href="mailto:cole.first@soundcheckd.co" className="text-primary hover:underline font-medium">
                    cole.first@soundcheckd.co
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 SoundCheckd. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
