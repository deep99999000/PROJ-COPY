import { ShowDate } from '@/components/ShowDate';
import { Button } from '@/components/ui/button';
import type { Goal } from '@/features/goals/goalSchema';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SingleGoal = ({ goal }: { goal: Goal }) => {
  const { id, name, description, category, endDate } = goal;
  const progress = Math.floor(Math.random() * 100)

  //category colors with gradients and emojis
  const categoryStyles: Record<string, { bg: string; text: string; icon: string; cardBg: string; emoji: string }> = {
    Health: { 
      bg: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200", 
      text: "text-emerald-700", 
      icon: "bg-emerald-100",
      cardBg: "bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30",
      emoji: "🏃‍♂️"
    },
    Career: { 
      bg: "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200", 
      text: "text-blue-700", 
      icon: "bg-blue-100",
      cardBg: "bg-gradient-to-br from-blue-50/50 via-white to-sky-50/30",
      emoji: "💼"
    },
    Learning: { 
      bg: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200", 
      text: "text-purple-700", 
      icon: "bg-purple-100",
      cardBg: "bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/30",
      emoji: "📚"
    },
    Personal: { 
      bg: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200", 
      text: "text-yellow-700", 
      icon: "bg-yellow-100",
      cardBg: "bg-gradient-to-br from-yellow-50/50 via-white to-amber-50/30",
      emoji: "🌟"
    },
    Finance: { 
      bg: "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200", 
      text: "text-indigo-700", 
      icon: "bg-indigo-100",
      cardBg: "bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/30",
      emoji: "💰"
    },
    Coding: { 
      bg: "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200", 
      text: "text-slate-700", 
      icon: "bg-slate-100",
      cardBg: "bg-gradient-to-br from-slate-50/50 via-white to-gray-50/30",
      emoji: "💻"
    },
  };

  const getCategoryStyle = (cat: string) => {
    return categoryStyles[cat] || { 
      bg: "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200", 
      text: "text-gray-700", 
      icon: "bg-gray-100",
      cardBg: "bg-gradient-to-br from-gray-50/50 via-white to-slate-50/30",
      emoji: "🎯"
    };
  };
  const categoryStyle = getCategoryStyle(category || "");
  const isCompleted = progress >= 100;
  const isNearDeadline = endDate && new Date(endDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <Link href={`/goals/${id}`} passHref>
      <div className={`group ${categoryStyle.cardBg} rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col cursor-pointer`}>
        {/* Header */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`p-2.5 rounded-xl ${categoryStyle.icon} group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-2xl">{categoryStyle.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors leading-tight">
                  {name}
                </h3>
                {isCompleted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-1">
                    ✓ Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-1">
              {description}
            </p>
          )}

          {/* Progress Section */}
          <div className="mb-4 mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Progress</span>
              <span className="text-sm font-semibold text-slate-800">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm">
            {category && (
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${categoryStyle.bg} ${categoryStyle.text}`}>
                {category}
              </span>
            )}
            
            {endDate && (
              <div className={`flex items-center gap-1.5 ${isNearDeadline ? 'text-orange-600' : 'text-slate-500'}`}>
                {isNearDeadline ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <ShowDate date={endDate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleGoal;