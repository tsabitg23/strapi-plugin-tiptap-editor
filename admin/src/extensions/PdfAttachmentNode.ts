import { Node } from '@tiptap/core';

export type PdfAttachmentAttrs = {
  url: string;
  name: string;
  assetId: number | null;
};

/** A single PDF card in the document flow, between block nodes such as paragraphs. */
export const PdfAttachmentNode = Node.create({
  name: 'pdfAttachment',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      url: {
        default: '',
        parseHTML: (element: HTMLElement) => element.getAttribute('href') ?? '',
      },
      name: {
        default: '',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-name') ?? element.textContent ?? '',
      },
      assetId: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const raw = element.getAttribute('data-asset-id');
          if (!raw) return null;
          const id = Number(raw);
          return Number.isInteger(id) && id > 0 ? id : null;
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'a[data-type="pdf-attachment"]' }];
  },

  renderHTML({ node }) {
    const { url, name, assetId } = node.attrs as PdfAttachmentAttrs;
    // Saved content can outlive the Media Library asset. Never expose unsafe URL schemes.
    const safeUrl = /^(https?:\/\/|\/)/i.test(url) && !url.startsWith('//') ? url : '#';
    return [
      'a',
      {
        'data-type': 'pdf-attachment',
        'data-name': name,
        ...(assetId ? { 'data-asset-id': String(assetId) } : {}),
        href: safeUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      name || 'PDF document',
    ];
  },
});
