import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export interface NavItemPropsTypes {
  type: "mobile" | "other";
  Icon: LucideIcon;
  title: string;
  href: string;
  badgeText?: string;
}

export function NavItem({
  type,
  Icon,
  title,
  badgeText,
  href,
}: NavItemPropsTypes) {
  const pathname = usePathname();

  const itemStyleMob = "mx-[-0.65rem] gap-4 rounded-xl  hover:text-foreground";
  const itemStyle = "gap-3 rounded-lg transition-all hover:text-primary";
  return (
    <>
      <Link
        href={href}
        className={cn(
          "flex items-center px-3 py-2 text-muted-foreground",
          type !== "mobile" ? itemStyle : itemStyleMob,
          pathname === href ? "bg-muted" : "",
        )}
      >
        <Icon className={cn(type !== "mobile" ? "h-4 w-4" : "h-5 w-5")} />
        {title}
        {badgeText && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {badgeText}
          </Badge>
        )}
      </Link>
    </>
  );
}
