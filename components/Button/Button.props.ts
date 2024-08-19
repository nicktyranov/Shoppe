export interface IButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   text: string;
   productPage?: boolean;
}
