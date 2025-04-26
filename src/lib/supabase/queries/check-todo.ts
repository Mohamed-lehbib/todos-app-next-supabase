import { toast } from "sonner";
import { supabase } from "../client";

export async function checkTodo(id: number, is_completed: boolean) {
  // Update the todo to mark it as completed
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed: is_completed })
    .eq("id", id);

  if (error) {
    console.error("Error updating todo:", error.message);
    toast.error("Error updating todo. Please try again later.");
  } else {
    console.log("Todo updated successfully:", data);
  }
}
