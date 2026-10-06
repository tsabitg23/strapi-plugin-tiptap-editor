import { ImageOptions } from '@tiptap/extension-image';
import { NodeViewProps, Editor } from '@tiptap/react';
interface StrapiImageOptions extends ImageOptions {
    enableContentCheck: boolean;
}
export declare function ImageNodeViewReadOnly({ node }: NodeViewProps): import("react/jsx-runtime").JSX.Element;
export declare const StrapiImage: import('@tiptap/core').Node<StrapiImageOptions, any>;
export declare function useImage(editor: Editor | null, props?: {
    disabled?: boolean;
}): {
    imageButton: import("react/jsx-runtime").JSX.Element;
    imageDialog: import("react/jsx-runtime").JSX.Element;
};
export {};
