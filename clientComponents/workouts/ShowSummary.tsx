"use client";

import { Workout } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteWorkout from "@/serverActions/workouts/deleteWorkout";

interface ShowSummaryUIProps {
  workouts: Workout[];
}

export default function ShowSummaryUI({
  workouts: initialWorkouts,
}: ShowSummaryUIProps) {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const router = useRouter();

  // Format date as MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleEdit = (workoutId: number, routineId: number) => {
    router.push(`/dashboard/summary/${routineId}/edit/${workoutId}`);
  };

  const handleDelete = async (workoutId: number) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      try {
        const updatedWorkouts = await deleteWorkout(workoutId);
        setWorkouts(updatedWorkouts);
      } catch (err) {
        console.error("Error deleting workout:", err);
      }
    }
  };

  if (workouts.length === 0) {
    return (
      <div className="w-full max-w-[600px] border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-8 bg-slate-50 dark:bg-[#23482c]/10 text-center">
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          No workouts recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px]">
      <div className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-6 bg-slate-50 dark:bg-[#23482c]/10"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-slate-200 dark:border-[#23482c]">
              <h3 className="text-slate-900 dark:text-white text-2xl font-bold">
                📅 {formatDate(workout.date)}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(workout.id, workout.routine.id)}
                  className="flex items-center justify-center rounded-full h-9 px-4 border-2 border-blue-500 dark:border-blue-400 bg-transparent text-blue-500 dark:text-blue-400 text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="flex items-center justify-center rounded-full h-9 px-4 border-2 border-red-500 dark:border-red-400 bg-transparent text-red-500 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {workout.exercises.map((exercise, index) => {
                const metGoal =
                  exercise.actualsets &&
                  exercise.actualsets.length >= (exercise.goaledsets ?? 0) &&
                  exercise.actualsets.every(
                    (set) => set.reps >= (exercise.goaledreps ?? 0)
                  );

                return (
                  <div
                    key={index}
                    className="border-l-4 pl-4 py-2"
                    style={{
                      borderColor: metGoal ? "#13ec49" : "#ef4444",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-slate-900 dark:text-white text-lg font-bold">
                        {exercise.exercisename}
                      </h4>
                      <span className="text-xl">{metGoal ? "✅" : "❌"}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">
                      Goal: {exercise.goaledsets} sets × {exercise.goaledreps} reps
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Actual:{" "}
                      {exercise.actualsets
                        ?.map((set, i) => `Set ${i + 1}: ${set.reps} reps`)
                        .join(", ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}