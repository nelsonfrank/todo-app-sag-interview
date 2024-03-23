import Link from "next/link";
import {
  BookCheck,
  Bell,
  Inbox,
  Calendar,
  CalendarDays,
  LineChart,
  Menu,
  LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";
import { ReactNode } from "react";

const navigationItems = [
  {
    Icon: Inbox,
    title: "Inbox",
    childComp: (
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        6
      </Badge>
    ),
  },
  {
    Icon: Calendar,
    title: "Today",
  },
  {
    Icon: CalendarDays,
    title: "Upcoming",
  },
  {
    Icon: LineChart,
    title: "Analytics",
  },
];

export function MainSideBar() {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {navigationItems.map((item, index) => (
          <NavItem
            type="other"
            title={item.title}
            Icon={item.Icon}
            childComp={item.childComp}
            key={index + 1}
          />
        ))}
      </nav>
      <Separator className="my-2" />
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <NavItem type="other" title={"Analytics"} Icon={LineChart} />
      </nav>
    </div>
  );
}

export function MobileSideBarNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <BookCheck className="h-6 w-6" />
            <span className="sr-only">DoList</span>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <Inbox className="h-5 w-5" />
            Inbox
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Calendar className="h-5 w-5" />
            Today
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <CalendarDays className="h-5 w-5" />
            Upcoming
          </Link>
        </nav>
        <Separator />
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
        </nav>
        <div className="mt-auto"></div>
      </SheetContent>
    </Sheet>
  );
}

export interface NavItemPropsTypes {
  type: "mobile" | "other";
  Icon: LucideIcon;
  title: string;
  childComp?: ReactNode;
}

function NavItem({ type, Icon, title, childComp }: NavItemPropsTypes) {
  const itemStyleMob = "mx-[-0.65rem] gap-4 rounded-xl  hover:text-foreground";

  const itemStyle = "gap-3 rounded-lg transition-all hover:text-primary";
  return (
    <>
      <Link
        href="#"
        className={cn(
          "flex items-center px-3 py-2 text-muted-foreground",
          type !== "mobile" ? itemStyle : itemStyleMob,
        )}
      >
        <Icon className={cn(type !== "mobile" ? "h-4 w-4" : "h-5 w-5")} />
        {title}
        {childComp}
      </Link>
    </>
  );
}
