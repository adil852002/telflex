import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-ink">
          {label}
          {props.required && <span className="text-sale ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={4}
        className={cn(
          "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-all resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error && "border-sale focus:ring-sale",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-sale">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
