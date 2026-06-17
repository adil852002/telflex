import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ink">
          {label}
          {props.required && <span className="text-sale ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-all",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            error && "border-sale focus:ring-sale",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-sale">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
