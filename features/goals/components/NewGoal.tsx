import BaseDialog from "@/components/BaseDialog";
import { DateTimePicker } from "@/components/DateTimePicker";
import SelectComponent from "@/components/Selectcomponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newGoalsAction } from "@/features/goals/goalaction";
import type { NewGoal } from "@/features/goals/goalSchema";
import { useGoal } from "@/features/goals/GoalStore";
import useUser from "@/store/useUser";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const NewGoalDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
   const { register, control, handleSubmit } = useForm<NewGoal>();
    const { user} = useUser();
    const { addGoal} = useGoal();
    
    
    const onSub = async(data: NewGoal) => {
      addGoal({
        ...data,
        user_id:user
      })
      setIsOpen(false)
      await newGoalsAction({
        ...data,
        user_id:user
      })
    };
    
    
  return (
    <div>
      <BaseDialog
        isOpen={isOpen}
        setisOpen={setIsOpen}
        title="Create New Goal"
        description="Add a name, category, and description"
      >
        {/* Replace with your form */}
        <form onSubmit={handleSubmit(onSub)}>
            {/* name */}
            <Label htmlFor="name">Name</Label>
            <Input 
            id="name"
            placeholder="name"
            {...register("name")}
            />
            
            {/* description */}
            <Label htmlFor="description">Description</Label>
            <Input 
            id="description"
            placeholder="description"
            {...register("description")}
            />

            {/* Category */}
            <Label>Category</Label>
            <Controller 
            name="category"
            control={control}
            render={({field}) => (
                <SelectComponent
                onchangefunc={field.onChange}
                deafultvalue={field.value || ""}
                allvalues={["name","desc"]}
                />
            )}
            />
            <Label>endDate</Label>
            <Controller 
            name="endDate"
            control={control}
            render={({field}) => (
                <DateTimePicker 
                label="endDate"
                setDate={field.onChange}
                date={field.value}
                />
            )}
            />

            <Button>Create Goal</Button>
        </form>
      </BaseDialog>
    </div>
  );
};

export default NewGoalDialog;
