import EnterProgressForm from "@/clientComponents/workouts/EnterProgress";
import { getRoutineAction } from "@/serverActions/routines/getRoutine";
import { getUserIdFromCookie } from "@/serverHelpers/getUserIdFromCookie";
import { notFound } from "next/navigation";

interface ProgressPageProps {
  params: Promise<{
    routineId: string;
  }>;
}

export default async function ProgressPage({ params }: ProgressPageProps) {
  const userId = await getUserIdFromCookie();
  const { routineId: routineIdParam } = await params;
  const routineId = parseInt(routineIdParam);

  if (isNaN(routineId)) {
    notFound();
  }

  const routines = await getRoutineAction();
  const routine = routines.find(
    (r) => r.id === routineId && r.userId === userId
  );

  if (!routine) {
    notFound();
  }

  return (
    <div>
      <h1>{routine.routinename}</h1>
      <EnterProgressForm routine={routine} />
    </div>
  );
}