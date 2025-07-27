"use client";

import type { Goal } from '@/features/goals/goalSchema';
import { useGoal } from '@/features/goals/GoalStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  Calendar,
  Target,
  ChevronLeft,
  Flag,
  TrendingUp,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react';
import { ShowDate } from '@/components/ShowDate';
import Link from 'next/link';

const Page = () => {
  const { allGoals } = useGoal();
  const { id } = useParams();
  const [singleGoal, setSingleGoal] = useState<Goal | null>(null);

  useEffect(() => {
    allGoals.forEach(goal => {
      if (goal.id == Number(id)) {
        setSingleGoal(goal);
      }
    });
  }, [allGoals, id]);

  // Category colors mapping
  const categoryColors: Record<string, string> = {
    Health: "bg-green-50 text-green-700 border-green-200",
    Career: "bg-blue-50 text-blue-700 border-blue-200",
    Learning: "bg-purple-50 text-purple-700 border-purple-200",
    Personal: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Finance: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  const getCategoryColor = (cat: string) => {
    return categoryColors[cat] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  if (!singleGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-slate-600">Loading goal details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/goals"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <div className="p-2 rounded-lg group-hover:bg-slate-100 transition-colors mr-2">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Goals</span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight mb-2">
                    {singleGoal.name}
                  </h1>
                  <p className="text-slate-600 text-lg">Goal Overview & Progress</p>
                </div>
              </div>

              {/* Category Badge */}
              {singleGoal.category && (
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm ${getCategoryColor(
                      singleGoal.category
                    )}`}
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    {singleGoal.category}
                  </span>
                </div>
              )}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-xl font-semibold"
            >
              <Link href={`/goals/${singleGoal.id}/edit`} className="flex items-center gap-3">
                <Pencil className="w-5 h-5" />
                Edit Goal
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 font-medium mb-1">Target Date</p>
                  <p className="text-lg font-bold text-slate-900">
                    {singleGoal.endDate ? <ShowDate date={singleGoal.endDate} /> : 'No date set'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-100 to-violet-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-600 font-medium mb-1">Current Status</p>
                  <p className="text-lg font-bold text-slate-900">Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                Milestones & Progress
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Sparkles className="w-4 h-4" />
                <span>Track your journey</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Milestone 1 */}
              <div className="group p-5 border border-slate-200 rounded-xl hover:border-green-200 hover:bg-green-50/30 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Milestone 1: Initial Setup</h3>
                      <p className="text-sm text-slate-600">Foundation phase completed</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    Completed
                  </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-full transition-all duration-500"></div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="group p-5 border border-slate-200 rounded-xl hover:border-yellow-200 hover:bg-yellow-50/30 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-100">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Milestone 2: Research Phase</h3>
                      <p className="text-sm text-slate-600">Currently gathering information</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                    In Progress
                  </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 w-3/4 transition-all duration-500"></div>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="group p-5 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Circle className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Milestone 3: Implementation</h3>
                      <p className="text-sm text-slate-600">Waiting to begin</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    Not Started
                  </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 w-0 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
