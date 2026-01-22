import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-0">{error}</span>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
