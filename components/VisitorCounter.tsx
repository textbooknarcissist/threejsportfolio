
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorCount } from '../hooks/useVisitorCount';

const VisitorCounter: React.FC = () => {
    const { count, loading } = useVisitorCount();

    return (
        <AnimatePresence>
            {!loading && count !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 }}
                    className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full glass border border-foreground/10 shadow-lg shadow-black/20 cursor-default select-none"
                    title={`${count.toLocaleString()} unique visitor${count !== 1 ? 's' : ''}`}
                >
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping opacity-40" />

                    {/* Count */}
                    <span className="text-[10px] sm:text-[11px] font-bold text-foreground/80 leading-none">
                        {count.toLocaleString()}
                    </span>

                    {/* Label */}
                    <span className="text-[6px] sm:text-[7px] uppercase tracking-widest text-foreground/30 font-bold mt-1 leading-none text-center px-1">
                        visitors
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VisitorCounter;
