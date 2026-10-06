import { FC } from 'react';
interface TableSizeDialogProps {
    open: boolean;
    defaultRows?: number;
    defaultCols?: number;
    onClose: () => void;
    onSave: (rows: number, cols: number) => void;
}
export declare const TableSizeDialog: FC<TableSizeDialogProps>;
export default TableSizeDialog;
