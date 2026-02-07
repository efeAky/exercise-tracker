import EditRoutineForm from "@/clientComponents/routines/EditRoutine";
import { getRoutineAction } from "@/serverActions/routines/getRoutine";
import { Routine } from "@/types";

export default async function EditRoutinePage() {
  const routines: Routine[] = await getRoutineAction();

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <EditRoutineForm routines={routines} />
      </div>
    </div>
  );
}