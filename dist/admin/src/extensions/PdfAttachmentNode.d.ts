import { Node } from '@tiptap/core';
export type PdfAttachmentAttrs = {
    url: string;
    name: string;
    assetId: number | null;
};
/** A single PDF card in the document flow, between block nodes such as paragraphs. */
export declare const PdfAttachmentNode: Node<any, any>;
