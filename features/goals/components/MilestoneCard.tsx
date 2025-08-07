import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Circle } from "lucide-react";

type StatusType = "Completed" | "In Progress" | "Not Started";

interface MilestoneCardProps {
  title: string;
  description: string;
  status: StatusType;
  progress: number; // 0 to 100
}

const statusConfig: Record<StatusType, {
  color: string;
  bg: string;
  border: string;
  icon:React.ReactNode;
  progressColor: string;
}> = {
  "Completed": {
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200",
    icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    progressColor: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  "In Progress": {
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    icon: <Clock className="w-4 h-4 text-yellow-600" />,
    progressColor: "bg-gradient-to-r from-yellow-500 to-amber-500",
  },
  "Not Started": {
    color: "text-slate-600",
    bg: "bg-slate-100",
    border: "border-slate-200",
    icon: <Circle className="w-4 h-4 text-slate-500" />,
    progressColor: "bg-slate-300",
  },
};

export const MilestoneCard = ({
  title,
  description,
  status,
  progress,
}: MilestoneCardProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "group p-5 border rounded-xl transition-all duration-200",
        config.border,
        `hover:${config.border.replace("border-", "border-")}`,
        `hover:${config.bg}/30`
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.bg}`}>
            {config.icon}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color} ${config.border}`}
        >
          {status}
        </span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`${config.progressColor} h-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
