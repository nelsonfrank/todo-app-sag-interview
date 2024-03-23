import { MainNavigation } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export interface SiteHeaderProps {
  children: React.ReactNode;
}
export function SiteLayout({ children }: SiteHeaderProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainNavigation />
      <div className="flex flex-col">
        <MobileNav />
        {children}
      </div>
    </div>
  );
}
