import { ReactNode, ElementType } from 'react';
export interface StarBorderProps {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
  href?: string;
  [key: string]: any;
}
declare function StarBorder(props: StarBorderProps): JSX.Element;
export default StarBorder;
