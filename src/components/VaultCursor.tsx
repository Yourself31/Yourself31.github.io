import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const VaultCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(
      coarsePointerQuery.matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window
    );

    const moveCursor = (e: MouseEvent) => {
      setIsActive(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const moveTouchCursor = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const touch = e.touches[0];
      setIsActive(true);
      cursorX.set(touch.clientX);
      cursorY.set(touch.clientY);
    };

    const hideTouchCursor = () => {
      if (isTouchDevice) {
        setIsActive(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('touchstart', moveTouchCursor, { passive: true });
    window.addEventListener('touchmove', moveTouchCursor, { passive: true });
    window.addEventListener('touchend', hideTouchCursor, { passive: true });
    window.addEventListener('touchcancel', hideTouchCursor, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('touchstart', moveTouchCursor);
      window.removeEventListener('touchmove', moveTouchCursor);
      window.removeEventListener('touchend', hideTouchCursor);
      window.removeEventListener('touchcancel', hideTouchCursor);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  return (
    <>
      {/* Main Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border ${
          isTouchDevice ? 'w-10 h-10 border-silver/50' : 'w-8 h-8 border-silver/40'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isActive ? 1 : 0,
        }}
      />
      {/* Trailing Dot */}
      <motion.div
        className={`fixed top-0 left-0 bg-silver rounded-full pointer-events-none z-[9999] ${
          isTouchDevice ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
        }`}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isActive ? 1 : 0,
        }}
      />
    </>
  );
};

export default VaultCursor;
