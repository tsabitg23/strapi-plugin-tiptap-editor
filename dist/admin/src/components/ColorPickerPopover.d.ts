import { ThemeColorEntry } from '../../../shared/types';
interface ColorPickerPopoverProps {
    colors: ThemeColorEntry[];
    activeColor: string | undefined;
    onSelect: (color: string) => void;
    onRemove: () => void;
}
export declare function ColorPickerPopover({ colors, activeColor, onSelect, onRemove, }: ColorPickerPopoverProps): import("react/jsx-runtime").JSX.Element;
export {};
