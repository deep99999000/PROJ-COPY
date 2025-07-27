"use client";

// UI & form imports
import SelectComponent from "@/components/Selectcomponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";

// app logic imports
import { Todo } from "@/features/todo/todoSchema";
import { updatetodoData } from "@/features/todo/todoaction";
import { useTodo } from "@/features/todo/todostore";
import BaseDialog from "@/components/BaseDialog";
import { se } from "date-fns/locale";

// component props interface
interface EditTodoDialogProps {
  open: boolean;
  initialData: Todo;
  setisOpen: (open: boolean) => void;
}

const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
  open,
  initialData,
  setisOpen,
}) => {
  // form setup with default values
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Todo>({ defaultValues: initialData });

  const { updateTodo } = useTodo();

  // local + server update
  const handleUpdate = (data: Todo) => {
    updateTodo(data); // local update
    setisOpen(false); // close dialog
    updatetodoData(data); // backend sync
  };

  return (
    <BaseDialog
    isOpen={open}
    setisOpen={setisOpen}
    title="ff"
    description="ff"
    >
      
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              placeholder="Enter task name"
              {...register("name", { required: true })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input
              placeholder="Enter description"
              {...register("description")}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
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

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
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

          {/* Submit */}
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      
</BaseDialog>
  );
};

export default EditTodoDialog;
