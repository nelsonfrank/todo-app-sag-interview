"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { TodoInput, type formPayloadType } from "./todo-input";
import { Button } from "./ui/button";
import { useState } from "react";

export function CreateTodoInput() {
  const [openForm, setOpenForm] = useState(false);
  function onSaveTodo(payload: formPayloadType) {
    console.log(payload);
    setOpenForm(false);
  }
  return (
    <div>
      {openForm && <TodoInput handleOnSubmit={onSaveTodo} />}

      {!openForm && (
        <div>
          <Button
            variant="ghost"
            className="hover:bg-stone-800 hover:text-stone-300"
            onClick={() => setOpenForm(true)}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="ml-2">Add todo</span>
          </Button>
        </div>
      )}
    </div>
  );
}
