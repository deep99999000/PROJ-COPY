"use client";

import type { Goal } from "@/features/goals/goalSchema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useDialog } from "@/hooks/usedialog";
import { useGoal } from "@/features/goals/GoalStore";
import { useEffect } from "react";
import SingleGoal from "@/features/goals/components/SingleGoal";

// 🚀 Lazy-load dialog only when needed
const NewGoalDialog = dynamic(() => import("@/features/goals/components/NewGoal"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const AllGoals = ({ goals }: { goals: Goal[] }) => {
  const { open, isOpen, close } = useDialog();
  const { allGoals, setGoal } = useGoal();

  // 🧠 Only hydrate on client, avoids hydration mismatch
  useEffect(() => {
    if (goals && goals.length > 0) {
      setGoal(goals); // cache goals into Zustand or store
    }
  }, [goals, setGoal]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Goals</h2>
        <Button variant="outline" onClick={open}>
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-2">
        {allGoals.map((goal, index) => (
          <SingleGoal goal={goal} key={index} />
        ))}
      </div>

      {/* Dialog */}
      <NewGoalDialog isOpen={isOpen} setIsOpen={close} />
    </div>
  );
};

export default AllGoals;
