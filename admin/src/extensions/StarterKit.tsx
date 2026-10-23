import { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';

import {
  Bold as BoldIcon,
  BulletList as BulletListIcon,
  Code as CodeIcon,
  Italic as ItalicIcon,
  NumberList as NumberListIcon,
  Quotes as QuotesIcon,
  StrikeThrough as StrikeThroughIcon,
  Underline as UnderlineIcon,
} from '@strapi/icons';
import { ToolbarButton } from '../components/ToolbarButton';
import { useIntl } from 'react-intl';

export function useStarterKit(
  editor: Editor | null,
  props: { disabled?: boolean } = { disabled: false }
) {
  const { formatMessage } = useIntl();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          isBold: false,
          canBold: false,
          isItalic: false,
          canItalic: false,
          isUnderline: false,
          canUnderline: false,
          isStrike: false,
          canStrike: false,
          isCode: false,
          canCode: false,
          isBulletList: false,
          canToggleBulletList: false,
          isOrderedList: false,
          isAlphabeticList: false,
          canToggleOrderedList: false,
          canIndentListItem: false,
          canOutdentListItem: false,
          isBlockquote: false,
          canToggleBlockquote: false,
        };
      }
      const ed = ctx.editor;
      const canPerformAction = (cmd: string): boolean => {
        const chain = ed.can().chain() as Record<string, any>;
        return typeof chain[cmd] === 'function' ? chain[cmd]().run() : false;
      };
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: canPerformAction('toggleBold'),
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: canPerformAction('toggleItalic'),
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: canPerformAction('toggleUnderline'),
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: canPerformAction('toggleStrike'),
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: canPerformAction('toggleCode'),
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        canToggleBulletList: canPerformAction('toggleBulletList'),
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isAlphabeticList: ctx.editor.isActive('orderedList', { type: 'a' }) ?? false,
        canToggleOrderedList: canPerformAction('toggleOrderedList'),
        canIndentListItem: ed.can().sinkListItem('listItem'),
        canOutdentListItem: ed.can().liftListItem('listItem'),
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canToggleBlockquote: canPerformAction('toggleBlockquote'),
      };
    },
  });

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleCode = () => editor?.chain().focus().toggleCode().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => {
    if (!editor) return;
    if (editor.isActive('orderedList', { type: 'a' })) {
      editor.chain().focus().updateAttributes('orderedList', { type: null }).run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
    }
  };
  const toggleAlphabeticList = () => {
    if (!editor) return;
    if (editor.isActive('orderedList', { type: 'a' })) {
      editor.chain().focus().toggleOrderedList().run();
    } else if (editor.isActive('orderedList')) {
      editor.chain().focus().updateAttributes('orderedList', { type: 'a' }).run();
    } else {
      editor.chain().focus().toggleOrderedList().updateAttributes('orderedList', { type: 'a' }).run();
    }
  };
  const indentListItem = () =>
    editor?.chain().focus().sinkListItem('listItem').updateAttributes('orderedList', { type: '1' }).run();
  const outdentListItem = () => editor?.chain().focus().liftListItem('listItem').run();
  const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run();

  return {
    boldButton: (
      <ToolbarButton
        onClick={toggleBold}
        icon={<BoldIcon />}
        active={editorState?.isBold ?? false}
        disabled={props.disabled || !editor || !editorState?.canBold}
        tooltip={formatMessage({ id: 'tiptap-editor.toolbar.bold', defaultMessage: 'Bold' })}
      />
    ),
    italicButton: (
      <ToolbarButton
        onClick={toggleItalic}
        icon={<ItalicIcon />}
        active={editorState?.isItalic ?? false}
        disabled={props.disabled || !editor || !editorState?.canItalic}
        tooltip={formatMessage({ id: 'tiptap-editor.toolbar.italic', defaultMessage: 'Italic' })}
      />
    ),
    underlineButton: (
      <ToolbarButton
        onClick={toggleUnderline}
        icon={<UnderlineIcon />}
        active={editorState?.isUnderline ?? false}
        disabled={props.disabled || !editor || !editorState?.canUnderline}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.underline',
          defaultMessage: 'Underline',
        })}
      />
    ),
    strikeButton: (
      <ToolbarButton
        onClick={toggleStrike}
        icon={<StrikeThroughIcon />}
        active={editorState?.isStrike ?? false}
        disabled={props.disabled || !editor || !editorState?.canStrike}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.strikethrough',
          defaultMessage: 'Strikethrough',
        })}
      />
    ),
    bulletButton: (
      <ToolbarButton
        onClick={toggleBulletList}
        icon={<BulletListIcon />}
        active={editorState?.isBulletList ?? false}
        disabled={props.disabled || !editor || !editorState?.canToggleBulletList}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.bulletList',
          defaultMessage: 'Bullet list',
        })}
      />
    ),
    orderedButton: (
      <ToolbarButton
        onClick={toggleOrderedList}
        icon={<NumberListIcon />}
        active={(editorState?.isOrderedList && !editorState?.isAlphabeticList) ?? false}
        disabled={props.disabled || !editor || !editorState?.canToggleOrderedList}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.numberedList',
          defaultMessage: 'Numbered list',
        })}
      />
    ),
    alphabeticButton: (
      <ToolbarButton
        onClick={toggleAlphabeticList}
        icon={<>a. b. c.</>}
        active={editorState?.isAlphabeticList ?? false}
        disabled={props.disabled || !editor || !editorState?.canToggleOrderedList}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.alphabeticList',
          defaultMessage: 'Alphabetic list (a, b, c)',
        })}
      />
    ),
    indentListButton: (
      <ToolbarButton
        onClick={indentListItem}
        icon={<>→</>}
        disabled={props.disabled || !editor || !editorState?.canIndentListItem}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.indentListItem',
          defaultMessage: 'Create numbered sublist (Tab)',
        })}
      />
    ),
    outdentListButton: (
      <ToolbarButton
        onClick={outdentListItem}
        icon={<>←</>}
        disabled={props.disabled || !editor || !editorState?.canOutdentListItem}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.outdentListItem',
          defaultMessage: 'Outdent list item (Shift+Tab)',
        })}
      />
    ),
    codeButton: (
      <ToolbarButton
        onClick={toggleCode}
        icon={<CodeIcon />}
        active={editorState?.isCode ?? false}
        disabled={props.disabled || !editor || !editorState?.canCode}
        tooltip={formatMessage({
          id: 'tiptap-editor.toolbar.inlineCode',
          defaultMessage: 'Inline code',
        })}
      />
    ),
    blockquoteButton: (
      <ToolbarButton
        onClick={toggleBlockquote}
        icon={<QuotesIcon />}
        active={editorState?.isBlockquote ?? false}
        disabled={props.disabled || !editor || !editorState?.canToggleBlockquote}
        tooltip={formatMessage({ id: 'tiptap-editor.toolbar.quote', defaultMessage: 'Quote' })}
      />
    ),
  };
}
