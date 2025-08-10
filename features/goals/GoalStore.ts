import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Goal, NewGoal } from "@/features/goals/goalSchema";

// Define the store type
export type GoalStore = {
  allGoals: Goal[];
  setGoal: (newGoals: Goal[]) => void;
  addGoal: (newGoal: NewGoal) => void;
  deleteGoal: (id: number) => void;
  clearGoals: () => void;
  getGoalByIndex: (index: number) => Goal | undefined;
  updateGoalStatus: (goalId: number, status: Goal["status"]) => void;
};

export const useGoal = create<GoalStore>()(
  persist(
    (set, get) => ({
      allGoals: [],

      // Replace all goals (e.g., after fetching from server)
      setGoal: (newGoals) => set({ allGoals: newGoals }),

      // Add a new goal (optimistically with temporary structure)
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

      // Delete goal by ID
      deleteGoal: (id) =>
        set((state) => ({
          allGoals: state.allGoals.filter((goal) => goal.id !== id),
        })),

      // Clear all goals
      clearGoals: () => set({ allGoals: [] }),

      // Get goal by index
      getGoalByIndex: (index) => get().allGoals[index],

      // Update the status of a specific goal
      updateGoalStatus: (goalId, status) =>
        set((state) => ({
          allGoals: state.allGoals.map((goal) =>
            goal.id === goalId ? { ...goal, status } : goal
          ),
        })),
    }),
    {
      name: "goals-store", // Local storage key
    }
  )
);