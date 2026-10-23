import { useRef, useState } from 'react';
import type { Editor } from '@tiptap/core';
import { NodeSelection } from '@tiptap/pm/state';
import { useEditorState } from '@tiptap/react';
import { Typography } from '@strapi/design-system';
import { FilePdf } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { MediaLibraryWrapper, type StrapiFile } from '../components/MediaLibraryWrapper';
import { ToolbarButton } from '../components/ToolbarButton';

type SelectionRange = { from: number; to: number };

export function isPdfAsset(asset: StrapiFile | undefined): asset is StrapiFile & { url: string } {
  return !!asset && asset.mime?.toLowerCase() === 'application/pdf' &&
    typeof asset.url === 'string' && /^(https?:\/\/|\/)/i.test(asset.url.trim()) &&
    !asset.url.trim().startsWith('//') && !!asset.name?.trim() &&
    Number.isInteger(asset.id) && asset.id > 0;
}

export function insertPdfAttachment(editor: Editor, range: SelectionRange, asset: StrapiFile): boolean {
  if (!isPdfAsset(asset)) return false;

  const inserted = editor.commands.insertContentAt(range, {
    type: 'pdfAttachment',
    attrs: { url: asset.url.trim(), name: asset.name.trim(), assetId: asset.id },
  }, { updateSelection: true });
  if (!inserted) return false;

  // Tiptap splits a paragraph when necessary. At a block boundary it selects
  // the new card, so move into the following paragraph (or create one at EOF).
  const selection = editor.state.selection;
  if (selection instanceof NodeSelection && selection.node.type.name === 'pdfAttachment') {
    const afterCard = selection.to;
    const next = editor.state.doc.nodeAt(afterCard);
    if (!next?.isTextblock) {
      editor.commands.insertContentAt(afterCard, { type: 'paragraph' });
    }
    editor.commands.setTextSelection(afterCard + 1);
  }
  editor.commands.focus();
  return true;
}

export function usePdfAttachment(editor: Editor | null, props: { disabled?: boolean } = {}) {
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState(false);
  const savedSelection = useRef<SelectionRange | null>(null);
  const { formatMessage } = useIntl();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({ isInCodeBlock: ctx.editor?.isActive('codeBlock') ?? false }),
  });

  function openPicker() {
    if (!editor) return;
    savedSelection.current = {
      from: editor.state.selection.from,
      to: editor.state.selection.to,
    };
    setError(false);
    setShowPicker(true);
  }

  function handleSelectAssets(assets: StrapiFile[]) {
    const asset = assets[0];
    const range = savedSelection.current;
    const inserted = !!editor && !!range && !!asset && insertPdfAttachment(editor, range, asset);
    setShowPicker(false);
    savedSelection.current = null;
    setError(!inserted);
  }

  return {
    pdfButton: (
      <ToolbarButton
        onClick={openPicker}
        icon={<FilePdf />}
        disabled={props.disabled || !editor || (editorState?.isInCodeBlock ?? false)}
        tooltip={formatMessage({ id: 'tiptap-editor.toolbar.insertPdf', defaultMessage: 'Insert PDF' })}
      />
    ),
    pdfDialog: (
      <MediaLibraryWrapper
        open={showPicker}
        onClose={() => { setShowPicker(false); savedSelection.current = null; }}
        onSelectAssets={handleSelectAssets}
        allowedTypes={['files']}
      />
    ),
    pdfError: error ? (
      <Typography textColor="danger600" variant="pi" role="alert">
        {formatMessage({ id: 'tiptap-editor.pdf.invalid', defaultMessage: 'Select a PDF file to insert.' })}
      </Typography>
    ) : null,
  };
}
