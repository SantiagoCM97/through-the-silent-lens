import React from "react";
import Image from "next/image";

// Define the props that the modal will accept
interface ImageModalProps {
  imageUrl: string | null; // The URL of the image to show, or null to hide the modal
  onClose: () => void; // A function to call when the modal is closed
  caption?: string; // Optional caption for the image
}

// A simple 'X' icon for the close button
const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
  caption,
}) => {
  // If imageUrl is null, the modal is not rendered.
  if (!imageUrl) {
    return null;
  }

  return (
    // The modal container, fixed to cover the viewport
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button in the top corner */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close image view"
      >
        <CloseIcon />
      </button>

      {/* The image itself, contained within a padded area */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt="Full screen view of a photograph"
            layout="fill"
            objectFit="contain"
            quality={90}
            priority
          />
        </div>
        {caption && (
          <div className="w-full mt-4 flex justify-center">
            <p className="text-white text-lg text-center">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
