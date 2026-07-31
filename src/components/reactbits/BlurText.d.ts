import { ReactNode } from 'react';
export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: object;
  animationTo?: object[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}
declare function BlurText(props: BlurTextProps): JSX.Element;
export default BlurText;
