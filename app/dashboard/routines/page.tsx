import SelectRoutineForm from "@/clientComponents/routines/SelectRoutine";
import { getRoutineAction } from "@/serverActions/routines/getRoutine";
import { getUserIdFromCookie } from "@/serverHelpers/getUserIdFromCookie";
import Link from "next/link";
import { Routine } from "@/types";

export default async function RoutinesPage() {
  const userId = await getUserIdFromCookie();
  const routines: Routine[] = await getRoutineAction();

  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-6 max-w-[700px] w-full">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em] text-center">
            Your Routines
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed opacity-90 text-center">
            Manage your workout routines
          </p>
        </div>

        <SelectRoutineForm
          userId={userId}
          routines={routines}
          showEdit={true}
          showDelete={true}
        />

        <Link 
          href="/dashboard/routines/newRoutine"
          className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-[#112215] text-lg font-extrabold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-xl mr-2">+</span>
          <span>Add Routine</span>
        </Link>
      </div>
    </div>
  );
}