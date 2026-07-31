export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}
declare function CountUp(props: CountUpProps): JSX.Element;
export default CountUp;
