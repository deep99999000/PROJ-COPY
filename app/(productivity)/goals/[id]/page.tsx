"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGoal } from "@/features/goals/GoalStore";
import { useSubgoal } from "@/features/goals/subgoalStore";
import { getaallsubgoal } from "@/features/goals/goalaction";
import { ShowDate } from "@/components/ShowDate";
import { MilestoneCard } from "@/features/goals/components/MilestoneCard";
import { Button } from "@/components/ui/button";
import {
  Pencil, Calendar, Target, ChevronLeft,
  Flag, TrendingUp, Sparkles,
} from "lucide-react";
import type { Goal } from "@/features/goals/goalSchema";
import { useDialog } from "@/hooks/usedialog";
import NewSubGoalDialog from "@/features/goals/components/Newsubgoal";
const Page = () => {
  const params = useParams();
  const goalId = Number(params?.id);
  const { allGoals } = useGoal();
  const { setSubgoals, subgoals } = useSubgoal();
  const [singleGoal, setSingleGoal] = useState<Goal | null>(null);
  const { open, isOpen, close } = useDialog();

  useEffect(() => {
    const currentGoal = allGoals.find((g) => g.id === goalId) || null;
    setSingleGoal(currentGoal);

    if (subgoals.length === 0) {
      getaallsubgoal(goalId).then(setSubgoals);
    }
  }, [allGoals, goalId, subgoals.length, setSubgoals]);

  const categoryColors: Record<string, string> = {
    Health: "bg-green-50 text-green-700 border-green-200",
    Career: "bg-blue-50 text-blue-700 border-blue-200",
    Learning: "bg-purple-50 text-purple-700 border-purple-200",
    Personal: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Finance: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Coding: "bg-pink-50 text-pink-700 border-pink-200",
  };

  if (!singleGoal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading goal details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back */}
        <div className="mb-8">
          <Link href="/goals" className="inline-flex items-center text-slate-600 hover:text-slate-900 group">
            <div className="p-2 rounded-lg group-hover:bg-slate-100 mr-2">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Goals</span>
          </Link>
        </div>

        {/* Goal Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">{singleGoal.name}</h1>
                  <p className="text-slate-600 text-lg">Goal Overview & Progress</p>
                </div>
              </div>
              {singleGoal.category && (
                <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm ${
                  categoryColors[singleGoal.category] ?? "bg-slate-50 text-slate-700 border-slate-200"
                }`}>
                  <Flag className="w-4 h-4 mr-2" />
                  {singleGoal.category}
                </span>
              )}
            </div>

            <Button asChild size="lg" className="shadow-xl px-8 py-4 rounded-xl">
              <Link href={`/goals/${singleGoal.id}/edit`} className="flex items-center gap-3">
                <Pencil className="w-5 h-5" />
                Edit Goal
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-50 rounded-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-600 font-medium mb-1">Target Date</p>
                  <p className="text-lg font-bold text-slate-900">
                    {singleGoal.endDate ? <ShowDate date={singleGoal.endDate} /> : "No date set"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-600 font-medium mb-1">Status</p>
                  <p className="text-lg font-bold text-slate-900">In Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="pt-6 border-t mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">Milestones & Progress</h2>
              </div>

              <Button onClick={open} className="group relative px-5 py-6 bg-white border border-dashed border-slate-300 shadow-sm hover:shadow hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 font-medium rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-200">
                  <Sparkles className="w-4 h-4" />
                </span>
                Add New Milestone
              </Button>
            </div>

            {subgoals
              .filter((sg) => sg.goal_id === goalId)
              .map((goal) => (
                <MilestoneCard
                  key={goal.id}
                  title={goal.name}
                  description={goal.description || ""}
                  status="Completed"
                  progress={100}
                />
              ))}

            <NewSubGoalDialog isOpen={isOpen} setIsOpen={close} goal_id={String(goalId)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
