import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { checkTodo } from "@/lib/supabase/queries/check-todo";
import { deleteTodo } from "@/lib/supabase/queries/delete-todo";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function TodoCard({
  id,
  title,
  description,
  created_at,
  is_completed = false,
}: Todos) {
  const [completed, setCompleted] = useState(is_completed);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheck = async (checked: boolean) => {
    const newStatus = !!checked;
    setCompleted(newStatus);
    setLoading(true);

    try {
      if (id) await checkTodo(id, newStatus);
    } catch (error) {
      console.error("Failed to update todo:", error);
      setCompleted(!newStatus);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      const success = await deleteTodo(id);
      if (success) {
        setOpen(false);
        toast.success("Todo deleted successfully.");
      } else {
        toast.error("Failed to delete todo. Please try again.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 relative">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox checked={completed} onCheckedChange={handleCheck} />
          <h2
            className={`text-lg font-semibold ${
              completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {created_at && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(created_at), "PPP")}
            </span>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-red-500"
              >
                <Trash2 size={14} />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete this todo? This action cannot be
                undone.
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <CardContent className="px-0 pt-1">
        <p
          className={`text-sm text-gray-500 ${
            completed ? "line-through" : ""
          } overflow-hidden`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineClamp: 2,
          }}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
