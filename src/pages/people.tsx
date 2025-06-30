import React, { useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import { GetStaticProps } from "next";
import { getPhotosFromGCS } from "@/utils/getPhotosFromGCS";
import HeaderWithMenu from "@/components/HeaderWithMenu";
import ImageModal from "@/components/ImageModal";
import ImageUploader from "@/components/ImageUploader";

export const getStaticProps: GetStaticProps = async () => {
  const photos = await getPhotosFromGCS("people/");
  return { props: { photos } };
};

export default function PeoplePage({
  photos,
}: {
  photos: { id: string; url: string; alt: string }[];
}) {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState<string | null>(null);
  return (
    <main>
      <HeaderWithMenu title="Nature & Landscapes" />
      <GalleryGrid photos={photos} onImageClick={setModalUrl} />
      <ImageModal
        imageUrl={modalUrl}
        caption={modalCaption || ""}
        onClose={() => setModalUrl(null)}
      />
    </main>
  );
}
