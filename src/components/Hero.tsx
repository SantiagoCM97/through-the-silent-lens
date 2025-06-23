import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="absolute bottom-10 left-10 text-white">
        <h1 className="text-5xl font-bold">Through The Quiet Lens</h1>
      </div>
    </div>
  );
}