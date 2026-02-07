import AddRoutineForm from "@/clientComponents/routines/AddRoutine";
import { getUserIdFromCookie } from "@/serverHelpers/getUserIdFromCookie";

export default async function NewRoutinePage() {
  const userId = await getUserIdFromCookie();

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <AddRoutineForm userId={userId} />
      </div>
    </div>
  );
}