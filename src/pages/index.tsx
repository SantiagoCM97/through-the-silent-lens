import Head from "next/head";
import Image from "next/image";
import SideMenu from "@/components/SideMenu";
import type { NextPage } from "next";

// --- Defining a Type for our Gallery Images ---
type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

// --- Placeholder Data for Gallery ---
// Now typed with our GalleryImage type
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Woman in a hat",
    category: "People",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Forest path",
    category: "Nature",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Baby elephant",
    category: "Animals",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Friends laughing",
    category: "Lifestyle",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Aurora borealis",
    category: "Nature",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A happy dog",
    category: "Animals",
  },
];

const HomePage: NextPage = () => {
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
            src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                Welcome! I'm Jane, a passionate photographer with a love for
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
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-2xl font-bold">
                    {image.category}
                  </p>
                </div>
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
