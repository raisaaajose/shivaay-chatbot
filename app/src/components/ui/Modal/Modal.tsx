import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  className = "",
  showCloseButton = true,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={clsx(
              "bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8 w-full max-w-[95vw] sm:max-w-lg relative flex flex-col max-h-[90vh] overflow-y-auto shadow-purple-500/20",
              className
            )}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
              duration: 0.28,
            }}
            role="dialog"
            aria-modal="true"
          >
            {showCloseButton && (
              <AnimatedButton
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 !p-2 z-10"
                variant="ghost"
                size="sm"
                aria-label="Close modal"
                icon={<X size={18} />}
              />
            )}
            {title && (
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-5 tracking-tight drop-shadow-sm">
                {title}
              </h2>
            )}
            <div className="text-white/90">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
