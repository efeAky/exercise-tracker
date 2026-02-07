import EditWorkoutForm from "@/clientComponents/workouts/EditWorkout";
import { getWorkoutsByRoutineId } from "@/serverHelpers/getWorkoutsByRoutineId";
import { notFound } from "next/navigation";

interface EditWorkoutPageProps {
  params: Promise<{
    routineId: string;
    workoutId: string;
  }>;
}

export default async function EditWorkoutPage({ params }: EditWorkoutPageProps) {
  const { routineId: routineIdParam, workoutId: workoutIdParam } = await params;
  const routineId = parseInt(routineIdParam);
  const workoutId = parseInt(workoutIdParam);

  if (isNaN(routineId) || isNaN(workoutId)) {
    notFound();
  }

  const workouts = await getWorkoutsByRoutineId(routineId);
  const workout = workouts.find((w) => w.id === workoutId);

  if (!workout) {
    notFound();
  }

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <EditWorkoutForm workout={workout} />
      </div>
    </div>
  );
}