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

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const userId = await getuser()
        if (!userId) {
          setError(true);
          return;
        }

        // Fetch from server only if store is empty
        if (allGoals.length === 0) {
          const goals: GoalType[] | null = await getAllUserGoals(userId);
          if (!goals) {
            setError(true);
            return;
          }
          setGoal(goals); // Cache in Zustand
        }
      } catch (error) {
        setError(true);
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [allGoals.length, setGoal]);

  if (loading) return <p>Loading your goals...</p>;
  if (error) return <p>Failed to load goals. Please try again.</p>;

  return (
    <div>
      <AllGoals goals={allGoals} />
    </div>
  );
};

export default GoalPage;
