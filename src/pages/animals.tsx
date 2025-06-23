import GalleryGrid from "@/components/GalleryGrid";
import { GetStaticProps } from "next";
import { getPhotosFromGCS } from "@/utils/getPhotosFromGCS";
import HeaderWithMenu from "@/components/HeaderWithMenu";

export const getStaticProps: GetStaticProps = async () => {
  const bucketName = "through-the-quiet-lens-photos";
  // Optionally, use a prefix if you organize by folder/category
  const photos = await getPhotosFromGCS(bucketName, "animals/");
  return { props: { photos } };
};

export default function AnimalsPage({
  photos,
}: {
  photos: { id: string; url: string; alt: string }[];
}) {
  return (
    <main>
      <HeaderWithMenu title="Animals" />
      <GalleryGrid photos={photos} />
    </main>
  );
}
