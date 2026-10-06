import { Editor } from '@tiptap/core';
export declare function useTextAlign(editor: Editor | null, props?: {
    disabled?: boolean;
}): {
    textAlignLeftButton: import("react/jsx-runtime").JSX.Element;
    textAlignCenterButton: import("react/jsx-runtime").JSX.Element;
    textAlignRightButton: import("react/jsx-runtime").JSX.Element;
    textAlignJustifyButton: import("react/jsx-runtime").JSX.Element;
};
