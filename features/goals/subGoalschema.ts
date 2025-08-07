import {
  pgTable,
  integer,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { goalTable, usersTable } from "@/db/schema";

export const subgoalTable = pgTable("subgoaltable", {
  id: integer("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  status: varchar("status").default("not_started").notNull(),

  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  goal_id: integer("goal_id")
    .notNull()
    .references(() => goalTable.id),
  isdone:boolean().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Subgoal = typeof subgoalTable.$inferSelect;
export type NewSubgoal = typeof subgoalTable.$inferInsert;
