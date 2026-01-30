'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-white/10 bg-bg-800/80 p-5 shadow-2xl backdrop-blur-2xl"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-3">
              <div>{title ? <div className="text-sm font-semibold">{title}</div> : null}</div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/[0.1]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
