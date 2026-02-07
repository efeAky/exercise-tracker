import ShowSummaryUI from "@/clientComponents/workouts/ShowSummary";
import { getWorkoutsByRoutineId } from "@/serverHelpers/getWorkoutsByRoutineId";
import { notFound } from "next/navigation";

interface SummaryPageProps {
  params: Promise<{
    routineId: string;
  }>;
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { routineId: routineIdParam } = await params;
  const routineId = parseInt(routineIdParam);

  if (isNaN(routineId)) {
    notFound();
  }

  const workouts = await getWorkoutsByRoutineId(routineId);

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-6 max-w-[700px] w-full">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-center">
            {workouts.length > 0
              ? workouts[0].routine.routinename
              : "Workout Summary"}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed opacity-90 text-center">
            Your workout history and progress
          </p>
        </div>

        <ShowSummaryUI workouts={workouts} />
      </div>
    </div>
  );
}