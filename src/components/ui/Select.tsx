import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-kpalime-dark">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full touch-target px-4 py-2.5 rounded-lg border bg-white text-sm transition-all focus:outline-none focus:ring-2 appearance-none',
            error
              ? 'border-red-300 focus:ring-red-200'
              : 'border-gray-200 focus:border-kpalime-green focus:ring-kpalime-green/20',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
