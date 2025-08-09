"use client";

import { ShowDate } from '@/components/ShowDate';
import { useSubgoal } from '@/features/subGoals/subgoalStore';
import { SingleTodo } from '@/features/todo/components/SingleTodo';
import { useTodo } from '@/features/todo/todostore';
import { TrendingUp, Calendar, ListChecks, ChevronLeft, Target, Edit, Pencil } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import NewTodoDialog from '@/features/todo/components/NewTodo';
import NewGoalButton from '@/features/goals/components/NewGoalButton';
import NewTaskButton from '@/features/todo/components/NewTodoButton';

const Page = () => {
  const { id } = useParams(); // goal_id from the URL
  const { subgoals } = useSubgoal();
  const { todos } = useTodo();

  const subgoal = subgoals.find((sg) => sg.goal_id === Number(id));

  if (!subgoal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading subgoal details...</p>
        </div>
      </div>
    );
  }

  const { name, description, isdone, status, endDate } = subgoal;
  const tasks = todos.filter((t) => t.subgoal_id === subgoal.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={`/goals/${subgoal.goal_id}`}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 group transition-colors"
          >
            <div className="p-2 rounded-lg group-hover:bg-slate-100 mr-2 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Goal</span>
          </Link>
        </div>

        {/* Subgoal Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-5 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                  {name}
                </h1>
                {description && (
                  <p className="text-slate-600 text-lg mt-1">{description}</p>
                )}
              </div>
            </div>
            {/* Edit Button */}
           <Button
              asChild
              size="lg"
              className="px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={`/subggoals/${id}/edit`} className="flex items-center gap-3">
                <Pencil className="w-5 h-5" />
                Edit Goal
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Status</p>
                  <p className="text-base font-semibold text-slate-900">
                    {isdone ? "Completed" : status || "Not Started"}
                  </p>
                </div>
              </div>
            </div>

            {/* End Date */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">End Date</p>
                  <p className="text-base font-semibold text-slate-900">
                    {endDate ? <ShowDate date={endDate} /> : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Completion */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <ListChecks className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">Tasks</p>
                  <p className="text-base font-semibold text-slate-900">
                    {tasks.filter((t) => t.isDone).length} / {tasks.length} completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-900">Tasks</h2>
            <span className="text-slate-500 text-lg">
              ({tasks.length} total)
            </span>
          </div>
                <NewTaskButton />
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((t) => (
                <SingleTodo key={t.id} todo={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ListChecks className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700">
                No tasks yet
              </h3>
              <p className="text-slate-500 mt-1">
                Start by adding your first task for this milestone.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;