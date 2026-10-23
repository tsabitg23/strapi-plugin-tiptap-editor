export interface StrapiFile {
    id: number;
    name: string;
    alternativeText?: string | null;
    mime?: string;
    url?: string;
}
interface MediaLibraryWrapperProps {
    open: boolean;
    onClose: () => void;
    onSelectAssets: (assets: StrapiFile[]) => void;
    allowedTypes?: Array<'images' | 'files'>;
}
export declare function MediaLibraryWrapper({ open, onClose, onSelectAssets, allowedTypes }: MediaLibraryWrapperProps): import("react/jsx-runtime").JSX.Element | null;
export {};
