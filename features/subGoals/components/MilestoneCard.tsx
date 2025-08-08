import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Circle, Check } from "lucide-react";
import type { Todo } from "@/features/todo/todoSchema";

type StatusType = "Completed" | "In Progress" | "Not Started";

interface todo {
  title: string;
  completed: boolean;
}

interface MilestoneCardProps {
  id: number;
  title: string;
  description: string;
  status: StatusType;
  todos:Todo[]
}

const statusConfig: Record<StatusType, {
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}> = {
  "Completed": {
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200",
    icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
  },
  "In Progress": {
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    icon: <Clock className="w-4 h-4 text-yellow-600" />,
  },
  "Not Started": {
    color: "text-slate-600",
    bg: "bg-slate-100",
    border: "border-slate-200",
    icon: <Circle className="w-4 h-4 text-slate-500" />,
  },
};

export const MilestoneCard = ({
  title,
  description,
  status,
  todos,
}: MilestoneCardProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "group p-5 border rounded-xl transition-all duration-200 hover:shadow-md",
        config.border,
        `hover:${config.bg} hover:bg-opacity-30`
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${config.bg} mt-0.5`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-sm md:text-base">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
        </div>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
            config.bg,
            config.color,
            config.border
          )}
        >
          {status}
        </span>
      </div>

      {/* todos List */}
      {todos.length > 0 && (
        <div className="space-y-2 mt-2">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm",
                todo.isDone? "text-slate-700" : "text-slate-500"
              )}
            >
              {todo.isDone ? (
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 border border-slate-300 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <span
                className={cn(
                  "transition-all duration-200",
                  todo.isDone
                    ? "line-through opacity-70"
                    : "font-medium"
                )}
              >
                {todo.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Optional: Add "No todos" placeholder if needed */}
      {todos.length === 0 && (
        <p className="text-xs text-slate-400 italic">No todos defined</p>
      )}
    </div>
  );
};