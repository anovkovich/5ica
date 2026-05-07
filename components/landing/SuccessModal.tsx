"use client";

import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SuccessModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-base-100 rounded-box shadow-2xl max-w-md w-full p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle"
              aria-label="Zatvori"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/15 text-success mb-4"
            >
              <CheckCircle2 size={48} strokeWidth={2} />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">
              Hvala što veruješ u nas!
            </h2>
            <p className="text-base-content/70 mb-6">
              Tvoj email je sačuvan. Bićeš među <strong>prvima</strong> koji
              dobiju pristup 5ici kad bude spremna.
            </p>

            <div className="bg-base-200 rounded-box p-4 mb-6 text-left">
              <p className="text-sm font-medium mb-2">Šta sledi?</p>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>📧 Stiže ti email potvrda</li>
                <li>🚀 Lansiranje uskoro</li>
                <li>🎁 Beta pristup i ekskluzivni popusti</li>
              </ul>
            </div>

            <button onClick={onClose} className="btn btn-primary w-full">
              Razumem
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
