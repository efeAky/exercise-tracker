import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-[960px] w-full">
      <div className="flex flex-col gap-8 md:gap-10 items-center text-center">
        {/* Text content */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <h1 className="text-primary-content text-5xl md:text-7xl font-black leading-tight tracking-[-0.04em]">
            Welcome to Your
            <span className="text-primary"> Exercise Tracker!</span>
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-secondary-content text-lg md:text-xl leading-relaxed opacity-90">
              Create your routines, enter your progress, monitor your
              improvement, and achieve your fitness goals — all in one place.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium italic">
              Sign up to get started, or log in if you already have an account.
            </p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth/signup" className="btn-base bg-primary text-[#112215] font-extrabold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
            Sign Up Now
          </Link>
          <Link href="/auth/login" className="btn-base border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-primary-content hover:bg-slate-100 dark:hover:bg-[#23482c]/30">
            Login
          </Link>
        </div>
      </div>
      
      {/* Dumbbell illustration */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-2xl aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
          <div className="relative flex items-center justify-center dumbbell-shadow -rotate-12">
            {/* Left weight */}
            <div className="w-12 h-32 md:w-16 md:h-48 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl border-r-4 border-primary/20 relative">
              <div className="absolute inset-y-4 -right-2 w-4 h-[calc(100%-2rem)] bg-primary/40 rounded-full blur-sm" />
            </div>
            <div className="w-8 h-28 md:w-10 md:h-40 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl -ml-4 border-r-2 border-primary/10" />
            
            {/* Bar */}
            <div className="w-32 md:w-48 h-6 md:h-8 bg-gradient-to-b from-slate-600 via-slate-400 to-slate-800 shadow-inner">
              <div
                className="w-full h-full opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
            </div>
            
            {/* Right weight */}
            <div className="w-8 h-28 md:w-10 md:h-40 bg-gradient-to-l from-slate-700 to-slate-800 rounded-xl -mr-4 border-l-2 border-primary/10 z-10" />
            <div className="w-12 h-32 md:w-16 md:h-48 bg-gradient-to-l from-slate-800 to-slate-900 rounded-2xl border-l-4 border-primary/20 relative z-20">
              <div className="absolute inset-y-4 -left-2 w-4 h-[calc(100%-2rem)] bg-primary/40 rounded-full blur-sm" />
            </div>
            
            {/* Accent dots */}
            <div className="absolute top-0 right-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-primary/60 rounded-full blur-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}