import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, FieldProps>(function InputField(
  { label, error, id, className, ...props },
  ref,
) {
  const fieldId = id ?? props.name ?? label;
  return (
    <div>
      <label htmlFor={fieldId} className="field-label">{label}</label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn("field", error && "field-error", className)}
        {...props}
      />
      {error ? <p id={`${fieldId}-error`} className="field-hint-error">{error}</p> : null}
    </div>
  );
});

type AreaProps = { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaField = forwardRef<HTMLTextAreaElement, AreaProps>(function TextAreaField(
  { label, error, id, className, ...props },
  ref,
) {
  const fieldId = id ?? props.name ?? label;
  return (
    <div>
      <label htmlFor={fieldId} className="field-label">{label}</label>
      <textarea
        ref={ref}
        id={fieldId}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn("field resize-y", error && "field-error", className)}
        {...props}
      />
      {error ? <p id={`${fieldId}-error`} className="field-hint-error">{error}</p> : null}
    </div>
  );
});
