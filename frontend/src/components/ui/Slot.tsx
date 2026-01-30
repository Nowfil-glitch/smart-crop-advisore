import * as React from 'react';

/** Minimal Slot (like Radix) to allow `asChild` composition without extra deps. */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Slot({ children, ...props }, forwardedRef) {
    if (!React.isValidElement(children)) return null;

    return React.cloneElement(children as any, {
      ...props,
      ref: (children as any).ref ?? forwardedRef,
      className: [(children as any).props?.className, (props as any).className]
        .filter(Boolean)
        .join(' '),
    });
  }
);
