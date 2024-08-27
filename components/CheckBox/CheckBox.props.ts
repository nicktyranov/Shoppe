export interface ICheckBoxProps
   extends React.HtmlHTMLAttributes<HTMLInputElement> {
   className?: string;
   text: string;
   checked?: boolean;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
