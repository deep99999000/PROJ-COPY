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
import {  Pencil, Trash2, Target, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShowDate } from "@/components/ShowDate";
import { useDialog } from "@/hooks/usedialog";

export const SingleTodo = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleTodo, deleteTodo } = useTodo();

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
const { open,isOpen,close} = useDialog();

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
          className: "text-red-700 border-red-200 bg-red-50 hover:bg-red-100",
          icon: <Flag className="h-3 w-3" />,
        };
      case "medium":
        return {
          className:
            "text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100",
          icon: <Flag className="h-3 w-3" />,
        };
      case "Low":
        return {
          className:
            "text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100",
          icon: <Flag className="h-3 w-3" />,
        };
      default:
        return {
          className:
            "text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100",
          icon: <Flag className="h-3 w-3" />,
        };
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border transition-all duration-200 ease-in-out",
        "bg-white hover:bg-slate-50/50 hover:shadow-sm hover:border-slate-300",
        "border-slate-200/60",
        isDone && "opacity-60 bg-slate-50/30",
        isHovered && "ring-1 ring-slate-200"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Content */}
      <div className="p-3 space-y-2.5">
        {/* Header with Checkbox and Title */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Checkbox
              checked={isDone!!}
              onCheckedChange={handleToggle}
              className={cn(
                "h-4 w-4 transition-all duration-200",
                "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
                "hover:border-slate-400"
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-[15px] font-medium leading-tight transition-all duration-200",
                isDone
                  ? "line-through text-slate-500"
                  : "text-slate-900 group-hover:text-slate-800"
              )}
            >
              {name}
            </h3>

            {description && (
              <p
                className={cn(
                  "mt-1 text-sm leading-relaxed transition-colors duration-200",
                  isDone ? "text-slate-400" : "text-slate-600"
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex items-center gap-0.5 transition-all duration-200",
              "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-slate-100 hover:text-slate-700"
              onClick={open}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
              onClick={() => handleDelete(id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Priority */}
          {priority && (
            <Badge
              variant="outline"
              className={cn(
                "capitalize font-medium border transition-colors duration-200",
                getPriorityConfig(priority).className
              )}
            >
              {getPriorityConfig(priority).icon}
              <span className="ml-1">{priority}</span>
            </Badge>
          )}

          {/* Category */}
          {category && (
            <Badge
              variant="outline"
              className="capitalize font-medium text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200"
            >
              {category}
            </Badge>
          )}

          {/* Goal */}
          {goalName && (
            <Badge
              variant="outline"
              className="font-medium text-violet-700 border-violet-200 bg-violet-50 hover:bg-violet-100 transition-colors duration-200"
            >
              <Target className="h-3 w-3 mr-1" />
              {goalName}
            </Badge>
          )}

          {/* Subgoal */}
          {subgoalName && (
            <Badge
              variant="secondary"
              className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
            >
              {subgoalName}
            </Badge>
          )}
          {endDate && (
            <ShowDate
              date={endDate}
            />
          )}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200",
          isDone ? "bg-green-200" : "bg-transparent group-hover:bg-slate-200"
        )}
      />

      {/* Edit Dialog */}
      <EditTodoDialog
        initialData={todo}
        open={isOpen}
        setisOpen={close}
      />
    </div>
  );
};
