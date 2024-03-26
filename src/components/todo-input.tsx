"use client";
import { CalendarIcon, FlagIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Form, FormField } from "~/components/ui/form";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn, reparseDate } from "~/lib/utils";
import { sub } from "date-fns";
export interface TodoInputProps {
  handleOnSubmit: (payload: formPayloadType) => void;
  handleCancel: () => void;
  defaultValues?: formPayloadType;
}

const FormSchema = z.object({
  todo: z.string(),
  dueDate: z.date().optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
});

export type formPayloadType = z.infer<typeof FormSchema>;

export function TodoInput({
  handleOnSubmit,
  handleCancel,
  defaultValues,
}: TodoInputProps) {
  const form = useForm<formPayloadType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo: defaultValues?.todo,
      dueDate: defaultValues?.dueDate,
      priority: defaultValues?.priority,
    },
  });

  function onSubmit(data: formPayloadType) {
    handleOnSubmit(data);
  }

  function onCancel() {
    handleCancel();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-lg border border-dashed shadow-sm">
          <div className="mb-4 px-2 pt-2">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Todo name"
                    className="border-transparent outline-transparent focus:border-transparent focus:outline-transparent focus-visible:ring-0 "
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4" />
                        {field.value ? (
                          <span className="ml-2">
                            {format(reparseDate(field.value), "PPP")}
                          </span>
                        ) : (
                          <span className="ml-2">Due date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <= sub(new Date(), { days: 1 })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FlagIcon className="h-4 w-4" />
                        {field.value ? (
                          <span
                            className={cn(
                              "ml-2",
                              field.value === "low" && "text-gray-500",
                              field.value === "medium" && "text-yellow-500",
                              field.value === "high" && "text-red-500",
                            )}
                          >
                            {field.value}
                          </span>
                        ) : (
                          <span className="ml-2">Priority</span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <DropdownMenuRadioItem value="high">
                          High
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">
                          Medium
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="low">
                          Low
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>
          </div>
          <Separator />
          <div className="flex justify-end gap-4 px-2 py-2">
            <Button variant="outline" onClick={onCancel} type="button">
              <span className="mx-2">Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="bg-stone-800 text-stone-300"
            >
              <span className="mx-2">Save</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
