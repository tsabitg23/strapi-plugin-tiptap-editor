import { Extension } from '@tiptap/core';

// Tiptap's orderedList node already stores the HTML "type" attribute. Its
// default Tab shortcut sinks the item but inherits the parent's list type.
// Make a nested ordered list decimal, including when the parent is alphabetic.
export const OrderedSublistShortcuts = Extension.create({
  name: 'orderedSublistShortcuts',
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (!this.editor.isActive('orderedList')) return false;
        return this.editor
          .chain()
          .sinkListItem('listItem')
          .updateAttributes('orderedList', { type: '1' })
          .run();
      },
      'Shift-Tab': () => {
        if (!this.editor.isActive('orderedList')) return false;
        return this.editor.commands.liftListItem('listItem');
      },
    };
  },
});
