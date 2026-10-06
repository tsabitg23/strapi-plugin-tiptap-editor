import { Editor } from '@tiptap/core';
export declare function useTable(editor: Editor | null, props?: {
    disabled?: boolean;
}): {
    tableButton: import("react/jsx-runtime").JSX.Element;
    addColumnButton: import("react/jsx-runtime").JSX.Element;
    removeColumnButton: import("react/jsx-runtime").JSX.Element;
    addRowButton: import("react/jsx-runtime").JSX.Element;
    removeRowButton: import("react/jsx-runtime").JSX.Element;
    tableDialog: import("react/jsx-runtime").JSX.Element;
};
