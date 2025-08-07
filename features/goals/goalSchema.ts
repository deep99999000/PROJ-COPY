import {
  pgTable,
  integer,
  varchar,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";
import { usersTable } from "@/db/schema";
import { useSubgoal } from "@/features/goals/subgoalStore";
import { progress } from "motion/react";


export const goalTable = pgTable("goaltable", {
  id: bigint("id", { mode: "number" }).primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  category: varchar("category", { length: 100 }),
  endDate:timestamp(),
  progress:integer().default(0)
});

export type Goal = typeof goalTable.$inferSelect;
export type NewGoal = typeof goalTable.$inferInsert;  