import {
  pgTable,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "@/db/schema";

export const goalTable = pgTable("goaltable", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),

  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  category: varchar("category", { length: 100 }),
  endDate:timestamp()
});

export type Goal = typeof goalTable.$inferSelect;
export type NewGoal = typeof goalTable.$inferInsert;
