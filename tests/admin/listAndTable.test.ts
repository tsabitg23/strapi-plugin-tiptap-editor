import { describe, expect, it } from 'vitest';
import { getSchema } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TableKit } from '@tiptap/extension-table';
import { EditorState, TextSelection } from '@tiptap/pm/state';
import { liftListItem, sinkListItem } from '@tiptap/pm/schema-list';
import { CellSelection, mergeCells, splitCell } from '@tiptap/pm/tables';
import { OrderedSublistShortcuts } from '../../admin/src/extensions/OrderedList';

const schema = getSchema([StarterKit, TableKit]);

const paragraph = (text: string) => ({
  type: 'paragraph',
  content: [{ type: 'text', text }],
});

function textPosition(doc: any, text: string) {
  let position = -1;
  doc.descendants((node: any, pos: number) => {
    if (node.isText && node.text === text) position = pos + 1;
  });
  if (position < 0) throw new Error(`Text not found: ${text}`);
  return position;
}

describe('ordered list persistence and nesting', () => {
  it.each([
    { parentType: null, sublistType: '1' },
    { parentType: '1', sublistType: '1' },
    { parentType: 'a', sublistType: 'a' },
  ])('uses Tab to keep the parent list type $parentType', ({ parentType, sublistType }) => {
    const run = () => true;
    const chain = {
      focus: () => chain,
      sinkListItem: () => chain,
      updateAttributes: (name: string, attrs: Record<string, unknown>) => {
        expect(name).toBe('orderedList');
        expect(attrs).toEqual({ type: sublistType });
        return chain;
      },
      run,
    };
    const editor = {
      isActive: (name: string) => name === 'orderedList',
      getAttributes: () => ({ type: parentType }),
      chain: () => chain,
      commands: { liftListItem: (name: string) => name === 'listItem' },
    };
    const shortcuts = OrderedSublistShortcuts.config.addKeyboardShortcuts!.call({ editor } as any);
    expect(shortcuts.Tab()).toBe(true);
    expect(shortcuts['Shift-Tab']()).toBe(true);
  });

  it.each(['1', 'a'])('retains nested list type %s through JSON save/reload', (type) => {
    const doc = schema.nodeFromJSON({
      type: 'doc',
      content: [{
        type: 'orderedList',
        attrs: { type },
        content: [
          { type: 'listItem', content: [paragraph('First')] },
          { type: 'listItem', content: [paragraph('Second')] },
        ],
      }],
    });

    let state = EditorState.create({
      schema,
      doc,
      selection: TextSelection.create(doc, textPosition(doc, 'Second')),
    });
    const sink = sinkListItem(schema.nodes.listItem);
    expect(sink(state, (transaction) => { state = state.apply(transaction); })).toBe(true);

    let nestedListPos = -1;
    state.doc.descendants((node, pos) => {
      if (node.type.name === 'orderedList' && pos > 0) nestedListPos = pos;
    });
    expect(nestedListPos).toBeGreaterThan(0);
    state = state.apply(state.tr.setNodeMarkup(nestedListPos, undefined, { type }));

    const reloaded = schema.nodeFromJSON(JSON.parse(JSON.stringify(state.doc.toJSON())));
    expect(reloaded.firstChild?.attrs.type).toBe(type);
    expect(reloaded.firstChild?.firstChild?.lastChild?.attrs.type).toBe(type);

    state = EditorState.create({
      schema,
      doc: reloaded,
      selection: TextSelection.create(reloaded, textPosition(reloaded, 'Second')),
    });
    const lift = liftListItem(schema.nodes.listItem);
    expect(lift(state, (transaction) => { state = state.apply(transaction); })).toBe(true);
    expect(state.doc.firstChild?.attrs.type).toBe(type);
    expect(state.doc.firstChild?.childCount).toBe(2);
  });
});

describe('table cell persistence', () => {
  it('merges a rectangular cell selection and splits it after JSON save/reload', () => {
    const cell = (text: string) => ({ type: 'tableCell', content: [paragraph(text)] });
    const doc = schema.nodeFromJSON({
      type: 'doc',
      content: [{
        type: 'table',
        content: [
          { type: 'tableRow', content: [cell('A'), cell('B')] },
          { type: 'tableRow', content: [cell('C'), cell('D')] },
        ],
      }],
    });
    const cellPositions: number[] = [];
    doc.descendants((node, pos) => {
      if (node.type.name === 'tableCell') cellPositions.push(pos);
    });

    let state = EditorState.create({
      schema,
      doc,
      selection: new CellSelection(doc.resolve(cellPositions[0]), doc.resolve(cellPositions[3])),
    });
    expect(mergeCells(state, (transaction) => { state = state.apply(transaction); })).toBe(true);

    const reloaded = schema.nodeFromJSON(JSON.parse(JSON.stringify(state.doc.toJSON())));
    const merged = reloaded.firstChild?.firstChild?.firstChild;
    expect(merged?.attrs.colspan).toBe(2);
    expect(merged?.attrs.rowspan).toBe(2);

    let mergedPos = -1;
    reloaded.descendants((node, pos) => {
      if (node.type.name === 'tableCell') mergedPos = pos;
    });
    state = EditorState.create({
      schema,
      doc: reloaded,
      selection: new CellSelection(reloaded.resolve(mergedPos)),
    });
    expect(splitCell(state, (transaction) => { state = state.apply(transaction); })).toBe(true);

    let cellCount = 0;
    state.doc.descendants((node) => {
      if (node.type.name === 'tableCell') cellCount++;
    });
    expect(cellCount).toBe(4);
  });
});
