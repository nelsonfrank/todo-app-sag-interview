"use client";
import { InboxEmptyState } from "./empty-state";
import { Checkbox } from "~/components/ui/checkbox";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { PenLineIcon, CalendarIcon, FlagIcon, CircleUser } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:mx-auto lg:w-2/3 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div>
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <div>
          <div className="rounded-lg border border-dashed shadow-sm">
            <div className="mb-4 px-2 pt-2">
              <div className="mb-2">
                <Input
                  type="text"
                  placeholder="Todo name"
                  className="border-transparent outline-transparent focus:border-transparent focus:outline-transparent focus-visible:ring-0 "
                />
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="ml-2">Due date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FlagIcon className="h-4 w-4" />
                      <span className="ml-2">Priority</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>High</DropdownMenuItem>
                    <DropdownMenuItem>Medium</DropdownMenuItem>
                    <DropdownMenuItem>Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end gap-4 px-2 py-2">
              <Button variant="outline">
                <span className="mx-2">Cancel</span>
              </Button>
              <Button variant="ghost" className="bg-stone-800 text-stone-300">
                <span className="mx-2">Save</span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            className="hover:bg-stone-800 hover:text-stone-300"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="ml-2">Add todo</span>
          </Button>
        </div>
      </div>
      {false && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <InboxEmptyState />
        </div>
      )}
    </main>
  );
}

function TodoItem() {
  return (
    <div className="group mb-2 flex w-full cursor-pointer items-center border-b pb-2">
      <div className="flex w-5/6 items-center">
        <div className="mx-4">
          <Checkbox />
        </div>
        <div className="">
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="invisible flex w-1/6 items-center justify-end gap-4 group-hover:visible">
        <Button variant="ghost" className="px-1">
          <PenLineIcon className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-1">
              <DotsHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value="priority">
                  <DropdownMenuRadioItem
                    value="high"
                    className="text-destructive"
                  >
                    High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="medium"
                    className="text-yellow-400"
                  >
                    Medium
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="low" className="text-gray-500">
                    Low
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
