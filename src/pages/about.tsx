import SideMenu from "@/components/SideMenu";

export default function About() {
  return (
    <main className="p-8">
      <SideMenu />
      <div className="max-w-2xl mx-auto mt-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg">
          Welcome to Through The Quiet Lens. I am a passionate hobbyist
          photographer focused on capturing the beauty of people, nature,
          animals, and everyday life.
        </p>
      </div>
    </main>
  );
}
