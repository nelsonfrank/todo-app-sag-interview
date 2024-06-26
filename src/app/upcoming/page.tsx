/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import { api } from "~/trpc/server";
import { UpcomingEmptyState } from "./empty-state";
import { compareAsc } from "date-fns";
import { TodoList } from "~/components/todo-list";

export default async function Page() {
  const todos = await api.todo.getAll();

  const upcomingTodos = todos.filter(
    (todo) =>
      compareAsc(
        new Date().toDateString(),
        new Date(todo.dueDate).toDateString(),
      ) === -1,
  );
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:mx-auto lg:w-2/3 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div>
        <TodoList todos={upcomingTodos} />
      </div>
      {false && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <UpcomingEmptyState />
        </div>
      )}
    </main>
  );
}
