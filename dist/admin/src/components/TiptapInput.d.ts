import { InputProps } from '@strapi/strapi/admin';
type TiptapInputProps = InputProps & {
    labelAction?: React.ReactNode;
};
declare const TiptapInput: import('react').ForwardRefExoticComponent<TiptapInputProps & import('react').RefAttributes<HTMLDivElement>>;
export default TiptapInput;
