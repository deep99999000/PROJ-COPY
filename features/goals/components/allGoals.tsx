"use client";
import type { Goal } from "@/features/goals/goalSchema";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useDialog } from "@/hooks/usedialog";
import { useGoal } from "@/features/goals/GoalStore";
import { useEffect } from "react";
import SingleGoal from "@/features/goals/components/SingleGoal";

const NewGoalDialog = dynamic(() => import("@/features/goals/components/NewGoal"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const AllGoals = ({ goals }: { goals: Goal[] }) => {
  const { open, isOpen, close } = useDialog();
  const { allGoals, setGoal } = useGoal();

  useEffect(() => {
    if (goals && goals.length > 0) {
      setGoal(goals);
    }
  }, [goals, setGoal]);

  const completedGoals = allGoals.filter(goal => goal.id > 10).length;
  const totalGoals = allGoals.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight">
                Goals Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Track your progress and achieve your targets
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {totalGoals > 0 && (
                <div className="hidden sm:flex items-center gap-6 px-6 py-3 bg-white rounded-xl shadow-sm border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">
                      {completedGoals} Completed
                    </span>
                  </div>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-600">
                      {totalGoals} Total
                    </span>
                  </div>
                </div>
              )}
              
              <Button
                onClick={open}
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-xl transform hover:scale-105 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Goal
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {allGoals.length === 0 ? (
          // Enhanced Empty State
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Ready to set your first goal?
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Transform your aspirations into achievable milestones. Start your journey towards success today.
              </p>
              
              <Button
                onClick={open}
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-xl transform hover:scale-105 font-semibold text-lg"
              >
                <Target className="w-6 h-6 mr-3" />
                Create Your First Goal
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Goals</p>
                    <p className="text-2xl font-bold text-slate-900">{totalGoals}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedGoals}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-purple-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
              {allGoals.map((goal, index) => (
                <div 
                  key={goal.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SingleGoal goal={goal} />
                </div>
              ))}
            </div>
          </div>
        )}

        <NewGoalDialog isOpen={isOpen} setIsOpen={close} />
      </div>
    </div>
  );
};

export default AllGoals;
