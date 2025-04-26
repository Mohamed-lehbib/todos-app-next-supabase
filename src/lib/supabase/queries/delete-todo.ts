import { supabase } from "../client";

export const deleteTodo = async (id: number) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error.message);
    return false;
  }
  console.log("Todo deleted successfully:", data);
  return true;
};
