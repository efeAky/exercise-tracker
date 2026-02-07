import SelectRoutineForm from "@/clientComponents/routines/SelectRoutine";
import { getRoutineAction } from "@/serverActions/routines/getRoutine";
import { getUserIdFromCookie } from "@/serverHelpers/getUserIdFromCookie";
import { Routine } from "@/types";

export default async function ProgressPage() {
  const userId = await getUserIdFromCookie();
  const routines: Routine[] = await getRoutineAction();

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-6 max-w-[700px] w-full">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-center">
            Enter Progress
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed opacity-90 text-center">
            Select a routine to log your workout
          </p>
        </div>

        <SelectRoutineForm
          userId={userId}
          routines={routines}
          showEnterProgress={true}
        />
      </div>
    </div>
  );
}