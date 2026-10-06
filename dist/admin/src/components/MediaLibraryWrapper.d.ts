export interface StrapiFile {
    id: number;
    name: string;
    alternativeText?: string | null;
    url?: string;
}
interface MediaLibraryWrapperProps {
    open: boolean;
    onClose: () => void;
    onSelectAssets: (assets: StrapiFile[]) => void;
}
export declare function MediaLibraryWrapper({ open, onClose, onSelectAssets }: MediaLibraryWrapperProps): import("react/jsx-runtime").JSX.Element | null;
export {};
