'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

export default function CountUp({ to, from = 0, duration = 2, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(from);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90, duration: duration * 1000 });
  useEffect(() => { if (inView) motionValue.set(to); }, [inView, to, motionValue]);
  useEffect(() => spring.on('change', v => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref} className={className}>{prefix}{display.toLocaleString('en-US')}{suffix}</span>;
}
