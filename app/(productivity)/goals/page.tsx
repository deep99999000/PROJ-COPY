"use client";

import React, { useEffect, useState } from "react";
import AllGoals from "@/features/goals/components/allGoals";
import { getAllUserGoals } from "@/features/goals/goalaction";
import { useGoal } from "@/features/goals/GoalStore";
import type { Goal as GoalType } from "@/features/goals/goalSchema";
import { getuser } from "@/lib/actions/getuser";

const GoalPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { allGoals, setGoal } = useGoal();
  const fetchGoals = async () => {
    try {
      const userId = await getuser();
      if (!userId) {
        setError(true);
        return;
      }

      const goals: GoalType[] | null = await getAllUserGoals(userId);
      if (!goals) {
        setError(true);
        return;
      }

      setGoal(goals); // ✅ Set into Zustand store
    } catch (error) {
      setError(true);
      console.error("Failed to fetch goals:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // ✅ Only fetch if Zustand store is empty
    if (allGoals.length > 0) {
      setLoading(false); // skip fetching
      return;
    } else {
      fetchGoals();
    }

    // fetchGoals();
  }, [allGoals.length, setGoal]);

  if (loading) return   <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading goal details...</p>
        </div>
      </div>;
  if (error) return <p>Failed to load goals. Please try again.</p>;

  return (
    <div>
      <AllGoals goals={allGoals} />
    </div>
  );
};

export default GoalPage;
