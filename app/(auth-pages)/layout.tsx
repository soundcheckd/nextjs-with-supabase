import { Header } from "@/components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 pt-20">
        <div className="w-full max-w-sm">
          {/* Auth Card */}
          <div className="bg-card border border-border/40 rounded-lg p-8 shadow-lg">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
