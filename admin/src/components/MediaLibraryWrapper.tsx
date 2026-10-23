import React from 'react';
import { getMediaLibraryComponent } from '../utils/strapiApp';

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

export function MediaLibraryWrapper({ open, onClose, onSelectAssets, allowedTypes = ['images'] }: MediaLibraryWrapperProps) {
  if (!open) return null;

  const MediaLibraryDialogComp = getMediaLibraryComponent();
  if (!MediaLibraryDialogComp) {
    onClose();
    return null;
  }

  return (
    <MediaLibraryDialogComp
      onClose={onClose}
      onSelectAssets={onSelectAssets}
      allowedTypes={allowedTypes}
      multiple={false}
    />
  );
}
