import * as React from 'react';

import { cn } from '../shared/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    className={cn(
      'flex h-10 w-full rounded-md border py-2 px-3 text-sm ',
      'focus:outline-none focus:ring-2 focus:ring-primary-link',
      'text-primary-text bg-[#ffffff]/10',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

Input.displayName = 'Input';

export default Input;
