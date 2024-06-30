export interface ISliderRangeProps
   extends React.SelectHTMLAttributes<HTMLInputElement> {
   className?: string;
   min: number;
   max: number;
}
