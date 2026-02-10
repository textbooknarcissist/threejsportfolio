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
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
      {isHovered && (
        <motion.div
          layoutId="button-glow"
          className="absolute inset-0 bg-white/5 blur-xl -z-10 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );

  if (href) {
    const isMail = href.startsWith('mailto:');
    return (
      <a 
        href={href} 
        target={isMail ? undefined : '_blank'} 
        rel={isMail ? undefined : 'noopener noreferrer'}
        title={isMail ? "Send an email" : "Open link"}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} title="Click to perform action">
      {content}
    </button>
  );
};

export default MagneticButton;