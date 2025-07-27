import {
  pgTable,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { goalTable, todoTable, usersTable } from "@/db/schema";
// goal table
export const subgoalTable = pgTable("subgoaltable", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  goal_id: integer("goal_id")
    .notNull()
    .references(() => goalTable.id),
});

export type Subgoal = typeof subgoalTable.$inferSelect;
