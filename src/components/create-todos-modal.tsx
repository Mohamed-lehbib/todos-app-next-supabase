"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodo } from "@/lib/supabase/queries/create-todo";

type CreateTodoModalProps = {
  onTodoCreated: (todo: Todos) => void;
};

export default function CreateTodoModal({
  onTodoCreated,
}: CreateTodoModalProps) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateTodo() {
    if (!newTitle.trim()) {
      alert("Title is required!");
      return;
    }

    setLoading(true);

    const newTodo = await createTodo({
      title: newTitle,
      description: newDescription,
    });

    if (newTodo) {
      onTodoCreated(newTodo);
      setOpen(false);
      setNewTitle("");
      setNewDescription("");
    }

    setLoading(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Add Todo</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Todo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={loading}
            />
            <Textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              disabled={loading}
            />
          </div>
          <DialogFooter className="pt-4">
            <Button onClick={handleCreateTodo} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
