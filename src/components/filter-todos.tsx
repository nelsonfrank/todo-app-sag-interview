/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type PriorityType = "high" | "medium" | "low";
export function FilterTodos({
  onSelectPriority,
}: {
  onSelectPriority: (priority: "high" | "medium" | "low") => void;
}) {
  function handleFilterByPriority(priority: "high" | "medium" | "low") {
    onSelectPriority(priority);
  }

  return (
    <Select onValueChange={handleFilterByPriority}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="high" className="text-destructive">
            High
          </SelectItem>
          <SelectItem value="medium" className="text-yellow-500">
            Medium
          </SelectItem>
          <SelectItem value="low" className="text-gray-400">
            Low
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
