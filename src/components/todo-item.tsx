/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PenLineIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { EditTodoInput } from "./edit-todo-input";
import { type formPayloadType } from "./todo-input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
export interface TodoItemProps {
  todo: string;
  priority: "low" | "medium" | "high";
}

export interface TodoItemType {
  todoItem: formPayloadType & { id: string; isComplete: boolean };
}

export function TodoItem({ todoItem }: TodoItemType) {
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleteItem, setIsComplete] = useState(todoItem.isComplete);

  const router = useRouter();

  const updateTodo = api.todo.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsEdit(false);
    },
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsEdit(false);
    },
  });
  function onSaveEdit(payload: formPayloadType) {
    console.log({ edittedTodo: payload });
    updateTodo.mutate({ id: todoItem.id, ...payload });
  }

  function onCancelEdit() {
    setIsEdit(false);
  }

  function onDeleteTodo() {
    deleteTodo.mutate({ id: todoItem.id });
  }

  if (isEdit) {
    return (
      <EditTodoInput
        handleEditedSaveTodo={onSaveEdit}
        handleCancel={onCancelEdit}
        defaultValues={todoItem}
      />
    );
  }

  const handleCheckTodo = (completed: boolean) => {
    setIsComplete(!isCompleteItem);
    const { isComplete, ...other } = todoItem;
    updateTodo.mutate({ isComplete: completed, ...other });
  };

  return (
    <div className="group mb-2 flex w-full cursor-pointer items-center border-b pb-2">
      <div className="flex w-5/6 items-center">
        <div className="mx-4">
          <Checkbox
            checked={isCompleteItem}
            onCheckedChange={handleCheckTodo}
          />
        </div>
        <div className="">
          <p className="text-sm">{todoItem.todo}</p>
          <div className="flex gap-8">
            {todoItem.dueDate && (
              <p className="text-xs text-destructive">
                {format(todoItem.dueDate, "PPP")}
              </p>
            )}
            {todoItem.priority && (
              <p
                className={cn(
                  "text-xs capitalize",
                  todoItem.priority === "low" && "text-gray-500",
                  todoItem.priority === "medium" && "text-yellow-500",
                  todoItem.priority === "high" && "text-red-500",
                )}
              >
                {todoItem.priority}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="invisible flex w-1/6 items-center justify-end gap-4 group-hover:visible">
        <Button
          variant="ghost"
          className="px-1"
          onClick={() => setIsEdit(true)}
        >
          <PenLineIcon className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-1">
              <DotsHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
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
            </DropdownMenuSub> */}
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full text-destructive">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Todo</DialogTitle>
                  <DialogDescription>
                    You are about to delete todo below
                  </DialogDescription>
                </DialogHeader>
                <div className="my-4">{todoItem.todo}</div>
                <DialogFooter>
                  <Button type="submit" onClick={onDeleteTodo}>
                    {deleteTodo.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
