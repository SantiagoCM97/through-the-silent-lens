import Image from "next/image";

type Photo = {
  id: string;
  url: string;
  alt: string;
};

export default function GalleryGrid({
  photos,
  onImageClick,
}: {
  photos: Photo[];
  onImageClick?: (url: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-0 p-0">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-square cursor-pointer"
          onClick={() => onImageClick && onImageClick(photo.url)}
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
