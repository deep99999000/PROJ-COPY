"use server"
import { and, eq, getTableColumns, inArray } from "drizzle-orm";
import { db } from "@/db";
import {Goal, goalTable, type NewGoal} from "@/features/goals/goalSchema"
import { subgoalTable, todoTable } from "@/db/schema";
import type { NewSubgoal } from "@/features/subGoals/subGoalschema";
//get all users goal
export const getAllUserGoals = async (user_id: number) => {
  try {
    const allgoals = await db
      .select()
      .from(goalTable)
      .where(eq(goalTable.user_id, user_id));
    return allgoals;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//new goal
export const newGoalsAction = async(newgoal: NewGoal) => {
  try {
    console.log(newgoal); 
    const todo = await db
    .insert(goalTable)
    .values(newgoal)
    .returning()
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const getsubGoal = async(id:number) => {
 try {
  const subgoal = await db
  .select()
  .from(subgoalTable)
  .where(eq(subgoalTable.goal_id,id))
  console.log(subgoal);
  return subgoal
 } catch (error) {
  console.log(error);
 }
};
export const getaallsubgoal = async(id:number) => {
    const a = await db.select()
    .from(subgoalTable)
    .where(eq(subgoalTable.goal_id,id))
    console.log(a);
    return a
}
export const newSubGoalsAction = async(NewSubgoal: NewSubgoal) => {
  try {
    console.log(NewSubgoal); 
    const todo = await db
    .insert(subgoalTable)
    .values(NewSubgoal)
    .returning()
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteGoalsAction = async (id: number) => {
  try {
    // 1. Find all subgoal IDs for this goal
    const subgoals = await db
      .select({ id: subgoalTable.id })
      .from(subgoalTable)
      .where(eq(subgoalTable.goal_id, id));

    const subgoalIds = subgoals.map(sg => sg.id);

    if (subgoalIds.length > 0) {
      // 2. Delete all todos linked to these subgoals
      await db
        .delete(todoTable)
        .where(inArray(todoTable.subgoal_id, subgoalIds));

      // 3. Delete all subgoals for this goal
      await db
        .delete(subgoalTable)
        .where(eq(subgoalTable.goal_id, id));
    }

    // 4. Delete the goal
    const deletedGoal = await db
      .delete(goalTable)
      .where(eq(goalTable.id, id))
      .returning();

    return deletedGoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};