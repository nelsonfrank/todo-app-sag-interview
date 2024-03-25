"use client";

import Link from "next/link";
import {
  BookCheck,
  Inbox,
  Calendar,
  CalendarDays,
  LineChart,
  Menu,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { NavItem } from "./nav/nav-item";

const navigationItems = [
  {
    Icon: Inbox,
    title: "Inbox",
    href: "/inbox",
  },
  {
    Icon: Calendar,
    title: "Today",
    href: "/today",
  },
  {
    Icon: CalendarDays,
    title: "Upcoming",
    href: "/upcoming",
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
            href={item.href}
            key={index + 1}
          />
        ))}
      </nav>
      <Separator className="my-2" />
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <NavItem
          type="other"
          title={"Analytics"}
          Icon={LineChart}
          href="/analytics"
        />
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
          {navigationItems.map((item, index) => (
            <NavItem
              type="mobile"
              title={item.title}
              Icon={item.Icon}
              href={item.href}
              key={index + 1}
            />
          ))}
        </nav>
        <Separator />
        <nav className="grid gap-2 text-lg font-medium">
          <NavItem
            type="mobile"
            title={"Analytics"}
            Icon={LineChart}
            href="/analytics"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
