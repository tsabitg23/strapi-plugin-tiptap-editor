import { TiptapInputProps } from '../utils/tiptapUtils';
type RichTextInputProps = TiptapInputProps & {
    attribute?: {
        options?: {
            preset?: string;
        };
    };
};
declare const RichTextInput: import('react').ForwardRefExoticComponent<RichTextInputProps & import('react').RefAttributes<HTMLDivElement>>;
export default RichTextInput;
