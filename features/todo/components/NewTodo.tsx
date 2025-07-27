"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DateTimePicker } from "@/components/DateTimePicker";
import SelectComponent from "@/components/Selectcomponent";
import BaseDialog from "@/components/BaseDialog";
import { useTodo } from "@/features/todo/todostore";
import useUser from "@/store/useUser";
import { newtodoaction } from "@/features/todo/todoaction";
import type { NewTodo, Todo } from "@/features/todo/todoSchema";

interface NewTodoDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewTodoDialog = ({ isOpen, setIsOpen }: NewTodoDialogProps) => {
  const userId = useUser((s) => s.user);
  const { addTodo } = useTodo();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewTodo>({
    defaultValues: {
      category: "Personal",
      priority: "Low",
          name: "",
    description: "",
    startDate: null,
    endDate: null,
    goal_id: null,
    subgoal_id: null,
    },
  });

  //  Submit New Todo
const onSubmit = async (data: NewTodo) => {
  addTodo(data, userId ?? 0);
  reset();
  setIsOpen(false);
  await newtodoaction({
    ...data,
    user_id:userId,
  }); 
};


  return (
    <BaseDialog
      isOpen={isOpen}
      setisOpen={setIsOpen}
      title="Create New Todo"
      description="Organize your tasks efficiently"
    >
      {/* New Todo Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Task Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Task Name *</Label>
          <Input
            id="name"
            placeholder="What needs to be done?"
            {...register("name", { required: "Task name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Optional details"
            {...register("description")}
          />
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  onchangefunc={field.onChange}
                  deafultvalue={field.value || ""}
                  allvalues={["Personal", "Goal", "Tech"]}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <SelectComponent
                  onchangefunc={field.onChange}
                  deafultvalue={field.value || ""}
                  allvalues={["Low", "Medium", "High"]}
                />
              )}
            />
          </div>
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  date={field.value}
                  setDate={field.onChange}
                  label="Start Date & Time"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  date={field.value}
                  setDate={field.onChange}
                  label="End Date & Time"
                />
              )}
            />
          </div>
        </div>

        {/* Advanced Options */}
        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Controller
                    name="goalName"
                    control={control}
                    render={({ field }) => (
                      <SelectComponent
                        onchangefunc={field.onChange}
                        deafultvalue={field.value || ""}
                        allvalues={["Personal", "Goal", "Tech"]}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subgoal</Label>
                  <Controller
                    name="subgoalName"
                    control={control}
                    render={({ field }) => (
                      <SelectComponent
                        onchangefunc={field.onChange}
                        deafultvalue={field.value || ""}
                        allvalues={["Low", "Medium", "High"]}
                      />
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-5 bg-primary hover:bg-primary-dark"
        >
          Create Task
        </Button>
      </form>
    </BaseDialog>
  );
};

export default NewTodoDialog;
