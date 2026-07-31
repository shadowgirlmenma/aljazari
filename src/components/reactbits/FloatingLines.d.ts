export interface FloatingLinesProps {
  linesGradient?: string[];
  enabledWaves?: ('top' | 'middle' | 'bottom')[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: { x: number; y: number; rotate: number };
  middleWavePosition?: { x: number; y: number; rotate: number };
  bottomWavePosition?: { x: number; y: number; rotate: number };
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: string;
}
declare function FloatingLines(props: FloatingLinesProps): JSX.Element;
export default FloatingLines;