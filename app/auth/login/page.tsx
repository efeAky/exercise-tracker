import Login from "@/clientComponents/auth/Login"
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-6 max-w-[500px] w-full">
          <h1 className="text-primary-content text-4xl md:text-5xl font-black leading-tight tracking-[-0.04em]">
            Welcome Back
          </h1>
          <p className="text-secondary-content text-base md:text-lg leading-relaxed opacity-90">
            Log in to continue your fitness journey
          </p>
        </div>
        
        <Login />
        
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Don't have an account?{" "}
          <Link 
            href="/auth/signup" 
            className="text-primary font-semibold hover:underline transition-all"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}