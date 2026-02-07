import Signup from "@/clientComponents/auth/Signup"
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-6 max-w-[500px] w-full">
          <h1 className="text-primary-content text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em]">
            Create Your Account
          </h1>
          <p className="text-secondary-content text-base md:text-lg leading-relaxed opacity-90">
            Start tracking your fitness journey today
          </p>
        </div>
        
        <Signup />
        
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Already have an account?{" "}
          <Link 
            href="/auth/login" 
            className="text-primary font-semibold hover:underline transition-all"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}