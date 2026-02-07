import { getUserIdFromCookie } from "@/serverHelpers/getUserIdFromCookie";
import { getRecentWorkout } from "@/serverHelpers/getRecentWorkout";
import Link from "next/link";

export default async function DashboardPage() {
  const userId = await getUserIdFromCookie();
  const recentWorkout = await getRecentWorkout(userId);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  // Calculate how many exercises achieved their goals
  const getAchievedExercises = () => {
    if (!recentWorkout) return { achieved: 0, total: 0 };

    const achieved = recentWorkout.exercises.filter((exercise) => {
      const metGoal =
        exercise.actualsets &&
        exercise.actualsets.length >= (exercise.goaledsets ?? 0) &&
        exercise.actualsets.every(
          (set) => set.reps >= (exercise.goaledreps ?? 0)
        );
      return metGoal;
    }).length;

    return { achieved, total: recentWorkout.exercises.length };
  };

  const { achieved, total } = getAchievedExercises();

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-6 max-w-[700px] w-full">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em]">
            Your Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed opacity-90">
            Track your progress and stay motivated
          </p>
        </div>

        {recentWorkout ? (
          <div className="w-full max-w-[600px] border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-6 bg-slate-50 dark:bg-[#23482c]/10">
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-4">
              Last Workout
            </h3>
            <div className="flex flex-col gap-3 text-left">
              <p className="text-slate-900 dark:text-white text-lg">
                <span className="text-2xl mr-2">📅</span>
                {formatDate(recentWorkout.date)}
              </p>
              <p className="text-slate-900 dark:text-white text-lg">
                <span className="text-2xl mr-2">💪</span>
                {recentWorkout.routine.routinename}
              </p>
              <p className="text-slate-900 dark:text-white text-lg">
                <span className="text-2xl mr-2">✅</span>
                Achieved goals in {achieved} of {total} exercises
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[600px] border-2 border-slate-300 dark:border-[#23482c] rounded-lg p-8 bg-slate-50 dark:bg-[#23482c]/10">
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
              No workouts yet. Start your first workout!
            </p>
            <Link
              href="/dashboard/routines"
              className="inline-flex items-center justify-center rounded-full h-12 px-6 bg-primary text-[#112215] text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              View Routines
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}