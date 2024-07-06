export interface ISliderRangeProps {
   className?: string;
   min: number;
   max: number;
   value: [number, number];
   onChange: (value: [number, number]) => void;
}
