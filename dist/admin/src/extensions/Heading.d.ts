import { Editor } from '@tiptap/core';
export declare const BaseHeadingWithSEOTag: import('@tiptap/core').Node<import('@tiptap/extension-heading').HeadingOptions, any>;
export declare const HeadingWithSEOTag: import('@tiptap/core').Node<import('@tiptap/extension-heading').HeadingOptions, any>;
export declare function useHeading(editor: Editor | null, props?: {
    disabled?: boolean;
    levels?: number[];
}): {
    headingSelect: import("react/jsx-runtime").JSX.Element;
    headingTagSelect: import("react/jsx-runtime").JSX.Element;
};
