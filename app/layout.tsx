import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background-light dark:bg-background-dark text-primary-content transition-colors duration-300">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <header className="flex items-center justify-center px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-primary rounded p-1.5 shadow-lg shadow-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 -960 960 960"
                  width="18"
                  fill="#000"
                >
                  <path d="m536-84-56-56 142-142-340-340-142 142-56-56 56-58-56-56 84-84-56-58 56-56 58 56 84-84 56 56 58-56 56 56-142 142 340 340 142-142 56 56-56 58 56 56-84 84 56 58-56 56-58-56-84 84-56-56-58 56Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight">
                Exercise Tracker
              </h2>
            </div>
          </header>
          <main className="flex flex-1 items-center justify-center px-6 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}