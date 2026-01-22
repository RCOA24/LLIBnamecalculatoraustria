import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white dark:ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 mt-1.5 flex items-center animate-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
