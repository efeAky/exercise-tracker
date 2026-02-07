"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workout, Exercise } from "@/types";
import editWorkout from "@/serverActions/workouts/editWorkouts";

interface EditWorkoutProps {
  workout: Workout;
}

export default function EditWorkoutForm({ workout }: EditWorkoutProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: workout.date,
    exercises: workout.exercises.map((ex) => ({
      exercisename: ex.exercisename,
      goaledsets: ex.goaledsets ?? 0,
      goaledreps: ex.goaledreps ?? 0,
      actualsets: ex.actualsets?.map(set => ({ reps: set.reps as number | undefined })) || [],
    })),
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    reps: string
  ) => {
    const numValue = Number(reps);
    const updatedExercises = [...formData.exercises];
    
    if (reps === "") {
      updatedExercises[exerciseIndex].actualsets[setIndex].reps = undefined;
    } else if (numValue >= 0) {
      updatedExercises[exerciseIndex].actualsets[setIndex].reps = numValue;
    }
    
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    for (let i = 0; i < formData.exercises.length; i++) {
      const ex = formData.exercises[i];
      if (ex.actualsets.length === 0) {
        setError(`Exercise "${ex.exercisename}": must have at least one set`);
        setIsLoading(false);
        return;
      }
      for (let j = 0; j < ex.actualsets.length; j++) {
        if (ex.actualsets[j].reps === undefined || ex.actualsets[j].reps! < 0) {
          setError(`Exercise "${ex.exercisename}" Set ${j + 1}: please enter reps`);
          setIsLoading(false);
          return;
        }
      }
    }

    try {
      const exercisesToSave = formData.exercises.map((ex) => ({
        exercisename: ex.exercisename,
        goaledsets: ex.goaledsets,
        goaledreps: ex.goaledreps,
        actualsets: ex.actualsets.map((set) => ({
          reps: set.reps!
        }))
      }));

      await editWorkout(workout.id, formData.date, exercisesToSave);
      router.push(`/dashboard/summary/${workout.routine.id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsLoading(false);
    }
  };

  // Format date as MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.04em]">
            Edit Workout
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2">
            {workout.routine.routinename} - {formatDate(workout.date)}
          </p>
        </div>

        {error && !isLoading && (
          <div className="text-red-500 dark:text-red-400 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-4 bg-slate-50 dark:bg-[#23482c]/10">
            <label className="text-slate-900 dark:text-white text-sm font-semibold mb-2 block">
              Workout Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
              className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-white dark:bg-background-dark text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-4">
            {formData.exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-5 bg-slate-50 dark:bg-[#23482c]/10"
              >
                <div className="mb-4">
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-1">
                    {exercise.exercisename}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Goal: {exercise.goaledsets} sets × {exercise.goaledreps} reps
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exercise.actualsets.map((set, setIndex) => (
                    <div key={setIndex}>
                      <label className="text-slate-900 dark:text-white text-xs font-semibold mb-1 block">
                        Set {setIndex + 1}
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Reps"
                        value={set.reps ?? ""}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="w-full h-10 px-3 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center rounded-full h-14 px-8 bg-primary text-[#112215] text-lg font-extrabold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Updating..." : "Update Workout"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center rounded-full h-14 px-8 border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-slate-900 dark:text-white text-lg font-bold hover:bg-slate-100 dark:hover:bg-[#23482c]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}