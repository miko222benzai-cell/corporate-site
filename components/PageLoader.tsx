"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URLハッシュを除去してトップに戻す（#contactなどのリンク後のリロード対策）
    history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);

    if (sessionStorage.getItem("crazy_loaded")) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("crazy_loaded", "1");
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="text-[2rem] font-black tracking-tight text-gray-900 select-none">
                CRAZY
                <motion.span
                  className="text-red-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.25 }}
                >
                  .
                </motion.span>
              </span>
            </motion.div>

            {/* Red grow line */}
            <motion.div
              className="h-[2px] bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            />

            {/* Sub label */}
            <motion.p
              className="text-[9px] text-gray-300 font-bold tracking-[0.4em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.4 }}
            >
              AI × SNS × CREATIVE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
