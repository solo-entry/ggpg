import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {icon && <span className="absolute left-2.5 opacity-80">{icon}</span>}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <span
            className={cn(
              props.disabled ? 'opacity-50' : '',
              'absolute right-2.5'
            )}
          >
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
