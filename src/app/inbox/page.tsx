"use client";
import { InboxEmptyState } from "./empty-state";
import { TodoItem } from "~/components/todo-item";
import { CreateTodoInput } from "~/components/create-todo-input";

export default function Page() {
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
          <CreateTodoInput />
        </div>
        <div></div>
      </div>
      {false && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <InboxEmptyState />
        </div>
      )}
    </main>
  );
}


