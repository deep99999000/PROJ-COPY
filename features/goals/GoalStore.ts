 import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Goal, NewGoal } from "@/features/goals/goalSchema";
import { useSubgoal } from "@/features/subGoals/subgoalStore";


export type GoalStore = {
  allGoals: Goal[];
  setGoal: (newGoals: Goal[]) => void;
  addGoal: (newGoal: NewGoal) => void;
  clearGoals: () => void;
  getGoalByIndex: (index: number) => Goal | undefined;
};
export const useGoal = create<GoalStore>()(
  persist(
    (set, get) => ({
      allGoals: [],

      // Set all goals (e.g. after server fetch)
      setGoal: (newGoals) => set({ allGoals: newGoals }),

      // Optimistically add goal (temporary id)
      addGoal: (newGoal) =>
        set((state) => {
          const tempGoal: Goal = {
            ...newGoal,
            description: newGoal.description ?? null,
            category: newGoal.category ?? null,
            endDate: newGoal.endDate ?? null,
             status: newGoal.status ?? "not_started", 
          };
          return {
            allGoals: [tempGoal, ...state.allGoals],
          };
        }),

      // Clear all cached goals
      clearGoals: () => set({ allGoals: [] }),

      // ✅ Access goal by index
      getGoalByIndex: (index) => get().allGoals[index],
    }),
    {
      name: "goals-store",
    }
  )
  ); 