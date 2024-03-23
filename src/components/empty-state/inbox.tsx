import { Button } from "../ui/button";

export function InboxEmptyState() {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">You have no todos</h3>
      <p className="text-sm text-muted-foreground">
        You can track your progress as soon as you add a todo.
      </p>
      <Button className="mt-4">Add Todo</Button>
    </div>
  );
}
