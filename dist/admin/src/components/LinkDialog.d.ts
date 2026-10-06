import { default as React } from 'react';
export type LinkDialogPayload = {
    url: string;
};
interface LinkDialogProps {
    open: boolean;
    url: string | undefined;
    mode: 'add' | 'edit';
    onClose: () => void;
    onSave: (payload: LinkDialogPayload) => void;
    onRemove: () => void;
}
export declare const LinkDialog: React.FC<LinkDialogProps>;
export default LinkDialog;
