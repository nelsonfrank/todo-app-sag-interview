/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import { CreditCard, DollarSign, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Overview } from "./overview";
import { api } from "~/trpc/server";
import { TodoItem } from "~/components/todo-item";
import { add, compareAsc, endOfWeek, format, startOfWeek } from "date-fns";

export default async function Dashboard() {
  const todos = await api.todo.getAll();

  const totalCompletedTodos = todos.filter((todo) => todo.isComplete);
  const totalPendingTodos = todos.filter((todo) => !todo.isComplete);

  const currentDate = new Date();
  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 }); // Week starts on Monday (0 for Sunday, 1 for Monday, etc.)
  const endDate = endOfWeek(currentDate, { weekStartsOn: 0 });

  const generateGraphData = (todoItems: typeof todos) => {
    const names = [
      { name: "Sunday", total: 0 },
      { name: "Monday", total: 0 },
      { name: "Tuesday", total: 0 },
      { name: "Wednesday", total: 0 },
      { name: "Thursday", total: 0 },
      { name: "Friday", total: 0 },
      { name: "Saturday", total: 0 },
    ];

    const data = todoItems
      .filter(
        (todo) =>
          todo.dueDate &&
          compareAsc(
            new Date(todo.dueDate).getDate(),
            new Date(startDate).getDate(),
          ) >= 1 &&
          compareAsc(
            new Date(todo.dueDate).getDate(),
            new Date(add(endDate, { days: 1 })).getDate(),
          ) <= -1,
      )
      .reduce((acc, obj) => {
        const day = format(new Date(obj.dueDate).toDateString(), "EEEE");

        // Check if the day already exists in the accumulator object
        if (!acc[day]) {
          // If not, create a new array with the object
          acc[day] = [obj];
        } else {
          // If exists, push the object to the existing array
          acc[day].push(obj);
        }

        return acc;
      }, {});

    return names.map((item) => {
      if (data[item.name]) {
        item.total = data[item.name].length;
      }

      return item;
    });
  };

  const weeklyCompletedTodosStats = generateGraphData(totalCompletedTodos);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Completed Todos
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalCompletedTodos.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pending Todos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalPendingTodos.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Todos
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todos.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>
                    This week completed todos - {format(startDate, "PPPP")} -{" "}
                    {format(endDate, "PP")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Overview data={weeklyCompletedTodosStats} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Todos</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="mt-4">
                  {todos.map(({ todo, dueDate, priority, id, isComplete }) => (
                    <TodoItem
                      todoItem={{
                        todo,
                        dueDate,
                        priority,
                        id,
                        isComplete,
                      }}
                      key={id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </main>
  );
}
