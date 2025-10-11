import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom'; // If using react-router!

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-[#23272e]">
      {/* Logo / Title */}
      <div className="font-bold text-xl text-violet-700 dark:text-violet-200">
        Victorian Whisper
      </div>
      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline text-base dark:text-gray-200">Home</Link>
        <Link to="/write" className="hover:underline text-base dark:text-gray-200">Write</Link>
        <Link to="/read" className="hover:underline text-base dark:text-gray-200">Read</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
