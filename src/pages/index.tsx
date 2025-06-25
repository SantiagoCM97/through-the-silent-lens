import Head from "next/head";
import Image from "next/image";
import SideMenu from "@/components/SideMenu";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { getSingleImageUrl } from "@/utils/getHeroFromGCS";
import { getPhotosFromGCS } from "@/utils/getPhotosFromGCS";

// --- This getStaticProps function is now much cleaner ---
export const getStaticProps: GetStaticProps = async () => {
  // We can fetch both the hero image and the gallery photos in parallel
  // for better performance.
  const [heroImageUrl, galleryPhotos] = await Promise.all([
    getSingleImageUrl("Hero.jpg"),
    getPhotosFromGCS("gallery/"), // Assuming your main page grid uses a 'gallery/' folder
  ]);

  return {
    props: {
      heroImageUrl,
      photos: galleryPhotos,
    },
  };
};
// --- Your HomePage component doesn't need to change ---
// It just receives the props as before.
interface HomePageProps {
  heroImageUrl: string;
  photos: Photo[];
}
type Photo = {
  id: string;
  url: string;
  alt: string;
};

const HomePage: NextPage<HomePageProps> = ({ heroImageUrl, photos }) => {
  return (
    <div className="bg-white">
      <Head>
        <title>Natalia Chapa Photography</title>
        <meta
          name="description"
          content="Portfolio for Natalia Chapa Photography"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideMenu />
      <main className="w-full">
        {/* Hero Section */}
        <section
          id="hero"
          className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center relative z-0"
        >
          <Image
            src={heroImageUrl}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 pointer-events-none"
            alt="Hero background image of a beautiful landscape"
            priority
          />
          <div className="relative text-center text-white bg-black bg-opacity-40 p-8 rounded-lg z-10">
            <h2 className="text-5xl md:text-7xl font-thin tracking-tight">
              Natalia Chapa Photography
            </h2>
            <p className="text-xl md:text-2xl mt-4 font-light">
              Capturing life, through the quiet lens.
            </p>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-24 px-8 md:px-16 lg:px-32 bg-white">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1 flex justify-center">
              <Image
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="A portrait of the photographer, Natalia Chapa"
                width={200}
                height={200}
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">
                About Me
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome! I'm Natalia, a passionate photographer with a love for
                capturing the fleeting moments that make life beautiful. From
                the candid laughter between loved ones to the serene majesty of
                the natural world, my goal is to create images that tell a story
                and evoke emotion.
              </p>
            </div>
          </div>
        </section>

        {/* Tiled Gallery Section */}
        <section id="gallery" className="px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
    </div>
  );
};

export default HomePage;
