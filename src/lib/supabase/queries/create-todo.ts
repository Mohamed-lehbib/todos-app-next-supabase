import { supabase } from "../client";

export async function createTodo({ title, description }: Todos) {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, description }])
    .select()
    .single();

  if (error) {
    console.error("Error creating todo:", error.message);
    return null;
  }

  return data;
}
