"use client";

import { Routine } from "@/types";
import { useState } from "react";
import deleteRoutineAction from "@/serverActions/routines/deleteRoutine";
import { useRouter } from "next/navigation";

interface SelectRoutineProps {
  userId: number;
  routines: Routine[];
  showEdit?: boolean;
  showDelete?: boolean;
  showEnterProgress?: boolean;
  showSummary?: boolean;
}

export default function SelectRoutineForm({
  routines: initialRoutines,
  showEdit = false,
  showDelete = false,
  showEnterProgress = false,
  showSummary = false,
}: SelectRoutineProps) {
  const [routines, setRoutines] = useState(initialRoutines);
  const router = useRouter();

  // Edit a routine by navigating to edit page
  const handleEdit = async (id: number) => {
    router.push(`/dashboard/routines/edit/${id}`);
  };

  // Delete a routine and update state
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this routine?")) {
      try {
        await deleteRoutineAction(id);
        setRoutines((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Enter progress by navigating to progress page
  const handleEnterProgress = async (id: number) => {
    router.push(`/dashboard/progress/${id}`);
  };

  // See summary by navigating to summary page
  const handleSummary = async (id: number) => {
    router.push(`/dashboard/summary/${id}`);
  };

  if (routines.length === 0) {
    return (
      <div className="w-full max-w-[600px] border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-8 bg-slate-50 dark:bg-[#23482c]/10 text-center">
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          No routines added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[700px]">
      <div className="flex flex-col gap-4">
        {routines.map((r) => (
          <div
            key={r.id}
            className="border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-6 bg-slate-50 dark:bg-[#23482c]/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                {r.routinename}
              </h3>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                {r.exercises.length} exercise{r.exercises.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {showEnterProgress && (
                <button
                  onClick={() => handleEnterProgress(r.id)}
                  className="flex items-center justify-center rounded-full h-10 px-5 bg-primary text-[#112215] text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Enter Progress
                </button>
              )}
              {showSummary && (
                <button
                  onClick={() => handleSummary(r.id)}
                  className="flex items-center justify-center rounded-full h-10 px-5 bg-primary text-[#112215] text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  See Summary
                </button>
              )}
              {showEdit && (
                <button
                  onClick={() => handleEdit(r.id)}
                  className="flex items-center justify-center rounded-full h-10 px-5 border-2 border-blue-500 dark:border-blue-400 bg-transparent text-blue-500 dark:text-blue-400 text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  Edit
                </button>
              )}
              {showDelete && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="flex items-center justify-center rounded-full h-10 px-5 border-2 border-red-500 dark:border-red-400 bg-transparent text-red-500 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}