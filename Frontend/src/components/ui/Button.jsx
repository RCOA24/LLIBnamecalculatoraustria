import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, type = "button", children, ...props }, ref) => {
  const variants = {
    primary: "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-700 shadow-sm focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-500",
    secondary: "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm focus-visible:ring-slate-900 dark:focus-visible:ring-slate-300",
    destructive: "bg-red-600 dark:bg-red-900/50 text-white dark:text-red-100 border border-transparent dark:border-red-900 hover:bg-red-700 dark:hover:bg-red-900/80 shadow-sm focus-visible:ring-red-600 dark:focus-visible:ring-red-500",
    outline: "border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    link: "text-slate-900 dark:text-indigo-400 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-12 px-8 text-base rounded-lg",
    icon: "h-9 w-9 p-0 flex items-center justify-center rounded-md"
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-slate-950 select-none active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";
export { Button };
