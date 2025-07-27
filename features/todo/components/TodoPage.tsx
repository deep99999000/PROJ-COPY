"use client";

import React, { useEffect, useState } from "react";
import { Todo } from "@/features/todo/todoSchema";
import { useTodo } from "@/features/todo/todostore";
import NewTodoDialog from "@/features/todo/components/NewTodo";
import { SingleTodo } from "@/features/todo/components/SingleTodo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useDialog } from "@/hooks/usedialog";

const TodoPage = ({ allTodo }: { allTodo: Todo[] }) => {
  const { todos, setTodos } = useTodo();
  const [searchText, setSearchText] = useState("");

  // Load Todos into Store
  useEffect(() => {
    setTodos(allTodo);
  }, [allTodo, setTodos]);
const { isOpen, open, close } = useDialog();
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-3xl mx-auto">
      {/*  Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search todos"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64 rounded-lg"
          />
          <Button onClick={open} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Todo
          </Button>
        </div>
      </div>

      {/* New Todo Dialog */}
        <NewTodoDialog isOpen={isOpen} setIsOpen={close} />

      {/* Todo List */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos
            .filter((todo) =>
              searchText
                ? todo.name.toLowerCase().includes(searchText.toLowerCase())
                : true
            )
            .map((todo,index) => <SingleTodo key={index} todo={todo} />)
        ) : (
          <p className="text-sm text-muted-foreground">
            No todos found. Add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
