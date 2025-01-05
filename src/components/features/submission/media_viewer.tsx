// components/MediaViewer.tsx
import React from 'react';
import { FileText, Link } from 'lucide-react';
import { Media } from '@/types/submission';

interface MediaViewerProps {
  media: Media;
}

export const MediaViewer = ({ media }:MediaViewerProps ) => {
  const getMediaComponent = () => {
    switch (media.type) {
      case "video":
        return (
          <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg">
            <img
              src="/api/placeholder/640/360"
              alt="Video placeholder"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      case "image":
        return (
          <img
            src="/api/placeholder/640/360"
            alt={media.description}
            className="w-full h-auto rounded-lg"
          />
        );
      case "document":
        return (
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{media.filename}</span>
          </div>
        );
      case "link":
        return (
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Link className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{media.title}</span>
          </div>
        );
    }
  };

  return (
    <div className="mb-4">
      {getMediaComponent()}
      {media.description && (
        <p className="text-sm text-gray-600 mt-2">{media.description}</p>
      )}
    </div>
  );
};