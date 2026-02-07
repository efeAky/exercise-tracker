"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import EditRoutineAction from "@/serverActions/routines/editRoutine";
import { Exercise, Routine } from "@/types";

interface EditRoutineFormProps {
  routines: Routine[];
}

export default function EditRoutineForm({ routines }: EditRoutineFormProps) {
  const params = useParams();
  const routineId = Number(params.id); // Get routine from url

  const routineToEdit = routines.find((r) => r.id === routineId);

  if (!routineToEdit) {
    throw new Error("Routine not found");
  }

  if (!routineToEdit.userId) {
    throw new Error("Routine has no userId");
  }

  const userId = routineToEdit.userId;

  const [formData, setFormData] = useState({
    routineName: routineToEdit.routinename,
    exercises: routineToEdit.exercises.map((ex) => ({
      exerciseName: ex.exercisename,
      goaledSets: String(ex.goaledsets),
      goaledReps: String(ex.goaledreps),
    })),
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExerciseChange = (
    index: number,
    field: "exerciseName" | "goaledSets" | "goaledReps",
    value: string
  ) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][field] = value;
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { exerciseName: "", goaledSets: "", goaledReps: "" },
      ],
    });
  };

  const removeExercise = (index: number) => {
    if (formData.exercises.length > 1) {
      const updatedExercises = formData.exercises.filter((_, i) => i !== index);
      setFormData({ ...formData, exercises: updatedExercises });
    }
  };

  const editRoutineHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const routineNameTrimmed = formData.routineName.trim();
    if (!routineNameTrimmed) {
      setError("Routine name cannot be empty");
      setIsLoading(false);
      return;
    }

    const exercisesValidated: Exercise[] = [];

    for (let i = 0; i < formData.exercises.length; i++) {
      const ex = formData.exercises[i];
      const name = ex.exerciseName.trim();
      const sets = Number(ex.goaledSets);
      const reps = Number(ex.goaledReps);

      if (!name) {
        setError(`Exercise #${i + 1}: name is required`);
        setIsLoading(false);
        return;
      }
      if (!sets || sets <= 0) {
        setError(`Exercise #${i + 1}: sets must be > 0`);
        setIsLoading(false);
        return;
      }
      if (!reps || reps <= 0) {
        setError(`Exercise #${i + 1}: reps must be > 0`);
        setIsLoading(false);
        return;
      }

      exercisesValidated.push({
        exercisename: name,
        goaledsets: sets,
        goaledreps: reps,
      });
    }

    try {
      await EditRoutineAction(
        userId,
        routineId,
        routineNameTrimmed,
        exercisesValidated
      );
      // Don't set loading to false - let redirect happen
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.04em]">
            Edit Routine
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2">
            Update your workout routine
          </p>
        </div>

        {error && !isLoading && (
          <div className="text-red-500 dark:text-red-400 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={editRoutineHandle} className="flex flex-col gap-6">
          <div>
            <label className="text-slate-900 dark:text-white text-sm font-semibold mb-2 block">
              Routine Name
            </label>
            <input
              placeholder="e.g., Push Day, Leg Day, Full Body"
              value={formData.routineName}
              onChange={(e) =>
                setFormData({ ...formData, routineName: e.target.value })
              }
              disabled={isLoading}
              className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-slate-900 dark:text-white text-sm font-semibold">
              Exercises
            </label>
            
            {formData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-4 bg-slate-50 dark:bg-[#23482c]/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-900 dark:text-white font-semibold text-sm">
                    Exercise #{index + 1}
                  </span>
                  {formData.exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      disabled={isLoading}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Exercise Name (e.g., Bench Press)"
                    value={exercise.exerciseName}
                    onChange={(e) =>
                      handleExerciseChange(index, "exerciseName", e.target.value)
                    }
                    disabled={isLoading}
                    className="w-full h-10 px-3 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="Sets"
                      value={exercise.goaledSets}
                      onChange={(e) =>
                        handleExerciseChange(index, "goaledSets", e.target.value)
                      }
                      disabled={isLoading}
                      className="flex-1 h-10 px-3 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Reps"
                      value={exercise.goaledReps}
                      onChange={(e) =>
                        handleExerciseChange(index, "goaledReps", e.target.value)
                      }
                      disabled={isLoading}
                      className="flex-1 h-10 px-3 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addExercise}
            disabled={isLoading}
            className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-slate-900 dark:text-white text-lg font-bold leading-normal tracking-wide hover:bg-slate-100 dark:hover:bg-[#23482c]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-xl mr-2">+</span>
            <span>Add Another Exercise</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-[#112215] text-lg font-extrabold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}