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
  /** الوسم اللي يترندر بيه (افتراضياً p) — مرري 'span' لما يكون داخل h1/h2 أو أي وسم عنونة */
  as?: keyof JSX.IntrinsicElements;
}
declare function BlurText(props: BlurTextProps): JSX.Element;
export default BlurText;
