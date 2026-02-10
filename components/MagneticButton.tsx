
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, href, className, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-block ${className} transition-shadow duration-300 ${isHovered ? 'shadow-2xl shadow-white/5' : ''}`}
    >
      <div className="relative z-10">{children}</div>
      {isHovered && (
        <motion.div
          layoutId="button-glow"
          className="absolute inset-0 bg-white/5 blur-xl -z-10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <button type="button" onClick={onClick}>{content}</button>;
};

export default MagneticButton;
