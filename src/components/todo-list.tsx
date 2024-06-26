/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { CreateTodoInput } from "./create-todo-input";
import { FilterTodos } from "./filter-todos";
import { TodoItem } from "./todo-item";

export interface TodoListType {
  todos: {
    id: string;
    todo: string;
    isComplete: boolean;
    dueDate: Date | undefined;
    priority: "high" | "medium" | "low" | undefined;
  }[];
}
export function TodoList({ todos }: TodoListType) {

  const [todoItems, setTodos] = useState(todos);

  const handleSelectedValue = (priority: "high" | "medium" | "low") => {
    const filteredTodos = todos.filter(
      (todo) =>
        String(todo.priority).toLowerCase() === String(priority).toLowerCase(),
    );
    setTodos(filteredTodos);
  };

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  return (
    <>
      <div className="my-4">
        <FilterTodos onSelectPriority={handleSelectedValue} />
      </div>
      <div>
        {todoItems.map(({ todo, dueDate, priority, id, isComplete }) => (
          <TodoItem
            todoItem={{ todo, dueDate, priority, id, isComplete }}
            key={id}
          />
        ))}

        <div>
          <CreateTodoInput />
        </div>
      </div>
    </>
  );
}

