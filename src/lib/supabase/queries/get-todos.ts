import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export async function getTodos(): Promise<Todos[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("is_completed", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    toast.error("Error fetching todos");
    return [];
  }

  return data ?? [];
}
