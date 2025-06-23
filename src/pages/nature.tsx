import GalleryGrid from "@/components/GalleryGrid";
import { GetStaticProps } from "next";
import { getPhotosFromGCS } from "@/utils/getPhotosFromGCS";
import HeaderWithMenu from "@/components/HeaderWithMenu";

export const getStaticProps: GetStaticProps = async () => {
  const bucketName = "through-the-quiet-lens-photos";
  // Optionally, use a prefix if you organize by folder/category
  const photos = await getPhotosFromGCS(bucketName, "landscapes/");
  return { props: { photos } };
};

export default function NaturePage({
  photos,
}: {
  photos: { id: string; url: string; alt: string }[];
}) {
  return (
    <main>
      <HeaderWithMenu title="Nature & Landscapes" />
      <GalleryGrid photos={photos} />
    </main>
  );
}
