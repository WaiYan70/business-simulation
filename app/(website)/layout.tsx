import WebsiteNavigation from "@/features/website/components/WebsiteNavigation";
import { ReactNode } from "react";

export default function WebSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <WebsiteNavigation />{" "}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
