import React, { useState } from "react";
// The import for 'next/link' has been removed to resolve the build error.

// --- SVG Icon Components for the Menu ---

// Hamburger Menu Icon
const MenuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

// Close (X) Icon
const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
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

// Instagram Icon
const InstagramIcon: React.FC<{ className?: string }> = ({
  className = "h-7 w-7",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- The Side Menu Drawer Component ---

const SideMenu: React.FC = () => {
  // State to manage if the drawer is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // This function closes the menu when a link is clicked.
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button - always visible in the top left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-30 p-2 rounded-full text-gray-800 bg-white/50 hover:bg-white/90 backdrop-blur-sm transition-all shadow-md"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* Dark Overlay - appears behind the drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel - slides in from the left */}
      <nav
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button inside the drawer */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        {/* Navigation Links - Centered with thin font */}
        <div className="h-full flex flex-col items-center justify-center">
          <ul className="space-y-12 text-center">
            {/* The Next.js <Link> components have been replaced with standard <a> tags to fix the error. */}
            <li>
              <a
                href="/people"
                onClick={handleLinkClick}
                className="text-3xl font-light text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 inline-block"
              >
                People
              </a>
            </li>
            <li>
              <a
                href="/nature"
                onClick={handleLinkClick}
                className="text-3xl font-light text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 inline-block"
              >
                Nature/Landscape
              </a>
            </li>
            <li>
              <a
                href="/animals"
                onClick={handleLinkClick}
                className="text-3xl font-light text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 inline-block"
              >
                Animals
              </a>
            </li>
            <li>
              <a
                href="/lifestyle"
                onClick={handleLinkClick}
                className="text-3xl font-light text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 inline-block"
              >
                Lifestyle
              </a>
            </li>
            <li className="flex justify-center">
              <a
                href="https://instagram.com/throughthequietlens_photo?" // IMPORTANT: Replace with your wife's Instagram username
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Instagram page"
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
