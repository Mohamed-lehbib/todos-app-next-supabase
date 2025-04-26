import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { format } from "date-fns";
import { checkTodo } from "@/lib/supabase/queries/check-todo";
import { deleteTodo } from "@/lib/supabase/queries/delete-todo";
import { toast } from "sonner";
import DeleteTodoConfirm from "./delete-todo-confirm-dialog";

export default function TodoCard({
  todo,
  setLoading,
  refetchTodos,
}: {
  todo: Todos;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refetchTodos: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleCheck = async (checked: boolean) => {
    const newStatus = !!checked;
    setLoading(true);

    try {
      if (todo.id) {
        await checkTodo(todo.id, newStatus);
        await refetchTodos();
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (todo.id) {
      setLoading(true);
      const success = await deleteTodo(todo.id);
      if (success) {
        setOpen(false);
        toast.success("Todo deleted successfully.");
        refetchTodos();
      }
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 relative">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox checked={todo.is_completed} onCheckedChange={handleCheck} />
          <h2
            className={`text-lg font-semibold ${
              todo.is_completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {todo.created_at && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(todo.created_at), "PPP")}
            </span>
          )}

          <DeleteTodoConfirm
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      <CardContent className="px-0 pt-1">
        <p
          className={`text-sm text-gray-500 ${
            todo.is_completed ? "line-through" : ""
          } overflow-hidden`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineClamp: 2,
          }}
        >
          {todo.description}
        </p>
      </CardContent>
    </Card>
  );
}
