import React from "react";

export default function PageHeader({ title }: { title: string }) {
  return (
    <header className="w-full bg-gray-900 flex items-center justify-between px-6 py-4 relative">
      {/* Invisible spacer for left alignment */}
      <div className="w-32" />
      {/* Centered title */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold m-0">
        {title}
      </h1>
      {/* Name on the right */}
      <span className="text-white text-lg font-light">{"Natalia Chapa"}</span>
    </header>
  );
}
