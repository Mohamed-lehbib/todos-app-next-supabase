"use client";

import { useEffect, useState } from "react";
import TodoCard from "@/components/todo-card";
import { getTodos } from "@/lib/supabase/queries/get-todos";
import CreateTodoModal from "@/components/create-todos-modal";
import LoadingTodoCard from "@/components/loading-todo-card";

export default function HomePage() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const data = await getTodos();
    setTodos(data);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <CreateTodoModal onTodoCreated={fetchTodos} />

      {loading ? (
        <div className="flex flex-col space-y-4 w-full max-w-md">
          {[...Array(2)].map((_, index) => (
            <LoadingTodoCard key={index} />
          ))}
        </div>
      ) : todos.length === 0 ? (
        <p className="text-muted-foreground">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoCard
            key={todo.id!}
            todo={todo}
            setLoading={setLoading}
            refetchTodos={fetchTodos}
          />
        ))
      )}
    </div>
  );
}
