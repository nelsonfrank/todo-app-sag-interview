import { TodoInput, type formPayloadType } from "./todo-input";

export interface EditTodoInput {
  handleEditedSaveTodo: (payload: formPayloadType) => void;
  handleCancel: () => void;
  defaultValues?: formPayloadType;
}
export function EditTodoInput({
  handleCancel,
  handleEditedSaveTodo,
  defaultValues,
}: EditTodoInput) {
  function onSaveTodo(payload: formPayloadType) {
    handleEditedSaveTodo(payload);
  }

  function onCancel() {
    handleCancel();
  }

  return (
    <TodoInput
      handleOnSubmit={onSaveTodo}
      handleCancel={onCancel}
      defaultValues={defaultValues}
    />
  );
}
