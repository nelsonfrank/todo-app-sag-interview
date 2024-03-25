/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import { InboxEmptyState } from "./empty-state";
import { api } from "~/trpc/server";
import { TodoList } from "~/components/todo-list";

export default async function Page() {
  const todos = await api.todo.getAll();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:mx-auto lg:w-2/3 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div>
        <TodoList todos={todos} />
      </div>
      {false && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <InboxEmptyState />
        </div>
      )}
    </main>
  );
}
