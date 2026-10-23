import { Editor } from '@tiptap/core';
import { StrapiFile } from '../components/MediaLibraryWrapper';
type SelectionRange = {
    from: number;
    to: number;
};
export declare function isPdfAsset(asset: StrapiFile | undefined): asset is StrapiFile & {
    url: string;
};
export declare function insertPdfAttachment(editor: Editor, range: SelectionRange, asset: StrapiFile): boolean;
export declare function usePdfAttachment(editor: Editor | null, props?: {
    disabled?: boolean;
}): {
    pdfButton: import("react/jsx-runtime").JSX.Element;
    pdfDialog: import("react/jsx-runtime").JSX.Element;
    pdfError: import("react/jsx-runtime").JSX.Element | null;
};
export {};
