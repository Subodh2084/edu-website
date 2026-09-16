import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
              "h-11 w-full min-w-0 rounded-lg border border-leaf-border bg-white px-3 text-sm text-leaf-navy shadow-none outline-none transition-all duration-200",
              "placeholder:text-leaf-muted",
              "focus:border-leaf-green-dark focus:ring-3 focus:ring-leaf-green/15",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-leaf-bg disabled:opacity-60",
              "aria-invalid:border-error aria-invalid:ring-3 aria-invalid:ring-error/15",
              "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
              className,
            )}
      {...props}
    />
  )
}

export { Textarea }
