import { Extensions, JSONContent } from '@tiptap/core';
import { InputProps } from '@strapi/strapi/admin';
export type { FieldValue } from '@strapi/strapi/admin';
export type TiptapInputProps = InputProps & {
    labelAction?: React.ReactNode;
};
export declare function tiptapContent(text: string): JSONContent;
export declare function useTiptapEditor(name: string, defaultValue?: string, extensions?: Extensions): {
    editor: import('@tiptap/core').Editor;
    field: import('@strapi/admin/strapi-admin').FieldValue<any>;
};
