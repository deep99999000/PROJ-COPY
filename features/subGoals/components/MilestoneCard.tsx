"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, Circle, ChevronRight, Flag } from "lucide-react"

type StatusType = "Completed" | "In Progress" | "Not Started"

interface MilestoneCardProps {
  id: number
  title: string
  description: string
  status: StatusType
  hrefBase?: string
  className?: string
}

const statusConfig: Record<
  StatusType,
  {
    badgeBg: string
    badgeText: string
    badgeBorder: string
    icon: React.ReactNode
    ring: string
  }
> = {
  Completed: {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    ring: "ring-emerald-100",
  },
  "In Progress": {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    ring: "ring-amber-100",
  },
  "Not Started": {
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-200",
    icon: <Circle className="w-4 h-4 text-slate-500" />,
    ring: "ring-slate-100",
  },
}

export function MilestoneCard({
  id,
  title,
  description,
  status,
  hrefBase = "./subgoals",
  className,
}: MilestoneCardProps) {
  const theme = statusConfig[status]
  const href = `${hrefBase}`

  return (
    <Link
      href={href}
      aria-label={`Open milestone ${title}`}
      className={cn(
        "block group focus:outline-none",
        "rounded-2xl border bg-white transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-0.5",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        theme.ring,
        className
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn("p-2 rounded-xl shadow-sm", theme.badgeBg)}>
              <Flag className={cn("w-4 h-4", theme.badgeText)} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base line-clamp-1">
                {title}
              </h3>
              {description ? (
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{description}</p>
              ) : (
                <p className="text-sm text-slate-400 mt-1 italic">No description</p>
              )}
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
              theme.badgeBg,
              theme.badgeText,
              theme.badgeBorder
            )}
          >
            {theme.icon}
            <span>{status}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-end text-slate-400 group-hover:text-slate-600 transition-colors">
          <span className="text-xs mr-1">Open</span>
          <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
