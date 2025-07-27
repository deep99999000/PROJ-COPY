"use client";

import React, { useState } from "react";
import { Todo } from "@/features/todo/todoSchema";
import {
  updateTodosStatus,
  deleteTodoFromdb,
} from "@/features/todo/todoaction";
import { Button } from "@/components/ui/button";
import EditTodoDialog from "./EditTodoDialog";
import { useTodo } from "@/features/todo/todostore";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Target, Flag, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShowDate } from "@/components/ShowDate";
import { useDialog } from "@/hooks/usedialog";

export const SingleTodo = ({ todo }: { todo: Todo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleTodo, deleteTodo } = useTodo();
  const { open, isOpen, close } = useDialog();

  const {
    id,
    user_id,
    name,
    description,
    category,
    priority,
    startDate,
    endDate,
    isDone,
    goalName,
    subgoalName,
  } = todo;

  const handleToggle = async () => {
    toggleTodo(id);
    await updateTodosStatus(user_id, id, !isDone);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
    deleteTodoFromdb(id);
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "High":
        return {
          className: "text-red-700 border-red-200 bg-red-50",
          icon: <Flag className="h-3 w-3" />,
        };
      case "Medium":
        return {
          className: "text-amber-700 border-amber-200 bg-amber-50",
          icon: <Flag className="h-3 w-3" />,
        };
      case "Low":
        return {
          className: "text-blue-700 border-blue-200 bg-blue-50",
          icon: <Flag className="h-3 w-3" />,
        };
      default:
        return {
          className: "text-slate-700 border-slate-200 bg-slate-50",
          icon: <Flag className="h-3 w-3" />,
        };
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white transition-all duration-200 ease-in-out shadow-sm",
        "hover:shadow-md hover:border-border",
        isDone && "opacity-75 bg-muted/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Checkbox
              checked={isDone!!}
              onCheckedChange={handleToggle}
              className={cn(
                "h-5 w-5 rounded-full transition-all duration-200 border-2",
                "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
                "hover:border-slate-400"
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-base font-semibold leading-tight transition-all duration-200",
                isDone
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {name}
            </h3>

            {description && (
              <p
                className={cn(
                  "mt-1.5 text-sm leading-relaxed",
                  isDone ? "text-muted-foreground" : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex items-center gap-1 transition-all duration-200",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
              onClick={open}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {/* Priority */}
          {priority && priority !== "None" && (
            <Badge
              variant="outline"
              className={cn(
                "capitalize font-medium border transition-colors duration-200 flex items-center gap-1",
                getPriorityConfig(priority).className
              )}
            >
              {getPriorityConfig(priority).icon}
              <span>{priority}</span>
            </Badge>
          )}

          {/* Category */}
          {category && (
            <Badge
              variant="outline"
              className="capitalize font-medium text-emerald-700 border-emerald-200 bg-emerald-50"
            >
              {category}
            </Badge>
          )}

          {/* Goal */}
          {goalName && (
            <Badge
              variant="outline"
              className="font-medium text-violet-700 border-violet-200 bg-violet-50 flex items-center gap-1"
            >
              <Target className="h-3 w-3" />
              {goalName}
            </Badge>
          )}

          {/* Subgoal */}
          {subgoalName && (
            <Badge
              variant="secondary"
              className="font-medium bg-slate-100 text-slate-700"
            >
              {subgoalName}
            </Badge>
          )}

          {/* Due Date */}
          {endDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <ShowDate date={endDate} />
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <EditTodoDialog
        initialData={todo}
        open={isOpen}
        setisOpen={close}
      />
    </div>
  );
};