import { Editor, Extension } from '@tiptap/core';

// ProseMirror creates a new nested list with default attributes when sinking an
// item. Copy the current list type so alphabetic sublists stay alphabetic.
export function indentOrderedListItem(editor: Editor) {
  if (!editor.isActive('orderedList')) return false;

  const type = editor.getAttributes('orderedList').type ?? '1';
  return editor
    .chain()
    .focus()
    .sinkListItem('listItem')
    .updateAttributes('orderedList', { type })
    .run();
}

export const OrderedSublistShortcuts = Extension.create({
  name: 'orderedSublistShortcuts',
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return indentOrderedListItem(this.editor);
      },
      'Shift-Tab': () => {
        if (!this.editor.isActive('orderedList')) return false;
        return this.editor.commands.liftListItem('listItem');
      },
    };
  },
});
