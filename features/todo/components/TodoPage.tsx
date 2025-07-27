"use client";
import React, { useEffect, useState } from "react";
import { Todo } from "@/features/todo/todoSchema";
import { useTodo } from "@/features/todo/todostore";
import NewTodoDialog from "@/features/todo/components/NewTodo";
import { SingleTodo } from "@/features/todo/components/SingleTodo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  ListTodo,
  Target,
  TrendingUp
} from "lucide-react";
import { useDialog } from "@/hooks/usedialog";

const TodoPage = ({ allTodo }: { allTodo: Todo[] }) => {
  const { todos, setTodos } = useTodo();
  const [searchText, setSearchText] = useState("");
  const { isOpen, open, close } = useDialog();

  // Load Todos into Store
  useEffect(() => {
    setTodos(allTodo);
  }, [allTodo, setTodos]);

  // Calculate stats
  const completedTodos = todos.filter(todo => todo.isDone).length;
  const pendingTodos = todos.filter(todo => !todo.isDone).length;
  const totalTodos = todos.length;

  // Filter todos based on search
  const filteredTodos = todos.filter((todo) =>
    searchText
      ? todo.name.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent leading-tight">
                Todo Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Organize your tasks and boost productivity
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {totalTodos > 0 && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search your todos..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white shadow-sm"
                  />
                </div>
              )}
              <Button
                onClick={open}
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-xl font-semibold whitespace-nowrap"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                New Todo
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {todos.length === 0 ? (
          /* Enhanced Empty State */
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
                  <ListTodo className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                  <PlusCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Ready to get organized?
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Create your first todo and start building productive habits. Every great achievement begins with a simple task.
              </p>
              <Button
                onClick={open}
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 rounded-xl font-semibold text-lg"
              >
                <ListTodo className="w-6 h-6 mr-3" />
                Create Your First Todo
              </Button>
            </div>
          </div>
        ) : (
          /* Todos Layout */
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-slate-900">{totalTodos}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ListTodo className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedTodos}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Progress</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
              {filteredTodos.length > 0 ? (
                <>
                  {/* Section Headers */}
                  {filteredTodos.some(todo => !todo.isDone) && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        Pending Tasks ({pendingTodos})
                      </h3>
                      <div className="space-y-3">
                        {filteredTodos
                          .filter(todo => !todo.isDone)
                          .map((todo) => (
                            <div key={todo.id}>
                              <SingleTodo todo={todo} />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {filteredTodos.some(todo => todo.isDone) && (
                    <div className="pt-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Completed Tasks ({completedTodos})
                      </h3>
                      <div className="space-y-3">
                        {filteredTodos
                          .filter(todo => todo.isDone)
                          .map((todo) => (
                            <div key={todo.id} className="opacity-70">
                              <SingleTodo todo={todo} />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No todos found</h3>
                  <p className="text-slate-500">
                    {searchText 
                      ? `No todos match "${searchText}". Try a different search term.`
                      : "Create your first todo to get started!"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* New Todo Dialog */}
        <NewTodoDialog isOpen={isOpen} setIsOpen={close} />
      </div>
    </div>
  );
};

export default TodoPage;