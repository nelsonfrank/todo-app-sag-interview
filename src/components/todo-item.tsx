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
import { Button } from "~/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PenLineIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export interface TodoItemProps {
  todo: string;
  priority: "low" | "medium" | "high";
}

export function TodoItem() {
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
