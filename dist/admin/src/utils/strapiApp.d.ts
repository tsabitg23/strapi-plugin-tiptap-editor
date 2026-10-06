import { ComponentType } from 'react';
import { StrapiFile } from '../components/MediaLibraryWrapper';
export interface MediaLibraryDialogProps {
    onClose: () => void;
    onSelectAssets: (assets: StrapiFile[]) => void;
    allowedTypes?: Array<'files' | 'images' | 'videos' | 'audios'>;
    multiple?: boolean;
}
interface AppBridge {
    library: {
        components: {
            'media-library'?: ComponentType<MediaLibraryDialogProps>;
        };
    };
}
export declare function captureApp(app: AppBridge): void;
export declare function getMediaLibraryComponent(): ComponentType<MediaLibraryDialogProps> | null;
export {};
