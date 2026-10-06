import { InputProps } from '@strapi/strapi/admin';
import { Editor } from '@tiptap/core';
import { FieldValue } from '../utils/tiptapUtils';
type TiptapInputProps = InputProps & {
    labelAction?: React.ReactNode;
    editor: Editor;
    field: FieldValue;
    children?: React.ReactNode;
    noPresetConfigured?: boolean;
};
declare const BaseTiptapInput: import('react').ForwardRefExoticComponent<TiptapInputProps & import('react').RefAttributes<HTMLDivElement>>;
export default BaseTiptapInput;
