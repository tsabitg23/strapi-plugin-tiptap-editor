import { describe, it, expect, vi } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

vi.mock('@strapi/design-system', () => ({ Typography: 'span' }));
vi.mock('@strapi/icons', () => ({ FilePdf: 'span' }));
vi.mock('@tiptap/react', () => ({ useEditorState: vi.fn() }));
vi.mock('react-intl', () => ({ useIntl: vi.fn() }));
vi.mock('../../admin/src/components/MediaLibraryWrapper', () => ({ MediaLibraryWrapper: 'div' }));
vi.mock('../../admin/src/components/ToolbarButton', () => ({ ToolbarButton: 'button' }));

import { PdfAttachmentNode } from '../../admin/src/extensions/PdfAttachmentNode';
import { insertPdfAttachment, isPdfAsset } from '../../admin/src/extensions/PdfAttachment';

const asset = { id: 42, name: 'Report.pdf', mime: 'application/pdf', url: '/uploads/report.pdf' };
const paragraph = (text: string) => ({ type: 'paragraph', content: [{ type: 'text', text }] });
const makeEditor = (content: object[]) => new Editor({
  extensions: [StarterKit, PdfAttachmentNode],
  content: { type: 'doc', content },
});
const types = (editor: Editor) => editor.getJSON().content?.map((node) => node.type);

describe('PDF attachment insertion', () => {
  it('accepts only valid Strapi PDF assets', () => {
    expect(isPdfAsset(asset)).toBe(true);
    expect(isPdfAsset({ ...asset, mime: 'image/png' })).toBe(false);
    expect(isPdfAsset({ ...asset, mime: 'application/octet-stream' })).toBe(false);
    expect(isPdfAsset({ ...asset, url: 'javascript:alert(1)' })).toBe(false);
    expect(isPdfAsset({ ...asset, url: '' })).toBe(false);
  });

  it('inserts before a paragraph', () => {
    const editor = makeEditor([paragraph('After')]);
    expect(insertPdfAttachment(editor, { from: 1, to: 1 }, asset)).toBe(true);
    expect(types(editor)).toEqual(['pdfAttachment', 'paragraph']);
    expect(editor.getJSON().content?.[1].content?.[0].text).toBe('After');
    editor.destroy();
  });

  it('inserts between existing paragraphs without adding an empty paragraph', () => {
    const editor = makeEditor([paragraph('First'), paragraph('Second')]);
    const boundary = editor.state.doc.firstChild!.nodeSize;
    expect(insertPdfAttachment(editor, { from: boundary, to: boundary }, asset)).toBe(true);
    expect(types(editor)).toEqual(['paragraph', 'pdfAttachment', 'paragraph']);
    expect(editor.state.selection.from).toBe(boundary + 2);
    editor.destroy();
  });

  it('splits a paragraph at the cursor', () => {
    const editor = makeEditor([paragraph('before after')]);
    expect(insertPdfAttachment(editor, { from: 7, to: 7 }, asset)).toBe(true);
    expect(types(editor)).toEqual(['paragraph', 'pdfAttachment', 'paragraph']);
    expect(editor.getJSON().content?.[0].content?.[0].text).toBe('before');
    expect(editor.getJSON().content?.[2].content?.[0].text).toBe(' after');
    editor.destroy();
  });

  it('adds a following paragraph when inserted at the end', () => {
    const editor = makeEditor([paragraph('Before')]);
    const end = editor.state.doc.content.size;
    expect(insertPdfAttachment(editor, { from: end, to: end }, asset)).toBe(true);
    expect(types(editor)).toEqual(['paragraph', 'pdfAttachment', 'paragraph']);
    expect(editor.state.selection.from).toBe(end + 2);
    editor.destroy();
  });

  it('rejects a non-PDF without changing content', () => {
    const editor = makeEditor([paragraph('Keep')]);
    const before = editor.getJSON();
    expect(insertPdfAttachment(editor, { from: 1, to: 1 }, { ...asset, mime: 'text/plain' })).toBe(false);
    expect(editor.getJSON()).toEqual(before);
    editor.destroy();
  });

  it('survives JSON save and reload and can be deleted', () => {
    const editor = makeEditor([paragraph('Before'), paragraph('After')]);
    const boundary = editor.state.doc.firstChild!.nodeSize;
    insertPdfAttachment(editor, { from: boundary, to: boundary }, asset);
    const saved = editor.getJSON();
    editor.destroy();
    const reloaded = new Editor({ extensions: [StarterKit, PdfAttachmentNode], content: saved });
    expect(reloaded.getJSON().content?.[1]).toEqual({
      type: 'pdfAttachment',
      attrs: { url: asset.url, name: asset.name, assetId: asset.id },
    });
    reloaded.commands.deleteRange({ from: boundary, to: boundary + 1 });
    expect(types(reloaded)).toEqual(['paragraph', 'paragraph']);
    reloaded.destroy();
  });
});
