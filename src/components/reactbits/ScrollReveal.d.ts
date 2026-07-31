import { ReactNode, RefObject } from 'react';
export interface ScrollRevealProps {
  children?: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement> | null;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}
declare function ScrollReveal(props: ScrollRevealProps): JSX.Element;
export default ScrollReveal;
