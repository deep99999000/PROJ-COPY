"use server"
import { and, eq, getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import {Goal, goalTable, type NewGoal} from "@/features/goals/goalSchema"
import { subgoalTable } from "@/db/schema";
import type { NewSubgoal } from "@/features/goals/subGoalschema";
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